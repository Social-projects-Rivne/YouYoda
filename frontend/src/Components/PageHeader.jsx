import React from 'react';

import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem,
    Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import LoginForm from '../Components/LoginForm';
import Registration from '../Components/Registration';
import { UserMenu } from './UserMenu';
import { isAuthenticated } from '../utils';


export default class PageHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpenM: false,
            isOpenL: false,
            isOpen: false
        };
    }
    handleClickReg = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }
    toggle = () => {
        this.setState({
            isOpenM: !this.state.isOpenM
        });
    }
    handleClickLogin = () => {
        this.setState(prevState => ({
            isOpenL: !prevState.isOpenL
        }));
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
            <Collapse isOpen={this.state.isOpenM} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Link to="/about" className="nav-link" activeClass="active" >
                        About
                        </Link>
                    </NavItem>
                    <NavItem>
                    <Link to="/events/search" className="nav-link" activeClass="active" >
                    Events
                    </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/trainers" className="nav-link" activeClass="active" >
                        Trainers
                        </Link>
                    </NavItem>
                    <NavItem>
                    <Link to="/courses/search" className="nav-link" activeClass="active" >
                    Courses
                    </Link>
                    </NavItem>
                    <NavItem className={isAuthenticated("hide")}>
                        <i className="fas fa-sign-in-alt sign-in-header nav-link"
                            onClick={this.handleClickLogin}
                            ></i>
                    </NavItem>
                </Nav>
            </Collapse>
            </Navbar>
            </Col>
            <UserMenu avatarIcoFunc={this.props.avatarIcoFunc} avatarIco={this.props.avatarIco}/>
            </Row>
            </Container>
            </header>
                <LoginForm handleClickLogin={this.handleClickLogin} handleClickReg={this.handleClickReg} isOpenL={this.state.isOpenL} />
                <Registration handleClickReg={this.handleClickReg} handleClickLogin={this.handleClickLogin} isOpen={this.state.isOpen} />
            </div>
    );
  }
};
