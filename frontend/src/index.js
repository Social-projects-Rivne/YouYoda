import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './Routes';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import './style/home.css';
import './style/media.css';
import './style/profile.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSearch, faCoffee } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faSearch, faCoffee);


ReactDOM.render(<Routes/>, document.getElementById('root'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
