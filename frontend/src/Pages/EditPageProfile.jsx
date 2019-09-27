 import React from 'react';

import FillEditPage from "../Components/FillEditPage";
import Footer from "../Components/Footer";
import PageHeader from '../Components/PageHeader';
import { DEFAULT_AVATAR_URL, defaultPhoto } from '../utils';


export default class EditPageProfile extends React.Component{
    constructor(props) {
        super(props);

        let coverimg = defaultPhoto(DEFAULT_AVATAR_URL, localStorage.getItem("avatar_url"));
        this.state = {
            avatarIco: coverimg
        }
     }
     avatarIcoFunc = (newUrl='') => {
        if(newUrl.length === 0)
            newUrl = defaultPhoto(DEFAULT_AVATAR_URL, localStorage.getItem("avatar_url"));
        else
            newUrl = defaultPhoto(DEFAULT_AVATAR_URL, newUrl);
        this.setState({
            avatarIco: newUrl
        });
    }
    render(){
        return(
            <>
            <PageHeader avatarIcoFunc={this.avatarIcoFunc} avatarIco={this.state.avatarIco}/>
            <FillEditPage avatarIcoFunc={this.avatarIcoFunc} avatarIco={this.state.avatarIco}/>
            <Footer/>
            </>
        )
    }
}
