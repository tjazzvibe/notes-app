export default class btns {
    constructor (list, ht) {
        this.newBtn = document.querySelector('#newnotebutton');
        this.delActBtn = document.querySelector('#deletenotebutton'); 
        this.listClass = list;
        this.ht = ht; 
        this.edNoteInp = document.getElementById('editnote');
        this.edTitleInp = document.getElementById('edittitle');
        this.actNoteID = document.getElementById('activenoteid');
    }

    setUpBtns() {
        this.nbEvLis();
        this.delActNote()
}

    nbEvLis() {
        this.newBtn.addEventListener('click',() => {
            //get new note
            const newNote = this.listClass.makeNewNote();
            document.getElementById('activenoteid').value = '';
            document.getElementById('edittitle').value = '';
            document.getElementById('editnote').value = '';

            
            this.listClass.list.unshift(newNote);
            const newHTML = this.ht.boxHTML(newNote.id, 'New Note', 'Edit this note in the active window');
            this.listClass.saveList();

            document.getElementById('thelist').insertAdjacentHTML('afterbegin', newHTML);
           
            const s = document.querySelectorAll('#id' + newNote.id)
            this.ht.itemsEvLis(s);

        })
    }
    delActNote() {
        this.delActBtn.addEventListener('click', () => {
            const id = this.actNoteID.value;

            const r = confirm(`Are you want to delete this message: ${id} \n ${this.edTitleInp.value}` );
            if (!r) { return };

            if (!id) { return }
            // the #id's i add id before the actual id. 
            const id2 = 'id' + id;

            const oneNote = this.listClass.list.find(o => o.id == id);
            const filtList = this.listClass.list.filter(o => o.id !== id);
            this.listClass.list = filtList;
            this.listClass.saveList();
            document.getElementById(id2).remove();
            console.log(this.listClass.numOfNotes())
            if (this.listClass.numOfNotes() == 0) {

                document.getElementById("rightcolumn").style.display = "none";
            }

            
            
        })
    }
    
    
        
    
}


