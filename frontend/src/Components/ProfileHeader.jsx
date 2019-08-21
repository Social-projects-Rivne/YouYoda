import React from 'react';

import {Collapse, Dropdown, DropdownToggle, DropdownMenu,
    DropdownItem, NavbarBrand, Navbar, NavbarToggler, Nav,
    NavItem, NavLink, Container, Row, Col} from 'reactstrap';
import {ProfileContext} from './profile-context';


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
                <ProfileContext.Consumer>
                  {profile => (
                  <Container>
                    <Row>
                      <Col>
                        <Navbar dark expand="md">
                          <NavbarBrand href="/">
                            <img src={require('../img/static/logo_grey.svg')}
                                 className="logo" alt="YouYoda" href={this.state.avatar_url}/>
                          </NavbarBrand>
                          <NavbarToggler className="order-2" onClick={this.toggle}/>
                          <Collapse className="order-2" isOpen={this.state.isOpen} navbar>
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
                          <Dropdown className="order-1 ico-user-profile" isOpen={this.state.dropdownOpen} toggle={this.dropdowntoggle}>
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
                        </Navbar>
                      </Col>
                    </Row>
                  </Container>
                )
              }
              </ProfileContext.Consumer>
              </header>
            </div>
    );
  }
};
