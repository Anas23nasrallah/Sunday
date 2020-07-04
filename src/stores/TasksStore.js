import { observable, computed, action } from 'mobx';
import axios from 'axios';
const API_URL = 'http://localhost:3200';
const dateFormat = require('dateformat');


export class Tasks {
  @observable _tasks = [];
  @observable userId = localStorage.getItem("userId")
  // @observable loggedIn = false
  @observable categories = []

  @computed get getTasksByCategory() {

    const groupedTasks = {}
    this._tasks.forEach(t => groupedTasks[t.category] ? groupedTasks[t.category].push(t) : groupedTasks[t.category] = [t])
    this.categories.forEach(c => groupedTasks[c] = [])
    return groupedTasks

  }

  @action addCategory(categoryInput) {
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

  @action getTasksFromDB = async (id) => {
    try {
      let tasks = await axios.get(`${API_URL}/tasks/${id}`); // ! check if ? or :
      this._tasks = tasks.data;
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
    const date = dateFormat(d, 'isoDate')
    
    try {
      let newTask = {
        taskName: task.taskName,
        description: task.description,
        status: task.status,
        priority: task.priority,
        deadLine: date,
        budget: task.budget,
        category: task.category
      }

      let savedTask = await axios.post(`${API_URL}/tasks/${this.userId}`, newTask);
      this.getTasksFromDB(this.userId);

    } catch (err) {
      throw new Error(err);
    }
  };

  @action updateTask = async (newTask) => {
    try {
      let send = await axios.put(`${API_URL}/updateTask/`, newTask);
      this.getTasksFromDB(this.userId);
      return send.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };
}
