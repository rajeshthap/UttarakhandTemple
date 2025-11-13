import React, { useState, useEffect } from "react";
import { Button, Col, Row, Image } from "react-bootstrap";
import "../../assets/CSS/TopInfo.css";
import Dropdown from "react-bootstrap/Dropdown";
import { IoKeySharp } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuth } from "../GlobleAuth/AuthContext";
import axios from "axios";
import defaultAvatar from "../../assets/images/Diya.png";

const InfoBar = () => {
  const { uniqueId, userType } = useAuth();
  const [profile, setProfile] = useState({
    displayName: "",
    photo: "",
  });

  // version for cache-busting like in DevoteeProfile
  const [imageVersion, setImageVersion] = useState(Date.now());

useEffect(() => {
  const fetchProfile = async () => {
    if (!uniqueId || !userType) return;

    try {
      let apiUrl = "";
      let displayName = "User";
      let photo = "";

      //  Define API endpoint based on user type
      switch (userType.toLowerCase()) {
        case "devotee":
        case "user": // handle if userType is stored as 'user'
          apiUrl = `https://mahadevaaya.com/backend/api/get-user/?user_id=${uniqueId}`;
          break;

        case "temple":
          apiUrl = `https://mahadevaaya.com/backend/api/get-temple/?temple_id=${uniqueId}`;
          break;

        case "pandit":
          apiUrl = `https://mahadevaaya.com/backend/api/get-pandit/?pandit_id=${uniqueId}`;
          break;

        case "admin":
          apiUrl = `https://mahadevaaya.com/backend/api/get-admin/?admin_id=${uniqueId}`;
          break;

        default:
          console.warn("Unknown userType:", userType);
          return;
      }

      //  Fetch profile data
      const response = await axios.get(apiUrl);
      const data = response.data;

      console.log(" Fetched profile data:", data);

      //  Handle Devotee / User
      if (userType === "devotee" || userType === "user") {
        displayName = data.devotee_name || "User";

        if (data.devotee_photo) {
          let photoUrl = data.devotee_photo;

          // Fix missing /backend
          if (photoUrl.includes("/media/") && !photoUrl.includes("/backend/")) {
            photoUrl = photoUrl.replace(
              "https://mahadevaaya.com/media/",
              "https://mahadevaaya.com/backend/media/"
            );
          }

          // Add cache-busting parameter
          photo = `${photoUrl}?v=${Date.now()}`;
        }
      }

      //  Handle Temple
      else if (userType === "temple") {
        displayName = data.temple_name || "Temple";
        if (data.temple_image) {
          const filename = data.temple_image.split("/").pop();
          photo = `https://mahadevaaya.com/backend/media/temple_images/${filename}`;
        }
      }

      //  Handle Pandit
      else if (userType === "pandit") {
        const fullName = [data.first_name, data.last_name].filter(Boolean).join(" ");
        displayName = fullName || "Pandit";
        if (data.pandit_image) {
          const filename = data.pandit_image.split("/").pop();
          photo = `https://mahadevaaya.com/backend/media/pandit_images/${filename}`;
        }
      }

      //  Handle Admin
      else if (userType === "admin") {
        displayName = data.admin_name || "Admin";
        if (data.admin_image) {
          const filename = data.admin_image.split("/").pop();
          photo = `https://mahadevaaya.com/backend/media/admin_images/${filename}`;
        }
      }

      //  Normalize URLs (ensure HTTPS)
      if (photo && photo.startsWith("http://")) {
        photo = photo.replace("http://", "https://");
      }

      //  Update profile state
      setProfile({ displayName, photo });
      console.log(" Final profile state:", { displayName, photo });

    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  fetchProfile();
}, [uniqueId, userType]);



  const getDashboardRoute = () => {
    if (userType === "temple") return "/TempleDashboard";
    if (userType === "pandit") return "/Pandit_Dashboard";
    if (userType === "admin") return "/AdminDashboard";
    return "/MainDashBoard";
  };

  return (
    <div className="header-top container-fluid">
      <Row className="align-items-center">
        {/* Left Info */}
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

        {/* Right Info */}
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
                <Link to={getDashboardRoute()} className="btn btn-primary btn-sm">
                  Dashboard
                </Link>
                <span className="text-white">{profile.displayName}</span>
                <Image
                  src={profile.photo || defaultAvatar}
                  roundedCircle
                  width={35}
                  height={35}
                  alt="User Avatar"
                  onError={(e) => (e.target.src = defaultAvatar)}
                />
              </div>
            )}

            <div className="px-3 d-flex gap-2 social-icon">
              <i className="bi bi-facebook infoicon"></i>
              <i className="bi bi-twitter-x"></i>
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
