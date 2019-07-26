import React from 'react';
import {
    Container,
    Row,
    Col } from 'reactstrap';


class Footer extends React.Component{
  render(){
    return (
      <>
      <footer className="footer">
        <section>
          <Container>
            <Row>
              <Col md="4">
                <form className="form" action="#" method="post">
                  <label className="inp m-btm-40" for="text">
                    <input type="text" id="text"></input>
                    <label for="text">Name</label>
                  </label>
                  <label className="inp" for="email">
                    <input type="email" id="email" required></input>
                    <label for="email">Email</label>
                  </label>
                  <div className="wrapper">
                    <button className="button error">Submit</button>
                    </div>
                </form>
              </Col>
              <Col>
                <div className="logo-footer">
                  <img src="img/2_kopya.png" alt="logo" />
                  <span>Better every day</span>
                </div>
                <div className="soc">
                  <ul>
                    <li className="facebook">
                      <i className="fab fa-facebook " aria-hidden="true"></i>
                    </li>
                    <li className="twitter">
                      <i className="fab fa-twitter" aria-hidden="true"></i>
                    </li>
                    <li className="instagram">
                      <i className="fab fa-instagram fa-2x" aria-hidden="true"></i>
                    </li>
                    <li className="whatsapp">
                      <i className="fab fa-whatsapp fa-2x" aria-hidden="true"></i>
                    </li>
                  </ul>
                  </div>
              </Col>
            </Row>
          </Container>
        </section>
        </footer>
      </>
      )
  }
}

export default Footer;
