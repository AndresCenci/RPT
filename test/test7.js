/**
 * Test: touch command
 * Opens input7.txt, create files and execute 'ls' command
 */
const fs = require('fs');
const readline = require('readline');
const { executeCommand } = require('../src/index');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./input7.txt'),
    console: false
});

readInterface.on('line', function(line) {
    inputArray = line.split(' ');
    executeCommand(inputArray);
});
