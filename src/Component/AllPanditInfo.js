import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/CSS/TempleInfo.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AllPanditInfo = () => {
  const [panditData, setPanditData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch Pandit Data
  useEffect(() => {
    setIsLoading(true);
    fetch("https://mahadevaaya.com/backend/api/get-pandit-poojas-list/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched pandits:", data);
        setPanditData(data || []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pandit data:", error);
        setIsLoading(false);
      });
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

  // Calculate slidesToShow based on window width
  const getSlidesToShow = () => {
    if (windowWidth < 768) return 1;
    if (windowWidth < 992) return 2;
    return 3;
  };

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 600,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="Allpandit-wrapper">
      <div className="container">
        <div className="text-center mb-4">
          <h2>Pandit Info</h2>
          <h3>Explore Pandits & Their Services</h3>
        </div>

        <div className="carousel-container" style={{ position: "relative" }}>
          {isLoading ? (
            <div className="loading-container">
              <p>Loading pandits...</p>
            </div>
          ) : panditData.length > 0 ? (
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
                        loading="lazy"
                        style={{
                          width: "100%",

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
            <div className="no-data-container">
              <p>No pandits available</p>
            </div>
          )}
        </div>
      </div>


    </div>
  );
};

export default AllPanditInfo;