import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/CSS/TempleInfo.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AllTempleInfo = () => {
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());
  const [templeData, setTempleData] = useState([]);
  const navigate = useNavigate();

  function getSlidesToShow() {
    if (window.innerWidth < 768) return 1; // mobile
    if (window.innerWidth < 992) return 2; // tablet
    return 3; // desktop -> 3 columns
  }

  useEffect(() => {
    const handleResize = () => setSlidesToShow(getSlidesToShow());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch("https://mahadevaaya.com/backend/api/temple-poojas-list/")
      .then((res) => res.json())
      .then((data) => setTempleData(data || []))
      .catch((error) => console.error("Error fetching temple data:", error));
  }, []);

  const getImageUrl = (imgPath) => {
    if (!imgPath)
      return "https://mahadevaaya.com/backend/media/temple_images/default.png";
    const filename = imgPath.split("/").pop();
    return `https://mahadevaaya.com/backend/media/temple_images/${filename}`;
  };

  const handleTempleClick = (temple) => {
    const slug = temple.temple_name
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    navigate(`/temple/${slug}`, { state: { temple } });
  };

  // Custom arrows
  const NextArrow = ({ onClick }) => (
    <div className="custom-arrow next-arrow" onClick={onClick}>
      <FaChevronRight size={25} />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="custom-arrow prev-arrow" onClick={onClick}>
      <FaChevronLeft size={25} />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 600,
    slidesToShow,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } }, // tablet
      { breakpoint: 768, settings: { slidesToShow: 1 } }, // mobile
    ],
  };

  return (
    <div className="Alltemple-wrapper">
      <div className="container">
        <div className="text-center mb-4">
          <h2>Temple Info</h2>
          <h3>Explore Temple History, Facilities & Services</h3>
        </div>

        <div className="carousel-container" style={{ position: "relative" }}>
          {templeData.length > 0 ? (
            <Slider {...settings}>
              {templeData.map((item, index) => (
                <div
                  key={index}
                  className="card-item"
                  onClick={() => handleTempleClick(item)}
                  style={{ cursor: "pointer", padding: "10px" }}
                >
                  <div className="card-content">
                    <div className="card-image-wrapper-temple">
                      <img
                        src={getImageUrl(item.temple_image)}
                        alt={item.temple_name}
                        className="card-image"
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                    <div className="card-text">
                      <h5>{item.temple_name}</h5>
                      <p>
                        {item.temple_description
                          ? item.temple_description.slice(0, 120) + "..."
                          : "No description available."}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p className="text-center">Loading temples...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTempleInfo;
