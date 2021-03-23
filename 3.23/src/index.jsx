import React from 'react';
import {render} from 'react-dom';
import{HashRouter } from 'react-router-dom';

import store from '../src/store';
import {Provider} from 'react-redux'


import App from './App'

render(

    <Provider store ={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.querySelector('#app')
)