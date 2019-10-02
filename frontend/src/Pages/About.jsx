import React from 'react';

import {Container, Row, Col} from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../style/about.css';
import MainLayout from './MainLayout';


export default class About extends React.Component{
    render (){
        return(
            <>
                
            <div className="about-us">
                <h1 className="head-text">ABOUT US</h1>
                <div >
                <Form className="info">
                    <Label className="info-text">
                    Youyoda: episode I A long time ago in a galaxy far, far away... Team of python/web-ui developers decided to make an incredible web-application for self developing, studying and attending events Our Mission Founded in 2019, YouYoda’s mission is to give people the power to build community and bring the world closer together. People use our products to stay connected with friends and family, to discover what’s going on in the world, and to share and express what matters to them.
                    </Label>
                </Form>
                </div>
            </div>
            <MainLayout/>
            </>
        )
    }
};