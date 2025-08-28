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
