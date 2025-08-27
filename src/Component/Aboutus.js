import React from 'react'
import { Col, Row } from 'react-bootstrap'
import "../assets/CSS/about.css"
import abootimg from "../assets/images/about-img.png"
const Aboutus = () => {
    return (
        <div>
            <div className='container-fluid p-0'>
                <div className='about-wrapper'>


                    <div className='container'>
                        <Row>
                            <Col> <img
                                src={abootimg}
                                alt="About by god"
                                className="img-fluid"
                            ></img></Col>
                            <Col className='text-start'>
                                <h1>About Us</h1>
                                <h4>Temples of Uttarakhand – The Devbhumi (Land of the Gods)</h4>
                                <p>Uttarakhand, often called Devbhumi, is a spiritual haven nestled in the lap of the Himalayas. This northern Indian state is home to countless ancient temples, each holding historical, mythological, and cultural significance. From world-famous pilgrimage circuits to hidden village shrines, Uttarakhand attracts millions of devotees, spiritual seekers, and tourists every year.</p>
                                <h4>Importance of Temples in Uttarakhand</h4>
                                <ul>
                                    <li>Spiritual Significance – The temples are deeply connected to Hindu mythology, especially stories from the Mahabharata, Ramayana, and Puranas.</li>
                                    <li>Pilgrimage Centers – Uttarakhand houses the Char Dham Yatra (Badrinath, Kedarnath, Gangotri, Yamunotri) and Panch Kedar, Panch Prayag, Panch Badri temples.</li>
                                    <li>Cultural Heritage – Temples are built in unique Kumaoni and Garhwali architectural styles, often with stone carvings, wooden structures, and intricate idols.</li>
                                    <li>Natural Beauty – Many temples are situated amidst snow-capped mountains, lush valleys, and riverbanks, adding a divine charm to the surroundings.</li>
                                </ul>
                            </Col>


                        </Row>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Aboutus
