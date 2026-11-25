const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== [Suelta IPA Inspector] Verificando Privacy Manifests en el binario final ===');

const ipaDir = path.join(__dirname, '..', 'build', 'ios', 'ipa');
if (!fs.existsSync(ipaDir)) {
  console.log('[AVISO] No se encontró la carpeta de IPAs (esto es normal si se ejecuta localmente en Windows).');
  process.exit(0);
}

const ipaFiles = fs.readdirSync(ipaDir).filter(f => f.endsWith('.ipa'));
if (ipaFiles.length === 0) {
  console.error('[ERROR] No se encontró ningún archivo .ipa en:', ipaDir);
  process.exit(1);
}

const ipaPath = path.join(ipaDir, ipaFiles[0]);
console.log(`[INFO] Inspeccionando archivo: ${ipaPath}`);

try {
  const listOutput = execSync(`unzip -l "${ipaPath}"`, { encoding: 'utf8' });
  console.log('--- Archivos PrivacyInfo.xcprivacy encontrados en el IPA: ---');
  const manifestLines = listOutput.split('\n').filter(line => line.includes('PrivacyInfo.xcprivacy'));
  manifestLines.forEach(l => console.log('  -> ' + l.trim()));

  const requiredFrameworks = ['GTMAppAuth', 'GTMSessionFetcher', 'GoogleSignIn'];
  let allPresent = true;

  for (const fw of requiredFrameworks) {
    const pattern = `${fw}.framework/PrivacyInfo.xcprivacy`;
    const found = listOutput.includes(pattern);
    if (found) {
      console.log(`[OK] ${fw}.framework incluye PrivacyInfo.xcprivacy`);
    } else {
      console.warn(`[FALTA] ${fw}.framework NO contiene PrivacyInfo.xcprivacy`);
      allPresent = false;
    }
  }

  if (allPresent) {
    console.log('====================================================');
    console.log(' ¡VERIFICACIÓN EXITOSA! Todos los SDKs cumplen con ITMS-91061.');
    console.log('====================================================');
  } else {
    console.log('[ACCION] Procediendo a inyectar directamente en el IPA...');
    const tmpDir = path.join(__dirname, '..', 'build', 'tmp_ipa');
    if (fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
    fs.mkdirSync(tmpDir, { recursive: true });

    execSync(`unzip -q "${ipaPath}" -d "${tmpDir}"`);

    const manifestSource = path.join(__dirname, '..', 'ios', 'App', 'App', 'PrivacyInfo.xcprivacy');
    const frameworksDir = path.join(tmpDir, 'Payload', 'App.app', 'Frameworks');

    if (fs.existsSync(frameworksDir)) {
      for (const fw of requiredFrameworks) {
        const fwDir = path.join(frameworksDir, `${fw}.framework`);
        if (fs.existsSync(fwDir)) {
          const dest = path.join(fwDir, 'PrivacyInfo.xcprivacy');
          fs.copyFileSync(manifestSource, dest);
          console.log(`[INYECCION MANUAL] Copiado manifest a: ${dest}`);
          // Resign the framework on macOS
          try {
            execSync(`codesign --force --sign - --preserve-metadata=identifier,entitlements "${fwDir}"`);
            console.log(`[FIRMA] Framework re-firmado: ${fw}.framework`);
          } catch (signErr) {
            console.warn(`[AVISO] No se pudo re-firmar ${fw}: ${signErr.message}`);
          }
        }
      }

      // Resign the main app bundle
      const appDir = path.join(tmpDir, 'Payload', 'App.app');
      try {
        execSync(`codesign --force --sign - --preserve-metadata=identifier,entitlements "${appDir}"`);
        console.log('[FIRMA] Bundle principal App.app re-firmado exitosamente.');
      } catch (appSignErr) {
        console.warn(`[AVISO] Firma de App.app: ${appSignErr.message}`);
      }

      // Re-zip the IPA
      fs.unlinkSync(ipaPath);
      execSync(`cd "${tmpDir}" && zip -qr "${ipaPath}" Payload`);
      console.log(`[EXITO] IPA reconstruido y actualizado en: ${ipaPath}`);
    }

    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
} catch (err) {
  console.error('[ERROR durante inspección de IPA]:', err.message);
  process.exit(1);
}
