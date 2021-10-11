
let globalTaskData =[];
taskContents = document.getElementById("taskContents");


const addcard = () => {
    const newTaskDetails = {
        id: `${Date.now()}`,
        notetitle: document.getElementById("title").value,
        sdtitle: document.getElementById("subtitle").value,
        notes: document.getElementById("memorynote").value
    };
    taskContents.insertAdjacentHTML('beforeend',generateTaskCard(newTaskDetails));

    globalTaskData.push(newTaskDetails);
    saveTolocalStorage();
}

const generateTaskCard = ({id, notetitle, sdtitle, notes}) =>
    `<div class="col-md-4 col-lg-3 mt-3" id=${id} key=${id}>
    <div class="card">
        <div class="d-flex justify-content-end m-1 mb-0">
           <button type="button" class="btn btn-outline-info" name=${id} onclick="editTask(this)" onclose="saveEditTask(this)">
               <i class="fas fa-check-circle"></i>
           </button>
           <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteTask(this)">
            <i class="fas fa-trash"></i>
           </button>
        </div>
        <div class="card-body">
        <h5 class="card-title d-flex justify-content-center">${notetitle}</h5>
        <h6 class="card-subtitle mb-2 text-muted d-flex justify-content-center ">${sdtitle}</h6>
        <p class="card-text">${notes}</p>
        </div>
    </div>
    </div>`

    const saveTolocalStorage = () => {
        localStorage.setItem("balu",JSON.stringify({noteslist: globalTaskData}));
    }

    const reloadTaskCard = () => {
        const localStorageCopy = JSON.parse(localStorage.getItem("balu"));
        if(localStorageCopy) {
            globalTaskData = localStorageCopy["noteslist"];
        }
        globalTaskData.map((cardData) => {
            taskContents.insertAdjacentHTML('beforeend',generateTaskCard(cardData));
        })
    }

    const deleteTask = (e) => {
        const targetID = e.getAttribute("name");
        globalTaskData = globalTaskData.filter((cardData) => cardData.id!==targetID);
        saveTolocalStorage();
        window.location.reload();
    }

    const editTask = (e) => {
        const targetID = e.getAttribute("name");
        let cardTitle;
        let cardSubTitle;
        let description;

        e.childNodes[1].classList.remove("fa-check-circle");
        e.childNodes[1].classList.add("fa-pencil-alt");

        cardTitle = e.parentNode.parentNode.childNodes[3].childNodes[1];
        cardSubTitle = e.parentNode.parentNode.childNodes[3].childNodes[3];
        description = e.parentNode.parentNode.childNodes[3].childNodes[5];
        
        cardTitle.setAttribute("contenteditable","true");
        cardSubTitle.setAttribute("contenteditable","true");
        description.setAttribute("contenteditable","true");

        e.setAttribute("onclick","saveEditTask(this)");
    }

    const saveEditTask = (e) => {
        const targetID = e.getAttribute("name");

        const cardTitle = e.parentNode.parentNode.childNodes[3].childNodes[1];
        const cardSubTitle = e.parentNode.parentNode.childNodes[3].childNodes[3];
        const description = e.parentNode.parentNode.childNodes[3].childNodes[5];
        
        const update = {
            notetitle: cardTitle.innerHTML,
            sdtitle: cardSubTitle.innerHTML,
            notes: description.innerHTML
        };

        const updatedata = globalTaskData.map((cardData) => {
            if (cardData.id === targetID) {
                return{...cardData,...update};
            }
            return cardData;
        });

        globalTaskData = updatedata;

        saveTolocalStorage();

        cardTitle.setAttribute("contenteditable","false");
        cardSubTitle.setAttribute("contenteditable","false");
        description.setAttribute("contenteditable","false");

        e.childNodes[1].classList.remove("fa-pencil-alt");
        e.childNodes[1].classList.add("fa-check-circle");
        e.setAttribute("onclick","editTask(this)");
    }

    

    
