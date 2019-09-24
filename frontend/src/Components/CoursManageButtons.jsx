import React from 'react';
import { toast } from 'react-toastify';

import { API } from '../api/axiosConf';
import { axiosPost } from '../api/axiosPost';

const URL_UNSUBSCRIBE = 'user/course/delete',
      URL_ADD_FAVORITE = 'user/course/addfavorite',
      URL_DEL_FAVORITE = 'user/course/delfavorite';


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
    }

    addToFavoriteClick = (courseData, addOrRemove) => {
        console.log(courseData);
        let dataSend = {"course": courseData.id};

        if(addOrRemove) {
            let resRequest = await axiosPost(URL_ADD_FAVORITE, dataSend);
            console.log('add Favorite');
            console.log(resRequest);
        } else {
            let resRequest = await axiosPost(URL_DEL_FAVORITE, dataSend);
            console.log('remove Favorite');
            console.log(resRequest);
        }
        
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
