import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/CSS/Alltemple.css"

import Badrinath from "../assets/images/Badrinath-Temple.png";
import Kedarnath from "../assets/images/Kedarnath-Temple.png";
import Gangotri from "../assets/images/Gangotri-Temple.png";
import Yamunotri from "../assets/images/yamunotri-temple.jpg";

const cardData = [
    { title: "Badrinath Temple", text: "Dedicated to Lord Vishnu, located in Chamoli district at 3,300 meters, part of the Char Dham and Chota Char Dham", img: Badrinath },
    { title: "Kedarnath Temple", text: "One of the 12 Jyotirlingas, dedicated to Lord Shiva, located near the Mandakini River.", img: Kedarnath },
    { title: "Gangotri Temple", text: "Origin of the Ganges River, dedicated to Goddess Ganga.", img: Gangotri },
    { title: "Yamunotri Temple", text: "Dedicated to Goddess Yamuna, located at the Yamunotri glacier source.", img: Yamunotri },
    { title: "Badrinath Temple", text: "Dedicated to Lord Vishnu, located in Chamoli district at 3,300 meters, part of the Char Dham and Chota Char Dham", img: Badrinath },
    { title: "Kedarnath Temple", text: "One of the 12 Jyotirlingas, dedicated to Lord Shiva, located near the Mandakini River.", img: Kedarnath },
    { title: "Gangotri Temple", text: "Origin of the Ganges River, dedicated to Goddess Ganga.", img: Gangotri },
    { title: "Yamunotri Temple", text: "Dedicated to Goddess Yamuna, located at the Yamunotri glacier source.", img: Yamunotri },

];

const AllTempleInfo = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 600, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div className="container-fluid p-0">
            <div className="Alltemple-wrapper">
                <div className="container">
                    <div><h2>Temple Info</h2>
                    <h3>Explore Temple History, Facilities & Services</h3>
                    </div>
                    <div className="carousel-container">
                        <Slider {...settings}>
                            {cardData.map((item, index) => (
                                <div key={index} className="card-item">
                                    <div className="card-image-wrapper">
                                        <img src={item.img} alt={item.title} className="card-image" />
                                    </div>
                                    <div className="card-text">
                                        <h5>{item.title}</h5>
                                        <p>{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllTempleInfo;
