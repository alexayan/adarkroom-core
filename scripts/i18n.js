const { extractFromFiles, findMissing } = require('i18n-extract');
const fs = require('fs');
const path = require('path');
const langs = require('../i18n/langs.json');

const keys = extractFromFiles(['src/**/*.ts'], {
  marker: 'translate',
  parser: 'typescript',
});


fs.writeFileSync(path.resolve(__dirname, '../i18n/adarkroom.json'), JSON.stringify(keys, null, '\t'), {
    encoding: 'utf-8'
})


langs.forEach((lang) => {
    const old = fs.readFileSync(path.resolve(__dirname, `../i18n/${lang}/strings.json`), {
        encoding: 'utf-8'
    })
    const missing = findMissing(JSON.parse(old), keys);
    fs.writeFileSync(path.resolve(__dirname, `../i18n/${lang}/miss.json`), JSON.stringify(missing, null, '\t'), {
        encoding: 'utf-8'
    })
})