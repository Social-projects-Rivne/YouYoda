import React from 'react';

import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
    Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { UserMenu } from './UserMenu';


export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
            <header className='header'>
            <Container>
            <Row>
            <Col>
            <Navbar dark expand="md">
                <NavbarBrand href="/">
                    <img src={require('../img/static/logo_grey.svg')}
                            className="logo" alt="YouYoda"/>
                </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Link to="/about" className="nav-link" activeClass="active" >
                        About
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/courses" className="nav-link" activeClass="active" >
                        Courses
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/trainers" className="nav-link" activeClass="active" >
                        Trainers
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/events" className="nav-link" activeClass="active" >
                        Events
                        </Link>
                    </NavItem>
                </Nav>
            </Collapse>
            </Navbar>
            </Col>
            <UserMenu/>
            </Row>
            </Container>
            </header>
            </div>
    );
  }
};
