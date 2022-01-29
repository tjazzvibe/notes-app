import ClassList from "./notesAPI.js";
import htmlAPI from "./htmlAPI.js";
import btnsAPIClass from "./buttonsAPI.js"

//buttons
const refreshBtn = document.getElementById('refreshlistbutton');
const newNoteBtn = document.getElementById('newnotebutton');
const saveBtn = document.getElementById('savebutton');

//the left side list page
const theLeftSideList = document.getElementById('thelist');

//the edit note side
const activeNoteID = document.getElementById('activenoteid');
const activeNoteTitle = document.getElementById('edittitle');
const activeNoteNote = document.getElementById('editnote');


async function setUpPage() {
    try {
        const r = await axios.get('/getallnotes');
        const result = JSON.parse(r.data);

        const mainList = new ClassList(result);
        const ht = new htmlAPI(mainList);
        const bAPI = new btnsAPIClass(mainList, ht);


        theLeftSideList.innerHTML = ht.listToHTML();  
        ht.itemsEvLis(document.querySelectorAll('.listbox'));
        ht.editEvLis();
        bAPI.setUpBtns();
        
        

    } catch (error) {
        console.log(error)
    }
}



setUpPage();
