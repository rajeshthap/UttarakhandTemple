import React from 'react'
import "../assets/CSS/Onlinebooking.css"
import { Button, Col, Row } from 'react-bootstrap'
import { GiByzantinTemple } from "react-icons/gi";
import { FaHandsPraying } from "react-icons/fa6";
import { RiHotelBedFill } from "react-icons/ri";
import { MdOutlineFoodBank } from "react-icons/md";
import { BiSolidCarWash } from "react-icons/bi";
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
                            <h3>Online Darshan and Booking Services</h3>
                            <p><Button variant="" className='click-btn'>Click here</Button></p>

                        </div></Col>
                        <Col><div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3 ">
                            <div class="features-icons-icon d-flex flex-fill rounded-circle mb-3  booking-info ">
                                <div class=" m-auto booking-icon"> <FaHandsPraying /></div></div>
                            <h3>Comprehensive Puja & Pandit Booking Services </h3>
                            <p><Button variant="" className='click-btn'>Click here</Button></p>

                        </div></Col>
                        <Col><div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div class="features-icons-icon d-flex flex-fill rounded-circle mb-3  booking-info ">
                                <div class=" m-auto booking-icon"> <RiHotelBedFill /></div></div>
                            <h3>Dharamshalas, Guest Houses, Hotels.</h3>
                            <p><Button variant="" className='click-btn'>Click here</Button></p>

                        </div></Col>
                        <Col><div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div class="features-icons-icon d-flex flex-fill rounded-circle mb-3  booking-info ">
                                <div class=" m-auto booking-icon"> <MdOutlineFoodBank /></div></div>
                            <h3>Divine Food & Prasad Facilities for Devotees</h3>
                            <p><Button variant="" className='click-btn'>Click here</Button></p>

                        </div></Col>
                        <Col><div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div class="features-icons-icon d-flex flex-fill rounded-circle mb-3  booking-info ">
                                <div class=" m-auto booking-icon"> <BiSolidCarWash /></div></div>
                            <h3>Parking spaces, cloakrooms, and medical aid centers.</h3>
                            <p><Button variant="" className='click-btn'>Click here</Button></p>

                        </div></Col>

                    </Row>
                </div>
            </div>
        </div >
    )
}

export default OnlineBooking
