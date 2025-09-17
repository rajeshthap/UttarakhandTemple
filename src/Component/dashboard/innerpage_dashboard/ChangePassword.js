import React from "react";
import "../../../assets/CSS/LeftNav.css";
import LeftNav from "../LeftNav";
import { Form,Button,Row,Col } from "react-bootstrap";



const ChangePassword = () => {
  return (
    <>
      {/* Main Wrapper */}
      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <LeftNav />
        </aside>

        {/* Right-hand Main Container */}
        <main className="main-container">
          <div className="content-box">
              <div className="nd-tech-heading">
                <h1>Profile Details</h1>
              </div>
              <Row>
                <Form>
                  <Row>
                    <Col lg={4} md={4} sm={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Login Type</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Temple" disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control
                             type="password" disabled value="........"
                          
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="deeps"  disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label> Mobile No.</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="9876543210"  disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Type New Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Type New Password"
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Confirm your Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Confirm your Password"
                        />
                      </Form.Group>
                    </Col>
                    <div className="project-btn ">
                    <Button className="temp-submit-btn">Edit Password</Button>
                   
                    </div>
                  </Row>
                </Form>
              </Row>
          </div>
        </main>
      </div>
    </>
  );
};

export default ChangePassword;
