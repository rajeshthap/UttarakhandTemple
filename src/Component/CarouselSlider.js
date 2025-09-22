import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

import { Col, Row } from 'react-bootstrap';
import Banner1 from "../assets/images/banner-2.png"
import Banner2 from "../assets/images/banner-3.png";
// import Banner3 from "../assets/images/banner-3.png";
import Shiv from "../assets/images/Shiv-img.png"

import "../assets/CSS/bannersilder.css"; // Importing the CSS file for styling

function CarouselSlider() {
    return (
        <div>
            <Carousel className="resorce-craousal  " interval={3000} pause={false}>


                <Carousel.Item>
                    <Row className="Carousel-img">
                        <Col lg={8} md={8} sm={12}>
                            <div>
                                <i>
                                    <img
                                        src={Shiv}
                                        alt="groupimage"
                                        className="img-fluid"
                                    ></img>
                                </i>
                            </div>
                        </Col>

                        <Col lg={4} md={4} sm={12}>
                            <div className=" d-flex flex-column h-100 align-items-start justify-content-center bottom-0 resorce-sub-title ">
                                <h1 className=" bg-opacity-50 py-2 px-4">Om Namah Shivaya</h1>
                                <p className=" bg-opacity-50 px-4">Surrender to the Infinite Power of Lord Shiva</p>

                            </div>
                        </Col>

                    </Row>
                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>


                <Carousel.Item>
                    <Row className="Carousel-img">
                        <Col lg={8} md={8} sm={12}>
                            <div>
                                <i>
                                    <img
                                        src={Banner1}
                                        alt="groupimage"
                                        className="img-fluid"
                                    ></img>
                                </i>
                            </div>
                        </Col>

                        <Col lg={4} md={4} sm={12}>
                            <div className=" d-flex flex-column h-100 align-items-start justify-content-center bottom-0 resorce-sub-title ">
                                <h1 className=" bg-opacity-50 py-2 px-4">Lord Vishnu</h1>
                                <p className=" bg-opacity-50 px-4">Embark on a spiritual journey to connect with the eternal preserver and protector of life</p>

                            </div>
                        </Col>

                    </Row>
                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>



                <Carousel.Item>
                    <Row className="Carousel-img">
                        <Col lg={8} md={8} sm={12}>
                            <div>
                                <i>
                                    <img
                                        src={Banner2}
                                        alt="groupimage"
                                        className="img-fluid"
                                    ></img>
                                </i>
                            </div>
                        </Col>

                        <Col lg={4} md={4} sm={12}>
                            <div className=" d-flex flex-column h-100 align-items-start justify-content-center bottom-0 resorce-sub-title ">
                                <h1 className=" bg-opacity-50 py-2 px-4">Maa Ganga1</h1>
                                <p className=" bg-opacity-50 px-4">The Divine River of Purity and Blessings</p>

                            </div>
                        </Col>

                    </Row>
                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>









            </Carousel>
        </div>
    );
}

export default CarouselSlider
