import React from 'react'
import { Modal, Button, Col } from 'react-bootstrap';
import "../../CustomCss/custom.css"
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';
const OTPModel = ({ show, handleClose }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/PaymentConfirmation");
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose} centered size="md" className='text-center'>
                <Modal.Header closeButton>
                    <Modal.Title className='otp-model'><h1>Please Verify OTP</h1>
                        <p>OTP sent to your mobile (XXXXXX6576) Please enter it below to continue.</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Col lg={12} md={12} sm={12}>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >

                            <Form.Control
                                type="text"
                                placeholder=""
                                className="temp-form-control"
                            />
                        </Form.Group>
                    </Col>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='model-btn' variant="" onClick={handleClick}>
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default OTPModel
