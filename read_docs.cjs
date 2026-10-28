const fs = require('fs');
const mammoth = require('mammoth');

async function extract() {
  try {
    const docxBuffer = fs.readFileSync('repo/OneDrive - PETPLUS/Documentos/Desarrollo/Suelta/Identidad_de_Marca_-_Proyecto_Suelta.docx');
    const docxData = await mammoth.extractRawText({buffer: docxBuffer});
    fs.writeFileSync('/tmp/identidad_marca.txt', docxData.value);
    console.log('DOCX extracted.');
  } catch (e) {
    console.error(e);
  }
}
extract();
