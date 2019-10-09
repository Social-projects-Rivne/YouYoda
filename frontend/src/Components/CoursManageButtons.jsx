import React from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

import { API } from '../api/axiosConf';


const URL_UNSUBSCRIBE_COURSE = 'user/course/delete';
const URL_UNSUBSCRIBE_EVENT = 'user/event/delete';
const URL_FAVORITE = 'user/course/managefavorite';
const BTN_ALL = 'ALL';

export default class ManageButtons extends React.Component{
    constructor(props) {
      super(props);

      this.state = {
        redirectToPage: false,
      }
    }

    unsubscribeClickCourse = async(courseData) => {
        const USERDATA = {"params": {"course": courseData.id}};
        try {
            const response = await API.delete(URL_UNSUBSCRIBE_COURSE, USERDATA);
            if(response.status === 204)
                toast.success(`You unsubscribed from "${courseData.coursename}"`);
        } catch (error) {
            toast.error(error.message);
        }
        this.props.changeProfile();
    }

    unsubscribeClickEvent = async(courseData) => {
        const USERDATA = {"params": {"event": courseData.id}};
        try {
            const response = await API.delete(URL_UNSUBSCRIBE_EVENT, USERDATA);
            if(response.status === 204)
                toast.success(`You unsubscribed from "${courseData.name}"`);
        } catch (error) {
            toast.error(error.message);
        }
        this.props.changeProfile();
    }

    addToFavoriteClick = async(courseData, addOrRemove) => {
        let dataSend = {
            "course": courseData.id,
            "is_favourite": addOrRemove
        };
        try {
            const resRequest = await API.patch(URL_FAVORITE, dataSend);
            if(resRequest.status === 201) {
                let mess = " was added to your favorite list.";
                if(!addOrRemove)
                    mess = " was removed from your favorite list.";
                toast.success(`Course "${courseData.coursename}"${mess}`);
            }
        } catch (error) {
            toast.error(error.message);
        }
        this.props.changeProfile();
    }

    gotoPageLink = () => {
        this.setState({ redirectToPage: true });
    }

    render(){
        let courseData = {};
        let typeItem = '';
        if(this.props.course) {
            courseData = this.props.course;
            typeItem = 'course';
        }
        else if(this.props.event) {
            courseData = this.props.event;
            typeItem = 'event';
        }

        const { redirectToPage } = this.state;
        if (redirectToPage) {
            if(typeItem === 'course')
                return <Redirect to={{pathname: '/course/detail', state: {course: this.props.course}}}/>;
            else if(typeItem === 'event')
                return <Redirect to={{pathname: '/event/detail', state: {event: this.props.event}}}/>;
        }

        return (
        <div className="manage-buttons-wrap">
            <div className="buttons-wrap-inner">
                <div className="button-manage" onClick={this.gotoPageLink}>
                    <FontAwesomeIcon icon="arrow-left"/>&nbsp;Go to {typeItem} page
                </div>
                {(courseData.subscribed[0].is_favourite && this.props.course) ? (
                    <div className="button-manage"
                        onClick={() => {this.addToFavoriteClick(courseData, false)}}>
                        <FontAwesomeIcon icon="heartbeat"/>&nbsp;Remove from Favorite
                    </div>
                ) : ((this.props.course)?(
                    <div className="button-manage"
                        onClick={() => {this.addToFavoriteClick(courseData, true)}}>
                        <FontAwesomeIcon icon="heart"/>&nbsp;Add to Favorite
                    </div>
                ):'')}
                {(this.props.manageButtons === BTN_ALL) ? (
                    <div className="button-manage"
                        onClick={() => {(typeItem === 'course') ? 
                            this.unsubscribeClickCourse(courseData) : this.unsubscribeClickEvent(courseData)}}>
                        <FontAwesomeIcon icon="times"/>&nbsp;&nbsp;Unsubscribe
                    </div>
                ) : ''}
            </div>
        </div>
        )
    }
}
