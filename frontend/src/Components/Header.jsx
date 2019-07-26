import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col } from 'reactstrap';



export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
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
            <Navbar color="#4f4f4f" dark expand="md">
                <NavbarBrand href="/">
                    <img src={require('../imgnotignor/logo_grey.svg')} className="logo"/>
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
            </Navbar>
            </Col>
            </Row>
            </Container>
            </header>
            </div>
    );
  }
}
