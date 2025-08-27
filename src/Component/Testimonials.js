
import React from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import "../assets/CSS/Testimonials.css";

import rameshImg from "../assets/images/ramesh.jpg";
import priyaImg from "../assets/images/Priya.jpg";
import ankitImg from "../assets/images/Ankit.jpg";

const testimonials = [
    {
        name: "Ramesh Kumar",
        text: "Amazing experience! The temple booking process was smooth and quick.",
        img: rameshImg,
        rating: 5,
    },
    {
        name: "Priya Sharma",
        text: "Very well managed. Great interface and easy navigation.",
        img: priyaImg,
        rating: 4,
    },
    {
        name: "Ankit Verma",
        text: "Highly recommend for anyone looking for online puja services.",
        img: ankitImg,
        rating: 5,
    },
];

const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } },
        ],
    };


    return (
        <div className="container-fluid p-0">
            <div className="Testimonials-wrapper">
                <h2 className="testimonial-title">Testimonials</h2>
                <h3>What Our Congregation Say</h3>
                <Slider {...settings}>
                    {testimonials.map((item, index) => (
                        <div key={index} className="testimonial-card">
                            <img src={item.img} alt={item.name} className="testimonial-img" />
                            <h4>{item.name}</h4>
                            <p>{item.text}</p>
                            <div className="stars">
                                {[...Array(item.rating)].map((_, i) => (
                                    <FaStar key={i} color="#FFD700" />
                                ))}
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Testimonials;
