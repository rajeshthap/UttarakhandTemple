import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';

const DonateTemples = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/ExtendYourDivine");
    };

    return (
        <div>
            <Container className="temp-container">
                <h1>How to Make Donations?</h1>
                <Row>
                    <Col lg={8} md={8} sm={12} className="mt-2">
                        <h2>Online Donation</h2>
                        <p>Contribute to the temple from anywhere and support the sacred rituals, daily poojas, and community services. Your offerings help preserve ancient traditions and promote spiritual well-being.</p>
                        <Button variant="danger" onClick={handleClick}>
                            Donate Now
                        </Button>
                        <h2 className='pt-4'>Offline Donation (Bank Deposit)</h2>
                        <p>You can support our temple through direct bank deposit. Please use the details below to make your contribution:</p>
                        <span><b>Bank Account Details:</b></span>
                        <ul>
                            <li><b>Account Name:</b> Uttarakhand Temple Trust</li>
                            <li><b>Bank Name:</b> Devbhumi National Bank</li>
                            <li><b>Account Number:</b> 123456789012</li>
                            <li><b>IFSC Code:</b> DEVN0001234</li>
                            <li><b>Branch:</b> Haridwar Main Branch</li>
                        </ul>
                    </Col>

                    <Col lg={4} md={4} sm={12} className="mt-2 ">
                        <div className='tem-rhs'>
                            <h3>Support Our Sacred Mission</h3>
                            <p>Your contributions play a vital role in preserving the temple’s heritage and supporting community services. Every donation, big or small, makes a difference.</p>

                            <h2>How You Can Contribute</h2>
                            <div className='px-4'>
                                <h4 className='pt-3'>Direct Bank Deposit</h4>
                                <p>Securely transfer your donation to our official bank account.</p>
                                <h4>In-Person Contributions</h4>
                                <p>Visit our temple office to donate via cash, cheque, or card.</p>
                                <h4>Special Purpose Donations</h4>
                                <p>Sponsor rituals, festivals, or welfare programs to leave a lasting impact.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default DonateTemples;
