import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../assets/CSS/TempleInfo.css";

import Badrinath from "../assets/images/Badrinath-Temple.png";
import Kedarnath from "../assets/images/Kedarnath-Temple.png";
import Gangotri from "../assets/images/Gangotri-Temple.png";
import Yamunotri from "../assets/images/yamunotri-temple.jpg";
import ram from "../assets/images/Badrinath-Temple.png";

const cardData = [
    { title: "Badrinath Temple", text: "Dedicated to Lord Vishnu, located in Chamoli district at 3,300 meters, part of the Char Dham and Chota Char Dham.", img: Badrinath },
    { title: "Kedarnath Temple", text: "One of the 12 Jyotirlingas, dedicated to Lord Shiva, located near the Mandakini River.", img: Kedarnath },
    { title: "Gangotri Temple", text: "Origin of the Ganges River, dedicated to Goddess Ganga.", img: Gangotri },
    { title: "Yamunotri Temple", text: "Dedicated to Goddess Yamuna, located at the Yamunotri glacier source.", img: Yamunotri },
    { title: "Yamunotri Temple", text: "Dedicated to Goddess Yamuna, located at the Yamunotri glacier source.", img: ram },
];

const AllTempleInfo = () => {
    const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

    function getSlidesToShow() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 992) return 2;
        if (window.innerWidth < 1200) return 3;
        return 4;
    }

    useEffect(() => {
        const handleResize = () => setSlidesToShow(getSlidesToShow());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2500,
        speed: 600,
        arrows: true,
        adaptiveHeight: true, // ✅ prevents text-image overlap
        slidesToShow,
        slidesToScroll: 1,
    };

    return (
        <div className="Alltemple-wrapper">
            <div className="container">
                <div className="text-center mb-4">
                    <h2>Temple Info</h2>
                    <h3>Explore Temple History, Facilities & Services</h3>
                </div>

                <div className="carousel-container">
                    <Slider key={slidesToShow} {...settings}>
                        {cardData.map((item, index) => (
                            <div key={index} className="card-item">
                                <div className="card-content">
                                    <div className="card-image-wrapper-temple">
                                        <img src={item.img} alt={item.title} className="card-image" />
                                    </div>
                                    <div className="card-text">
                                        <h5>{item.title}</h5>
                                        <p>{item.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default AllTempleInfo;
