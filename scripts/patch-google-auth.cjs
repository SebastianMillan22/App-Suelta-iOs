const fs = require('fs');
const path = require('path');

const targetFile = path.join(
  __dirname,
  '..',
  'node_modules',
  '@codetrix-studio',
  'capacitor-google-auth',
  'android',
  'src',
  'main',
  'java',
  'com',
  'codetrixstudio',
  'capacitor',
  'GoogleAuth',
  'GoogleAuth.java'
);

if (fs.existsSync(targetFile)) {
  let content = fs.readFileSync(targetFile, 'utf8');
  let modified = false;

  if (content.includes('public void signOut(final PluginCall call) {\n    googleSignInClient.signOut()')) {
    content = content.replace(
      'public void signOut(final PluginCall call) {\n    googleSignInClient.signOut()',
      'public void signOut(final PluginCall call) {\n    if (googleSignInClient == null) { call.resolve(); return; }\n    googleSignInClient.signOut()'
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(targetFile, content, 'utf8');
    console.log('Patched GoogleAuth.java for null safety.');
  }
}
