/**
 * Test: mkdir command
 * Opens input5.txt, create directory and execute ls command
 */
const fs = require('fs');
const readline = require('readline');
const { executeCommand } = require('../src/index');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./input5.txt'),
    console: false
});

readInterface.on('line', function(line) {
    inputArray = line.split(' ');
    executeCommand(inputArray);
});
