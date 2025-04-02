const addButton = document.querySelector('#add');

const updateLSData = () => {
    const textareaData = document.querySelectorAll('textarea');
    const notes = [];    //the data is stored in the form of array
    textareaData.forEach((note) => {
        return notes.push(note.value);    //data is added to empty array 'notes'
    })
    localStorage.setItem('notes', JSON.stringify(notes));    //data is stored in local storage(key-value pair)
}

const addNewNote = (text = '') => {     //text is used to decide whether to add a new note or update an existing one
    const note = document.createElement('div');   //to create a div using JS
    note.classList.add('note');

    const htmlData = `
    <div class="operation">
            <button class="edit"><i class="fas fa-edit"></i><span class="Hover">Edit</span></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"} "></div>   
    <textarea class="${text ? "hidden" : ""}"></textarea>  `;    //if text is present, added a class 'hidden' to the textarea, else nothing is added
                                                                //if text is not present, main div is hidden and textarea is available to write

    note.insertAdjacentHTML('afterbegin', htmlData);    //to include 'operation' div under 'note' div
    //getting the reference

    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textarea = note.querySelector('textarea');

    //deleting the node
    delButton.addEventListener('click', () => {
        note.remove();
        updateLSData();
        })

    //toggle using edit button
    textarea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    })

    textarea.addEventListener('change', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;    //data is now shown after clicking edit button

        updateLSData();
    })

    document.body.appendChild(note);     //it appends a node as the last child of a node
}

//getting data back from local storage
const notes = JSON.parse(localStorage.getItem('notes'));
if (notes) {
    notes.forEach((note) => addNewNote(note));
}

addButton.addEventListener('click', () => addNewNote());