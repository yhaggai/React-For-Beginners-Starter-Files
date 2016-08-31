import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import NotFound from './components/not_found';
import StorePicker from './components/store_picker';
import App from './components/app';


/* 
  Routes
*/
// similar to express
// note we'll have the annoying hash this due browser compatibility with 'push state'
const routes = (
  <Router history={browserHistory} >
    <Route path="/" component={StorePicker} />
    <Route path="/store/:storeId" component={App} />
    <Route path="*" component={NotFound} />
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));
