import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import templeevent from "../../assets/images/temple-event.png";
function SpecialAnnouncements() {
  return (
    <div>     <Container className='temp-container p-4'>
      <Row>
        <Col lg={7} md={7} sm={12}>
          <h1>Special Announcements & Upcoming Events</h1>

          <p>Stay updated with the latest happenings in the Hindu spiritual community through <b>Mahadevaya Portal</b>. Our platform brings you timely information about important events, festivals, and announcements from temples and spiritual organizations.</p>
          <h2>Special Announcements:</h2>
          <ul>
            <li>Notifications about newly registered temples and priests.</li>
            <li>Updates on spiritual programs, workshops, and religious initiatives.</li>
            <li>Important notices related to rituals, festivals, or community gatherings.</li>
          </ul>
          <h2>Upcoming Events:</h2>
          <ul>
            <li>Celebrate major Hindu festivals with your local temples and priests.</li>
            <li>Participate in special poojas, rituals, and spiritual discourses.</li>
            <li>Join online and offline events designed to enrich devotion and knowledge.</li>

          </ul>
          <h2>Stay Connected:</h2>
          <p>Mahadevaya Portal ensures you never miss a significant spiritual event. Engage, participate, and celebrate the divine moments with the community.</p>
        </Col>
        <Col lg={5} md={5} sm={12}>
          <div className="d-flex justify-content-end">
            <img src={templeevent} className="img-fluid" alt="Special Announcements & Upcoming Events" />
          </div>
        </Col>
      </Row>

    </Container></div>
  )
}

export default SpecialAnnouncements