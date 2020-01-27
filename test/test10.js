/**
 * Test: ls command - multifaceted path
 * Opens input10.txt, list files with multifaceted path
 */
const fs = require('fs');
const readline = require('readline');
const { executeCommand } = require('../src/index');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./input10.txt'),
    console: false
});

readInterface.on('line', function(line) {
    inputArray = line.split(' ');
    executeCommand(inputArray);
});
