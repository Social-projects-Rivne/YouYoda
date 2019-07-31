import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './style/home.css';
import './style/fillEditPage.css';
import FillEditPage from "./Components/FillEditPage";
import EditPageProfile from "./Pages/EditPageProfile";

// ReactDOM.render(<FillEditPage/>, document.getElementById('root'))
ReactDOM.render(<EditPageProfile/>, document.getElementById('root'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
