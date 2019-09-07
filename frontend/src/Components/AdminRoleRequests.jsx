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
            checkedIds: [],
            checkedComments: [],
            readOnlyInputs: []
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

    checkReadOnly = (indexVal) => {
        // filters and sets state for selected data item for ability to change comment input
        let fileredItems = this.state.checkedComments.filter((value) => value === indexVal);
        if(fileredItems.length > 0)
            return false; //can write
        else
            return true; //only read
    }

    onChangeCommentVal(newValue, id) {
        // filters of data object which is changing and updates comment input value
        this.state.dataList.filter((value, index) => {
            if(value.id === id)
            {
                this.state.dataList[index].comment = newValue;
                this.forceUpdate();
            }
        });
    }

    updateRequestTable = () => {
        // update requests table    
        var requestList = getRequestsList('N');
        requestList.then( valueRequests => {
            this.setState({
                dataList: valueRequests
            });  
        });
        // clear selected items
        this.setState({ checkedIds: [], checkedComments: [] });
    }

    getArrayWithComments = () => {
        // getting object of selected requests
        var itemIds = {};
        this.state.checkedComments.map(number => {
            var commentValue = document.getElementById('comment_'+number).value;
             itemIds[number] = {'id':number, 'comment':commentValue};
        });
        return itemIds;
    }

    approveRequest = async() => {
        const URLPATH = 'user/totrainer';
        var objIdsComments = this.getArrayWithComments();
        const USERDATA = {
            "status_code": 'A',
            "is_trainer": true,
            "id": this.state.checkedIds,
            "data_obj": objIdsComments
        };
        try {
            await API.patch(URLPATH, USERDATA);
            toast.success('Requests successfully was approved.');
            this.updateRequestTable();
        } catch (error) {
            toast.error('Request failed. Report to the admin of the system.');
        }
    }

    rejectRequest = async() => {
        const URLPATH = 'user/totrainer';
        var objIdsComments = this.getArrayWithComments();
        const USERDATA = {
            "status_code": 'R',
            "is_trainer": false,
            "id": this.state.checkedIds,
            "data_obj": objIdsComments
        };
        try {
            await API.patch(URLPATH, USERDATA);
            toast.success('Requests successfully was rejected.');
            this.updateRequestTable();
        } catch (error) {
            toast.error('Request failed. Report to the admin of the system.');
        }
    }

    componentWillMount() {
        // view list of requests in status New
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
            read_only = <input type="checkbox" value={item.author_id} data-item_id={item.id} onChange={this.onChange.bind(this)} />;
        var dateItem = new Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }).format(new Date(item.date));
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
                <td>{item.author_id}</td>
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
                        <div>Select action with choosed requests of users ID: </div>
                        <div className="selected-items">
                            {this.state.checkedIds.map(number => 
                                <p key={number}>item: {number}</p>
                            )}
                        </div>
                        <Button type="button" onClick={this.approveRequest}>Approve</Button>
                        <Button type="button" onClick={this.rejectRequest}>Reject</Button>
                        
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AdminRequests;