import React from 'react';

import {Dropdown, DropdownToggle, DropdownMenu} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import { isAuthenticated, isAdmin, isModerator, defaultPhoto } from '../utils';
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
    handleSubmitLogOut = async (event) => {

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
    let defimg = "/media/avatar.png";
    let coverimg = defaultPhoto(defimg, localStorage.getItem("avatar_url"));

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
              <img src={coverimg}
                      className="profile-photo-dropdown" alt="profile"/>
            </DropdownToggle>
            <DropdownMenu right>
                {ManageDashboard}
                <Link to="/profile" className="dropdown-item">View profile</Link>
                <Link to="/editprofile" className="dropdown-item">User settings</Link>
                <Link to="" className="dropdown-item">Create course</Link>
                <Link to="" className="dropdown-item">Create event</Link>
                <Link to="" className="dropdown-item">Help</Link>
                 <a className="dropdown-item" onClick={this.handleSubmitLogOut}>Logout</a>
            </DropdownMenu>
        </Dropdown>

      </div>
      )
  }
}
