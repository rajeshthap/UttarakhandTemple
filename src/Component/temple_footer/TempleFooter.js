import React from 'react'
import "../../assets/CSS/TempFooter.css";
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa';
import { Col, Row } from 'react-bootstrap';
function TempleFooter() {
  return (
    <div>
      <div className=' p-4'>

        <Row>
          <Col lg={6} md={6} sm={12} ><p>© 2025 Brainrock Consulting Services, All Right Reserved. | Design by <span className='footer-span'>Brainrock</span></p></Col>
          <Col lg={6} md={6} sm={12} className='temp-footer-title' > <span>
            <FaInstagramSquare className='footer-icon' />
            <FaFacebookSquare className='footer-icon' />
            <FaTwitterSquare className='footer-icon' />
          </span></Col>
        </Row>



      </div>
    </div>
  )
}

export default TempleFooter