import React from 'react'
import "../assets/CSS/Onlinebooking.css"
import { Button, Col, Row } from 'react-bootstrap'

import { FaHandshake } from "react-icons/fa6";
import panditimg from "../assets/images/pandit-img.png";
import templeimg from "../assets/images/Mission-img.png";
import eventicon from "../assets/images/event-icon.png"
import seva from "../assets/images/seva.png"
import help from "../assets/images/help.png"


const OnlineBooking = () => {
    return (
        <div className='container-fluid p-0'>
            <div className='online-booking-wrapper'>


                <h2>Online Booking Seva</h2>


                <div className='container'>
                    <Row>
                        <Col><div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3 align-items-stretch ">
                            <div class="features-icons-icon d-flex flex-fill rounded-circle mb-3  booking-info  ">
                                <div class=" m-auto booking-icon"> <img
                                    src={templeimg}
                                    alt="About by god"
                                    className="img-fluid"
                                ></img></div></div>
                            <h3>Darshan & Pooja Booking</h3>
                            <p><Button variant="" className='click-btn'>Click here</Button></p>

                        </div></Col>
                        <Col><div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3 ">
                            <div class="features-icons-icon d-flex flex-fill rounded-circle mb-3  booking-info ">
                                <div class=" m-auto booking-icon">  <img
                                    src={seva}
                                    alt="About by god"
                                    className="img-fluid"
                                ></img></div></div>
                            <h3>Donate Online </h3>
                            <p><Button variant="" className='click-btn'>Click here</Button></p>

                        </div></Col>
                        <Col><div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div class="features-icons-icon d-flex flex-fill rounded-circle mb-3  booking-info ">
                                <div class=" m-auto booking-icon">  					 <img
                                    src={help}
                                    alt="About by god"
                                    className="img-fluid"
                                ></img></div></div>
                            <h3>Seva Registration</h3>
                            <p><Button variant="" className='click-btn'>Click here</Button></p>

                        </div></Col>
                        <Col><div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div class="features-icons-icon d-flex flex-fill rounded-circle mb-3  booking-info ">
                                <div class=" m-auto booking-icon">
                                    <img
                                        src={panditimg}
                                        alt="About by god"
                                        className="img-fluid"
                                    ></img>

                                </div></div>
                            <h3>Pandit Booking</h3>
                            <p><Button variant="" className='click-btn'>Click here</Button></p>

                        </div></Col>
                        <Col><div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div class="features-icons-icon d-flex flex-fill rounded-circle mb-3  booking-info ">
                                <div class=" m-auto booking-icon">  <img
                                    src={eventicon}
                                    alt="About by god"
                                    className="img-fluid"
                                ></img></div></div>
                            <h3>Event Participation</h3>
                            <p><Button variant="" className='click-btn'>Click here</Button></p>

                        </div></Col>

                    </Row>
                </div>
            </div>
        </div >
    )
}

export default OnlineBooking
