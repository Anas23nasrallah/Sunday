import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react'
import { Tasks } from '../src/stores/TasksStore'
import { User } from '../src/stores/User'
import { UsernamesStore } from './stores/UsernamesStore'
import { TeamsStore } from './stores/TeamsStore'


const tasksStore = new Tasks()
const user = new User()
const usernamesStore = new UsernamesStore()
const teamsStore = new TeamsStore() 

const stores = { tasksStore, user, usernamesStore, teamsStore }

ReactDOM.render(<Provider {...stores}> <App /> </Provider>, document.getElementById('root'));


serviceWorker.unregister();
