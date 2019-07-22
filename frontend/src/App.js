import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header'
import Main from './Components/Main'
import Footer from './Components/Footer'


function MainLayout() {
  return (
    <div>
        <Header/>
        <Main/>
        <Footer/>
    </div>
  );
}


export default MainLayout;
