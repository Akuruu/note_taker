// require the Util and fs
const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);


class Store {
    read() {
        return readNote('db/db.json', 'utf8');
    }
    write() {
        return writeNote('db/db.json', JSON.stringify(note));
    }
    getNotes(){
        return this.read().then(notes => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    }
}

module.exports = new Store();