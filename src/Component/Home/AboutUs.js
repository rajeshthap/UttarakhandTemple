import React from 'react'
import Regimg from "../../assets/images/User-regi-img.png";
import { Row, Col } from 'react-bootstrap';
function AboutUs() {
  return (
    <div className='p-4' style={{textAlign:"Justify"}}>
      <Row>
        <Col lg={8} md={8} sm={12}>
        Welcome to Mahadevaya Portal
Mahadevaya Portal is your comprehensive gateway to the spiritual heritage of Hinduism. Designed to connect devotees, priests, and temple authorities, our platform offers seamless access to sacred knowledge and administrative support.
Temple Registration
Register your temple with Mahadevaya Portal to ensure it is recognized and connected with the larger Hindu spiritual network. Temple registration allows devotees to discover your temple, participate in events, and contribute to the preservation of our rich cultural and religious traditions.
Priest Registration
Priests play a vital role in guiding devotees and performing sacred rituals. Through Mahadevaya Portal, priests can register themselves to be part of a verified network, making it easier for devotees to seek authentic spiritual guidance, book ceremonies, and access priestly resources.
Information on Gods and Goddesses
Discover detailed profiles, stories, and significance of various deities of the Hindu religion. From Lord Shiva and Goddess Parvati to Lord Vishnu, Goddess Lakshmi, and many more, Mahadevaya Portal provides accurate and engaging information to deepen your spiritual knowledge and devotion.
Our Mission
Mahadevaya Portal is committed to promoting faith, devotion, and spiritual awareness. By bridging the gap between devotees, temples, and priests, we aim to make Hindu spiritual practices accessible, organized, and meaningful in the modern era.

        </Col>
        <Col lg={4} md={4} sm={12}>
        <div className="d-flex justify-content-end">
         <img src={Regimg} className="img-fluid" alt="User Registration" />
         </div>
        </Col>
      </Row>
    </div>
  )
}

export default AboutUs