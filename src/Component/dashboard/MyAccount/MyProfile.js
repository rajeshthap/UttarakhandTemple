import React, { useState, useEffect } from "react";
import "../../../assets/CSS/LeftNav.css";
import "../../../assets/CSS/DashBoard.css";
import { Col, Row, Form, Button, Spinner } from "react-bootstrap";
import "../../../assets/CSS/MyProfile.css";
import LeftNav from "../LeftNav";
import { useAuth } from "../../GlobleAuth/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../assets/CSS/MyProfile.css";
import { FaCamera } from "react-icons/fa";
import DefaultProfile from "../../../assets/images/Diya.png";

const MyProfile = () => {
    //   if (!uniqueId) navigate("/Login");
  // }, [uniqueId, navigate]);
  const navigate = useNavigate();
  const { uniqueId } = useAuth(); // assuming this gives your user_id
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    displayName: "",
    mobile: "",
    email: "",
    dob: "",
    gender: "",
    devotee_photo: "",
  });
  
 useEffect(() => {
  const fetchProfile = async () => {
    try {
      setLoading(true);

      const userId = uniqueId || "USR/2025/47393";
      const response = await axios.get(
        `http://mahadevaaya.com/backend/api/get-user/?user_id=${userId}`
      );

      if (response.data) {
        const user = response.data;
        console.log("Fetched User Data:", user);

        setProfile({
          displayName: user.devotee_name || "",
          mobile: user.phone || "",
          email: user.email || "",
          firstName: user.devotee_name?.split(" ")[0] || "",
          gender: user.gender || "",
          devotee_photo: user.devotee_photo || "", // ✅ include photo here
        });
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, [uniqueId]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", profile);
    // you can later implement API update call here
  };
const handleEditPhoto = () => {
    alert("Edit photo clicked — upload feature coming soon!");
  };
  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <LeftNav />
      </aside>

      {/* Main Container */}
      <main className="main-container">
        <div className="content-box">
          <h1 className="fw500">
            <span className="fw700h1">My </span> Profile
          </h1>
          {/* <p>Unique ID: {uniqueId}</p> */}

          {loading ? (
            <p>Loading profile...</p>
          ) : (
            <Form onSubmit={handleSubmit} className="profile-form mt-4">
              <Row className="mb-3">
               <Col lg={2} md={4} sm={12} className="text-center">
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <div className="profile-photo-wrapper position-relative mx-auto">
 <img
  src={
    profile.devotee_photo
      ? `http://mahadevaaya.com/backend/media/devotee_photos/${profile.devotee_photo.split("/").pop()}`
      : "http://mahadevaaya.com/backend/media/devotee_photos/default.png"
  }
  alt={profile.displayName || "Devotee"}
  className="profile-photo"
/>


          <div className="edit-overlay" onClick={handleEditPhoto}>
            <FaCamera className="edit-icon" />
          </div>
        </div>
      )}

   
    </Col>
                <Col lg={10}>
                <Row>
 <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="temp-label">User  Name <span className="temp-span-star">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="displayName"
                      value={profile.displayName} className="temp-form-control-option"
                      onChange={handleChange}
                      placeholder="Enter display name"
                    />
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="temp-label">Mobile Number <span className="temp-span-star">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="mobile"
                      value={profile.mobile}
                      onChange={handleChange}
                      placeholder="+91 12345-67890" className="temp-form-control-option"
                    />
                  </Form.Group>
                </Col>
                 <Col md={6} lg={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="temp-label">Email Address <span className="temp-span-star">*</span></Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      placeholder="Enter email"className="temp-form-control-option"
                    />
                  </Form.Group>
                </Col>
                      <Col md={6} lg={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="temp-label"> Gender <span className="temp-span-star">*</span></Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={profile.gender}
                      onChange={handleChange}
                      placeholder="Enter email"className="temp-form-control-option"
                    />
                  </Form.Group>
                </Col>
                
                </Row>
                </Col>
               
              </Row>

              <Button type="submit" className="btn-save mt-3">
                Update Profie
              </Button>
            </Form>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyProfile;
