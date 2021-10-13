
const taskManager = new TaskManager(0);

  taskManager.load();
  taskManager.render();

 let  resetForm = document.querySelector("#reset-form");
  let validateName = document.getElementById('title');
  let validateDescription = document.querySelector("#description");
  let validateAssignedTo = document.querySelector("#assignedto");
  let validateStatus = document.querySelector("#status");
  let validateDueDate = document.querySelector("#dueDate");

let btnSub2 = document.querySelector("#submit"); 
let editBtn = document.querySelector("#edit-btn"); 
let ctask = document.querySelector("#ctask");


let errMsg1 = document.querySelector("#errMsg1");
let errMsg2 = document.querySelector("#errMsg2");
let errMsg3 = document.querySelector("#errMsg3");
let errMsg4 = document.querySelector("#errMsg4");
let errMsg5 = document.querySelector("#errMsg5");

//edit Modal variable
const edit_myName = document.querySelector('#edit_title');
const edit_description= document.querySelector('#edit_description');
const edit_assign = document.querySelector('#edit_assignedto');
const edit_status = document.querySelector('#edit_status');
const edit_date = document.querySelector('#edit_dueDate');
const update = document.querySelector('#edit_update');

let edit_errMsg1 = document.querySelector("#edit_errMsg1");
let edit_errMsg2 = document.querySelector("#edit_errMsg2");
let edit_errMsg3 = document.querySelector("#edit_errMsg3");
let edit_errMsg4 = document.querySelector("#edit_errMsg4");
let edit_errMsg5 = document.querySelector("#edit_errMsg5");


 
//  date format
  var today = new Date().toISOString().split('T')[0];
  validateDueDate.setAttribute('min', today);
 
 btnSub2.addEventListener("click", validateBox);
ctask.addEventListener("click",resetFormInput);
//function for reset the form

 function resetFormInput(){
   resetForm.reset();
   errMsg1.innerHTML = "";
   errMsg2.innerHTML = "";
   errMsg3.innerHTML = "";
   errMsg4.innerHTML = "";
   errMsg5.innerHTML = "";

 }
// function for validating all the form fields
function editvalidateBox(event){
   alert("its running");
 let valFail = 0;
 
  // Prevent default action
  // event.preventDefault();


  // validation for NameInput
  
  if (edit_myName.value === "" || edit_myName.value.trim().length < 4) {
    console.log(validateName.value.length);
    edit_errMsg1.innerHTML = "Please enter min 5 characters";
    edit_errMsg1.style.color = "#ff0000";
    valFail += 1;
    console.log("valFail");
    edit_myName.focus();
  } else {
    edit_errMsg1.innerHTML = "";
    edit_myName.focus();

  }
  // validation for description
  
  if (edit_description.value === "" || edit_description.value.trim().length < 5) {
    console.log(edit_description.value.length);
    edit_errMsg2.innerHTML = "Please enter min 5 characters";
    edit_errMsg2.style.color = "#ff0000";
    valFail += 1;
    edit_description.focus();
    } else {
    edit_errMsg2.innerHTML = "";
    edit_description.focus();
  }
// validate assignedto
if (edit_assign.value === "" || edit_assign.value.trim().length < 4) {
  console.log(edit_assign.value.length);
  edit_errMsg3.innerHTML = "Please enter min 4 characters";
  edit_errMsg3.style.color = "#ff0000";
  valFail += 1;
  edit_assign.focus();
  } else {
  edit_errMsg3.innerHTML = "";
  edit_assign.focus();
}

// Validate Status
if(edit_status.value === "Select"){
console.log(validateStatus.value);
  edit_errMsg4.innerHTML ="Choose the status";
  edit_errMsg4.style.color = "#ff0000";
  valFail += 1;
  edit_status.focus();
  } else {
  edit_errMsg4.innerHTML = "";
  edit_status.focus();
}

  // validate date
  if(!edit_date.value){
    console.log(validateDueDate.value);
      edit_errMsg5.innerHTML ="Choose the date";
      edit_errMsg5.style.color = "#ff0000";
      valFail += 1;
      edit_date.focus();
      } else {
      edit_errMsg5.innerHTML = "";
      edit_date.focus();
    }

    if (valFail >0) {
      valFail=0;
      return;
    } else {
    taskManager.updateTask(edit_myName.value,edit_description.value,edit_assign.value,edit_status.value,edit_date.value,edit_taskId.value);
    console.log(taskManager.tasks)
    taskManager.save();
    taskManager.render();
    $("#edit_Modal").modal("hide");
  }
  return;
}
// function for validate input fields
function validateBox(event){
   
  let valFail = 0;
  
   // Prevent default action
   event.preventDefault();
 
 
   // validation for NameInput
   
   if (validateName.value === "" || validateName.value.trim().length < 4) {
     console.log(validateName.value.length);
     errMsg1.innerHTML = "Please enter min 5 characters";
     errMsg1.style.color = "#ff0000";
     valFail += 1;
     console.log("valFail");
     validateName.focus();
   } else {
     errMsg1.innerHTML = "";
     validateName.focus();
 
   }
   // validation for description
   
   if (validateDescription.value === "" || validateDescription.value.trim().length < 5) {
     console.log(validateDescription.value.length);
     errMsg2.innerHTML = "Please enter min 5 characters";
     errMsg2.style.color = "#ff0000";
     valFail += 1;
     validateDescription.focus();
     } else {
     errMsg2.innerHTML = "";
     validateDescription.focus();
   }
 // validate assignedto
 if (validateAssignedTo.value === "" || validateAssignedTo.value.trim().length < 4) {
   console.log(validateAssignedTo.value.length);
   errMsg3.innerHTML = "Please enter min 4 characters";
   errMsg3.style.color = "#ff0000";
   valFail += 1;
   validateAssignedTo.focus();
   } else {
   errMsg3.innerHTML = "";
   validateAssignedTo.focus();
 }
 
 // Validate Status
 if(validateStatus.value === "Select"){
 console.log(validateStatus.value);
   errMsg4.innerHTML ="Choose the status";
   errMsg4.style.color = "#ff0000";
   valFail += 1;
   validateStatus.focus();
   } else {
   errMsg4.innerHTML = "";
   validateStatus.focus();
 }
 
   // validate date
   if(!validateDueDate.value){
     console.log(validateDueDate.value);
       errMsg5.innerHTML ="Choose the date";
       errMsg5.style.color = "#ff0000";
       valFail += 1;
       validateDueDate.focus();
       } else {
       errMsg5.innerHTML = "";
       validateDueDate.focus();
     }
 
     if (valFail >0) {
       valFail=0;
       return;
     } else {
     taskManager.addTask(validateName.value,validateDescription.value,validateAssignedTo.value,validateStatus.value,validateDueDate.value);
     console.log(taskManager.tasks);
     taskManager.save();
     taskManager.render();
   }
   return;
 }
 
// Create a taskHtml variable with the result of calling the createTaskHtml function, making sure to pass a value for each parameter.
// console.log() the taskHTML variable


  const taskList = document.querySelector("#task-list");
  // Add an 'onclick' event listener to the Tasks List
taskList.addEventListener("click", (event) => {
// Check if a "Mark As Done" button was clicked
if (event.target.classList.contains("done-button")){
  // Get the correct parent Task
  console.log(event.target.parentElement) ;
  const parentTask =
    event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
    console.log("parent task" + parentTask);
  // Get the taskId of the parent Task and turn it into a number.
  const taskId = Number(parentTask.dataset.taskId);
  console.log("taskId" + taskId);
  // Get the task from the TaskManager using the taskId
  const task = taskManager.getTaskById(taskId);

  // // Update the task status to 'DONE'
  task.status = "Done";
  taskManager.save();
   // Render the tasks
  taskManager.render();

  }
  // Delete button
   if(event.target.classList.contains('delete-button')) {
    const parentTask = 
    event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
    const taskId = Number(parentTask.dataset.taskId);
    taskManager.deleteTask(taskId);
    taskManager.save();
    taskManager.render();
    }
    // Edit button
        if(event.target.classList.contains("edit-button")){
          const parentTask =
          event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
           
          const taskId= Number(parentTask.dataset.taskId);
          let task = taskManager.getTaskById(taskId);
          // const taskId = Number(parentTask.dataset.taskId);
          // taskManager.editTask(taskId);
          $('#edit_Modal').modal('show');
       
          const edit_myName = document.querySelector("#edit_title");
          const edit_taskId = document.querySelector("#edit_taskId"); 
          const edit_description = document.querySelector("#edit_description");
          const edit_assignedto = document.querySelector("#edit_assignedto");
          const edit_status = document.querySelector("#edit_status");
          const edit_dueDate = document.querySelector("#edit_dueDate");
          // for(let i=0; i< this.tasks.length; i++){
              // const task = this.tasks[i];
                    // if(task.id == taskId){
                  edit_taskId.value = taskId;
                  edit_myName.value = task.name;
                  edit_description.value =task.description
                  edit_assignedto.value = task.assignedTo;
                  edit_status.value = task.status;
                  edit_dueDate.value = task.dueDate;
                  // }
              //  }
      //  
           
       //Update button
       update.addEventListener('click',editvalidateBox);
          //  update.addEventListener('click', editvalidateBox());
                  taskManager.save();
                  taskManager.render();
    
      }
    });
