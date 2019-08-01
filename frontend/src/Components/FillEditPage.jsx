import React from 'react';
import {Container, Row, Col, FormGroup, Label, Input, Form} from "reactstrap";
import Button from "reactstrap/es/Button";
import { countries, regions } from './Variables/location';


class FillEditPage extends React.Component {
    render() {
        const {header, main} = this.props;
        return (
            <div className="">
                <Container>
                    <Row>
                        <Col md="6" sm="12" className="fill-edit-collumn">
                            <h2 class="font-weight-bold" className="top-text">Personal details</h2>
                            <img src={require('../img/static/avatar.png')} className="avatar"/>
                            <Label for="login" name="login" className="login">Login*</Label>
                            <Input
                                type="login"
                                className="field-box"
                                required
                            />
                            <Label for="name" className="name">Name*</Label>
                            <Input
                                type="name"
                                className="field-box"
                                required
                            />
                            <Label for="surname" className="surname">Surname*</Label>
                            <Input
                                type="surname"
                                className="field-box"
                                required
                            />
                            <Row form>
                                <Col md={6}>
                                    <FormGroup className="city-country">
                                        <Label for="state">City and country*</Label>
                                        <Input type="select" className="field-box" required>
                                            {countries.map((country) => (
                                                <option>{country}</option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup className="city-country-2">
                                        <Input type="select" className="field-box" required>
                                            {regions.map((region) => (
                                                <option>{region}</option>
                                            ))}
                                                                                    </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <h2 class="font-weight-bold" className="top-text-contact">Contacts</h2>
                            <Label for="number">Mobile phone</Label>
                            <Input
                                type="number"
                                className="field-box"
                                placeholder="+3(80_)-__-___-__-__"
                                required
                            />
                            <Label>Your email*</Label>
                            <Row>
                                <Label for="email"></Label>
                                <Input type="email" name="email" placeholder="example@email" className="row-email"/>
                                <Button color="link" className="button-change">change</Button>
                            </Row>
                            <h6 class="font-weight-bold">Verify your email address</h6>
                            <hr/>
                            <Row>
                                <Col md="9">
                                    In order to start using your account, <br/>you need to conform your email address.
                                    <hr/>
                                </Col>
                                <Col md="3">
                                    <Button className="button-verify-email">Verify Email</Button>
                                </Col>
                            </Row>
                        </Col>

                        <Col md="6" sm="12" className="fill-edit-collumn" className="top-text-2">
                            <h2 class="font-weight-bold">About me</h2>
                            <Label className="marg-top">I like</Label>
                            <Input type="textarea" name="text" className="textarea"/>
                            <Label className="marg-top">Something about me</Label>
                            <Input type="textarea" name="text" className="textarea-2"/>
                            <Label for="exampleDate" className="marg-top">Date of birth</Label>
                            <Input
                                type="date"
                                className="field-box"
                                placeholder="date placeholder"
                            />
                            <h2 class="security-button">Security</h2>
                            <Label>Change my password</Label>
                            <div className="row justify-content-lg-start">
                                <div className="col-5 passwords-change">
                                    <Input type="password"
                                           placeholder="New password"
                                           className="field-box"
                                    />
                                </div>
                                <div className="col-5">
                                    <Input type="password"
                                           className="password"
                                           placeholder="Confirm password"
                                    />
                                </div>
                                <Button className="submit-button">Submit</Button>
                            </div>
                            <Button color="secondary" className="text-button-trainer" size="lg" block>I want to become a
                                trainer</Button>
                            <div class="col-4">
                                <Button color="secondary" size="lg" className="button-saveall" block>Save all</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default FillEditPage;



