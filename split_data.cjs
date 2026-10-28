const fs = require('fs');
const content = fs.readFileSync('/app/applet/src/App.jsx', 'utf8');
const lines = content.split('\n');

const importsAndTop = lines.slice(0, 57).join('\n');
const dataLines = lines.slice(57, 8686).join('\n');
const restOfApp = lines.slice(8686).join('\n');

const dataFileContent = `import * as EphemerisNS from "circular-natal-horoscope-js";

` + dataLines
  .replace(/^const DICTIONARY/gm, 'export const DICTIONARY')
  .replace(/^const ZODIACO/gm, 'export const ZODIACO')
  .replace(/^const PLANETAS_REGENTES/gm, 'export const PLANETAS_REGENTES')
  .replace(/^const EphemerisOrigin/gm, 'export const EphemerisOrigin')
  .replace(/^const EphemerisHoroscope/gm, 'export const EphemerisHoroscope')
  .replace(/^const SIGNOS_EN_ES/gm, 'export const SIGNOS_EN_ES')
  .replace(/^const CIUDADES_NACIMIENTO/gm, 'export const CIUDADES_NACIMIENTO')
  .replace(/^const TONALPOHUALLI_SIGNOS/gm, 'export const TONALPOHUALLI_SIGNOS')
  .replace(/^const ANCLA_TONALLI/gm, 'export const ANCLA_TONALLI')
  .replace(/^const ANCLA_SIGNO_IDX/gm, 'export const ANCLA_SIGNO_IDX')
  .replace(/^const ANCLA_NUMERO/gm, 'export const ANCLA_NUMERO')
  .replace(/^const NUMEROLOGIA_CAMINO_VIDA/gm, 'export const NUMEROLOGIA_CAMINO_VIDA')
  .replace(/^const VALORES_PITAGORICOS/gm, 'export const VALORES_PITAGORICOS');

fs.writeFileSync('/app/applet/src/data/constants.js', dataFileContent);

const newAppContent = importsAndTop + `
import {
  DICTIONARY, ZODIACO, PLANETAS_REGENTES, EphemerisOrigin, EphemerisHoroscope,
  SIGNOS_EN_ES, CIUDADES_NACIMIENTO, TONALPOHUALLI_SIGNOS, ANCLA_TONALLI,
  ANCLA_SIGNO_IDX, ANCLA_NUMERO, NUMEROLOGIA_CAMINO_VIDA, VALORES_PITAGORICOS
} from './data/constants';
` + '\n' + restOfApp;

fs.writeFileSync('/app/applet/src/App.jsx', newAppContent);
console.log('App.jsx has been split!');
