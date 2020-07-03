import { observable, computed, action } from 'mobx';
import axios from 'axios';
const API_URL = 'http://localhost:3200';
const dateFormat = require('dateformat');


export class Tasks {
  @observable _tasks = [];
  @observable userId 
  @observable loggedIn = false
  @observable categories = []

  @computed get getTasksByCategory(){
    const groupedTasks = {}

    this._tasks.forEach( t => groupedTasks[t.category] ? groupedTasks[t.category].push(t) :  groupedTasks[t.category] = [t])
    this.categories.forEach( c => groupedTasks[c] = [])
    // if(!groupedTasks['Personal']){
    //   response.push('Personal')
    // }

    return groupedTasks
  }

  // @computed get getTasksByCategory(){
  //   const groupedTasks = {}
  //   for(let cat of this.categories){
  //     groupedTasks[cat] = []
  //   }
  //   for (let task of this._tasks) {
  //     groupedTasks[task.category].push(task)
  //   }
  //   return groupedTasks
  // }

  // @action setCategories(){
  //   const groupedTasks = {}
  //   if(this._tasks.length){
  //     for (let task of this._tasks) {
  //       if (groupedTasks[task.category]) {
  //           groupedTasks[task.category].push(task)
  //       } else {
  //           groupedTasks[task.category] = [task]
  //       }
  //     }
  //   }
  //   const response = Object.keys(groupedTasks)
  //   if(!groupedTasks['Personal']){
  //     response.push('Personal')
  //   }
  //   // groupedTasks['Personal'] ? null : groupedTasks
  //   // this.categories = [...this.categories, ...Object.keys(groupedTasks)] 
  //   this.categories = response
  // }

  @action addCategory(categoryInput){
    this.categories.push(categoryInput)
  }

  // summary of open vs closed
  @computed get openTasks() {
    let openCounter = 0;
    let completedCounter = 0;

    this._tasks.forEach((t) =>
      !t.completed ? openCounter++ : completedCounter++
    );
    return {
      openTasks: this.openCounter,
      completedTasks: this.completedCounter,
    };
  }

  @action setUserId(userID){
    this.userId = userID
    this.loggedIn = true
  }

  @action getTasksFromDB = async (id) => {
    try {
      let tasks = await axios.get(`${API_URL}/tasks/${id}`); // ! check if ? or :
      this._tasks = tasks.data;
      // this.setCategories()
      // console.log(tasks)
    } catch (err) {
      console.log(err);
    }
  };


  @action deleteTask = async (taskId) => {
      await axios.delete(`${API_URL}/deleteTask/${taskId}`);
      this.getTasksFromDB(this.userId);
  }
  

  @action addTask = async (task) => {
    const d = new Date(task.deadLine)
    const date = dateFormat(d,'isoDate')
    try {
      let newTask = {taskName: task.taskName, description:'description',status:'starting' ,priority:task.priority, 
      deadLine: date, budget: task.budget, category: task.category}
      // taskName: '',
      // priority: '',
      // category: '',
      // deadLine: null,
      // budget: 0
//  we need to find a way to retrive userId to put into this post req  ==============> here ==============>
////////////////////////////////////////
       
      let savedTask = await axios.post(`${API_URL}/tasks/${this.userId}`, newTask);
      // console.log(savedTask)      
      // console.log(savedTaskID.data)


//       let taskObj = new Task(savedTaskID.data.taskId, task.taskName, 'description' ,task.priority, 
//       task.deadLine, task.budget, task.category)

      // console.log('add task: ' , addTask)
      // this._tasks.push(taskObj)
      this.getTasksFromDB(this.userId);
      // return addTask

    } catch (err) {
      throw new Error(err);
    }
  };

  // create a different route for each update ?
  // or can we use 1 func to update all?
  // e.g. : if no input in fielkd- use current value- and update only whats types in

  @action updateTask = async (newTask) => {
    try {
      let send = await axios.put(`${API_URL}/updateTask/`,newTask);
      this.getTasksFromDB(this.userId);
      return send.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };
}

  // here i dedicated a route since its a "major" update- but we can include it with the general update route as well

//   @action completeTask = async (task) => {
//     try {
//       let completedTask = await axios.put(`${API_URL}/update/completed`, {
//         task,
//       });
//       return task.data;
//     } catch (err) {
//       throw new Error(err.response.data.message);
//     }
//   };
// }

