import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../assets/CSS/TempleAuthority.css";

function TempleAuthority() {
  return (
    <div>
      <Container className="temp-container">
        <div>
          <div className="mt-3 temple-registration-heading p-3">
            <h1>Temple Registration</h1>
            <div>
              <Form>
                <Row className="mt-4">
                  <Col lg={4} md={4} sm={4}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Temple Name <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder=""
                        className="temp-form-control"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={4}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Temple Type <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Select className="temp-form-control-option">
                        <option value="Select an option">
                          Select an Temple
                        </option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={4}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Temple Facility{" "}
                        <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Select className="temp-form-control-option">
                        <option value="Select an option">
                          Select an Facility
                        </option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={4}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Temple Address <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder=""
                        className="temp-form-control"
                      />
                    </Form.Group>
                  </Col>
                   <Col lg={4} md={4} sm={4}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Country <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Select className="temp-form-control-option">
                        <option value="Select an option">
                          Select an Country
                        </option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                     <Col lg={4} md={4} sm={4}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        State <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Select className="temp-form-control-option">
                        <option value="Select an option">
                          Select an State
                        </option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                     <Col lg={4} md={4} sm={4}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        City <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Select className="temp-form-control-option">
                        <option value="Select an option">
                          Select an City
                        </option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={4}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        ZipCode <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Select className="temp-form-control-option">
                        <option value="Select an option">
                          Select an ZipCode
                        </option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </Form.Select>
                    </Form.Group>
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

export default TempleAuthority;
