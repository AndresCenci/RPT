const fs = require('fs');
const { UNRECOGNIZED_COMMAND, INVALID_COMMAND, 
    DIRECTORY, FILE, DIRECTORY_NOT_FOUND,
    DIRECTORY_ALREADY_EXISTS, FILE_ALREADY_EXISTS } = require('./constants');
const { createTree, addNode, changePath, getNode, listNodes } = require('./tree');

// let tree = {};
// fs.readFile('./output.json', 'utf8', function (err, data) {
//     if (err) {
//         console.log('hubo un error ', err)
//         tree = createTree();
//         throw err
//     };
//     console.log('data: ',  data)
//     tree = JSON.parse(data);
//     console.log('tree: ', tree)
// });

let tree = createTree();
let actualPath = [];
actualPath.push(tree.value);

const saveTree = () => {
    let jsonContent = JSON.stringify(tree);
    fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
     
        console.log("JSON file has been saved.");
    });
}

const executeCommand = (input) => {
    switch(input[0]) {
        case 'pwd':
            let completePath = '';
            actualPath.map(x => {
                completePath = completePath.concat('/').concat(x);
            })
            console.log(completePath);
            break;
        case 'ls':
            let recursive = false;
            let multiFaceted = [];
            if (input[1] && input[1] === '-r' || input[1] === '--recursive') {
                recursive = true;
                if (input[2] && input[2].includes('/')) {
                    multiFaceted = input[2].split('/');
                }
            } else {
                if (input[1] && input[1].includes('/')) {
                    multiFaceted = input[1].split('/');
                }
            }
            // listNodes(tree, actualPath.concat(multiFaceted), recursive);
            listNodes(getNode(tree, actualPath.concat(multiFaceted)), recursive);
            break;
        case 'mkdir':
            input[1].length <= 100
                ? addNode(getNode(tree, actualPath), input[1], DIRECTORY)
                : console.log(INVALID_COMMAND);
            break;
        case 'cd':
            if (input[1] === '..' && actualPath[actualPath.length - 1] !== 'root') {
                actualPath.pop();
            } else {
                changePath(tree, input[1], actualPath);
            }
            break;
        case 'touch':
            input[1].length <= 100
                ? addNode(getNode(tree, actualPath), input[1], FILE)
                : console.log(INVALID_COMMAND);
            break;
        case 'quit':
            saveTree();
            break;
        default:
            console.log(UNRECOGNIZED_COMMAND);
            break;
    }
}

module.exports = {
    executeCommand
}