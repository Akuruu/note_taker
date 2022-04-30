// require the Util and fs
const util = require('util');
const fs = require('fs');
// const uuidv1 = require('uuid/v1');
const { v1: uuidv1 } = require('uuid');
const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);

class Store {
    write(note) {
        return writeNote('db/db.json', JSON.stringify(note));
    }

    read() {
        return readNote('db/db.json', 'utf8');
    }
    // Get existing notes
    getNotes() {
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
   // Adds a note 
    newNote(note) {
        const {title, text} = note;
        const newNote = { title, text, id: uuidv1() };
        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => newNote);
    }
    // DELETE a note
    deleteNote(id) {
        return this.getNotes()
        // Filters notes by their id
            .then(notes => notes.filter(note => note.id !== id))
            .then(filteredNotes => this.write(filteredNotes));
    }
}

module.exports = new Store();