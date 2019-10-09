import React from 'react';

import {Dropdown, DropdownToggle, DropdownMenu} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import { isAuthenticated, isAdmin, isModerator, defaultPhoto, DEFAULT_AVATAR_URL } from '../utils';
import { logOut } from '../api/logOut';


export class UserMenu extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            dropdownOpen: false,
            authVisible: "",
            redirect: false,
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
    handleSubmitLogOut = async () => {
            try {
                await logOut();
                this.setState({ redirect: true });
                toast.info('🦄 Good by, See you');
            } catch (error){
                toast.error('You can`t log out;)');
                console.log(error.message)
            }
    }
  render () {
    let coverimg = defaultPhoto(DEFAULT_AVATAR_URL, localStorage.getItem("avatar_url"));

    const { redirect } = this.state;
    if (redirect) {
       return <Redirect to='/'/>;
    }
    let ManageDashboard;
    if (isAdmin())
        ManageDashboard = <Link to="/admin" className="dropdown-item">Admin Dashboard</Link>;
    else if (isModerator())
        ManageDashboard = <Link to="/moderator" className="dropdown-item">Moderator Dashboard</Link>;
    return (
      <div className={`header-user-menu ${isAuthenticated("show")}`}>

        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.dropdowntoggle}>
            <DropdownToggle className="dropdown-button">
              <img src={(this.props.avatarIco)?this.props.avatarIco:coverimg}
                   className="profile-photo-dropdown" alt="profile"/>
            </DropdownToggle>
            <DropdownMenu right>
                {ManageDashboard}
                <Link to="/profile" className="dropdown-item">View profile</Link>
                <Link to="/editprofile" className="dropdown-item">User settings</Link>
                <Link to="/profile/create-course" className="dropdown-item">Create course</Link>
                <Link to="/eventcreate" className="dropdown-item">My events</Link>
                <Link to="/info" className="dropdown-item">Help</Link>
                <span className="dropdown-item a-dropdown-item" onClick={this.handleSubmitLogOut}>Logout</span>
            </DropdownMenu>
        </Dropdown>

      </div>
      )
  }
}
