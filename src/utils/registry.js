const path = require('path');
const fs = require('fs');

const getAllFiles = function (dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []

    files.forEach(function (file) {
        // console.log('dir >>>', dirPath)
        // console.log('file >>> ', file)
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file))
        }
    })

    return arrayOfFiles
}

const getAllCommandFiles = function (dirPath) {
    return getAllFiles(dirPath);
}

const getAllEventFiles = function (dirPath) {
    return getAllFiles(dirPath);
}

function registerCommands(client, dirPath) {
    const files = getAllCommandFiles(dirPath);
    for (const file of files) {
        if (file.endsWith('.js')) {
            const command = require(file);
            client.commands.set(command.data.name, command);
        }
    }
}

function registerEvents(client, dirPath) {
    const files = getAllCommandFiles(dirPath);
    for (const file of files) {
        if (file.endsWith('.js')) {
            const event = require(file);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }
        }
    }
}

module.exports = {
    getAllCommandFiles,
    getAllEventFiles,
    registerCommands,
    registerEvents,
};