import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//import { createBrowserHistory } from 'history';

import { Form, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            redirectToPage: false,
            inputValue: '',
            hideForm: 'flex'
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(input) {
        this.setState({
            inputValue: input.target.value,
            query: input.target.value
        })
    }

    searchButtonClick = () => {
        this.setState({ redirectToPage: true });
    }

    componentDidMount() {
        if(window.location.pathname === '/search') {
            this.setState({ hideForm: 'none' });
        }
    }

    render() {
        const {redirectToPage} = this.state;
        if(redirectToPage)
            return <Redirect to={{pathname: '/search', search: `?q=${this.state.inputValue}`, state: {searchQuery: this.state.inputValue}}}/>;

        return (
            <Form className="form" style={{display: this.state.hideForm}}>
                <Input type="search" id="search-input"
                        placeholder="Search..."
                        value={this.state.inputValue}
                        onChange={this.handleInputChange} />
                <Button id="search-button" onClick={this.searchButtonClick}>
                    <FontAwesomeIcon icon="search"/>
                </Button>
            </Form>
        )
    }
}

export default SearchForm;