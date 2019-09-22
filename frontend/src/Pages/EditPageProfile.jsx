 import React from 'react';

import FillEditPage from "../Components/FillEditPage";
import Footer from "../Components/Footer";
import PageHeader from '../Components/PageHeader';
import { defaultPhoto } from '../utils';


export default class EditPageProfile extends React.Component{
    constructor(props) {
        super(props);
        let defimg = "/media/avatar.png";
        let coverimg = defaultPhoto(defimg, localStorage.getItem("avatar_url"));
        this.state = {
            avatarIco: coverimg
        }
     }
     avatarIcoFunc = (newUrl='') => {
        let defimg = "/media/avatar.png";
        if(newUrl.length === 0)
            newUrl = defaultPhoto(defimg, localStorage.getItem("avatar_url"));
        else
            newUrl = defaultPhoto(defimg, newUrl);
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
