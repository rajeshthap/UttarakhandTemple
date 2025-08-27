import React from 'react'
import "../assets/CSS/Footer.css";
import { MdKeyboardArrowRight } from "react-icons/md";
const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                {/* About Us */}
                <div className="footer-section">
                    <h3>About Us</h3>
                    <p>
                        We provide a seamless online platform for booking temple services,
                        pujas, and events with ease and convenience.
                    </p>
                </div>

                {/* Information Links */}
                <div className="footer-section">
                    <h3>Information</h3>
                    <ul>
                        <li><span className='footer-icon'><MdKeyboardArrowRight /></span> <a href="/about">Temples Booking</a></li>
                        <li><span className='footer-icon'><MdKeyboardArrowRight /></span> <a href="/services">Pooja & Seva</a></li>
                        <li><span className='footer-icon'><MdKeyboardArrowRight /></span> <a href="/gallery">Pandit Booking</a></li>
                        <li><span className='footer-icon'><MdKeyboardArrowRight /></span> <a href="/contact">Facilities</a></li>
                        <li><span className='footer-icon'><MdKeyboardArrowRight /></span> <a href="/contact">Facilities</a></li>
                        <li><span className='footer-icon'><MdKeyboardArrowRight /></span> <a href="/contact">About Us</a></li>
                        <li><span className='footer-icon'><MdKeyboardArrowRight /></span> <a href="/contact">Contact Us</a></li>
                    </ul>
                </div>

                {/* Other Links */}
                <div className="footer-section">
                    <h3>Other Links</h3>
                    <ul>
                        <li><span className='footer-icon'><MdKeyboardArrowRight /></span> <a href="/privacy">Pooja Booking</a></li>
                        <li><span className='footer-icon'><MdKeyboardArrowRight /></span> <a href="/terms">Darshan Booking</a></li>
                        <li><span className='footer-icon'><MdKeyboardArrowRight /></span> <a href="/faqs">Seva Registration</a></li>
                        <li><span className='footer-icon'><MdKeyboardArrowRight /></span> <a href="/faqs">Room Booking</a></li>
                        <li><span className='footer-icon'><MdKeyboardArrowRight /></span> <a href="/faqs">Hall Booking</a></li>
                        <li><span className='footer-icon'><MdKeyboardArrowRight /></span> <a href="/faqs">Parking Booking</a></li>

                    </ul>
                </div>

                {/* Recent Posts */}
                <div className="footer-section">
                    <h3>Recent Posts</h3>
                    <ul className="recent-posts">
                        <li><a href="/blog/post1">Temple Festival Highlights</a></li>
                        <li><a href="/blog/post2">Puja Booking Tips</a></li>
                        <li><a href="/blog/post3">Spiritual Journey to Himalayas</a></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()}  Brainrock Consulting Services, All Right Reserved. | Design by Brainrock Reserved.</p>
            </div>
        </footer>
    );
};


export default Footer
