import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './Routes';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import '@lls/react-light-calendar/dist/index.css';
import './api/notification';
import './style/home.css';
import './style/media.css';
import './style/profile.css';
import './style/forms.css';
import './style/fillEditPage.css';
import './style/events.css';
import './style/filter.scss';
import './style/course-detail.scss'
import './index.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSearch, faCoffee, fas, faCamera, faPaperPlane, faEnvelope, faKey, faUserTie} from '@fortawesome/free-solid-svg-icons';
library.add(fab, faSearch, faCoffee, fas, faCamera, faPaperPlane, faEnvelope, faKey, faUserTie);


ReactDOM.render(<Routes/>, document.getElementById('root'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
