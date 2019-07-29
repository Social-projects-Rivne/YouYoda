import React from 'react';
import './App.css';
import Home from './Pages/Home';
import {Router, Route} from 'react-router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faCheckSquare, faCoffee);


function MainLayout() {
  return (
    <Router>
        <Route path='/' component={Home}/>
    </Router>
  );
}


export default MainLayout;
