import { observable, computed, action } from 'mobx';
import axios from 'axios';
const API_URL = 'http://localhost:3200';
const dateFormat = require('dateformat');


export class Tasks {
  @observable _tasks = [];
  @observable alltasks = [];
  @observable userId = localStorage.getItem("userId")
  // @observable loggedIn = false
  @observable categories = []

  @computed get getTasksByCategory() {
    const groupedTasks = {}
    this._tasks.forEach(t => groupedTasks[t.category] ? groupedTasks[t.category].push(t) : groupedTasks[t.category] = [t])
    console.log(groupedTasks)
    const newTasks = this._tasks.filter(t => t.category === this.categories[this.categories.length - 1])
    this.categories.forEach(c => {
      let newTasks = this._tasks.filter(t => t.category === c)
      groupedTasks[c] = newTasks
    } )

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
      let tasks = await axios.get(`${API_URL}/tasks/${id}`); 
      console.log(id, tasks);
      this._tasks = tasks.data;
    } catch (err) {
      console.log(err);
    }
  };

  @action getAllTasksFromDB = async () => {
    try {
      let tasks = await axios.get(`${API_URL}/alltasks`); 
      this.alltasks = tasks.data;
    } catch (err) {
      console.log(err);
    }
  };


  @action deleteTask = async (taskId) => {
    await axios.delete(`${API_URL}/deleteTask/${taskId}`);
    await this.getTasksFromDB(this.userId);
  }

  @action addTask = async (task) => {
    if (!task.deadLine) { return }
    const d = new Date(task.deadLine)
    const date = dateFormat(d, 'isoDate')
    
    let newTask = {
      taskName: task.taskName,
      description: task.description,
      status: task.status,
      priority: task.priority,
      deadLine: date,
      budget: task.budget,
      category: task.category
    }

    try {
      let savedTask = await axios.post(`${API_URL}/tasks/${this.userId}`, newTask);
      console.log(savedTask)
      await this.getTasksFromDB(this.userId);

    } catch (err) {
      throw new Error(err);
      // console.log(err)
    }
  };

  @action checkNotify = async (newTask) => {
    const taskId = newTask.taskId
    const trackingData = await axios.get(`${API_URL}/tracking`);
    const tracking = trackingData.data

    for(let tracked of tracking) {
      let checkStatus = false
      if((newTask.status=="In progress" || newTask.status=="Inprogress"  ||   newTask.status==2) && tracked.status=="In progress") checkStatus=true
      if(( newTask.status=="Completed"  ||   newTask.status==3) && tracked.status=="Completed") checkStatus=true
      if(( newTask.status=="Starting"  ||   newTask.status==1) && tracked.status=="Starting") checkStatus=true
      if(tracked.taskId==taskId && checkStatus) {
        console.log(tracked)
        const email = tracked.email
        await axios({ method: "POST", 
        url:"http://localhost:3200/sendNot", 
        data: {
                taskName : newTask.taskName,
                email: email,
                status: tracked.status
                }
        }).then((response)=>{
                 if (response.data.msg === 'success'){
                     alert("Email sent, awesome!"); 
                     this.resetForm()
                 }else if(response.data.msg === 'fail'){
                     alert("Oops, something went wrong. Try again")
                 }
             })
             return 

      }
    }
  }

  @action updateTask = async (newTask) => {
    try {
      // console.log(newTask)
      this.checkNotify(newTask)
      let send = await axios.put(`${API_URL}/updateTask/`, newTask);
      await this.getTasksFromDB(this.userId);
      return send.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };
}
