import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../assets/CSS/TempleAuthority.css";

import Regimg from "../../assets/images/User-regi-img.png";

function DevoteeRegistration() {
  return (
    <div>
      <Container className="temp-container">
        <div>
          <div className=" temple-registration-heading  ">
            <h1>User Registration</h1>
            <div>
              <Form>
                <Row>
                  <Col lg={6} md={6}>
                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className="temp-label">
                            Phone Number{" "}
                            <span className="temp-span-star">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Mobile No."
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
                            Devotee Name{" "}
                            <span className="temp-span-star">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="name"
                            className="temp-form-control-bg"
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={12} md={12} sm={12}>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className="temp-label">
                            Gender <span className="temp-span-star">*</span>
                          </Form.Label>
                          <Form.Select className="temp-form-control-option-bg">
                            <option value="Select an option">
                              Please Select
                            </option>
                            <option value="option1">Male</option>
                            <option value="option2">Female</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col lg={12} md={12} sm={12}>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className="temp-label">
                            Email <span className="temp-span-star">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Email"
                            className="temp-form-control-bg"
                          />
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
                              Register
                            </Button>
                          </Col>
                          <Col lg={12} md={12} sm={12} className="mt-3">
                            <Button
                              variant="danger"
                              className="temp-submit-btn-login"
                              type="submit"
                            >
                              Login
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </Row>
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <img src={Regimg} className="img-fluid" alt="images"></img>
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

export default DevoteeRegistration;
