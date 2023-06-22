'use strict';
const Values = require('values.js');
const fs = require('fs');
// Setup
console.log('Initilizing generator...');
const rawColors = fs.readFileSync('colorsInput.json');
const colors = JSON.parse(rawColors);
const rawConfig = fs.readFileSync('config.json');
const config = JSON.parse(rawConfig);
console.log('Configuration and colors loaded in from json files...');
// Generating
console.log('Starting generating tints and shades...');
const cssFileName = 'colors.css';
// Here we start by overwritting the entire file with ":root {"
fs.writeFileSync(cssFileName, ':root {\n', { flag: 'w+' });
for (const color of colors) {
    console.log(`Started generation of tints and shades for the color '${color.name}'`);
    const colorValues = new Values(color.value);
    for (const configElement of config) {
        let hexColor = colorValues.hexString();
        if (configElement.type === 'tint') {
            hexColor = colorValues.tint(configElement.weight).hexString();
        }
        if (configElement.type === 'shade') {
            hexColor = colorValues.shade(configElement.weight).hexString();
        }
        const outputValue = `--${color.name}-${configElement.suffix}:${hexColor};`;
        // Here we append the tint/shade/base color to the css file.
        fs.appendFileSync(cssFileName, '    ' + outputValue + '\n');
    }
    console.log(`Completed the generation of tints and shades for the color '${color.name}'`);
}
// Here we append the last } to close the first bracket for the :root tag.
fs.appendFileSync(cssFileName, '}');
console.log(`Completed generating tints and shades for all loaded colors...`);
