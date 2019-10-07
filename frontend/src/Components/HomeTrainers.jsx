import React from 'react';

import { Container, Row, Col } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';

import { axiosGet } from '../api/axiosGet';
import { defaultPhoto, DEFAULT_AVATAR_URL } from '../utils'


export default class HomeTrainers extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            trainerList: [],
        };
    }
    async componentWillMount() {
        let listTrainer = await axiosGet('trainer/top');
        this.setState({
                trainerList: listTrainer,
            });
    }

    handleClick = (trainer) => {
       this.setState({ redirect: true, trainer });
    };

    renderTrainers = (trainer) => {
        let coverImg = defaultPhoto(DEFAULT_AVATAR_URL, trainer.avatar_url);
        return (
            <Col xl="3" lg="6" md="12">
                <Link to={{
                        pathname: '/trainer/page',
                        state: {'trainer_id':trainer.id}
                    }}
                >
                    <div >
                        <img src={coverImg} alt="trainer-photo" className="trainer-photo"/>
                    </div>
                    <p className="trainer-name">{`${trainer.first_name} ${trainer.last_name}`}</p>
                    <p className="trainer-title">{trainer.username}</p>
                </Link>
            </Col>
        )
    }
    render (){
        const { redirect } = this.state;
        if (redirect) {
           return <Redirect to={{pathname: '/p', state: {trainer_id: this.state.trainer.id}}}/>;
        }
        return(
            <div id="home-trainer">
            <Container className="home-trainers">
            <Row>
                <Col className="header-block">
                    <h1>Top Trainers</h1>
                    <p className="main-text">People are busy.
                    So, this UI Kit let’s you customize,
                    build and deploy your landing page,<br/>
                    so you can start selling your product
                    to potential customers.</p>
                </Col>
            </Row>
            <Row>
                {this.state.trainerList.map( trainer => this.renderTrainers(trainer) )}
            </Row>
            </Container>
            </div>
        )
    }
};
