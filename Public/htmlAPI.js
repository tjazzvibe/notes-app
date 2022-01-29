

export default class htmlAPIClass { 
    constructor (listClass) {
        this.MAX_BODY_LENGTH = 15;
        this.listClass = listClass;

    }

    listToHTML() {
     
        let lftList = '';
        this.listClass.list.forEach(e => {
          lftList = lftList +  this.boxHTML(e.id, e.title, e.note,e.updated)
        });
        return lftList;
    }


    boxHTML(id, title, note, updated = new Date().toISOString()) {
        const MAX_BODY_LENGTH = 15;
        
        let listHTML = '';
        listHTML = `
        <div class='box listbox m-2' data-id='${id}' id='id${id}' style='width: 250px;'>
        <div class = 'title is-5 has-text-primary' id="title">${title}</div>
        <div>${note.substring(0, MAX_BODY_LENGTH)}${note > MAX_BODY_LENGTH ? "..." : ""}</div>
        <hr>
        <div class = 'is-size-7 has-text-right has-text-danger'>${updated}</div>
        </div>`
       return listHTML 
    }

    itemsEvLis(queryAll) {  
        queryAll.forEach(e =>{
            e.addEventListener('click', () => {
                const w = document.getElementById("rightcolumn").style.display = "";
                const oneNote = this.listClass.list.find(o => o.id == e.dataset.id)
                document.getElementById('edittitle').value = oneNote.title
                document.getElementById('activenoteid').value = oneNote.id
                document.getElementById('editnote').value = oneNote.note               
            })
        })   
    } 
    
    async editEvLis() {
        const inp = document.querySelectorAll('[name="rightsideinput"]');
        inp.forEach(e => {
            e.addEventListener('blur', () => {
                const id = document.getElementById('activenoteid').value;
                const title = document.getElementById('edittitle').value;
                const note = document.getElementById('editnote').value;
                const updated = new Date().toISOString();

                const t = document.getElementById('id' + id);
                t.children[0].innerHTML = title;
                t.children[1].innerHTML = note; 
                t.children[3].innerHTML = updated;
                
                const oneNote = this.listClass.list.find(o => o.id == id)
                const filtList = this.listClass.list.filter(o => o.id !== id)
                filtList.unshift({ id, title, note, updated });

                this.listClass.list = filtList;
                this.listClass.saveList();
                
            
                
                
            });
        })
    }
            

    
    
}


