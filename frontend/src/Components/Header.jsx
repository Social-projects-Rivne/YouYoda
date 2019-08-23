import React from 'react';

import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
    Container, Row, Col } from 'reactstrap';
import { Link } from 'react-scroll';


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
                        <Link href="/about" className="nav-link" activeClass="active" to="home-about" spy={true} smooth={true} duration={500}>
                        About
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link href="/courses" className="nav-link" activeClass="active" to="home-course" spy={true} smooth={true} duration={500}>
                        Courses
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link href="/trainers" className="nav-link" activeClass="active" to="home-trainer" spy={true} smooth={true} duration={500}>
                        Trainers
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link href="/events" className="nav-link" activeClass="active" to="home-event" spy={true} smooth={true} duration={500}>
                        Events
                        </Link>
                    </NavItem>
                </Nav>
            </Collapse>
            </Navbar>
            </Col>
            </Row>
            </Container>
            </header>
            </div>
    );
  }
};

