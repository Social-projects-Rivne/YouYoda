import React from 'react'
import {API} from "../api/axiosConf";
import {toast} from "react-toastify";

export default class CourseImage extends React.Component {
    constructor(props) {
        super(props);
    }

    uploadAvatar = async (url) => {
        await this.props.updateUrl(url);
    };

    handleSubmit = async (e) => {
        const data = new FormData();

        try {
            data.append('file', this.state.file);
            // const response = await API.post('user/profile/change_avatar', data)
            this.props.updateUrl(this.state.file.name);
            this.uploadAvatar(this.state.file.name);
            toast.success('Success');
        } catch (error) {
            toast.error('error \n choose avatar');
        }
    };

    handleImageChange = (e) => {
        e.preventDefault();
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
            });
            this.handleSubmit();
        };
        let url = reader.readAsDataURL(file);
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} method="post" encType="multipart/form-data">
                  <div className="edit-course-image">
                    </div>
                  <input type="file" className="input-course-image" accept="image/*" onChange={this.handleImageChange}/>
                </form>
            </div>
        )
    }
}
