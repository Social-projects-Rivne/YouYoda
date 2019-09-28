import React from 'react';
import { toast } from 'react-toastify';

import { API } from '../api/axiosConf';
import { ProfileContext } from './profile-context';

const URL_UNSUBSCRIBE = 'user/course/delete',
      URL_FAVORITE = 'user/course/managefavorite';


export default class ManageButtons extends React.Component{
    constructor(props) {
      super(props);
    }

    unsubscribeClick = async(courseData) => {
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
        const courseData = this.props.course;
        return (
        <div className="manage-buttons-wrap">
            <div className="buttons-wrap-inner">
                <div className="button-manage"
                    onClick={() => {this.unsubscribeClick(courseData)}}>Unsubscribe
                </div>
                {(courseData.subscribed[0].is_favourite) ? (
                    <div className="button-manage"
                        onClick={() => {this.addToFavoriteClick(courseData, false)}}>Remove from Favorite
                    </div>
                ) : (
                    <div className="button-manage"
                        onClick={() => {this.addToFavoriteClick(courseData, true)}}>Add to Favorite
                    </div>
                )}
            </div>
        </div>
        )
    }
}
