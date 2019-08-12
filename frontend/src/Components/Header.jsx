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
                        <Link activeClass="active" to="home-about" spy={true} smooth={true} duration={500}>
                        <NavLink href="/about">About</NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link activeClass="active" to="home-course" spy={true} smooth={true} duration={500}>
                        <NavLink href="/courses">Courses</NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link activeClass="active" to="home-trainer" spy={true} smooth={true} duration={500}>
                        <NavLink href="/trainers">Trainers</NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link activeClass="active" to="home-event" spy={true} smooth={true} duration={500}>
                        <NavLink href="/events">Events</NavLink>
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
