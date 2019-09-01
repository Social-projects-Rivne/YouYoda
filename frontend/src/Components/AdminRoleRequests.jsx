import React from 'react';

import {Row, Col} from "reactstrap";
import Button from 'reactstrap/es/Button';
import { toast } from 'react-toastify';

import { API } from '../api/axiosConf';
import {getRequestsList} from '../api/getAdminRequests';


class AdminRequests extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataList: [],
            checkedIds: []
        };
    }

    onChange(e) {
        // current array of options
        const checkedIds = this.state.checkedIds;
        let index;
        // check if the check box is checked or unchecked
        if (e.target.checked) {
          // add the numerical value of the checkbox to options array
          checkedIds.push(+e.target.value);
        } else {
          // or remove the value from the unchecked checkbox from the array
          index = checkedIds.indexOf(+e.target.value);
          checkedIds.splice(index, 1);
        }
        // update the state with the new array of options
        this.setState({ checkedIds: checkedIds });
    }

    approveRequest = async() => {
        const URLPATH = 'user/totrainer';
        const USERDATA = {
            "status_code": 'A',
            "is_trainer": true,
            "id": this.state.checkedIds[0]
        };
        try {
            await API.patch(URLPATH, USERDATA);
            toast.success('Request successfully.');
            // update requests table    
            var requestList = getRequestsList('N');
            requestList.then( valueRequests => {
                this.setState({
                    dataList: valueRequests,
                });  
            });
            // clear selected items
            this.setState({ checkedIds: [] });
        } catch (error) {
            toast.error('Request failed. Report to the admin of the system.');
            console.log(error.message);
        }
    }

    componentWillMount() {
        var requestList = getRequestsList('N');
        requestList.then( valueRequests => {
            this.setState({
                dataList: valueRequests,
            });  
        });
    }

    renderRequestItem(item) {
        var read_only = '';
        if(item.status_code == 'N')
            read_only = <input type="checkbox" value={item.author_id} onChange={this.onChange.bind(this)} />;
        return (
            <tr id={`request_${item.id}`} key={item.id}>
                <td align="center">{read_only}</td>
                <td>{item.id}</td>
                <td>{item.status_code}</td>
                <td className="date-td">{item.date}</td>
                <td>{item.author_id}</td>
                <td>{item.comment}</td>
            </tr>
        )
    }

    render() {
        return (
            <div id="requests-table">
                <Row>
                    <Col><h5>Requests to Become Trainers Table</h5></Col>
                </Row>
                <Row className="requests-table">
                    <Col className="requests-table-wrap">
                        <table width="100%" border="1" cellPadding="5">
                            <thead>
                                <tr>
                                    <th>Select</th>
                                    <th>ID</th>
                                    <th>Status Code</th>
                                    <th>Date</th>
                                    <th>Author</th>
                                    <th>System Comment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.dataList.map( item => this.renderRequestItem(item) )}
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <Row className="table-actions mt-3">
                    <Col>
                        <div>Select action with choosed requests of users ID (now works with only ONE item): </div>
                        <div className="selected-items">
                            {this.state.checkedIds.map(number => 
                                <p key={number}>item: {number}</p>
                            )}
                        </div>
                        <Button type="button" onClick={this.approveRequest}>Approve</Button>
                        <Button type="button" onClick={console.log('Reject')}>Reject</Button>
                        
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AdminRequests;