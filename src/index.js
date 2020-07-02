import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react'
import { Tasks} from '../src/stores/TasksStore'
import { User} from '../src/stores/User'

const tasksStore = new Tasks()
const user = new User()

const stores = {tasksStore, user}

ReactDOM.render(<Provider {... stores}> <App /> </Provider>, document.getElementById('root'));


serviceWorker.unregister();
