import React from 'react';
import { toast } from 'react-toastify';

import { API } from '../api/axiosConf';


const URL_UNSUBSCRIBE = 'user/course/delete',
      URL_UNSUBSCRIBE_EVENT = 'user/event/delete',
      URL_FAVORITE = 'user/course/managefavorite',
      BTN_ALL = 'ALL';


export default class ManageButtons extends React.Component{
    constructor(props) {
      super(props);
    }

    unsubscribeClickCourse = async(courseData) => {
        const USERDATA = {"params": {"course": courseData.id}};
        try {
            const response = await API.delete(URL_UNSUBSCRIBE, USERDATA);
            if(response.status === 201)
                toast.success('You unsubscribed from "' + courseData.coursename + '"');
        } catch (error) {
            toast.error(error.message);
        }
        this.props.changeProfile();
    }

    unsubscribeClickEvent = async(courseData) => {
        const USERDATA = {"params": {"event": courseData.id}};
        try {
            const response = await API.delete(URL_UNSUBSCRIBE_EVENT, USERDATA);
            if(response.status === 201)
                toast.success('You unsubscribed from "' + courseData.coursename + '"');
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
                toast.success('Course "' + courseData.coursename + '"' + mess);
            }
        } catch (error) {
            toast.error(error.message);
        }
        this.props.changeProfile();
    }

    render(){
        let courseData = {},
            typeItem = '';
        if(this.props.course) {
            courseData = this.props.course;
            typeItem = 'course';
        }
        else if(this.props.event) {
            courseData = this.props.event;
            typeItem = 'event';
        }

        return (
        <div className="manage-buttons-wrap">
            <div className="buttons-wrap-inner">
                {(this.props.manageButtons === BTN_ALL) ? (
                    <div className="button-manage"
                        onClick={() => {(typeItem === 'course') ? 
                            this.unsubscribeClickCourse(courseData) : this.unsubscribeClickEvent(courseData)}}>Unsubscribe
                    </div>
                ) : ''}
                {(courseData.subscribed[0].is_favourite && this.props.course) ? (
                    <div className="button-manage"
                        onClick={() => {this.addToFavoriteClick(courseData, false)}}>Remove from Favorite
                    </div>
                ) : ((this.props.course)?(
                    <div className="button-manage"
                        onClick={() => {this.addToFavoriteClick(courseData, true)}}>Add to Favorite
                    </div>
                ):'')}
            </div>
        </div>
        )
    }
}
