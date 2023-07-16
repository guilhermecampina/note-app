const addBox = document.querySelector('.add-box');
const popupBox = document.querySelector('.popup-box');
const closeIcon = popupBox.querySelector('header i');
const addBtn = popupBox.querySelector('button');

const titleTag = popupBox.querySelector('input');
const descTag = popupBox.querySelector('textarea');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'Octuber', 'November', 'December'];

const notes = JSON.parse(localStorage.getItem('notes') || '[]');



addBox.addEventListener('click', () => {
    popupBox.classList.add('show');
})

closeIcon.addEventListener('click', () => {
    titleTag.value = '';
    descTag.value = '';
    popupBox.classList.remove('show');
})

function showNotes() {
    document.querySelectorAll('.note').forEach(note => note.remove());
    notes.forEach((note) => {
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>  
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>  
                                <ul class="menu">
                                    <li><i class="uil uil-pen"></i>Edit</li>
                                    <li><i class="uil uil-trash"></i>Delete</li>
                                </ul>  
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML('afterend', liTag);
    })
}
showNotes();

function showMenu(elem) {
    elem.parentElement.classList.add('show');
}

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let noteTitle = titleTag.value;
    let noteDesc = descTag.value;
    
    if(noteTitle || noteDesc) {
        let dateObj = new Date();
        let month = months[dateObj.getMonth()];
        let day = dateObj.getDate();
        let year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${day}, ${year}`

        }
        
        
        notes.push(noteInfo);
        localStorage.setItem('notes', JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
    
})
