import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'




//全局样式
import './stylesheets/main.scss'

//全局配置
import './modules/config'

//全局路由
// import Router from './router'
//store
// import store from './store'

import { Provider } from 'react-redux' 

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    // <Provider  >
        <App/>
    // </Provider>
, document.getElementById('root'));

registerServiceWorker();
