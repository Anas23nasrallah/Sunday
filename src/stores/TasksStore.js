import { observable, computed, action } from 'mobx';
import axios from 'axios';
import { Task } from './Task';
const API_URL = 'http://localhost:3200';


export class Tasks {
  @observable _tasks = [];
  @observable userId

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
  }

  @action getTasksFromDB = async (id) => {
    try {
      let tasks = await axios.get(`${API_URL}/tasks/${id}`); // ! check if ? or :
      this._tasks = tasks.data;
    } catch (err) {
      console.log(err);
    }
  };

  @action addTask = async (task) => {
    try {
      let newTask = new Task(task.taskName, 'description', task.priority, task.deadLine, task.budget)
        
//  we need to find a way to retrive userId to put into this post req  ==============> here ==============>
////////////////////////////////////////
      console.log('the id in store', this.userId)
      let addTask = await axios.post(`${API_URL}/tasks/${this.userId}`, newTask);
      // this.getTasksFromDB(this.userId);
      this._tasks.push(newTask)
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

