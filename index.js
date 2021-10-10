
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
           <button type="button" class="btn btn-outline-info">
               <i class="fas fa-check-circle"></i>
           </button>
           <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteTask(this)" >
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
