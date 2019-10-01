import React from 'react';
import Button from "reactstrap/es/Button";
import {Container, Row, Col, FormGroup, Label, Input, Form, CustomInput} from "reactstrap";
import {toast} from 'react-toastify';
import {API} from '../api/axiosConf';
import LocationSearchInput from '../api/cityselector'
import FilterEventsSideBar from './FilterEventsSideBar'
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import ImageUpload from "./ImageUploadComponent";
import {axiosGet} from "../api/axiosGet";
import moment, {unix} from "moment";
import OwnEvent from "./OwnEvent";
import {Link, Redirect} from "react-router-dom";

class CreateEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            // category: '',
            eventsData: [],
            // categories: [],
            // name: '',
            // description: '',
            // owner: '',
            date: '',
            // location: '',
            // cover_url: '',
            // selectedEvent: '',
            // redirect: false,
        };
    }

    componentWillMount() {
        this.setState({loading: true})
    }

    getEvent = async () => {
        try {
            const response = await API.get('user/profile/event_organize');
            toast.success('get your page');
            return response.data;
        } catch (error) {
            toast.error('You cannot view your profile. Contact administrator or support system.');
        }
    };

    // postEvent = async (formData) => {
    //     try {
    //         const response = await API.patch('user/profile/event_organize', formData);
    //         toast.success('Changes saved');
    //     } catch (error) {
    //         toast.error('You cannot update your profile. Contact administrator or support system.');
    //     }
    // };

    handleClick = async (event) => {
        await this.setState({event});
        await this.setState({redirect: true});
        window.location.reload();
    }

    async componentDidMount() {
        let eventsData = await this.getEvent();
        this.setState({
            eventsData: eventsData,
        });
    };

    render(event) {
        const {redirect} = this.state
        if (redirect) {
            return <Redirect to={{pathname: '/eventedit', state: {event: this.state.event}}}/>;
        }
        return (
            <Form>
                <Col Col sm="10" xs="auto" md={{size: 8, offset: 2}}>
                    <Link className="card-link" onClick={() => this.handleClick(event)}>
                        <Button color="secondary"
                                type="button"
                                size="lg"
                                className="button-create-new-event"
                                block
                        >
                            Create new event
                        </Button>
                    </Link>
                </Col>
                <OwnEvent eventsData={this.state.eventsData}/>
            </Form>
        )
    }
}

export default CreateEvent;