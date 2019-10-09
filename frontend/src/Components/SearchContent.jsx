import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import moment from 'moment';

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
        redirectToTrainer: false,
        itemRedirect: []
    }

    gotoPageLink = (typeItem, item) => {
        if(typeItem === 'course')
            this.setState({ redirectToCourse: true, itemRedirect: item });
        else if(typeItem === 'event')
            this.setState({ redirectToEvent: true, itemRedirect: item });
        else if(typeItem === 'trainer')
            this.setState({ redirectToTrainer: true, itemRedirect: item });
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
                this.getInfo()
            } 
        })
    }

    renderSearchResult(result, index) {
        var dataFields = result.fields;
        if(result.model==='appsrc.youyodauser') {
            return (
                <div className="search-item-result" key={index}>
                    <h4><span onClick={() => this.gotoPageLink('trainer', dataFields)}>Trainer {dataFields.first_name} {dataFields.last_name}</span></h4>
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

    componentDidMount() {
        if(this.props.location.search) {
            var {searchQuery} = this.props.location.state;
            if(searchQuery) {
                var inputSearch = document.getElementById('search-input-onpage');
                var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
                nativeInputValueSetter.call(inputSearch, searchQuery);
                var eventNew = new Event('input', { bubbles: true});
                inputSearch.dispatchEvent(eventNew);
            }
        }
    }

    render() {
        const {redirectToCourse, redirectToEvent, redirectToTrainer } = this.state;
        if(redirectToCourse)
            return <Redirect to={{pathname: '/course/detail', state: {course: this.state.itemRedirect}}}/>;
        else if(redirectToEvent)
            return <Redirect to={{pathname: '/event/detail', state: {event: this.state.itemRedirect}}}/>;
        else if(redirectToTrainer)
            return <Redirect to={{pathname: '/trainer/page', state: {trainer_id: this.state.itemRedirect.id}}}/>;

        return (
            <Container className="search-page-container">
                <h2>Search page</h2>
                <form>
                    <span className="ico-search-wrap"><input
                    id="search-input-onpage"
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