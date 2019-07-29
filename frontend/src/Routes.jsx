import React from 'react';
import Home from './Pages/Home';
import {Route, BrowserRouter as Router} from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faCheckSquare, faCoffee);


function Routes() {
  return (
    <div>
    <Router>
        <Route path='/' component={Home}/>
    </Router>
    </div>
  );
}


export default Routes;
