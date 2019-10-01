import React from 'react'
import {API} from "../api/axiosConf";
import {toast} from "react-toastify";


export default class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: ''
        }
    }

    uploadAvatar = async (url) => {
        await this.props.updateUrl(url);
    };

    handleSubmit = async (e) => {
        const data = new FormData();

        try {
            data.append('file', this.state.file);
            const response = await API.post('user/profile/change_avatar', data)
            this.props.updateUrl(response.data.avatar_url);
            this.uploadAvatar(response.data.avatar_url);
            toast.success('Image uploaded. \nSave changes')
        } catch (error) {
            toast.error('error \n you can`t choose this file');
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
        };
        let url = reader.readAsDataURL(file);
    };
/*    handleImageChange = (e) => {
        e.preventDefault();
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                    file: file,
                    imagePreviewUrl: reader.result,
                }, () => {
                    this.validateImage(file)
                }
            );
        };
        let url = reader.readAsDataURL(file);
    };

    validateImage = (file) => {
        let fieldValidationErrors = this.state.formErrors;
        let {imageValid} = this.state;
        let imageSize = file.size / 1024 / 1024;

        imageValid = imageSize < 1
        fieldValidationErrors.file = imageValid ? '' : 'Your cover image must be less then 1MB';

        this.setState({
            formErrors: fieldValidationErrors,
            imageValid: imageValid,
        }, this.validateForm);
    }*/

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} method="post" encType="multipart/form-data">
                    <input type="file" accept="image/*" name="image-document" className="button-avatar-input"
                           onChange={this.handleImageChange}/>
                    <button type="button" onClick={this.handleSubmit} className="button-avatar">Upload Image</button>
                </form>
            </div>
        )
    }
}

