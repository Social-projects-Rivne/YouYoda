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
            <header className="header">
            <Container>
            <Row>
            <Col>
            <Navbar color="fade" dark expand="md">
                <NavbarBrand href="/">
                    <img src={require('../img/logo_grey.png')} />
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
            <Container fluid>
                <Row>
                    <Col className="">

                    </Col>
                </Row>
            </Container>

            </div>
    );
  }
}
