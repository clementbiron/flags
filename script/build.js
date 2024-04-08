import { readFile, writeFile } from 'node:fs';

async function build(){
  
  readFile('./src/countries.json', (err, data) => {
    if (err) throw err;

    const countries = JSON.parse(data);
    let outputCSS = [];
    let outputExemples = [];

    outputCSS.push(`.country-flag > span { display: none; }\n.country-flag::after{ font-size: inherit; }\n`);

    countries.forEach(country => {
      outputCSS.push(`.country-flag--${country.code}::after { content: "${country.flag}"; }\n`);
      outputExemples.push(`<div class="country-flag country-flag--${country.code}" title="${country.code}"><span>${country.code}</span></div>`);
    });

    writeFile('./dist/countries-flags.css', outputCSS.join('').toString(), err => {
      if (err) throw err;
      console.log('css file written successfully');
    });

    let html = `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>CSS countries flags</title>
          <link rel="stylesheet" type="text/css" href="dist/countries-flags.css" />
          <link rel="stylesheet" type="text/css" href="src/index.css" />
          <script src="src/index.js"></script>
        </head>
        <body>
          <div class="showcase">${outputExemples.join('').toString()}</div>
        </body>
      </html>
    `;
    
    writeFile('index.html', html, err => {
      if (err) throw err;
      console.log('html file written successfully');
    });
  });
}

build();
