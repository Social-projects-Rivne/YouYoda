import React from 'react';

import {Col} from "reactstrap";
import {Link, Redirect} from "react-router-dom";
import Button from "reactstrap/es/Button";
import {toast} from 'react-toastify';
import OwnEvent from "./OwnEvent";

import {API} from '../api/axiosConf';

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
                     md={{size: 6, offset: 3}}>
                    <Link className="card-link" onClick={() => this.handleClick(event)}>
                        <Button color="secondary"
                                type="button"
                                size="lg"
                                className="button-create-new-event"
                                block>
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