import React, { useState, useEffect } from "react";
import { Button, Col, Row, Image } from "react-bootstrap";
import "../../assets/CSS/TopInfo.css";
import Dropdown from "react-bootstrap/Dropdown";
import { IoKeySharp } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../GlobleAuth/AuthContext";
import axios from "axios";
import defaultAvatar from "../../assets/images/Diya.png";

const InfoBar = () => {
  const navigate = useNavigate();
  const { uniqueId, setUniqueId } = useAuth(); // Use setter here
  const [profile, setProfile] = useState({
    displayName: "",
    devotee_photo: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!uniqueId) return;
      try {
        const response = await axios.get(
          `https://mahadevaaya.com/backend/api/get-user/?user_id=${uniqueId}`
        );

        if (response.data) {
          const user = response.data;
          setProfile({
            displayName: user.devotee_name || "",
            devotee_photo: user.devotee_photo || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, [uniqueId]);



  return (
    <div className="header-top container-fluid">
      <Row className="align-items-center">
        {/* Left Side */}
        <Col
          xs={12}
          md={6}
          lg={6}
          className="text-center info-mob text-md-start d-flex flex-wrap align-items-center"
        >
          <div className="px-3">
            <i className="bi bi-telephone-fill infoicon"></i> +91 8193991148
          </div>
          <div className="px-3">
            <i className="bi bi-envelope-fill infoicon"></i> admin@mahadevaaya.com
          </div>
        </Col>

        {/* Right Side */}
        <Col xs={12} md={6} lg={6} className="text-center text-md-end">
          <div className="d-inline-flex align-items-center flex-wrap justify-content-center gap-2">

            {!uniqueId && (
              <>
                <Dropdown className="px-2">
                  <Link to="/Login" className="px-2 text-decoration-none">
                    <Button variant="" className="login-btn">
                      <IoKeySharp /> Login
                    </Button>
                  </Link>
                </Dropdown>

                <Dropdown className="px-2">
                  <Dropdown.Toggle variant="" className="register-btn">
                    <FaUserGroup /> Register
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/TempleAuthority">Temple Authority</Dropdown.Item>
                    <Dropdown.Item href="/PanditRegistration">Pandit ji</Dropdown.Item>
                    <Dropdown.Item href="/DevoteeRegistration">Devotee</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}

            {uniqueId && (
              <div className="d-flex align-items-center gap-2 px-2">
               
            
                <Link to="/MainDashBoard" className="btn btn-primary btn-sm">
                  Dashboard
                </Link>
                 <span className="text-white">{profile.displayName || "User"}</span>
                  <Image
                  src={
                    profile.devotee_photo
                      ? `https://mahadevaaya.com/backend/media/devotee_photos/${profile.devotee_photo.split("/").pop()}`
                      : defaultAvatar
                  }
                  roundedCircle
                  width={35}
                  height={35}
                  alt="User Avatar"
                />
              </div>
            )}

            {/* Social icons */}
            <div className="px-3 d-flex gap-2 social-icon">
              <i className="bi bi-facebook infoicon"></i>
              <i className="bi bi-twitter infoicon"></i>
              <i className="bi bi-instagram infoicon"></i>
              <i className="bi bi-linkedin infoicon"></i>
              <i className="bi bi-youtube infoicon"></i>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default InfoBar;
