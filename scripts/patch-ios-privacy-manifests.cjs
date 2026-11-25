const fs = require('fs');
const path = require('path');

const privacyManifestSource = path.join(__dirname, '..', 'ios', 'App', 'App', 'PrivacyInfo.xcprivacy');
const podsDir = path.join(__dirname, '..', 'ios', 'App', 'Pods');

console.log('=== [Suelta Build] Iniciando inyección de Privacy Manifests ===');

if (!fs.existsSync(privacyManifestSource)) {
  console.error('[ERROR] No se encontró el archivo fuente PrivacyInfo.xcprivacy en:', privacyManifestSource);
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

// 2. Buscar TODOS los scripts de frameworks en Target Support Files
const targetSupportDir = path.join(podsDir, 'Target Support Files');
if (fs.existsSync(targetSupportDir)) {
  const findFrameworkScripts = (dir) => {
    let results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results = results.concat(findFrameworkScripts(fullPath));
      } else if (entry.name.endsWith('-frameworks.sh')) {
        results.push(fullPath);
      }
    }
    return results;
  };

  const scripts = findFrameworkScripts(targetSupportDir);
  console.log(`[INFO] Se encontraron ${scripts.length} script(s) de frameworks.`);

  scripts.forEach(scriptPath => {
    let scriptContent = fs.readFileSync(scriptPath, 'utf8');
    const marker = '# Injected PrivacyInfo.xcprivacy by Suelta Build';

    if (!scriptContent.includes(marker)) {
      const fnRegex = /code_sign_if_enabled\s*\(\)\s*\{/;
      if (fnRegex.test(scriptContent)) {
        const replacement = `code_sign_if_enabled() {
  ${marker}
  if [ -d "$1" ]; then
    local p_manifest="\${PODS_ROOT}/../App/PrivacyInfo.xcprivacy"
    if [ -f "\${p_manifest}" ]; then
      cp -f "\${p_manifest}" "$1/PrivacyInfo.xcprivacy"
      echo "[Frameworks Hook] Inyectado PrivacyInfo.xcprivacy en $1"
    fi
  fi`;
        scriptContent = scriptContent.replace(fnRegex, replacement);
        fs.writeFileSync(scriptPath, scriptContent, 'utf8');
        console.log(`[EXITO] Parcheado code_sign_if_enabled en: ${scriptPath}`);
      } else {
        console.warn(`[AVISO] No se encontró code_sign_if_enabled en: ${scriptPath}`);
      }
    } else {
      console.log(`[INFO] El script ${path.basename(scriptPath)} ya estaba parcheado.`);
    }
  });
} else {
  console.log('[INFO] Target Support Files aún no existe (se creará al ejecutar pod install).');
}

console.log('=== [Suelta Build] Inyección de Privacy Manifests completada ===');
