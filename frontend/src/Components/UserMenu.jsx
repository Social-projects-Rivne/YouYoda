import React from 'react';

import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import { verifyAuth } from '../utils'

export class UserMenu extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            dropdownOpen: false,
            authVisible: "",
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
    verifyAuth = () => {
        if(localStorage.getItem('token')){
            if(!this.state.authVisible){
                this.setState({authVisible: "auth-display-none"})
                return this.state.authVisible;
            } else {
                return this.state.authVisible;
            }
        } else {
            this.setState({authVisible: ""})
            return this.state.authVisible;
        }
    }
  render () {
    return (
      <div className={`header-user-menu ${!this.verifyAuth()}`}>

        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.dropdowntoggle}>
            <DropdownToggle className="dropdown-button">
              <img src={require('../img/content/profile_photo.png')}
                      className="profile-photo-dropdown" alt="profile"/>
            </DropdownToggle>
            <DropdownMenu right>
                <Link to="/profile"><DropdownItem>View profile</DropdownItem></Link>
                <Link to="/editprofile"><DropdownItem>User settings</DropdownItem></Link>
                <Link to=""><DropdownItem>Create course</DropdownItem></Link>
                <Link to=""><DropdownItem>Create event</DropdownItem></Link>
                <Link to=""><DropdownItem>Help</DropdownItem></Link>
                <DropdownItem>Logout</DropdownItem>
            </DropdownMenu>
        </Dropdown>

      </div>
      )
  }
}
