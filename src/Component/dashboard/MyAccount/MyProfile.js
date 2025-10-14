import React, { useState, useEffect } from "react";
import "../../../assets/CSS/LeftNav.css";
import "../../../assets/CSS/DashBoard.css";
import { Col, Row, Form, Button } from "react-bootstrap";
import "../../../assets/CSS/MyProfile.css";
import LeftNav from "../LeftNav";

const MyProfile = () => {
  const [profile, setProfile] = useState({
    displayName: "",
    mobile: "",
    email: "",
    title: "",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    gothram: "",
  });

  // Example: load user data from localStorage or API
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    setProfile((prev) => ({
      ...prev,
      displayName: storedUser.name || "",
      mobile: storedUser.mobile || "",
      email: storedUser.email || "",
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(profile);
    // Call API to save profile
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

          <Form onSubmit={handleSubmit} className="profile-form mt-4">
            <Row className="mb-3">
              <Col lg={12} md={12} sm={12}>
                <Form.Group>
                  <Form.Label>Display Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="displayName"
                    value={profile.displayName}
                    onChange={handleChange}
                    placeholder="Enter display name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Mobile Number *</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    value={profile.mobile}
                    onChange={handleChange}
                    placeholder="+91 12345-67890"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email Address *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Title *</Form.Label>
                  <div className="d-flex gap-3 mt-2">
                    {["Mr", "Mrs", "Miss", "Dr"].map((t) => (
                      <Form.Check
                        inline
                        key={t}
                        type="radio"
                        label={t}
                        name="title"
                        value={t}
                        checked={profile.title === t}
                        onChange={handleChange}
                      />
                    ))}
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>First Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Date of Birth *</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={profile.dob}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Gender *</Form.Label>
                  <Form.Select
                    name="gender"
                    value={profile.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Gothram *</Form.Label>
                  <Form.Control
                    type="text"
                    name="gothram"
                    value={profile.gothram}
                    onChange={handleChange}
                    placeholder="Enter Gothram"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button type="submit" className="btn-save mt-3">
              Save Changes
            </Button>
          </Form>
        </div>
      </main>
    </div>
  );
};

export default MyProfile;
