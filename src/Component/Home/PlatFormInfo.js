import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Platform from "../../assets/images/Platform-img.png";
function PlatFormInfo() {
  return (
    <div className='p-4'>
      <Container className='temp-container p-4'>
        <Row>
          <Col lg={7} md={7} sm={12}>
            <h1>Platform Information</h1>

            <p>Mahadevaya Portal is a comprehensive digital platform dedicated to the Hindu spiritual ecosystem. It serves as a bridge between devotees, temples, and priests, offering a seamless experience for spiritual engagement and administrative convenience.</p>
            <h2>Key Features:</h2>
            <ul>

              <li><b>Temple Registration:</b> Temples can register to be part of a verified network, making it easier for devotees to locate and connect with them.</li>
              <li><b>Priest Registration:</b> Priests can register to offer authentic spiritual guidance, perform ceremonies, and be accessible to devotees</li>
              <li><b>Deity Information:</b> Explore detailed profiles, stories, and significance of Hindu gods and goddesses to deepen spiritual knowledge.</li>
              <li><b>Community Engagement:</b> Participate in events, rituals, and spiritual programs through a connected and organized system.</li>
            </ul>
            <p>Mahadevaya Portal is designed to preserve Hindu traditions, promote devotion, and provide structured access to spiritual resources in the modern digital era.</p>

          </Col>
          <Col lg={5} md={5} sm={12}>
            <div className="d-flex justify-content-end">
              <img src={Platform} className="img-fluid" alt="Platform Information" />
            </div>
          </Col>
        </Row>

      </Container>
    </div>
  )
}

export default PlatFormInfo