import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react'
import { Tasks } from '../src/stores/TasksStore'
import { User } from '../src/stores/User'
import { UsernamesStore } from './stores/UsernamesStore'

const tasksStore = new Tasks()
const user = new User()
const usernamesStore = new UsernamesStore()

const stores = { tasksStore, user, usernamesStore }

ReactDOM.render(<Provider {...stores}> <App /> </Provider>, document.getElementById('root'));


serviceWorker.unregister();
