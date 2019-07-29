import React from 'react';
import './App.css';
import Header from './Components/Header'
import Main from './Components/Main'
import Footer from './Components/Footer'


function MainLayout() {
  return (
    <div>
        <h1>Hello YouYoda</h1>
        <Header/>
        <Main/>
        <Footer/>
    </div>
  );
}


export default MainLayout;
