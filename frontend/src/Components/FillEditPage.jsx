import React from 'react';
import Button from "reactstrap/es/Button";
import { Container, Row, Col, FormGroup, Label, Input, Form } from "reactstrap";
import { toast } from 'react-toastify';
import { API } from '../api/axiosConf';
import { editForm } from "../api/editForm";
import LocationSearchInput from '../api/cityselector'
import ChangePassword from "./ChangePassword";
import ImageUpload from './ImageUploadComponent'
import Avatar from './Avatar'


class FillEditPage extends React.Component {
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
        };
        this.handleClick = this.handleClick.bind(this)
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };

    async handleClick(event) {
        await editForm(this.state);
    }

    getUser = async () => {
        try {
            const response = await API.get('user/profile/edit');
            return response.data;
        } catch (error) {
            toast.error('You cannot view your profile. Contact administrator or support system.');
        }
    };

    postUser = async (formData) => {
        try {
            const response = await API.patch('user/profile/edit', formData);
        } catch (error) {
            toast.error('You cannot update your profile. Contact administrator or support system.');
        }
    };

    saveForm = async () => {
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

    updateAvatarUrl = (url) => {
        this.setState({avatar_url: url});
    };

    async componentDidMount() {
        let userData = await this.getUser();
        let mount_dict = {}
        Object.keys(this.state).map(function (key) {
            mount_dict[key] = userData[key]
        })
        this.setState(mount_dict)
    }

    becomeTrainer = async () => {
        let trainer = {};
        trainer.is_trainer = true;
        trainer.email = this.state.email;
        try {
            const response = await API.patch('user/totrainer', trainer);
        } catch (error) {
            toast.error('You cannot be a trainer. Contact administrator or support system.');
        }
    };

    showUpload = (event) =>{
        event.preventDefault();
        this.setState({showUploadForm: !this.state.showUploadForm})
    };


    render() {
        const {header, main} = this.props;
        return (
            <div className="">
                <Container>
                    <Form method="POST" className="form-group ">
                        <Row>
                            <Col md="6" sm="12" className="fill-edit-collumn">
                                <h2 className="top-text">Personal details</h2>
                                <button type='file' className='avatar-wrapper' onClick= {(event) => this.showUpload(event)}>
                                    <div className="edit-avatar">
                                        <Avatar avatar_url ={this.state.avatar_url}/>
                                    </div>
                                </button>
                                <div>
                                    {this.state.showUploadForm && <ImageUpload updateUrl={this.updateAvatarUrl}/>}
                                </div>
                                <Label for="login" className="login">Login*</Label>
                                <Input
                                    type="login"
                                    name="username"
                                    className="field-box"
                                    required
                                    onChange={(e) => this.updateField(e)}
                                    value={this.state.username}
                                />
                                <Label for="name" className="name">Name*</Label>
                                <Input
                                    name="first_name"
                                    className="field-box"
                                    required
                                    onChange={(e) => this.updateField(e)}
                                    value={this.state.first_name}
                                />
                                <Label for="surname" className="surname">Surname*</Label>
                                <Input
                                    name="last_name"
                                    className="field-box"
                                    required
                                    onChange={(e) => this.updateField(e)}
                                    value={this.state.last_name}
                                />
                                <Label>Your email*</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="example@email.com"
                                    className="row-email"
                                    value={this.state.email}
                                    onChange={(e) => this.updateField(e)}
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
                                    onSubmit={() => {
                                        console.log("test")
                                    }}
                                    type="number"
                                    name="phone_number"
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
                                <Label for="exampleDate" className="marg-top">Date of birth</Label>
                                <Input
                                    type="date"
                                    name="birth_date"
                                    className="field-box"
                                    placeholder="date placeholder"
                                    onChange={(e) => this.updateField(e)}
                                    value={this.state.birth_date}
                                />
                                <h2 className="security-button">CAUTION ! DANGER ! You can change your password</h2>
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
                                            onClick={() => this.saveForm()}>
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

export default FillEditPage;