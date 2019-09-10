import React from 'react';
import Button from "reactstrap/es/Button";
import {Container, Row, Col, FormGroup, Label, Input, Form} from "reactstrap";
import {toast} from 'react-toastify';
import {API} from '../api/axiosConf';
import LocationSearchInput from '../api/cityselector'
import FilterEventsSideBar from ''
import ChangePassword from "./ChangePassword";
import ImageUpload from './ImageUploadComponent'
import Avatar from './Avatar'


class CreateEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            categories: '',
            name: '',
            description: '',
            owner: '',
            date: '',
            location: '',
            cover_url: '',
        };
    }


    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };

    getUser = async () => {
        try {
            const response = await API.get('user/profile/event_organize');
            return response.data;
        } catch (error) {
            toast.error('You cannot view your profile. Contact administrator or support system.');
        }
    };

    // postUser = async (formData) => {
    //     try {
    //         const response = await API.patch('user/profile/edit', formData);
    //     } catch (error) {
    //         toast.error('You cannot update your profile. Contact administrator or support system.');
    //     }
    // };
    //
    saveForm = async () => {
        let payLoad = {};
        payLoad.categories = this.state.categories;
        payLoad.name = this.state.name;
        payLoad.description = this.state.description;
        payLoad.location = this.state.location;
        payLoad.owner = this.state.owner;
        payLoad.date = this.state.cover_url;
        await this.postUser(payLoad)
        toast.success('Changes saved');
    };

    updateField = (event) => {
        let fieldName = event.target.name;
        let newState = {};
        newState[fieldName] = event.target.value;
        this.setState(newState);
        console.log(event.target.value, event.target.value);
    };

    updateLocation = (location) => {
        this.setState({location: location.split(',')[0]});
        console.log(location);
    };
    //
    // updateAvatarUrl = (url) => {
    //     this.setState({avatar_url: url});
    // };
    //
    // async componentDidMount() {
    //     let userData = await this.getUser();
    //     let mount_dict = {}
    //     Object.keys(this.state).map(function (key) {
    //         mount_dict[key] = userData[key]
    //     })
    //     this.setState(mount_dict)
    // }
    //
    // becomeTrainer = async () => {
    //     let trainer = {};
    //     trainer.is_trainer = true;
    //     trainer.email = this.state.email;
    //     try {
    //         const response = await API.patch('user/totrainer', trainer);
    //     } catch (error) {
    //         toast.error('You cannot be a trainer. Contact administrator or support system.');
    //     }
    // };
    //
    // showUpload = (event) =>{
    //     event.preventDefault();
    //     this.setState({showUploadForm: !this.state.showUploadForm})
    // };


    render() {
        const {header, main} = this.props;
        return (
            <Form method="POST" className="form-event">
                <Col>
                    <FormGroup className="location-event">
                        <Label className="course-name">Course Name*</Label>
                        <Input
                            type="login"
                            name="username"
                            className="field-box"
                            required
                            onChange={(e) => this.updateField(e)}
                            value={this.state.username}
                        />
                        <Label>Location</Label>
                        <LocationSearchInput
                            updateLocation={this.updateLocation}
                            city={this.state.location}
                            className="form-control"
                        />
                    </FormGroup>
                    <FilterEventsSideBar/>
                </Col>
            </Form>

        )
    }
}

export default CreateEvent;