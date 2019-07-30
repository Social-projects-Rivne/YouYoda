import React from 'react';

import {Collapse, Navbar, NavbarToggler, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarBrand, Nav, NavItem, NavLink,
    Container, Row, Col } from 'reactstrap';


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
                        <NavLink href="/about/">About</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/courses/">Courses</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/courses/">Trainers</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/courses/">Events</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem>Some Action</DropdownItem>
                    <DropdownItem disabled>Action (disabled)</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Foo Action</DropdownItem>
                    <DropdownItem>Bar Action</DropdownItem>
                    <DropdownItem>Quo Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Navbar>
            </Col>
            </Row>
            </Container>
            </header>
            </div>
    );
  }
};
