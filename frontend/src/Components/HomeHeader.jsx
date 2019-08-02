import React from 'react';

import {Container, Button} from 'reactstrap';
import Header from './Header';
import {Link} from 'react-router-dom';
import {quotes} from './JSON/quotes.json';


export default class HomeHeader extends React.Component{
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
                <div className="btn-group-sign">
                    <Button color="warning" className="btn-sign"
                            style={{marginRight:'33px'}}
                            onClick={this.props.handleClickReg}>
                        Sign Up
                    </Button>
                    <Button color="secondary" className="btn-sign">
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
