import { observable, computed, action } from 'mobx';
import axios from 'axios';
const API_URL = 'http://localhost:3200/';

class Tasks {
  @observable _tasks = [];
  @observable searchInput = '';

    
  @action getTasksFromDB = async () => {
    try {
      let tasks = await axios.get(`${API_URL}/api/tasks`);
        this._tasks = tasks.data;
        
    } catch (err) {
      console.log(err);
    }
  };

  @action postTask = async (task) => {
    try {
      let addTask = await axios.post(`${API_URL}/api/tasks`, task);
      this.getTasksFromDB();
        return addTask.data;
        
    } catch (err) {
      throw new Error(err.response.data.message);
    }
    };
    

  @action sendEmail = async (client, emailType) => {
    try {
      let send = await axios.put(`${API_URL}/api/updateTask/`, {
        taskName,
          description,
          priority,
          deadLine,
        status
      });
        return send.data;
        
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };
  @action declareSale = async (client) => {
    try {
      let sale = await axios.put(`${API_URL}/api/update/sold`, { client });
      return sale.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };
}

export const tasks = new Tasks();
