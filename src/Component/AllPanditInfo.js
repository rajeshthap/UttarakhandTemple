import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/CSS/TempleInfo.css"; // you can keep same CSS
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AllPanditInfo = () => {
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());
  const [panditData, setPanditData] = useState([]);

  function getSlidesToShow() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 992) return 2;
    return 3;
  }

  useEffect(() => {
    const handleResize = () => setSlidesToShow(getSlidesToShow());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch Pandit Data
// After fetching data, log it:
useEffect(() => {
  fetch("https://mahadevaaya.com/backend/api/get-pandit-poojas-list/")
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched pandits:", data);
      setPanditData(data || []);
    })
    .catch((error) => console.error("Error fetching pandit data:", error));
}, []);

  const getImageUrl = (imgPath) => {
    if (!imgPath)
      return "https://mahadevaaya.com/backend/media/pandit_images/default.png";

    const filename = imgPath.split("/").pop();
    return `https://mahadevaaya.com/backend/media/pandit_images/${filename}`;
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
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="Alltemple-wrapper">
      <div className="container">
        <div className="text-center mb-4">
          <h2>Pandit Info</h2>
          <h3>Explore Pandits & Their Services</h3>
        </div>

        <div className="carousel-container" style={{ position: "relative" }}>
          {panditData.length > 0 ? (
            <Slider {...settings}>
              {panditData.map((pandit, index) => (
                <div
                  key={index}
                  className="card-item"
                  style={{ cursor: "pointer", padding: "10px" }}
                >
                  <div className="card-content">
                    <div className="card-image-wrapper-temple">
                      <img
                        src={getImageUrl(pandit.pandit_image)}
                        alt={pandit.pandit_name}
                        className="card-image"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                    <div className="card-text">
                      <h5>{pandit.pandit_name}</h5>
                      <p>
                        {pandit.poojas?.length > 0
                          ? `${pandit.poojas.length} available poojas`
                          : "No poojas available"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p className="text-center">Loading pandits...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllPanditInfo;
