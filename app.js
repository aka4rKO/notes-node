const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

let titleOption = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

let bodyOption = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};

let argv = yargs
    .command('add', 'Add a new note', {
        title: titleOption,
        body: bodyOption
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOption
    })
    .command('remove', 'Remove a note', {
        title: titleOption
    })
    .help()
    .argv;
let command = argv._[0];

//Checking the command entered by the user
if(command === 'add'){
    let note = notes.addNote(argv.title, argv.body);
    if(note){
        console.log('Note added!');
        notes.logNote(note);
    }else{
        console.log('Title already exists. Note not added!');
    } 
}else if(command === 'list'){
    let allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach(note => notes.logNote(note));
}else if(command === 'read'){
    let note = notes.getNote(argv.title);
    if(note){
        console.log('Note found!');
        notes.logNote(note);
    }else{
        console.log('Note not found!');
    }
}else if(command === 'remove'){
    let removedNote = notes.removeNote(argv.title);
    removedNote? console.log('Note removed!') : console.log('Note not found!');
}else{
    console.log('Command not recognized');
}
