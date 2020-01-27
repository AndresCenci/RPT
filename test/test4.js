/**
 * Test: ls -r command
 * Opens input4.txt, create directories and files inside and execute ls -r command
 */
const fs = require('fs');
const readline = require('readline');
const { executeCommand } = require('../src/index');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./input4.txt'),
    console: false
});

readInterface.on('line', function(line) {
    inputArray = line.split(' ');
    executeCommand(inputArray);
});
