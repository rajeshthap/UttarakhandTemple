import React from 'react'
 import "../../assets/CSS/TempFooter.css";
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa';
function TempleFooter() {
  return (
    <div>
        <div className='temp-footer-title p-4'>
            <p>© 2025 Brainrock Consulting Services, All Right Reserved. | Design by <span className='footer-span'>Brainrock</span></p>
            <span>
                <FaInstagramSquare className='footer-icon' />
                <FaFacebookSquare className='footer-icon' />
                <FaTwitterSquare className='footer-icon' />
            </span>
        </div>
    </div>
  )
}

export default TempleFooter