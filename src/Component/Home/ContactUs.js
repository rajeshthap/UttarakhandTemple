import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
function ContactUs() {
  return (
    <div>      <Container className='temp-container p-4'>
      <Row>
        <Col lg={7} md={7} sm={12}>
          <h1>Contact Us</h1>
          <p>We are here to assist you with any queries, suggestions, or support related to Mahadevaya Portal. Reach out to us through the following channels:</p>
          <ul>
            <li><b>Email:</b> support@mahadevaya.com</li>
            <li><b>Phone: </b> +91-XXXXXXXXXX</li>
            <li><b>Address: </b> CASP Bhavan 132/2, Plot No 3, Baner - Pashan Link Rd, Pashan UK</li>
          </ul>
          <h2>Connect With Us:</h2>
          <ul>
            <li>Follow us on social media for updates on temples, priests, festivals, and special events.</li>
            <li>Submit your feedback or inquiries through our online contact form for prompt assistance.</li>
          </ul>
          <p>At Mahadevaya Portal, your spiritual journey matters to us. We are committed to providing support, guidance, and information to enhance your devotion and connection with Hindu traditions.</p>
        </Col>
        <Col lg={5} md={5} sm={12}>


        </Col>
      </Row>

    </Container></div>
  )
}

export default ContactUs