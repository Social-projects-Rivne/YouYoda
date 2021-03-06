import React from 'react';

import Button from "reactstrap/es/Button";
import {Col, Container, Form, FormGroup, Input, Label, Row,} from "reactstrap";
import {toast} from 'react-toastify';

import {API} from '../api/axiosConf';
import Avatar from './Avatar';
import ChangePassword from "./ChangePassword";
import ImageUpload from './ImageUploadComponent';
import LocationSearchInput from '../api/cityselector';


export default class FillEditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            first_name: '',
            last_name: '',
            location: '',
            username: '',
            email: '',
            password: '',
            about_me: '',
            i_like: '',
            birth_date: '',
            phone_number: '',
            avatar_url: '',
            description:'',
        };
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };

    getUser = async () => {
        try {
            const response = await API.get('user/profile/edit');
            localStorage.setItem('avatar_url', response.data.avatar_url);
            let dataAvatarUrl = '';
            if (response.data.avatar_url)
                dataAvatarUrl = response.data.avatar_url;
            this.props.avatarIcoFunc(dataAvatarUrl);
            return response.data;
        } catch (error) {
            toast.error('You cannot view your profile. Contact administrator or support system.');
        }
    };

    postUser = async (formData) => {
        try {
            await API.patch('user/profile/edit', formData);
            this.props.avatarIcoFunc(formData.avatar_url);
            toast.success("Profile changed");
        } catch (error) {
            toast.error('You cannot update your profile. Contact administrator or support system.');
        }
    };

    saveForm = async (e) => {
        e.preventDefault();
        try {
            let payLoad = {};
            payLoad.username = this.state.username;
            payLoad.first_name = this.state.first_name;
            payLoad.last_name = this.state.last_name;
            payLoad.location = this.state.location;
            payLoad.about_me = this.state.about_me;
            payLoad.i_like = this.state.i_like;
            payLoad.email = this.state.email;
            payLoad.birth_date = this.state.birth_date;
            payLoad.phone_number = this.state.phone_number;
            payLoad.avatar_url = this.state.avatar_url;
            payLoad.password = this.state.password;
            await this.postUser(payLoad)
        } catch (error) {
            toast.error('Can\'t save changes')
        }
    };

    updateField = (event) => {
        let fieldName = event.target.name;
        let newState = {};
        newState[fieldName] = event.target.value;
        this.setState(newState);
    };

    updateLocation = (location) => {
        this.setState({location: location.split(',')[0]});
    };

    updateAvatarUrl = (url) => {
        this.setState({avatar_url: url});
    };

    async componentDidMount() {
        let userData = await this.getUser();
        let mount_dict = {};
        Object.keys(this.state).map(function (key) {
            mount_dict[key] = userData[key];
        });
        this.setState(mount_dict);
    }

    becomeTrainer = async () => {
        const URLPATH = 'user/totrainer/sendrequest';
        const USERDATA = {
            "email": this.state.email
        };
        try {
            const response = await API.post(URLPATH, USERDATA);
            if (parseInt(response.status) === 208)
                toast.info(response.data);
            else if (parseInt(response.status) === 201)
                toast.success('Request was successfully sent. Please, wait for moderation results.');
            else
                toast.error(response.data);
        } catch (error) {
            toast.error('You cannot be a trainer. Contact administrator or support system.');
        }
    };

    showUpload = (event) => {
        event.preventDefault();
        this.setState({showUploadForm: !this.state.showUploadForm})
    };


    render() {
        let isDisabled = true;
        if (this.state.first_name && this.state.username && this.state.last_name){
            isDisabled = false;
        }
        return (
            <div className="">
                <Container>
                    <Form method="POST" className="form-group">
                        <Row>
                            <Col md="6" sm="12" className="fill-edit-collumn">
                                <h2 className="top-text">Personal details</h2>
                                <button type='file' className='avatar-wrapper'
                                        onClick={(event) => this.showUpload(event)}>
                                    <div className="edit-avatar">
                                        <Avatar avatar_url={this.state.avatar_url}/>
                                    </div>
                                </button>
                                <div>
                                    {this.state.showUploadForm && <ImageUpload updateUrl={this.updateAvatarUrl}/>}
                                </div>
                                <Label for="username">User Name*</Label>
                                {!this.state.username && <span className="text-validate-date">
                                       can't be empty
                                </span>}
                                <Input
                                    type="login"
                                    name="username"
                                    className="field-box"
                                    required
                                    onChange={(e) => this.updateField(e)}
                                    value={this.state.username}
                                />
                                <Label className="name">Name*</Label>
                                {!this.state.first_name && <span className="text-validate-date">
                                       can't be empty
                                </span>}
                                <Input
                                    name="first_name"
                                    className="field-box"
                                    required
                                    onChange={(e) => this.updateField(e)}
                                    value={this.state.first_name}
                                />
                                <Label className="surname">Surname*</Label>
                                {!this.state.last_name && <span className="text-validate-date">
                                       can't be empty
                                </span>}
                                <Input
                                    name="last_name"
                                    className="field-box"
                                    required
                                    onChange={(e) => this.updateField(e)}
                                    value={this.state.last_name}
                                />
                                <Label>Your email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="example@email.com"
                                    className="row-email"
                                    value={this.state.email}
                                    disabled
                                />
                                <Row>
                                    <Col md={12}>
                                        <FormGroup className="city-country-2">
                                            <Label>Location</Label>
                                            <LocationSearchInput
                                                updateLocation={this.updateLocation}
                                                city={this.state.location}
                                                className="form-control"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <h2 className="top-text-contact">Contacts</h2>
                                <Label for="number">Mobile phone</Label>
                                <Input
                                    type="tel"
                                    name="phone_number"
                                    maxLength="13"
                                    required
                                    className="field-box"
                                    placeholder="(0__)-___-__-__"
                                    onChange={(e) => this.updateField(e)}
                                    value={this.state.phone_number}
                                />
                                <hr/>
                                <Row>
                                    <Col md="9">
                                        In order to start using your account, <br/>you need to confirm your email
                                        address.
                                    </Col>
                                </Row>
                                <hr/>
                            </Col>

                            <Col md="6" sm="12" className="top-text-2 fill-edit-collumn">
                                <h2>About me</h2>
                                <Label className="marg-top">I like</Label>
                                <Input
                                    type="textarea"
                                    name="i_like"
                                    className="loginInputTextArea"
                                    onChange={(e) => this.updateField(e)}
                                    value={this.state.i_like}
                                />
                                <Label className="marg-top">Something about me</Label>
                                <Input
                                    type="textarea"
                                    name="about_me"
                                    className="loginInputTextArea-2"
                                    onChange={(e) => this.updateField(e)}
                                    value={this.state.about_me}
                                />
                                <Label className="marg-top">Date of birth</Label>
                                <Input
                                    type="date"
                                    name="birth_date"
                                    className="field-box"
                                    placeholder="date placeholder"
                                    onChange={(e) => this.updateField(e)}
                                    value={this.state.birth_date}
                                />
                                <h2 className="security-button">CAUTION! You can change your password</h2>
                                <div className="row justify-content-start">
                                    <ChangePassword password="this.state.password"/>
                                </div>
                                <Button color="secondary"
                                        className="text-button-trainer"
                                        size="lg"
                                        block
                                        onClick={() => this.becomeTrainer()}>
                                    I want to become a trainer
                                </Button>
                                <div className="col-4">
                                    <Button color="secondary"
                                            type="button"
                                            size="lg"
                                            className="button-saveall"
                                            block
                                            disabled={isDisabled}
                                            onClick={(e) => this.saveForm(e)}>
                                        Save all
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        )
    }
}
