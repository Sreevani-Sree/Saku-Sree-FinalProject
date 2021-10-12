
class TaskManager {
    constructor(currentId = 0) {
      this.tasks = [];
      this.currentId = currentId;
    }
  //  get tasks(){
  //  return this.tasks;
  //   }
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
  
    // editTask(targetId, title, desc, assign, status, dueDate) {
    //   this.tasks.forEach((task) => {
    //     if (targetId === task.currentId) {
    //       task.title = title;
    //       task.desc = desc;
    //       task.assign = assign;
    //       task.dueDate = dueDate;
    //       task.status = status;
    //     }
    //   });
  
  

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
              <div class="card ${status === "Done" ? "border-success text-dark" : d1 < dueDate ? "border-danger" :status === "In-Progress" ? "border-warning text-dark" :status === "Review" ? "border-info text-dark" : "border-danger text-dark" }" style="width: 18rem;">
               <div class="card-body">
               <h5 class="card-title">Task Name: ${title}</h5>
               <p class="description text-start">Description: ${description}</p>
               <p class="card-text">Assigned to: ${assignedTo}</p>
              <p class="card-text">Status:${status}</p>
               <p class="card-text">Due Date: ${dueDate}</p>
               <div class="card-body text-center">
          <img src="./images/Donetick.jpeg" alt="done" width="30" height="26" id="done-btn" data-toggle="tooltip" title="Done"
          class="done-button ${status === "Done" ? "invisible" : "visible"}" >
          
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
    for(let i=0; i<task.length;i++)
    {
      const newTask = task[i];
      console.log(newTask.status);
        if(newTask.status === "ToDo") {
          todoTasks.push(newTask);
          } else if(newTask.status === "In-Progress") {
             progressTasks.push(newTask);
               }else if(newTask.status === "Review") {
                reviewTasks.push(newTask);
               } else {
                  doneTasks.push(newTask);
                }

   }
     const newSortedTasks = doneTasks.concat(todoTasks,progressTasks,reviewTasks);
     
    // console.log(todoTasks);
     console.log(newSortedTasks);
    return newSortedTasks;
    // return todoTasks;
  }