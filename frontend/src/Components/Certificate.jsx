import React from 'react';

import { Container, Row, Col, Card, CardTitle, CardText, CardHeader, CardFooter, CardBody } from 'reactstrap';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { Redirect, Link } from 'react-router-dom'

import { defaultPhoto } from '../utils';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: #FFD466;
`;

export default class Certificate extends React.Component{
    constructor(props) {
      super(props);

      this.state = {
          redirect: false,
      }
    }

    componentWillMount(){
      this.setState({loading: true})
  }

    componentDidMount(){
        this.setState({loading: false})
    }

    handleClick = async (certificate) => {
        await this.setState({ certificate });
        await this.setState({ redirect: true });
        window.location.reload();
    }

    renderCertificate (certificate) {
        let defImg = "/media/beautiful-crowd-cute-2869374.jpg";
        let coverImg = defaultPhoto(defImg, certificate.image_url);
        
        return (
            <Col sm="12" md="6" lg="4" xl={this.props.lg}>
            
                    <Card className="event-card">
                        <CardBody className="event-body">
                            <img width="100%" src={coverImg} alt={certificate.certificatename}/>  
                        </CardBody>
                        <CardFooter className="card-event-footer">
                            <p>{certificate.description}</p>
                        </CardFooter>
                    </Card>
                
            </Col>
        )
    }

    render(){
        return (
            <Container>
                <div className='sweet-loading'>
                    <ClipLoader
                      css={override}
                      sizeUnit={"px"}
                      size={150}
                      color={'#123abc'}
                      loading={this.props.loading}
                    />
                </div>
                <Row>
                    {this.props.certificateList.map( certificate => this.renderCertificate(certificate) )}
                </Row>
            </Container>
        )
    }
}
