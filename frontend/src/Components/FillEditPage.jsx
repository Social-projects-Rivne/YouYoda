import React from 'react';
import {Container, Row, Col, FormGroup, Label, Input, Form} from "reactstrap";
import Button from "reactstrap/es/Button";
import {countries, regions} from './Variables/location';

import axios from 'axios';

import {editForm} from "../api/editForm";



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
            is_trainer: 'true'
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
            // const response = await axios.get('http://localhost:5000/test');
            const response = await axios.get('http://localhost:8000/api/user/profile/edit', {headers: { Authorization: "Token " + localStorage.getItem('token')}});
            // console.log(response.data);
            // alert(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    postUser = async (formData) => {
        try {
            // const response = await axios.post('http://localhost:5000/test', formData);
            const response = await axios.patch('http://localhost:8000/api/user/profile/edit', formData, {headers: { Authorization: "Token " + localStorage.getItem('token')}});
        } catch (error) {
            console.error(error);
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
        await this.postUser(payLoad)
    };

    updateField = (event) => {
        let fieldName = event.target.name;
        let newState = {};
        newState[fieldName] = event.target.value;
        // this.setState({username: event.target.value})
        this.setState(newState);
        console.log(event.target.value, event.target.value);
    };

    async componentDidMount() {
        let userData = await this.getUser();
        // this.setState({username: userData.username,
        // first_name: userData.first_name})
        let test_dict = {}
        Object.keys(this.state).map(function (key) {
            test_dict[key] = userData[key]
        })
        this.setState(test_dict)
    }

    becomeTrainer = async () => {
        let trainer = {is_trainer: this.state.is_trainer}
        try {
            const response = await axios.patch('http://localhost:8000/api/user/totrainer/', trainer, {headers: { Authorization: "Token " + localStorage.getItem('token')}});
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        const {header, main} = this.props;
        return (
            <div className="">
                <Container>
                    <Form
                        // onSubmit={this.handleSubmit} method="Post"
                        method="POST" className="form-group "
                    >
                        <Row>
                            <Col md="6" sm="12" className="fill-edit-collumn">

                                <h2  className="top-text">Personal details</h2>
                                <div className="edit-avatar">
                                    <img src={require('../img/static/avatar.png')}
                                         className="avatar"
                                         href="#" alt="profile-photo"
                                         onChange={(e) => this.updateField(e)}
                                         value={this.state.avatar_url}
                                         href={this.state.avatar_url}
                                    />
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
                                    {/*<Col md={6}>*/}
                                    {/*<FormGroup className="city-country">*/}
                                    {/*    <Label for="state">City and country*</Label>*/}
                                    {/*    <Input*/}
                                    {/*        type="select"*/}
                                    {/*        name="location"*/}
                                    {/*        className="field-box">*/}
                                    {/*        onChange={(e) => this.updateField(e)}*/}
                                    {/*        {countries.map((country) => (*/}
                                    {/*            <option>{country}</option>*/}
                                    {/*        ))}*/}
                                    {/*        value = {this.state.location}*/}
                                    {/*    </Input>*/}
                                    {/*</FormGroup>*/}
                                    {/*</Col>*/}
                                    <Col md={12}>
                                        <FormGroup className="city-country-2">
                                            {/*<Input*/}
                                            {/*    type="select"*/}
                                            {/*    name="location"*/}
                                            {/*    className="field-box">*/}
                                            {/*    {regions.map((region) => (*/}
                                            {/*        <option>{region}</option>*/}
                                            {/*    ))}*/}
                                            {/*    onChange={(e) => this.updateField(e)}*/}
                                            {/*    value = {this.state.location}*/}
                                            {/*</Input>*/}
                                            <select type="text"
                                                    value={this.state.location}
                                                    onChange={this.updateField}
                                                    name={'location'}
                                                    required
                                                    className="field-box button-region">
                                                >
                                                {regions.map((region) => (
                                                    <option value={region}>{region}</option>
                                                ))}
                                            </select>
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
                                        <hr/>
                                    </Col>
                                    <Col md="3">
                                        {/*<Button className="button-verify-email">Verify Email</Button>*/}
                                    </Col>
                                </Row>
                            </Col>

                            <Col md="6" sm="12" className="top-text-2 fill-edit-collumn">
                                <h2>About me</h2>
                                <Label className="marg-top">I like</Label>
                                <Input
                                    type="textarea"
                                    name="i_like"
                                    className="loginInputTextArea"
                                    // onChange={() => this.updateField()}
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
                                <h2 className="security-button">Security</h2>
                                <Label>Change my password</Label>
                                <div className="row justify-content-lg-start">
                                    <div className="col-5 passwords-change">
                                        <Input type="password"
                                               name="password"
                                               placeholder="New password"
                                               className="field-box"
                                               onChange={(e) => this.updateField(e)}
                                               value={this.state.password}
                                        />
                                    </div>
                                    <div className="col-5">
                                        <Input type="password"
                                               name="password"
                                               className="passwordconf"
                                               placeholder="Confirm password"
                                               onChange={(e) => this.updateField(e)}
                                               value={this.state.password}
                                        />
                                    </div>
                                    <Button className="submit-button"
                                            onClick={() => this.saveForm()}>Submit</Button>
                                </div>
                                <Button color="secondary" className="text-button-trainer" size="lg" block
                                        onClick={() => this.becomeTrainer()}>
                                    I want to become a trainer
                                </Button>
                                <div className="col-4">
                                    <Button color="secondary" type size="lg" className="button-saveall" block
                                            onClick={() => this.saveForm()}>Save
                                        all</Button>
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


// onSubmit={() => {alert("test")}}