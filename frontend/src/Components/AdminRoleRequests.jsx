import React from 'react';

import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import {Row, Col} from "reactstrap";
import Button from 'reactstrap/es/Button';
import { toast } from 'react-toastify';

import { getRequestsList, patchRequests } from '../api/getAdminRequests';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: #FFD466;
`;

class AdminRequests extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataList: [],
            checkedIds: [],
            checkedComments: [],
            requestsStatus: 'N',
            loading: true
        };
    }

    onChange(e) {
        // current array of author IDs
        const checkedIds = this.state.checkedIds;
        // current array of item IDs for saving comments
        const checkedComments = this.state.checkedComments;
        let index, indexItem;
        let itemIdParam = e.target.dataset.item_id;
        // check if the check box is checked or unchecked
        if (e.target.checked) {
            // add the numerical value of the checkbox to author IDs array
            checkedIds.push(+e.target.value);
            checkedComments.push(+itemIdParam);
        } else {
            // or remove the value from the unchecked checkbox from the array
            index = checkedIds.indexOf(+e.target.value);
            checkedIds.splice(index, 1);

            indexItem = checkedComments.indexOf(+itemIdParam);
            checkedComments.splice(indexItem, 1);
        }
        // updates the state with the new arrays of selected author IDs and item IDs
        this.setState({ 
            checkedIds: checkedIds,
            checkedComments: checkedComments
        });
    }

    /**
     * filters and sets state for selected data item for ability to change comment input
     * @param {number} indexVal - id of item
     * @returns boolean
    */
    checkReadOnly = (indexVal) => {
        let fileredItems = this.state.checkedComments.filter((value) => value === indexVal);
        if(fileredItems.length > 0)
            return false; //can write
        else
            return true; //only read
    }

    /**
     * filters of data object which is changing and updates comment input value
     * @param {string} newValue - new value for input
     * @param {number} id - id of item
    */
    onChangeCommentVal(newValue, id) {
        this.state.dataList.filter((value, index) => {
            if(value.id === id)
            {
                this.state.dataList[index].comment = newValue;
                this.forceUpdate();
            }
            return true;
        });
    }

    /**
     * updates requests table, clear selected items and update requests list
    */
    updateRequestTable = () => {
        var requestList = getRequestsList(this.state.requestsStatus);
        requestList.then( valueRequests => {
            this.setState({
                dataList: valueRequests,
                loading: false
            });  
        });
        // clear selected items
        this.setState({ checkedIds: [], checkedComments: [] });
    }

    /**
     * getting object of selected requests
    */
    getArrayWithComments = () => {
        var itemIds = {};
        this.state.checkedComments.map(number => {
            var commentValue = document.getElementById('comment_'+number).value;
            itemIds[number] = {'id':number, 'comment':commentValue};
        });
        return itemIds;
    }

    approveRequest = async() => {
        var objIdsComments = this.getArrayWithComments();
        var userData = {
            "status_code": 'A',
            "is_trainer": true,
            "id": this.state.checkedIds,
            "data_obj": objIdsComments
        };
        var response = patchRequests(userData);
        response.then( valueResponse => {
            if(valueResponse === true)
            {
                this.updateRequestTable();
                toast.success('Requests successfully was approved.');
            }
            else
                toast.error('Request failed. Report to the admin of the system.');
        });
    }

    rejectRequest = async() => {
        var objIdsComments = this.getArrayWithComments();
        var userData = {
            "status_code": 'R',
            "is_trainer": false,
            "id": this.state.checkedIds,
            "data_obj": objIdsComments
        };
        var response = patchRequests(userData);
        response.then( valueResponse => {
            if(valueResponse === true)
            {
                this.updateRequestTable();
                toast.success('Requests successfully was rejected.');
            }
            else
                toast.error('Request failed. Report to the admin of the system.');
        });
    }

    radioGetStatus = (event) => {
        this.state.requestsStatus = event.target.value;
        this.forceUpdate();
        this.updateRequestTable();
    }

    componentDidMount() {
        // view list of requests in status New
        var requestList = getRequestsList(this.state.requestsStatus);
        requestList.then( valueRequests => {
            this.setState({
                dataList: valueRequests,
                loading: false
            });  
        });
    }

    renderRequestItem(item) {
        var read_only = '';
        if(item.status_code === 'N')
            read_only = <input type="checkbox" value={item.author_id} data-item_id={item.id} onChange={this.onChange.bind(this)} />;
        var dateItem = new Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }).format(new Date(item.date));
        let username = `${item.author__first_name} ${item.author__last_name}`
        // value property can not be Null
        var comment = '';
        if(item.comment)
            comment = item.comment;
        return (
            <tr id={`request_${item.id}`} key={item.id}>
                <td align="center">{read_only}</td>
                <td>{item.id}</td>
                <td>{item.status_code}</td>
                <td className="date-td">{dateItem}</td>
                <td>{username} ({item.author_id})</td>
                <td className="comment-td">
                    <input type="text"
                           id={`comment_${item.id}`}
                           value={comment}
                           readOnly={this.checkReadOnly(item.id)}
                           onChange={e => this.onChangeCommentVal(e.target.value, item.id)} />
                </td>
            </tr>
        )
    }

    render() {
        return (
            <div id="requests-table" className="admin-tables">
                <Row>
                    <Col><h5>Requests to Become Trainers Table</h5></Col>
                </Row>
                <Row className="form-group text-center">
                        <Col className="text-nowrap">Show Requests in status:</Col>
                        <Col>
                            <input className="form-check-input" type="radio"
                                   name="statusNew" value="N"
                                   checked={(this.state.requestsStatus==='N')?true:false}
                                   onChange={(event) => {this.radioGetStatus(event)}}/>
                            <label className="form-check-label" htmlFor="statusNew">New</label>
                        </Col>
                        <Col>
                            <input className="form-check-input" type="radio"
                                   name="statusApproved" value="A"
                                   checked={(this.state.requestsStatus==='A')?true:false}
                                   onChange={(event) => {this.radioGetStatus(event)}}/>
                            <label className="form-check-label" htmlFor="statusApproved">Approved</label>
                        </Col>
                        <Col>
                            <input className="form-check-input" type="radio"
                                   name="statusRejected" value="R"
                                   checked={(this.state.requestsStatus==='R')?true:false}
                                   onChange={(event) => {this.radioGetStatus(event)}}/>
                            <label className="form-check-label" htmlFor="statusRejected">Rejected</label>
                        </Col>
                        <Col>
                            <input className="form-check-input" type="radio"
                                   name="statusAll" value="all"
                                   checked={(this.state.requestsStatus==='all')?true:false}
                                   onChange={(event) => {this.radioGetStatus(event)}}/>
                            <label className="form-check-label" htmlFor="statusAll">All</label>
                        </Col>
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
                                <ClipLoader
                                    css={override}
                                    sizeUnit={"px"}
                                    size={150}
                                    color={'#123abc'}
                                    loading={this.state.loading}
                                />
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <Row className="table-actions mt-3">
                    <Col>
                        <div>Select action with choosed requests of users ID: </div>
                        <div className="selected-items">
                            {this.state.checkedIds.map(number => 
                                <p key={number}>item: {number}</p>
                            )}
                        </div>
                        <Button type="button" className="btn-yellow" onClick={this.approveRequest}>Approve</Button>
                        <Button type="button" className="btn-grey" onClick={this.rejectRequest}>Reject</Button>
                        
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AdminRequests;