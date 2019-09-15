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

    render(){
        const RAND = Math.floor(Math.random() * quotes.length);
        return(
            <>
            <section className="header-img ">
            <div className="bg-yoda">
            <Header handleClickLogin={this.props.handleClickLogin}/>
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
                <div className={`btn-group-sign ${isAuthenticated("hide")}`}>
                    <Button color="warning" className="btn-sign btn-color-w"
                            style={{marginRight:'33px'}}
                            onClick={this.props.handleClickReg}>
                        Sign Up
                    </Button>
                    <Button color="secondary" 
                        className="btn-sign btn-color-w" 
                        onClick={this.props.handleClickLogin}>
                        Sign In
                    </Button>
                </div>
                </Container>
            </div>
            </section>

            </>
        )
    }
};
