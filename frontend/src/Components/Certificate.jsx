import React from 'react';

import { Container, Row, Col, Card, CardFooter, CardBody } from 'reactstrap';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';

import { defaultPhoto } from '../utils';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: #FFD466;
`;
const defImg = "/media/beautiful-crowd-cute-2869374.jpg";

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
        await this.setState({
            certificate,
            redirect: true
        });
        window.location.reload();
    }
    notResults = () => {
        if (this.props.certificateList.length == 0) {
            return (
                <Col className="d-flex align-items-center justify-content-center" style={{margin:'35px 15px', color:'#FFD466'}}>
                    <h2>Do, or do not. There is no certificates :(</h2>
                </Col>
            )
        }
        else {
            return this.props.certificateList.map( certificate => this.renderCertificate(certificate) )
        }
    }

    renderCertificate (certificate) {
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
                    {this.notResults()}
                </Row>
            </Container>
        )
    }
}
