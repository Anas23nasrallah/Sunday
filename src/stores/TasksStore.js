import { observable, computed, action } from 'mobx';
import axios from 'axios';
import { Task } from './Task';
const API_URL = 'http://localhost:3200';


export class Tasks {
  @observable _tasks = [];
  @observable userId 
  @observable loggedIn = false

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
      // console.log(tasks)
    } catch (err) {
      console.log(err);
    }
  };

  @action addTask = async (task) => {
    try {
      let newTask = {taskName: task.taskName, description:'description',status:'starting' ,priority:task.priority, 
      deadLine: task.deadLine, budget: task.budget, category: task.category}
      // taskName: '',
      // priority: '',
      // category: '',
      // deadLine: null,
      // budget: 0
//  we need to find a way to retrive userId to put into this post req  ==============> here ==============>
////////////////////////////////////////
       
      let savedTaskID = await axios.post(`${API_URL}/tasks/${this.userId}`, newTask);
      // console.log(savedTaskID.data)

      let taskObj = new Task(savedTaskID.data.id, task.taskName, 'description' ,task.priority, 
      task.deadLine, task.budget, task.category)
      // console.log('add task: ' , addTask)
      // this.getTasksFromDB(this.userId);
      this._tasks.push(taskObj)
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

