document.addEventListener('DOMContentLoaded', appStart)

let noteArray = []
readLocalStorage();

function appStart() {
    loadSavedNotes(noteArray);
    document.querySelector('#addNoteBtn').addEventListener('click', showAddNoteForm)

    document
        .querySelector('#addNote')
        .addEventListener('click', () => {
            createNote(), hideAddNoteForm()

            //delete funcion 
            //jeśli chceby by działa bez odświerzania to createNote() musi się wykonać najpierw
            document.querySelectorAll('.deleteNote').forEach(item => {
                item.addEventListener('click', (e) => {

                    e.target.closest('.note').remove()
                    removeNote(e.target.closest('.note').firstChild.textContent, e.target.closest('.note').childNodes[2].textContent)
                })
            })
        });

    document.querySelectorAll('.deleteNote').forEach(item => {
        item.addEventListener('click', (e) => {

            e.target.closest('.note').remove()
            removeNote(e.target.closest('.note').firstChild.textContent, e.target.closest('.note').childNodes[2].textContent)
        })
    })

    document.querySelectorAll('.pinned').forEach(item => {
        item.addEventListener('click', (e) => {

            pinnedNotes(e.target.closest('.note').firstChild.textContent, e.target.closest('.note').childNodes[2].textContent);

        })
    })
    document.querySelector('#search').addEventListener('click', searchNote);
}

function showAddNoteForm() {
    document.querySelector('.noteAddSection').style.display = 'block';
}

function hideAddNoteForm() {
    document.querySelector('.noteAddSection').style.display = 'none';
}

function createNote() {
    let noteTitle = document.querySelector('#noteTitle').value;
    let noteDesc = document.querySelector('#noteDesc').value;
    let noteColor = document.querySelector('#colorPicked').value;
    let note = new Note(noteTitle, noteDesc, noteColor, false)

    noteArray.push(note);
    pushToLocalStorage();
    location.reload();
    return note;
}

function readLocalStorage() {
    if (JSON.parse(localStorage.getItem('notes')) != null) {
        noteArray = JSON.parse(localStorage.getItem('notes'))
    }
}

function pushToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(noteArray));
}

function loadSavedNotes(array) {
    array.forEach(x => {
        new Note(x.title, x.description, x.color, x.pinned);
    });
}

function searchNote() {
    let query = document.querySelector('#searchNote').value;
    hideAllNotes();

    loadSavedNotes(noteArray.filter(x => x.title == query || x.description == query))
}

function hideAllNotes() {
    let divArray = document.querySelectorAll('.note');

    divArray.forEach(e => {
        e.style.display = 'none';
    });
}

function removeNote(title, description) {
    noteArray = noteArray.filter(x => x.title != title || x.description != description);
    pushToLocalStorage();
}

function pinnedNotes(title, description) {
    let pin = noteArray.filter(x => x.title == title || x.description == description);

    if (pin[0].pinned == true) {
        pin[0].pinned = false;
    } else {
        pin[0].pinned = true;
    }
    noteArray = noteArray.sort((a, b) => b.pinned - a.pinned);
    pushToLocalStorage();
    location.reload();
}