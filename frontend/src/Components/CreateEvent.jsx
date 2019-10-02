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
            eventsData: [],
            date: '',
        };
    }

    componentWillMount() {
        this.setState({loading: true})
    }

    getEvent = async () => {
        try {
            const response = await API.get('user/profile/event_organize');
            return response.data;
        } catch (error) {
            toast.error('You cannot view your profile. Contact administrator or support system.');
        }
    };

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
        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to={{pathname: '/eventedit', state: {event: this.state.event}}}/>;
        }
        return (
            <div className="form-event-own">
                <Col Col sm={{size: 8, offset: 2}}
                     xs={{size: 8, offset: 2}}
                     md={{size: 6, offset: 3}}
                >
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
                <Col style={{marginTop: "100px"}}>
                    <OwnEvent eventsData={this.state.eventsData}/>
                </Col>
            </div>
        )
    }
}

export default CreateEvent;