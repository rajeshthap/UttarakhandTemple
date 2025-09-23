import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';


function ContactUs() {
  return (
    <div className='temp-donate'>  
         <Container className='temp-container p-4'>
      <Row>
        <Col lg={7} md={7} sm={12}>
          <h1>Contact Us</h1>
          <p>We are here to assist you with any queries, suggestions, or support related to Mahadevaya Portal. Reach out to us through the following channels:</p>
          <ul>
            <li>
              <b>Email:</b>{' '}
              <a href="mailto:admin@mahadevaaya.com">admin@mahadevaaya.com</a>
            </li>
            <li><b>Phone: </b> +91 8193991148</li>
            <li><b>Address: </b> 32, New Park Road Gandhi Gram, Kanwali Road Dehradun</li>
          </ul>
          <h2>Connect With Us:</h2>
          <ul>
            <li>Follow us on social media for updates on temples, priests, festivals, and special events.</li>
            <li>Submit your feedback or inquiries through our online contact form for prompt assistance.</li>
          </ul>
          <p>At Mahadevaya Portal, your spiritual journey matters to us. We are committed to providing support, guidance, and information to enhance your devotion and connection with Hindu traditions.</p>
        </Col>
        <Col lg={5} md={5} sm={12} className='tem-rhs'>

          <Form>
            <h2 className='pb-4'>Feel free to contact us if you need any assistance, any help or another question.
            </h2>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className='temp-label'>Name <span class="temp-span-star">*</span></Form.Label>
              <Form.Control type="email"
                placeholder="Enter Name"
                className='temp-form-control-bg-contact'
              />
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className='temp-label'>Email Address <span class="temp-span-star">*</span></Form.Label>
              <Form.Control type="Test"
                placeholder="Email address"
                className='temp-form-control-bg-contact'
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Message <span class="temp-span-star">*</span></Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>

            <Button variant="" className='temp-submit-btn' type="submit">
              Submit
            </Button>
          </Form>

        </Col>
      </Row>

    </Container></div>
  )
}

export default ContactUs