
class TaskManager {
    constructor(currentId = 0) {
      this.tasks = [];
      this.currentId = currentId;
    }
  //  get tasks(){
  //  return this._tasks;
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
      alert("The Task is added");
      
      
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
      // Loop over our tasks and create the html, storing it in the array
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];
      // Format the date
      const date = new Date(task.dueDate);
      const formattedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
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
    
    // Create the tasksHtml by joining each item in the tasksHtmlList
    // with a new line in between each item.
    const tasksHtml = taskHtmlList.join("\n");

    // Set the inner html of the tasksList on the page
    const tasksList = document.querySelector("#task-list");
    tasksList.innerHTML = tasksHtml;
    
  }
  }
  }
  
// create html function
  function createTaskHtml(id,title,description,assignedTo,status,dueDate) {
    // copying Hardcoded card from Index.html
      const html = `<div class="col-auto" data-task-id="${id}">
               <div class="p-2 bd-highlight">
               <div class="card" style="width: 20rem;">
               <div class="card-body">
               <h5 class="card-title">Task Name: ${title}</h5>
               <p class="description text-start">Description: ${description}</p>
               <p class="card-text">Assigned to: ${assignedTo}</p>
               <p class="card-text">Status: ${status}</p>
               <p class="card-text">Due Date: ${dueDate}</p>
          <div class="card-body">
          <img src="./images/Donetick.jpeg" alt="done" width="30" height="26" id="done-btn" class="done-button">
          
          <img src="./images/deleteredicon.jpeg" alt="delete" width="28" height="24">
          </div>
       </div>
    </div>
    </div> 
    </div>`
  return html;
  }

  // btn btn-outline-success 