import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useState } from 'react';
import Form from "react-bootstrap/Form";
import OTPModel from '../OTPModel/OTPModel';
const ExtendYourDivine = () => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <div>
            <Container className="temp-container">
                <h1>Extend Your Divine Support</h1>
                <p><i>Your support helps us preserve sacred traditions, maintain temple facilities, and serve the community with devotion and care. </i></p>
                <Row>
                    <Col lg={8} md={8} sm={12} className="mt-2"><h2>Personal Details</h2>
                        <Row className="mt-4">
                            <Col lg={6} md={6} sm={12}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label className="temp-label">
                                        Select Temple <span className="temp-span-star">*</span>
                                    </Form.Label>
                                    <Form.Select className="temp-form-control-option">
                                        <option value="">Select Temple Type</option>
                                        <option value="shiv">Shiv Temple</option>
                                        <option value="vishnu">Vishnu Temple</option>
                                        <option value="durga">Durga Temple</option>
                                        <option value="ganesh">Ganesh Temple</option>
                                        <option value="hanuman">Hanuman Temple</option>
                                        <option value="other">Other</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label className="temp-label">
                                        Amount (Rs.) <span className="temp-span-star">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        className="temp-form-control"
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label className="temp-label">
                                        Pilgrim Name <span className="temp-span-star">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        className="temp-form-control"
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label className="temp-label">
                                        Mobile Number <span className="temp-span-star">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        className="temp-form-control"
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <Form.Group controlId="donationFor">
                                    <Form.Label>Donation For <span className="temp-span-star">*</span></Form.Label>
                                    <Form.Select aria-label="Select donation purpose">
                                        <option>Select Purpose</option>
                                        <option value="temple">Temple Maintenance</option>
                                        <option value="festivals">Festivals & Events</option>
                                        <option value="charity">Charity & Welfare</option>
                                        <option value="education">Religious Education</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <h2 className='pt-4'>Address Details</h2>
                            <Col lg={6} md={6} sm={12}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label className="temp-label">
                                        Country <span className="temp-span-star">*</span>
                                    </Form.Label>
                                    <Form.Select className="temp-form-control-option">
                                        <option value="Select an option">
                                            Select a Country
                                        </option>
                                        <option value="option1">Option 1</option>
                                        <option value="option2">Option 2</option>
                                        <option value="option3">Option 3</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label className="temp-label">
                                        State <span className="temp-span-star">*</span>
                                    </Form.Label>
                                    <Form.Select className="temp-form-control-option">
                                        <option value="Select a option">
                                            Select an State
                                        </option>
                                        <option value="option1">Option 1</option>
                                        <option value="option2">Option 2</option>
                                        <option value="option3">Option 3</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label className="temp-label">
                                        City <span className="temp-span-star">*</span>
                                    </Form.Label>
                                    <Form.Select className="temp-form-control-option">
                                        <option value="Select a option">Select an City</option>
                                        <option value="option1">Option 1</option>
                                        <option value="option2">Option 2</option>
                                        <option value="option3">Option 3</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label className="temp-label">
                                        Address <span className="temp-span-star">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder=""
                                        className="temp-form-control"
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label className="temp-label">
                                        ZipCode <span className="temp-span-star">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder=""
                                        className="temp-form-control"
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label className="temp-label">
                                        Email <span className="temp-span-star">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder=""
                                        className="temp-form-control"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="gap-3 mt-3 mb-3 Temp-btn-submit">
                            <Button
                                variant="temp-submit-btn"
                                className="temp-submit-btn mx-3"
                                type="submit"
                                onClick={handleShow}
                            >
                                Registration Now
                            </Button>
                            <Button
                                variant="secondary"
                                className="temp-cancle-btn"
                                type="button"
                            >
                                Cancel
                            </Button>
                        </div>
                    </Col>
                    <Col lg={4} md={4} sm={12} className="mt-2 ">
                        <div className='tem-rhs'><h3>Guidelines for Online Donation</h3>

                            <div>

                                <ul>
                                    <li>Fields marked with <span className="temp-span-star">* </span>are mandatory.</li>

                                    <li>As per Government of India (GOI) regulations, <span className="temp-span-star">foreign cards are not supported</span>. Devotees residing outside <span className="temp-span-star">India may donate through Indian payment modes/cards </span>only.</li>
                                    <li>Donations above <span className="temp-span-star">₹1,00,000 </span> entitle you to <span className="temp-span-star">free Puja and Darshan for one year</span>.</li>
                                    <li>Donations can be made <span className="temp-span-star">on any day</span>, even when the temple is closed.</li>
                                </ul>
                                <h2>Accepted Payment Methods</h2>
                                <ul>
                                    <li>Net Banking – Secure online transfers through major Indian banks.</li>
                                    <li>Debit Card – Quick and convenient payment using your bank card.</li>
                                    <li>Credit Card – Hassle-free donations with instant confirmation.</li>
                                    <li>UPI (Unified Payments Interface) – Fast, mobile-based payment option.</li>
                                    <li>BharatPe QR – Scan & Pay instantly via supported payment apps.</li>
                                </ul>
                            </div>


                        </div>


                    </Col>



                </Row></Container>
            <OTPModel show={show} handleClose={handleClose} />
        </div>
    )
}

export default ExtendYourDivine
