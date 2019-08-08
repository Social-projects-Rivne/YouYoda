import React from 'react';

import {Collapse, Navbar, NavbarToggler, Dropdown, DropdownToggle, DropdownMenu,
    DropdownItem, NavbarBrand, Nav, NavItem, NavLink,
    Container, Row, Col} from 'reactstrap';
import axios from 'axios';

    export default class ProfileHeader extends React.Component {
        constructor(props) {
            super(props);

            this.dropdowntoggle = this.dropdowntoggle.bind(this);
            this.state = {
                isOpen: false,
                dropdownOpen: false
            };
        }
        toggle = () => {
            this.setState({
                isOpen: !this.state.isOpen
            });
        }
        dropdowntoggle = () => {
            this.setState(prevState => ({
                dropdownOpen: !prevState.dropdownOpen
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
                            <Col xs={{size:6, order: 1}} md={{size:4, order: 0}}>
                              <NavbarBrand href="/">
                                  <img src={require('../img/static/logo_grey.svg')}
                                          className="logo" alt="YouYoda"/>
                              </NavbarBrand>
                            </Col>
                          <Col xs={{size:3, order: 0}} md={{size:4, order: 1}}>
                            <NavbarToggler onClick={this.toggle}/>
                          </Col>
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
                            <Col xs={{size:3, order:2}} md={{size:4, order: 2}}>
                              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.dropdowntoggle}>
                                  <DropdownToggle className="dropdown-button">
                                    <img src={require('../img/content/profile_photo.png')}
                                            className="profile-photo-dropdown" alt="profile"/>
                                  </DropdownToggle>
                                  <DropdownMenu right>
                                      <DropdownItem>View profile</DropdownItem>
                                      <DropdownItem>User settings</DropdownItem>
                                      <DropdownItem>Create course</DropdownItem>
                                      <DropdownItem>Create event</DropdownItem>
                                      <DropdownItem>Help</DropdownItem>
                                      <DropdownItem>Logout</DropdownItem>
                                  </DropdownMenu>
                              </Dropdown>
                            </Col>
                          </Navbar>
                        </Col>
                      </Row>
                    </Container>
                  </header>
                </div>
        );
      }
    };
