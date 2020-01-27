const { DIRECTORY_ALREADY_EXISTS, FILE_ALREADY_EXISTS } = require('./constants');

const createNode = (value, children) => {
    return {
        value,
        children
    }
}

const createTree = () => {
    return createNode('root', []);
}

const addNode = (fs, value, type) => {
    if (fs.children.filter(node => (node.value === value)).length === 0) {
        fs.children.push(createNode(value, type));
        return;
    } else {
        if (Array.isArray(type)) {
            return DIRECTORY_ALREADY_EXISTS;
        }
        if (type === null) {
            return FILE_ALREADY_EXISTS;
        }
    }
}

const changePath = (fileSystem, value, actualPath) => {
    let success = false;

    find = (fileSystem, value, indexPath) => {
        if (actualPath[indexPath] && actualPath[indexPath] === fileSystem.value) {
            if (indexPath === actualPath.length - 1) {
                if (fileSystem.children !== null) { // ending node
                    fileSystem.children.forEach(element => {
                        if (element.value === value && element.children !== null) {
                            actualPath.push(value);
                            success = true;
                            return;
                        }
                    });
                }
                return;
            }
            fileSystem.children.forEach(element => {
                find(element, value, indexPath + 1);
            });
            if (!success) {
                console.log(DIRECTORY_NOT_FOUND);
            }
        }
        return null;
    };

    find(fileSystem, value, 0);
}

const getNode = (fs, path) => {
    let subNodes = {};

    find = (fs, i) => {
        if (fs.value === path[i]) {
            if (i === path.length - 1) {
                subNodes = fs;
            }
            fs.children && fs.children.forEach(node => {
                find(node, i + 1);
            })
        } else {
            return null;
        }
    }

    find(fs, 0);

    return subNodes
}

const listNodes = (fs, r) => {
    print = (fs) => {
        fs.children && fs.children.forEach(node => {
            node.children === null
                ? console.log(node.value)
                : console.log('/'.concat(node.value));
        })

        if (r) {
            fs.children && fs.children.forEach(node => {
                if (node.children !== null) {
                    print(node);
                }
            });
        }
    }

    print(fs)
}

module.exports = {
    createNode,
    createTree,
    addNode,
    changePath,
    getNode,
    listNodes
}
