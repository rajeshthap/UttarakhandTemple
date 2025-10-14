import React from 'react'
import "../assets/CSS/Onlinebooking.css"
import { Button, Col, Row } from 'react-bootstrap'
import { GiByzantinTemple } from "react-icons/gi";
import { FaHandsPraying } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaHandshake } from "react-icons/fa6";

const OnlineBooking = () => {
    return (
        <div className='container-fluid p-0'>
            <div className='online-booking-wrapper'>


                <h2>Online Booking Seva</h2>


                <div className='container'>
                    <Row>
                        <Col><div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3 align-items-stretch ">
                            <div class="features-icons-icon d-flex flex-fill rounded-circle mb-3  booking-info  ">
                                <div class=" m-auto booking-icon"> <GiByzantinTemple /></div></div>
                            <h3>Darshan & Pooja Booking</h3>
                            <p><Button variant="" className='click-btn'>Click here</Button></p>

                        </div></Col>
                        <Col><div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3 ">
                            <div class="features-icons-icon d-flex flex-fill rounded-circle mb-3  booking-info ">
                                <div class=" m-auto booking-icon"> <BiSolidDonateBlood /></div></div>
                            <h3>Donate Online </h3>
                            <p><Button variant="" className='click-btn'>Click here</Button></p>

                        </div></Col>
                        <Col><div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div class="features-icons-icon d-flex flex-fill rounded-circle mb-3  booking-info ">
                                <div class=" m-auto booking-icon"> <FaHandshake /></div></div>
                            <h3>Seva Registration</h3>
                            <p><Button variant="" className='click-btn'>Click here</Button></p>

                        </div></Col>
                        <Col><div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div class="features-icons-icon d-flex flex-fill rounded-circle mb-3  booking-info ">
                                <div class=" m-auto booking-icon"> <FaUserClock /></div></div>
                            <h3>Pandit Booking</h3>
                            <p><Button variant="" className='click-btn'>Click here</Button></p>

                        </div></Col>
                        <Col><div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div class="features-icons-icon d-flex flex-fill rounded-circle mb-3  booking-info ">
                                <div class=" m-auto booking-icon"> <FaHandsPraying /></div></div>
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
