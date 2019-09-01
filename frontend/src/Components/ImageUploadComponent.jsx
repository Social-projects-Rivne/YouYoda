// https://codepen.io/hartzis/pen/VvNGZP
import React from 'react'
import {API} from "../api/axiosConf";
import {toast} from "react-toastify";

export default class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            avatar_url: ''
        };
    }

    handleSubmit = async (e) => {

        const data = new FormData();

        data.append('file', this.state.file);
        try {
            const response = await API.post('user/profile/change_avatar', data)
            // localStorage.setItem('avatar_url', this.state.avatar_url)

            // this.setState({avatar_url: response.data.avatar_url})
            toast.success('Success');
        } catch (error) {
            toast.error('error');
        }
        // e.preventDefault();
        console.log('handle uploading- file', this.state.file);
        console.log('uploading avatar', this.state.avatar_url);
    }

    handleImageChange = (e) => {
        e.preventDefault();

        let file = e.target.files[0];

        let reader = new FileReader();
        let avatar = e.target.files[0]

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
                avatar_url: avatar
            });
        }

        reader.readAsDataURL(file)
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl}/>);
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit} method="post" encType="multipart/form-data">
                    <input type="file" name="image-document" onChange={this.handleImageChange}/>
                    <button type="button" onClick={this.handleSubmit}>Upload Image</button>
                </form>
                <p>this.state.avatar_url</p>
                {/*{$imagePreview}*/}
            </div>
        )
    }

}


// Multiple Images

// import React from 'react';
//
//
// class ImageUpload extends React.Component {
//     state = {
//         files: [],
//         imagesPreviewUrls: []
//     };
//
//     _handleImageChange = e =>{
//         e.preventDefault();
//
//         // FileList to Array
//         let files = Array.from(e.target.files);
//
//         // File Reader for Each file and and update state arrays
//         files.forEach((file, i) => {
//             let reader = new FileReader();
//
//             reader.onloadend = () => {
//                 this.setState(prevState => ({
//                     files: [...prevState.files, file],
//                     imagesPreviewUrls: [...prevState.imagesPreviewUrls, reader.result]
//                 }));
//             }
//
//             reader.readAsDataURL(file);
//         });
//     }
//
//     render() {
//         let {imagesPreviewUrls} = this.state;
//
//         return (
//             <div>
//                 <label className="btn btn-default btn-sm z-depth-0 mr-0 pl-2 pr-2 custom-file-upload waves-effect waves-light" htmlFor="file">
//                     <i className="fas fa-image fa-fw" aria-hidden="true"></i>
//                     <input className="upload" type="file" onChange={this._handleImageChange} multiple/>
//                 </label>
//                 {imagesPreviewUrls.map(function(imagePreviewUrl, i){
//                     return <img key={i} src={imagePreviewUrl} />
//                 })}
//             </div>
//         )
//     }
// }
//
//
// export default ImageUpload;