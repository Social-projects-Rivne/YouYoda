import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import moment from 'moment';

import { createBrowserHistory } from 'history';

import '../style/searchPage.css';
import { axiosGet } from '../api/axiosGet';


const API_URL = '/search';

class SearchContent extends Component {
    state = {
        query: '',
        countResults: 0,
        results: [],
        redirectToCourse: false,
        redirectToEvent: false,
        itemRedirect: [],
        searchURLVal: ''//this.parsingSearchQuery(this.props.location.search)
    }

    gotoPageLink = async(typeItem, item) => {
        //
        console.log('line 22');
        //const { redirectToCourse, redirectToEvent } = this.state;
        if(typeItem === 'course')
            await this.setState({ redirectToCourse: true, itemRedirect: item });
        else if(typeItem === 'event')
            await this.setState({ redirectToEvent: true, itemRedirect: item });
    }

    parsingSearchQuery = (string) => {
        var regExpVal = /[?&]?([^=]+)=([^&]*)/g;
        var params = {}, queryArray;
        while (queryArray = regExpVal.exec(string)) {
            params[decodeURIComponent(queryArray[1])] = decodeURIComponent(queryArray[2]);
        }
        console.log(params['q']);
        return params['q'];
    }

    getInfo = () => {
        axiosGet(`${API_URL}?q=${this.state.query}&limit=5`)
        .then(({ data, count }) => {
            this.setState({
                results: data,
                countResults: count
            })
        })
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 3) {
                if (this.state.query.length % 2 === 0) {
                    this.getInfo()
                }
            } 
        })
    }

    renderSearchResult(result, index) {
        var dataFields = result.fields;
        if(result.model==='appsrc.youyodauser') {
            return (
                <div className="search-item-result" key={index}>
                    <h4>Trainer {dataFields.first_name} {dataFields.last_name}</h4>
                    <div><span className="search-span">Location:</span> {dataFields.location}</div>
                    <div><span className="search-span">About:</span> {dataFields.about_me}</div>
                </div>
            )
        } else if(result.model==='appsrc.events') {
            var eventDate = moment.unix(dataFields.date).format('MMMM Do YYYY, h:mm a');
            return (
                <div className="search-item-result" key={index}>
                    <h4><span onClick={() => this.gotoPageLink('event', dataFields)}>Event "{dataFields.name}"</span></h4>
                    <div><span className="search-span">Location:</span> {dataFields.location}</div>
                    <div><span className="search-span">Date:</span> {eventDate}</div>
                    <div><span className="search-span">Description:</span> {dataFields.description}</div>
                </div>
            )
        }else if(result.model==='appsrc.courses') {
            var courseDate = moment.unix(dataFields.start_date).format('MMMM Do YYYY, h:mm a');
            return (
                <div className="search-item-result" key={index}>
                    <h4><span onClick={() => this.gotoPageLink('course', dataFields)}>Course "{dataFields.coursename}"</span></h4>
                    <div><span className="search-span">Status:</span> {dataFields.status}</div>
                    <div><span className="search-span">Location:</span> {dataFields.location}</div>
                    <div><span className="search-span">Start date:</span> {courseDate}</div>
                    <div><span className="search-span">Description:</span> {dataFields.description}</div>
                </div>
            )
        }
    }

    updateSearchURLVal = () => {
        let searchVal = '';
        if(this.props.location) {
            searchVal = this.parsingSearchQuery(this.props.location.search);
            console.log(searchVal);
            this.setState({
                searchURLVal: searchVal,
            });
        }
    }

    componentDidMount() {
        //this.updateSearchURLVal();
    }

    render() {
        //let history;
        //history = createBrowserHistory();
        //if(this.search)
        //    history.push(`${API_URL}?q=${this.search.value}`);
        if(this.search) {
            console.log('line 123 ='+this.search.value);
            if(!this.search.value && this.state.searchURLVal) {
                //this.search.value = this.state.searchURLVal;
                if(this.state.searchURLVal) {
                    //this.handleInputChange();
                    this.setState({
                        searchURLVal: '',
                    });
                }
                //let history;
                //history = createBrowserHistory();
                //history.push(`${API_URL}?q=${this.state.searchURLVal}`);
            }
            //if(this.state.searchURLVal)
            //    this.handleInputChange();
        }

        console.log(this.props);
        console.log(this.state);
        //console.log(history);
        const {redirectToCourse, redirectToEvent } = this.state;
        if(redirectToCourse)
            return <Redirect to={{pathname: '/course/detail', state: {course: this.state.itemRedirect}}}/>;
        else if(redirectToEvent)
            return <Redirect to={{pathname: '/event/detail', state: {event: this.state.itemRedirect}}}/>;

        return (
            <Container className="search-page-container">
                <h2>Search page</h2>
                <form>
                    <span className="ico-search-wrap"><input
                    type="text"
                    placeholder="Search for..."
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}
                    value={(this.search)?this.search.value:''}
                    />
                    </span>
                    <p>Was found {this.state.countResults} results for: "{this.state.query}"</p>
                </form>
                <div className="search-page-results">
                    {this.state.results.map( (result,index) => this.renderSearchResult(result, index) )}
                </div>
            </Container>
        )
    }
}

export default SearchContent;