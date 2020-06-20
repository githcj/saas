import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css'
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import App from './views/App';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import {
    // HashRouter as Router
    BrowserRouter as Router
} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store'

moment.locale('zh-cn');

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
