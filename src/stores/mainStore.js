import { observable, computed, action } from 'mobx';
import axios from 'axios';
const API_URL = 'http://localhost:3200/';

class Tasks {
  @observable _tasks = [];

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

  @action getTasksFromDB = async () => {
    try {
      let tasks = await axios.get(`${API_URL}/api/tasks`);
      this._tasks = tasks.data;
    } catch (err) {
      console.log(err);
    }
  };

  @action createTask = async (task) => {
    try {
      let addTask = await axios.post(`${API_URL}/api/tasks`, task);
      this.getTasksFromDB();
      return addTask.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };

  // create a different route for each update ?
  // or can we use 1 func to update all?
  // e.g. : if no input in fielkd- use current value- and update only whats types in

  @action updateTask = async (taskName) => {
    try {
      let send = await axios.put(`${API_URL}/api/updateTask/`, {
        taskName,
        description,
        priority,
        deadLine,
        status,
        budget,
      });
      return send.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };

  // here i dedicated a route since its a "major" update- but we can include it with the general update route as well

  @action completeTask = async (task) => {
    try {
      let completedTask = await axios.put(`${API_URL}/api/update/completed`, {
        task,
      });
      return task.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };
}

export const tasks = new Tasks();
