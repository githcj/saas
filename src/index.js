import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css'
import { ConfigProvider, DatePicker, message } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import App from './views/App';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css'; 
import {
  BrowserRouter as Router
} from 'react-router-dom'
import {Provider} from 'react-redux'

moment.locale('zh-cn');

ReactDOM.render(
  <React.StrictMode>
            <Router>
                <App />
            </Router>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
