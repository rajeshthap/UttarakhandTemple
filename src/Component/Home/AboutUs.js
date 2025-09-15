import React from 'react'
import aboutimg from "../../assets/images/about-inner-img.png";
import { Row, Col, Container } from 'react-bootstrap';
function AboutUs() {
  return (
    <div className='p-4' style={{ textAlign: "Justify" }}>
      <Container className='temp-container p-4'>
        <Row>
          <Col lg={7} md={7} sm={12}>
            <h1>About Us</h1>
            <h2>Welcome to Mahadevaya Portal</h2>
            <p>Mahadevaya Portal is your comprehensive gateway to the spiritual heritage of Hinduism. Designed to connect devotees, priests, and temple authorities, our platform offers seamless access to sacred knowledge and administrative support.</p>
            <h2>Temple Registration</h2>
            <p>Register your temple with Mahadevaya Portal to ensure it is recognized and connected with the larger Hindu spiritual network. Temple registration allows devotees to discover your temple, participate in events, and contribute to the preservation of our rich cultural and religious traditions.</p>
            <h2>Priest Registration</h2>
            <p>Priests play a vital role in guiding devotees and performing sacred rituals. Through Mahadevaya Portal, priests can register themselves to be part of a verified network, making it easier for devotees to seek authentic spiritual guidance, book ceremonies, and access priestly resources.</p>
            <h2>Information on Gods and Goddesses</h2>
            <p>Discover detailed profiles, stories, and significance of various deities of the Hindu religion. From Lord Shiva and Goddess Parvati to Lord Vishnu, Goddess Lakshmi, and many more, Mahadevaya Portal provides accurate and engaging information to deepen your spiritual knowledge and devotion.</p>
            <h2>Our Mission</h2>
            <p> Mahadevaya Portal is committed to promoting faith, devotion, and spiritual awareness. By bridging the gap between devotees, temples, and priests, we aim to make Hindu spiritual practices accessible, organized, and meaningful in the modern era.</p>

          </Col>
          <Col lg={5} md={5} sm={12}>
            <div className="d-flex justify-content-end">
              <img src={aboutimg} className="img-fluid" alt="User Registration" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AboutUs