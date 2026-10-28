import fs from 'fs';
import * as pdf from 'pdf-parse';

async function extract() {
  try {
    const pdfBuffer = fs.readFileSync('repo/OneDrive - PETPLUS/Documentos/Desarrollo/Suelta/Propuesta Técnica Final_ App Móvil “Suelta”.pdf');
    const parse = pdf.default || pdf.pdfParse || pdf;
    const pdfData = await parse(pdfBuffer);
    fs.writeFileSync('/tmp/propuesta_tecnica.txt', pdfData.text);
    console.log('PDF extracted.');
  } catch (e) {
    console.error(e);
  }
}
extract();
