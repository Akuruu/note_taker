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

    // Updates notes
    newNote(note) {
        const { title, text } = note;
        // If the title and text boxes are empty, prompt the user with an error
        if (!title || !text) {
            throw new Error("Please write something in 'Title' and 'Text'.");
        }

        const addNote = { title, text, id: uuidv1() };

        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => addNote);
    }
    // Deletes notes with a specific id and writes the sorted ones
    deleteNote(id) {
        return this.getNotes()
        .then(notes => notes.filter(note => note.id !== id))
        .then(sortedNotes => this.write(sortedNotes))
    }
}
// Exports 
module.exports = new Store();