export default class ClassList {
        constructor (list) {
            this.list = list;          
        }   
    displayList() {
        return this.list;
    }
    retJSON() {
       return JSON.parse(this.list)
    }

    async saveList() {
        try {
            const response = await axios({
                method: 'post',
                url: '/save',
                data: this.list
            });
            return
        } catch (error) {
            console.log(error)
        
        }
    
    }

    newNoteID() {
        return Math.floor(Math.random() * 1000000).toString();     
    }
    makeNewNote() {
        return {id: this.newNoteID(), title: "New Note", note: "Edit This Note"}
    }

    numOfNotes() {
        return this.list.length;
    }


}
   