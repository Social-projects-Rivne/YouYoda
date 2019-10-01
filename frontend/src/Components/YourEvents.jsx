import React from 'react';
import Button from "reactstrap/es/Button";
import {
    Container,
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    Form,
    CustomInput,
    CardFooter,
    Card,
    CardHeader, CardBody, CardTitle, CardText
} from "reactstrap";
import {toast} from 'react-toastify';
import {API} from '../api/axiosConf';
import LocationSearchInput from '../api/cityselector'
import FilterEventsSideBar from './FilterEventsSideBar'
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import ImageUpload from "./ImageUploadComponent";
import {axiosGet} from "../api/axiosGet";
import moment, {unix} from "moment";
import OwnEvent from "./OwnEvent";
import {defaultPhoto} from "../utils";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


class YourEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            category: '',
            eventsData: [],
            categories: [],
            name: '',
            description: '',
            owner: '',
            date: '',
            location: '',
            cover_url: '',
            selectedEvent: '',
            id: '',
            // activeCategory: 'Other',
        };
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };

    // getEvent = async () => {
    //     try {
    //         const response = await API.get('user/profile/event_organize');
    //         toast.success('get your page');
    //         return response.data;
    //     } catch (error) {
    //         toast.error('You cannot view your profile. Contact administrator or support system.');
    //     }
    // };

    patchEvent = async (formData) => {
        try {
            const response = await API.patch('user/profile/event_organize', formData);
            toast.success('Changes saved');
        } catch (error) {
            toast.error('You cannot update your profile. ' +
                '\b Please fill all fields');
        }
    };
    postEvent = async (formData) => {
        try {
            const response = await API.post('user/profile/event_organize', formData);
            toast.success('Changes saved');
        } catch (error) {
            toast.error('You cannot update your profile. ' +
                '\b Please fill all fields');
        }
    };

    saveForm = async () => {
        try {
            let categoryId = this.state.categories.filter(category => category.name == this.state.activeCategory)[0][`id`];
            let date = moment(this.state.date).unix()
            console.log('1', this.state.activeCategory)
            let payLoad = {};
            if (this.state.id) {
                payLoad.categories = categoryId;
                payLoad.name = this.state.name;
                payLoad.description = this.state.description;
                payLoad.location = this.state.location;
                payLoad.owner = this.state.owner;
                payLoad.date = date.toString();
                payLoad.cover_url = this.state.cover_url;
                payLoad.id = this.state.id;
                await this.patchEvent(payLoad)
            } else {
                payLoad.categories = categoryId;
                payLoad.name = this.state.name;
                payLoad.description = this.state.description;
                payLoad.location = this.state.location;
                payLoad.owner = this.state.owner;
                payLoad.date = date.toString();
                payLoad.cover_url = this.state.cover_url;
                await this.postEvent(payLoad)
            }
        } catch (error) {
            toast.error('error, select all fields, please')
            console.log('2', this.state.categories.filter(category => category.name == this.state.activeCategory))
        }
    };

    updateField = (event) => {
        event.preventDefault();
        this.setState({
            name: event.target.value,
        });
    };

    upDescription = (event) => {
        this.setState({
            description: event.target.value,
        });
    };

    upCategories = (category) => {
        this.setState({
            activeCategory: category.target.value,
        });
        console.log('active category', this.state.activeCategory)
        console.log('category.target.value', category.target.value)
    };


    // selectEvent = (event) => {
    //     this.setState({
    //         eventIndex: 0,
    //     });
    // };

    upDate = (event) => {
        event.preventDefault();
        this.setState({
            date: event.target.value
        });
    };

    updateLocation = (location) => {
        this.setState({location: location.split(',')[0]});
    };

    updateEventImage = (url) => {
        this.setState({cover_url: url});
    };

    async componentDidMount() {
        let path = '/categories/list'
        let listCategories = await axiosGet(path);
        let eventsData = this.props.event;
        try {
            let eventsData = this.props.event;
            let activeCategory = listCategories.filter(category => category.id == eventsData.categories)[0][`name`];
            let date = moment.unix(eventsData.date).format("YYYY-MM-DDThh:mm:ss");
            this.setState({
                activeCategory: eventsData.categories,
                // activeCategory: activeCategory.categories,
                eventsData: eventsData,
                categories: listCategories,
                date: date,
                cover_url: eventsData.cover_url,
                owner: eventsData.owner,
                location: eventsData.location,
                description: eventsData.description,
                name: eventsData.name,
                id: eventsData.id
            });
            console.log('active category', activeCategory)
            console.log('eventsdata success', eventsData)
        console.log('eventsdata props success', this.props.event)

        } catch (e) {
            console.log(e)
            // console.log(this.eventsData[0])
            this.setState({
                categories: listCategories,
                date: '2019-09-20 14:12:12',
                cover_url: '/media/beautiful-crowd-cute-2869374.jpg',
                owner: '8',
                location: 'Rivne',
                description: 'write description of your event',
                name: 'Type name of your event'
            });
            console.log('eventsdata error', eventsData)
        console.log('eventsdata props error', this.props.event)
        }

    };

    renderCategories = (category) => {
        return (
            <option key={category.index}>
                <CustomInput type="checkbox" id={category.name} label={category.name} value={category.id}
                             onClick={(event) => this.handleClickCategories(event)}
                />
                {category.name}
            </option>
        )
    };
    render() {
        // console.log('image',this.state.cover_url)
        // console.log('image22',this.state.eventsData.cover_url)
        // console.log('--',this.props.event.cover_url)
        const DEFAULT_AVATAR_PATH = "/media/avatar.png";
        let alt_avatar = defaultPhoto(DEFAULT_AVATAR_PATH, this.state.cover_url)
        const {name, categories, description, date, time} = this.state;
        return (
            <Form method="POST" className="form-event">
                <Col sm="10" xs="auto" md={{size: 8, offset: 3}}>
                    <FormGroup className="">
                        <Row>
                            <Col sm="8" md="8">
                                <Label className="event-name">Event Name*</Label>
                                <Input
                                    type="textarea"
                                    name="name"
                                    className="field-box-event-name"
                                    required
                                    value={name}
                                    onChange={this.updateField}
                                />
                            </Col>
                            <Col sm="4" md="4" className="column-dropdown-button">
                                <Label>Choose event category</Label>
                                <Input type="select"
                                       name="categories"
                                       value={this.state.activeCategory}
                                       onChange={(e) => this.upCategories(e)}
                                >
                                    <option> </option>
                                    {this.state.categories.map((category, index) => <option key={index}
                                                                                            value={category.name}> {category.name} </option>)}

                                </Input>

                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Label className="course-name">Event description*</Label>
                                <Input
                                    type="textarea"
                                    name="event-description"
                                    className="field-box-event-description"
                                    required
                                    onChange={(e) => this.upDescription(e)}
                                    value={description}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="9">
                                <Label className="label-date-event">Date of event</Label>
                                <Input
                                    type="datetime-local"
                                    name="event_date"
                                    className="field-box-event-date"
                                    placeholder=""
                                    onChange={this.upDate}
                                    value={moment(date).format("YYYY-MM-DDThh:mm:ss")}
                                />
                            </Col>
                            {/*<Col md="3">*/}
                            {/*    <Label className="label-date-event">Time of event</Label>*/}
                            {/*    <Input*/}
                            {/*        type="time"*/}
                            {/*        name="event_time"*/}
                            {/*        className="field-box-event-date"*/}
                            {/*        placeholder=""*/}
                            {/*        onChange={this.upTime}*/}
                            {/*        // value={moment(time).format("HH:mm:ss")}*/}
                            {/*        value={time}*/}
                            {/*    />*/}
                            {/*</Col>*/}
                        </Row>
                        <Row>
                            <Col md="9">
                                <FormGroup className="location-formgroup-event ">
                                    <Label>Location</Label>
                                    <LocationSearchInput
                                        name="location-event"
                                        updateLocation={this.updateLocation}
                                        city={this.state.location}
                                        className="field-box"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12" sm="12">
                                <ImageUpload updateUrl={this.updateEventImage}/>

                            </Col>
                        </Row>
                        <Row>
                            <div className="card-event-footer card-footer">
                                <img width="100%"
                                     // src={this.state.cover_url}
                                    // src={(`${this.state.cover_url}`)}
                                    src={alt_avatar}
                                    // src="/media/beautiful-crowd-cute-2869374.jpg"
                                     alt="2"
                                />
                            </div>

                        </Row>
                        <Row>
                            <Col md="4" sm="6">
                                <Button color="secondary"
                                        type="button"
                                        size="lg"
                                        className="button-create-event"
                                        block
                                        onClick={() => this.saveForm()}>
                                    Save changes
                                </Button>
                            </Col>
                        </Row>

                    </FormGroup>
                </Col>
                {/*<OwnEvent eventsData={this.state.eventsData}/>*/}
            </Form>
        )
    }
}

export default YourEvents;