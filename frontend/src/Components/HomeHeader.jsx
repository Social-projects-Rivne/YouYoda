import React from 'react';

import {Container, Button} from 'reactstrap';
import Header from './Header';
import {quotes} from './JSON/quotes.json';
import { isAuthenticated } from '../utils';



export default class HomeHeader extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            dropdownOpen: false,
            authVisible: "",
        };
    }
    verifyAuth = () => {
        if(localStorage.getItem('token')){
            if(!this.state.authVisible){
                this.setState({authVisible: "auth-display-none"})
                return this.state.authVisible;
            } else {
                return this.state.authVisible;
            }
        } else {
            this.setState({authVisible: ""})
            return this.state.authVisible;
        }
    }
    render(){
        const RAND = Math.floor(Math.random() * quotes.length);
        return(
            <>
            <section className="header-img ">
            <div className="bg-yoda">
            <Header/>
                <Container>
                <div className="col d-flex justify-content-end language">
					<ul>
						<li><a href="#">UA </a>|</li>
						<li><a href="#" className="language-active"> EN</a></li>
					</ul>
				</div>
                <blockquote className="col middle_bar">
                    <p className="mb-0 ">
                        {quotes[RAND]}
                    </p>
            	    <cite title="Source Title">-master Yoda</cite>
            	</blockquote>
                <div className={`btn-group-sign ${isAuthenticated()}`}>
                    <Button color="warning" className="btn-sign"
                            style={{marginRight:'33px'}}
                            onClick={this.props.handleClickReg}>
                        Sign Up
                    </Button>
                    <Button color="secondary" className="btn-sign" onClick={this.props.handleClickLogin}>
                        Log In
                    </Button>
                </div>
                </Container>
            </div>
            </section>

            </>
        )
    }
};
