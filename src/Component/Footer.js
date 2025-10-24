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
                        <li><span className='footer-icon'><MdKeyboardArrowRight /></span> <a href="/PanditBooking">Mandir Booking</a></li>
                        <li><span className='footer-icon'><MdKeyboardArrowRight /></span> <a href="/PoojaBooking">Puja & Seva</a></li>
                        <li><span className='footer-icon'><MdKeyboardArrowRight /></span> <a href="/OnlineHirePandit">Pandit Booking</a></li>
                        <li><span className='footer-icon'><MdKeyboardArrowRight /></span> <a href="/TempleFacilityBooking">Temple Facility Booking</a></li>

                        <li><span className='footer-icon'><MdKeyboardArrowRight /></span> <a href="/AboutUs">About Us</a></li>
                        <li><span className='footer-icon'><MdKeyboardArrowRight /></span> <a href="/ContactUs">Contact Info</a></li>
                    </ul>
                </div>

                {/* Other Links */}
                <div className="footer-section">
                    <h3>Other Links</h3>
                    <ul>
                        <li><span className='footer-icon'><MdKeyboardArrowRight /></span> <a href="/PoojaBooking">Puja Booking</a></li>
                        <li><span className='footer-icon'><MdKeyboardArrowRight /></span> <a href="/DarshanBooking">Darshan Booking</a></li>
                        <li><span className='footer-icon'><MdKeyboardArrowRight /></span> <a href="/SevaRegistration">Seva Registration</a></li>



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
