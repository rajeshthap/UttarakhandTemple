import React, { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import "../../assets/CSS/PaymentCard.css"
import hdfc from "../../assets/images/hdfc.png"
import billdesk from "../../assets/images/billdesk.png"
import { useNavigate } from "react-router-dom"; 
const PaymentConfirmation = () => {
      const navigate = useNavigate();
    useEffect(() => {
  // Push the current page into history so user can't go back
  window.history.pushState(null, "", window.location.href);

  const handlePopState = () => {
    // Disable back button by re-pushing the same page
    window.history.pushState(null, "", window.location.href);
  };

  // Use lowercase 'popstate'
  window.addEventListener("popstate", handlePopState);

  return () => {
    window.removeEventListener("popstate", handlePopState);
  };
}, [navigate]); 
    return (
        <div>
            <Container className="temp-container">
                <h1>Donation Received – Payment Confirmation</h1>
                <p><i>A receipt has been generated and sent to your registered email.</i></p>
                <Row>
                    <Col lg={8} md={8} sm={12} className="mt-2">
                        <Row className='temp-payment-card'>
                            <Col lg={8} md={8} sm={12}>
                                <div><img src={hdfc} className="img-fluid mt-5" alt="images"></img></div>
                                <div className='mt-4'><Button variant="" className='temp-submit-btn' >
                                    Confirm and Make Payment
                                </Button></div>

                            </Col>
                            <Col lg={4} md={4} sm={12} >
                                <h1 className='mt-2'>HDFC</h1>
                                <div className='payment-type'>
                                    <h3>NetBanking</h3>
                                    <p>Transaction Charges - Nil</p>
                                </div>
                                <div className='payment-type'>
                                    <h3>Credit Card</h3>
                                    <p>Transaction Charges - Nil</p>
                                </div>
                                <div className='payment-type'>
                                    <h3>Debit Card</h3>
                                    <p>Transaction Charges - Nil</p>
                                </div>
                                <div className='payment-type'>
                                    <h3>UPI and Bharat QR</h3>
                                    <p>Transaction Charges - Nil</p>
                                </div>
                            </Col>
                        </Row>

                        <Row className='temp-payment-card mt-2'>
                            <Col lg={8} md={8} sm={12}>
                                <div><img src={billdesk} className="img-fluid mt-5" alt="images"></img></div>
                                <div className='mt-4'><Button variant="" className='temp-submit-btn' >
                                    Confirm and Make Payment
                                </Button></div>

                            </Col>
                            <Col lg={4} md={4} sm={12} >
                                <h1 className='mt-2'>Billdesk</h1>
                                <div className='payment-type'>
                                    <h3>NetBanking</h3>
                                    <p>Transaction Charges - Nil</p>
                                </div>
                                <div className='payment-type'>
                                    <h3>Credit Card</h3>
                                    <p>Transaction Charges - Nil</p>
                                </div>
                                <div className='payment-type'>
                                    <h3>Debit Card</h3>
                                    <p>Transaction Charges - Nil</p>
                                </div>

                            </Col>
                        </Row>

                    </Col>


                    <Col lg={4} md={4} sm={12} className="mt-2 ">
                        <div className='tem-rhs payment-info'>
                            <h3 className='divder'>Donation Summary</h3>
                            <ul>
                                <li>Amount Rs.501/-
                                </li>
                                <li>Please verify the amount before proceeding for online payment.</li>
                            </ul>
                            <h3 className='divder'>Devotee's Name</h3>
                            <h2 className='mb-4'>Rajesh Thapliyal</h2>
                            <h3 className='divder'>Reference Number</h3>
                            <h2>ODBNH2708202590253475</h2>
                            <p>For any further communication, this Payment Reference Number may be used.</p>
                            <h3 className='divder'>Donating To</h3>
                            <h2>Shri Badarinath Dham</h2>

                        </div>
                    </Col>
                </Row></Container>
        </div>
    )
}

export default PaymentConfirmation
