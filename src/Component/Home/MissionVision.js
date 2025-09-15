import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Missionimg from "../../assets/images/Mission-img.png";
function MissionVision() {
  return (
    <div>
      <Container className='temp-container p-4'>
        <Row>
          <Col lg={7} md={7} sm={12}>

            <h1>Mission & Vision</h1>
            <h2>Mission</h2>
            <p>Our mission is to create a unified platform that connects devotees, priests, and temples, promoting the preservation and practice of Hindu spiritual traditions. We aim to provide authentic information on deities, facilitate temple and priest registrations, and make religious practices accessible, organized, and meaningful for all.</p>
            <h2>Vision</h2>
            <p>Our vision is to become the leading digital hub for Hindu spirituality, fostering devotion, knowledge, and community engagement. We aspire to strengthen the bond between devotees and temples while preserving the rich cultural heritage of Hinduism for generations to come.</p>

          </Col>
          <Col lg={5} md={5} sm={12}>
            <div className="d-flex justify-content-end">
              <img src={Missionimg} className="img-fluid" alt="Mission & Vision" />
            </div>
          </Col>
        </Row>

      </Container></div>
  )
}

export default MissionVision