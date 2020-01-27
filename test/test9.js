/**
 * Test: touch command - Character limit of 100.
 * Opens input9.txt, try to create file with >100 characters
 */
const fs = require('fs');
const readline = require('readline');
const { executeCommand } = require('../src/index');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./input9.txt'),
    console: false
});

readInterface.on('line', function(line) {
    inputArray = line.split(' ');
    executeCommand(inputArray);
});
