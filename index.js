const addCard =() => {
    const newTaskDetails = {
        id:`${Date.now()}`,
        url:document.getElementById("imageURL").Value,
        name:document.getElementById("title").Value,
        call:document.getElementById("contact").Value,
        homeaddress:document.getElementById("homeAddress").Value,
        collegeaddress:document.getElementById("clgAddress").Value,
        branch:document.getElementById("edu").Value,
        projectlink:document.getElementById("projectURL").Value
    }

    taskContents = document.getElementById("taskContentsrc");
    taskContents.insertAdjacentHTML('beforeend', generateTaskCard(newTaskDetails));
}
const generateTaskCard = ({id, url, name, call, homeaddress, collegeaddress, branch, projectlink}) =>
    `<div class="card mb-4 mt-5"  id=${id} key=${id} >
            <div class="row g-0" >
                <div class="card-header">
                    <div class="d-flex justify-content-end">
                        <button type="button" class="btn btn-outline-info">
                            <i class="fas fa-pencil-alt" ></i>
                        </button>
                        <button type="button" class="btn btn-outline-danger">
                            <i class="fas fa-trash-alt" ></i>
                        </button>
                    </div>    
                </div>
      <div class="col-md-8">
        <img src=${url} class="img-fluid rounded-start" alt="image"/>
      </div>
      <div class="col-md-4">
        <div class="card-body">
            <h5 class="personname">${name}</h5>
            <h6 class="person-no">${call}</h6>
            <p class="personadrs">${homeaddress}</p>
            <p class="clgadrs">${collegeaddress}</p>
            <h6 class="badge bg-primary personb">${branch}</h6><br>
            <code class="projects" >${projectlink}</code>
        </div>
     </div>
     <div class="card-footer">
         <button class="btn btn-outline-primary float-end">Show Singlecard</button>
     </div>
    </div>
    </div>`