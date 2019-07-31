import React from 'react';
import {Container, Row, Col, FormGroup, Label, Input, Form} from "reactstrap";
import Button from "reactstrap/es/Button";


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
                            <FormGroup>
                                <Label for="login" className="login">Login*</Label>
                                <Input
                                    type="login"
                                    className="field-box"

                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name" className="name">Name*</Label>
                                <Input
                                    type="name"
                                    className="field-box"

                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="surname" className="surname">Surname*</Label>
                                <Input
                                    type="surname"
                                    className="field-box"

                                />
                            </FormGroup>
                            <Row form >
                                <Col md={6}>
                                    <FormGroup className="city-country">
                                        <Label  for="state">City and country*</Label>
                                        <Input type="select" className="field-box">
                                            <option>Ukraine</option>
                                            <option>Albania</option>
                                            <option>Australia</option>
                                            <option>Austria</option>
                                            <option>Belarus</option>
                                            <option>Belgium</option>
                                            <option>Canada</option>
                                            <option>China</option>
                                            <option>Colombia</option>
                                            <option>Congo</option>
                                            <option>Czech Republic</option>
                                            <option>Egypt</option>
                                            <option>Germany</option>
                                            <option>Hungary</option>
                                            <option>Japan</option>
                                            <option>Kazakhstan</option>
                                            <option>Latvia</option>
                                            <option>Lithuania</option>
                                            <option>Mexico</option>
                                            <option>Poland</option>
                                            <option>Romania</option>
                                            <option>Russia</option>
                                            <option>Slovakia</option>
                                            <option>Slovenia</option>
                                            <option>Sweden</option>
                                            <option>USA</option>
                                            <option>United Kingdom</option>
                                            <option>Zambia</option>
                                            <option>Zimbabwe</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup className="city-country-2" >
                                        <Input type="select" className="field-box">
                                            <option>Rivne</option>
                                            <option>Vinnytsia</option>
                                            <option>Lutsk</option>
                                            <option>Dnipropetrovsk</option>
                                            <option>Donetsk</option>
                                            <option>Zhytomyr</option>
                                            <option>Uzhhorod</option>
                                            <option>Zaporizhzhia</option>
                                            <option>Ivano-Frankivsk</option>
                                            <option>Kyiv</option>
                                            <option>Kropyvnytskyi</option>
                                            <option>Luhansk</option>
                                            <option>Lviv</option>
                                            <option>Mykolaiv</option>
                                            <option>Odessa</option>
                                            <option>Poltava</option>
                                            <option>Sumy</option>
                                            <option>Ternopil</option>
                                            <option>Kharkiv</option>
                                            <option>Kherson</option>
                                            <option>Khmelnytskyi</option>
                                            <option>Cherkasy</option>
                                            <option>Chernivtsі</option>
                                            <option>Chernihiv</option>
                                            <option>Simferopol</option>
                                            <option>Sevastopol</option>
                                        </Input>
                                    </FormGroup>
                                </Col>

                            </Row>
                            <h2 class="font-weight-bold" className="top-text-contact">Contacts</h2>
                            <FormGroup>
                                <Label for="number" >Mobile phone</Label>
                                <Input
                                    type="number"
                                    className="field-box"
                                    placeholder="+3(80_)-__-___-__-__"

                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Your email*</Label>
                                <Row >

                                        <Label for="email"></Label>
                                        <Input type="email" name="email"  placeholder="example@email" className="row-email"/>

                                        <Button color="link" className="button-change">change</Button>

                                </Row>
                            </FormGroup>
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
                            <Input type="textarea" name="text"  className="textarea"/>
                            <Label className="marg-top">Something about me</Label>
                            <Input type="textarea" name="text" className="textarea-2"/>
                            <FormGroup>
                                <Label for="exampleDate" className="marg-top">Date of birth</Label>
                                <Input
                                    type="date"
                                    className="field-box"
                                    placeholder="date placeholder"
                                />
                            </FormGroup>
                            <h2 class="font-weight-bold">Security</h2>
                            <Label>Change my password</Label>

                            <div className="row justify-content-lg-start">
                                <div className="col-5">
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
                            <Button color="secondary" className="text-button-trainer" size="lg"  block>I want to become a trainer</Button>

                                <div class="col-4">
                                    <Button color="secondary" size="lg"  className="button-saveall" block>Save all</Button>
                                </div>



                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default FillEditPage;



