import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Mandirimg from "../../assets/images/Mandir-img.png";
function MandirMahadevaya() {
  return (
    <div className='p-4'>
      <Container className='temp-container p-4'>
        <Row>
          <Col lg={7} md={7} sm={12}>
            <h1>Mandir & Mahadevaya Platform Overview</h1>

            <p><b>Mahadevaya Portal</b> is a unique digital platform dedicated to connecting devotees, priests, and temples across India. It serves as a bridge between faith, knowledge, and community, making spiritual practices more organized and accessible.</p>
            <h2>Mandir Overview</h2>
            <p>Temples are not just places of worship—they are centres of culture, devotion, and community service. By registering your temple on Mahadevaya Portal, you can:</p>
            <ul>
              <li>Share information about your temple and its history.</li>
              <li>List rituals, festivals, and special events.</li>
              <li>Connect with devotees seeking guidance and participation.</li>
            </ul>



            <h2>Platform Overview:</h2>
            <p>Mahadevaya Portal offers a wide range of features to support spiritual engagement:</p>
            <ul>
              <li><b>Priest Registration:</b> Verified priests can offer guidance, perform rituals, and connect with devotees.</li>
              <li><b>Deity Information:</b> Access authentic knowledge about Hindu gods and goddesses, their significance, stories, and rituals.</li>
              <li><b>Community Participation:</b> Join events, festivals, and spiritual programs organized by temples and priests.</li>
            </ul>

            <p>Our goal is to preserve and promote Hindu traditions while making the spiritual experience modern, convenient, and deeply meaningful.</p>

          </Col>
          <Col lg={5} md={5} sm={12}>
            <div className="d-flex justify-content-end">
              <img src={Mandirimg} className="img-fluid" alt="Mandir & Mahadevaya Platform Overview" />
            </div>
          </Col>
        </Row>

      </Container>
    </div>
  )
}

export default MandirMahadevaya