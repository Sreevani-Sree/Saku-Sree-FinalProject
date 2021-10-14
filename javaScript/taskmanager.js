
class TaskManager {
    constructor(currentId = 0) {
      this.tasks = [];
      this.currentId = currentId;
    }
  //   // Create the addTask method
    addTask(title,description,assignedTo,status,dueDate) {
      // Create a task object that we will push to the list of tasks
      
      const task = {
        // Increment the current Id for each new task
        id: this.currentId++,
        name: title,
        description: description,
        assignedTo: assignedTo,
        status: status,
        dueDate: dueDate,
      };
  
      this.tasks.push(task);
      document.getElementById("reset-form").reset();
       console.log(this.tasks);
            
    }
    
    //function to Update task
    updateTask(edit_myName, edit_description, edit_assign, edit_status, edit_date, edit_taskId){
     for(let i=0; i<this.tasks.length; i++){
          if(this.tasks[i].id == edit_taskId ) {
              this.tasks[i].name = edit_myName,
              this.tasks[i].description = edit_description,
              this.tasks[i].assignedTo = edit_assign,
              this.tasks[i].status = edit_status,
              this.tasks[i].dueDate = edit_date 
     
      }

}
}
// get tasks(){
//   return this.tasks;
// }

// set tasks(tasks){
//   return this.tasks;
// }



    // get task method
    getTaskById(taskId) {
      // Create a variable to store the found task
      let foundTask;
      // Loop over the tasks and find the task with the id passed as a parameter
      for (let i = 0; i < this.tasks.length; i++) {
        // Get the current task in the loop
        const task = this.tasks[i];
        // Check if its the right task by comparing the task's id to the id passed as a parameter
        if (task.id === taskId) {
          // Store the task in the foundTask variable
          foundTask = task;
        }
      }
      // Return the found task
      return foundTask;
    }


    render() {
      let taskHtmlList = [];
      let sortTasks = filterTasks(this.tasks);
      console.log(sortTasks);
      // Loop over our tasks and create the html, storing it in the array
    for (let i = 0; i < sortTasks.length; i++) {
      // Get the current task in the loop
      const task = sortTasks[i];
      // Format the date
      const date = new Date(task.dueDate);
      const formattedDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
      // Create the task html
      const taskHtml = createTaskHtml(
        task.id,
        task.name,
        task.description,
        task.assignedTo,
        task.status,
        formattedDate,
        
      );
      
      // Push it to the tasksHtmlList array
      taskHtmlList.push(taskHtml);
    }
    // Create the tasksHtml by joining each item in the tasksHtmlList
    // with a new line in between each item.
    const tasksHtml = taskHtmlList.join("\n");
  
    // Set the inner html of the tasksList on the page
    const tasksList = document.querySelector("#task-list");
    tasksList.innerHTML = tasksHtml;
    
  }
  // Task 9 saving to local drive
  save() {
    // Create a JSON string of the tasks
    const tasksJson = JSON.stringify(this.tasks);

    // Store the JSON string in localStorage
    localStorage.setItem("tasks", tasksJson);

    // Convert the currentId to a string;
    const currentId = String(this.currentId);

    // Store the currentId in localStorage
    localStorage.setItem("currentId", currentId);
  }

  load() {
    if(localStorage.getItem('tasks')) {
      const tasksJson = localStorage.getItem('tasks');
      this.tasks = JSON.parse(tasksJson);
    }
    if(localStorage.getItem('currentId')) {
      const currentId = localStorage.getItem('currentId');
      this.currentId = Number(currentId);
    }
  }
  

    //delete the task
    deleteTask(taskId) {
      const newTasks = [];
      for(let i = 0; i < this.tasks.length; i++) {
        const task = this.tasks[i];
        if(task.id !== taskId) {
          newTasks.push(task);
        }
      }
      this.tasks = newTasks;
    }
    // edit the task
    // editTask(taskId) {
    //   console.log(`edit task ID`+taskId);
    //   // let mymodal = document.querySelector("#edit_Modal");
      // mymodal.modal('show');
      //  $('#edit_Modal').modal('show');
       
      // const edit_myName = document.querySelector("#edit_title");
      // const edit_taskId = document.querySelecor("#edit_taskId"); 
      // const edit_description = document.querySelector("#edit_description");
      // const edit_assignedto = document.querySelecor("#edit_assignedto");
      // const edit_status = document.querySelector("#edit_status");
      // const edit_dueDate = document.querySelector("#edit_dueDate");
      // for(let i=0; i< this.tasks.length; i++){
      //     const task = this.tasks[i];
      //           if(task.id == taskId){
      //         edit_taskId.value = taskId;
      //         edit_myName.value = task.name;
      //         edit_description.value =task.description
      //         edit_assignedto.value = task.assignedTo;
      //         edit_status.value = task.status;
      //         edit_dueDate.value = task.dueDate;
      //         }
      //      }
        //  }
}
// create html function
  function createTaskHtml(id,title,description,assignedTo,status,dueDate) {
    // copying Hardcoded card from Index.html
    
    // ${status === "Done" ? "bg-success text-dark" : d1 < dueDate ? "bg-danger" :status === "In-Progress" ? "bg-warning text-dark" :status === "Review" ? "bg-info text-dark" : "bg-danger text-white" }
     let todayDate = new Date();
     let formatDate = todayDate.getDate() +  "-" +(todayDate.getMonth()+1 )+ "-" + todayDate.getFullYear();
     let d1 = dueDate;
    // console.log("date"+ d1<formatDate);
          const html = `<div class="col-auto" data-task-id="${id}">
               <div class="p-2 bd-highlight">
              <div class="card ${status === "Done" ? "border-success text-success" : status === "In-Progress" ? "border-warning text-warning" :status === "Review" ? "border-info text-info" : "border-danger text-danger" }" style="width: 18rem;">
             <div class="card-body">
               <h5 class="card-title">Task Name: ${title}</h5>
               <p class="description text-start">Description: ${description}</p>
               <p class="card-text">Assigned to: ${assignedTo}</p>
               <p class="card-text">Status:${status}</p>
               <p class="card-text">Due Date: ${dueDate}</p>
               <div class="card-body text-center">
          <img src="./images/Donetick.jpeg" alt="done" width="30" height="26" id="done-btn" data-toggle="tooltip" title="Done"
          class="done-button ${status === "Done" ? "invisible" : "visible"}" >
          <img src="./images/Edit.jpeg" alt="edit" width="28" height="24" id="edit-btn" class="edit-button">
          <img src="./images/deleteredicon.jpeg" alt="delete" width="28" height="26" id="delete-btn" data-toggle="tooltip" title="Delete" class="delete-button">
         </div>
       </div>
    </div>
    </div> 
    </div>`
  return html;
  }
// <img src="./images/Edit.jpeg" alt="edit" width="28" height="24" id="edit-btn" class="edit-button">
  function filterTasks(task){
    // alert("tasks are sorted");
    // console.log(task);
    const todoTasks = [];
    const progressTasks = [];
    const reviewTasks = [];
    const doneTasks = [];
    for(let i=0; i<task.length; i++){
          const newTask = task[i];
          console.log(newTask.status);
          if(newTask.status === "To-Do") {
           todoTasks.push(newTask);
           } else if(newTask.status === "In-Progress") {
             progressTasks.push(newTask);
               }else if(newTask.status === "Review") {
                reviewTasks.push(newTask);
               } else {
                  doneTasks.push(newTask);
                }

   }
  //  console.log(doneTasks );
     const newSortedTasks = todoTasks.concat(progressTasks,reviewTasks,doneTasks);
     
     console.log(newSortedTasks);
    return newSortedTasks;
    }