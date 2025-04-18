// işlem yaparken JSON veri türü obje olarak kalacak.
    // hem obje hem string olabiliyor bu veri türü
    let gorevListesi = [];

    if(localStorage.getItem("gorevListesi") !==null)
    {
        gorevListesi = JSON.parse( localStorage.getItem("gorevListesi"));
    }

    let editId;
    const isEditTask = false;
    const taskInput = document.querySelector("#txtTaskName");
    const btnClear = document.querySelector("#btnClear");
    const filters = document.querySelectorAll(".filters span")

    displayTasks();

    function displayTasks(filter){
        let ul = document.getElementById("task-list");
        ul.innerHTML="";

        if(gorevListesi.length == 0)
    {
        ul.innerHTML = "<p class='p-3 m-0'> Görev listeniz boş </p>"
    }else{
        for(let gorev of gorevListesi)
{


        let completed = gorev.durum == "completed" ? "checked":"";

    if(filter == gorev.durum || filter == "all")
    {
        let li = `
        <li class="task list-group-item">
           <div class="form-check">
               <input type="checkbox" onclick="updateStatus(this)" id="${gorev.id}" class="form-check-input ${completed}">
               <label for="${gorev.id}" class="form-check-label ${completed}">${gorev.gorevAdi}</label>
           </div>
           <div class="dropdown">
        <a class="btn btn-link dropdown-toggle" href="#" role="button"     data-bs-toggle="dropdown" aria-expanded="false">
        <i class="fa-solid fa-ellipsis"></i>
        </a>

    <ul class="dropdown-menu">
        <li><a onclick='editTask(${gorev.id},"${gorev.gorevAdi}")' class="dropdown-item" href="#"><i class="fa-solid fa-pencil"></i> Edit</a></li>
        <li><a onclick="deleteTask(${gorev.id})" class="dropdown-item" href="#"><i class="fa-solid fa-trash"></i> Delete</a></li>
    </ul>
    </div>
</li>  
   
   `;
   ul.insertAdjacentHTML("beforeend",li);
    }
}

    }
     
    }
     document.querySelector("#btnAddNewTask").addEventListener("click",newTask);
     document.querySelector("#btnAddNewTask").addEventListener("keypress",function(){
        if(event.key == "Enter")
     {
        document.getElementById("btnAddNewTask").click;
     }
     });

     for(let span of filters)
     {
        span.addEventListener("click",function(){
            document.querySelector("span.active").classList.remove("active");
            span.classList.add("active");
            displayTasks(span.id);
        })
     }

    function newTask (event){
        
       

        if(taskInput.value == ""){
            alert("Görev girmelisiniz");
        }else{
            if(!isEditTask)
        {
            gorevListesi.push({"id": gorevListesi.length + 1, "gorevAdi": taskInput.value,"durum":"pending"});
            
        }else{
            for(let gorev of gorevListesi)
        {
            if(gorev.id == editId)
        {
            gorev.gorevAdi = taskInput.value;
            
        }
        isEditTask = false;
        }
        }
            
            taskInput.value="";
            displayTasks(document.querySelector("span.active").id);
            localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));

        }

        event.preventDefault()
    };
    let deletedIndex;

    function deleteTask(id) {
    let deletedIndex = gorevListesi.findIndex((gorev) => gorev.id == id);
    if (deletedIndex !== -1) {
    gorevListesi.splice(deletedIndex, 1);
    localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi)); //  Silinmiş listeyi kaydet
    displayTasks("all");
  }
}

    function editTask(taskId, taskName)
    {
        editId = taskId;
        isEditTask = true;
        taskInput.value = taskName;
        taskInput.focus();
        taskInput.classList.add("active");
    }
    btnClear.addEventListener("click", function(){
        gorevListesi.splice(0, gorevListesi.length);
        localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
        displayTasks("all");
    })

    function updateStatus(selectedTask)
    {
        let label = selectedTask.nextElementSibling;
        let durum;
       // selectedTask.parentElement.lastElementChild
       if(selectedTask.checked)
       {
        label.classList.add("checked");
        durum = "completed"
       }else{
        label.classList.remove("checked");
        durum = "pending";
       }


       for(let gorev of gorevListesi)
       {
        if(gorev.id == selectedTask.id)
       {
        gorev.durum = durum;
       }
       }
    }