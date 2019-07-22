import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Router, Route, IndexRoute} from 'react-router';


ReactDOM.render((
  <Router>
    <Route path="/" component={MainLayout}>

//It's component will be implement in the nearest future

      // <IndexRoute component={Home} />
      // <Route component={SearchLayout}>
      //   <Route path="users" component={UserList} />
      //   <Route path="widgets" component={WidgetList} />
      // </Route>

      
    </Route>
  </Router>
), document.getElementById('root'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
