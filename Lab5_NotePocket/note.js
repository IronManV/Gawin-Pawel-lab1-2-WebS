class Note {
    constructor(title, description, color, pinned) {
        this.title = title;
        this.description = description;
        this.color = color
        this.createdTime = new Date().toJSON();
        this.pinned = pinned;
        this.creatNote();
    }

    creatNote() {
        let new_note = document.createElement('div');
        new_note.setAttribute('class', 'note');
        new_note.style.backgroundColor = this.color;
        document.querySelector('.noteSection').appendChild(new_note);

        let new_title = document.createElement('div');
        new_title.setAttribute('class', 'title');
        new_title.innerText = this.title;
        new_note.appendChild(new_title);

        let new_date = document.createElement('div');
        new_date.setAttribute('class', 'date');
        new_date.innerText = this.parseDate();
        new_note.appendChild(new_date);

        let new_text = document.createElement('div');
        new_text.setAttribute('class', 'noteText');
        new_text.innerText = this.description
        new_note.appendChild(new_text);

        let new_hr = document.createElement('hr');
        new_text.insertAdjacentElement('afterbegin', new_hr);

        let new_pinned = document.createElement('div');
        new_pinned.setAttribute('class', 'pinned');
        new_note.appendChild(new_pinned);

        let new_checkbox = document.createElement('input');
        new_checkbox.type = 'checkbox';
        new_checkbox.id = 'pin';
        new_checkbox.checked = this.pinned;
        new_pinned.appendChild(new_checkbox);

        let new_img_span = document.createElement('span');
        new_note.appendChild(new_img_span);

        let new_img = document.createElement('img');
        new_img.src = 'img/close.png';
        new_img_span.className = 'deleteNote';
        new_img_span.appendChild(new_img);
    }

    parseDate() {
        let time;
        time = this.createdTime[8] + this.createdTime[9] + "." +
            this.createdTime[5] + this.createdTime[6] + "." +
            this.createdTime[0] + this.createdTime[1] +
            this.createdTime[2] + this.createdTime[3];
        return time;
    }

}