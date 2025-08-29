import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../assets/CSS/TempleAuthority.css";
import Regimg1 from "../../assets/images/pandit-img.png"

function PanditLogin() {
  return (
    <div>
      <Container className="temp-container">
        <div>
          <div className="mt-3 temple-registration-heading p-3">
            <h1>Pandit Login</h1>
            <div>
              <Form>
                <Row className="mt-3">
                  <Col lg={6} md={6}>
                    <Row>
                      <Col lg={12} md={12} sm={12} className="mt-4">
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className="temp-label-lg-bg">
                            Email or Phone Number{" "}
                            <span className="temp-span-star">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Registered Mobile No."
                            className="temp-form-control-bg "
                          />
                        </Form.Group>
                      </Col>

                      <Col lg={12} md={12} sm={12}>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className="temp-label">
                            Password <span className="temp-span-star">*</span>
                          </Form.Label>
                          <div class="password-wrapper">
                            <Form.Control
                              type="password"
                              placeholder="Your Password"
                              className="temp-form-control-bg"
                            />
                            <i class="fa fa-eye toggle-password"></i>
                          </div>
                        </Form.Group>
                      </Col>

                      <div className="d-grid gap-3 text-center  mt-3">
                        <Row>
                          <Col lg={12} md={12} sm={12}>
                            <Button
                              variant="danger"
                              className="temp-submit-btn"
                              type="submit"
                            >
                              Login
                            </Button>
                          </Col>
                          <Col lg={12} md={12} sm={12} className="mt-3">
                            <Button
                              variant="danger"
                              className="temp-submit-btn-login"
                              type="submit"
                            >
                              Forget Password ?
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </Row>
                  </Col>
                  <Col lg={6} md={6} sm={12} className="d-flex justify-content-center align-items-center">
                    <div>
                      <img src={Regimg1} className="img-fluid" alt="images"></img>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default PanditLogin;
