const fs = require('fs');
const path = require('path');

const privacyManifestSource = path.join(__dirname, '..', 'ios', 'App', 'App', 'PrivacyInfo.xcprivacy');
const podsDir = path.join(__dirname, '..', 'ios', 'App', 'Pods');
const frameworksScript = path.join(podsDir, 'Target Support Files', 'Pods-App', 'Pods-App-frameworks.sh');

console.log('--- Iniciando parche de Privacy Manifests para iOS ---');

if (!fs.existsSync(privacyManifestSource)) {
  console.error('Error: No se encontró el archivo fuente PrivacyInfo.xcprivacy en:', privacyManifestSource);
  process.exit(1);
}

const manifestContent = fs.readFileSync(privacyManifestSource, 'utf8');

// 1. Inyectar en carpetas de Pods conocidos si existen
const targetPods = [
  'GoogleSignIn',
  'GTMAppAuth',
  'GTMSessionFetcher',
  'CodetrixStudioCapacitorGoogleAuth'
];

targetPods.forEach(podName => {
  const targetDir = path.join(podsDir, podName);
  if (fs.existsSync(targetDir)) {
    const destFile = path.join(targetDir, 'PrivacyInfo.xcprivacy');
    fs.writeFileSync(destFile, manifestContent, 'utf8');
    console.log(`[OK] Inyectado PrivacyInfo.xcprivacy en: ${destFile}`);
  }
});

// 2. Parchear Pods-App-frameworks.sh para que se inyecte en cada .framework antes de la firma de código
if (fs.existsSync(frameworksScript)) {
  let scriptContent = fs.readFileSync(frameworksScript, 'utf8');
  const marker = '# Injected PrivacyInfo.xcprivacy by Suelta Build';

  if (!scriptContent.includes(marker)) {
    const targetString = 'code_sign_if_enabled "${destination}"';
    if (scriptContent.includes(targetString)) {
      const replacement = `    ${marker}
    local privacy_manifest="\${PODS_ROOT}/../App/PrivacyInfo.xcprivacy"
    if [ -f "\${privacy_manifest}" ]; then
      cp -f "\${privacy_manifest}" "\${destination}/PrivacyInfo.xcprivacy"
    fi
    code_sign_if_enabled "\${destination}"`;

      scriptContent = scriptContent.replace(new RegExp(targetString, 'g'), replacement);
      fs.writeFileSync(frameworksScript, scriptContent, 'utf8');
      console.log('[OK] Pods-App-frameworks.sh parcheado exitosamente para inyección automática en cada framework.');
    } else {
      console.warn('[AVISO] No se encontró code_sign_if_enabled en Pods-App-frameworks.sh');
    }
  } else {
    console.log('[INFO] Pods-App-frameworks.sh ya contenía el parche.');
  }
} else {
  console.log('[INFO] Pods-App-frameworks.sh aún no existe (se creará al ejecutar pod install).');
}

console.log('--- Parche de Privacy Manifests completado ---');
