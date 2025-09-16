import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../assets/CSS/TempleAuthority.css";
import Regimg1 from "../../assets/images/temple-img.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";  

function AuthorityLogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      alert(" Please fill in both fields");
      return;
    }

    setLoading(true);
    try {
      const isEmail = /\S+@\S+\.\S+/.test(formData.username);
      const isPhone = /^[0-9]{10}$/.test(formData.username);

      let payload = {
        password: formData.password,
      };

      if (isEmail) {
        payload.email = formData.username;
      } else if (isPhone) {
        payload.phone = formData.username;
      } else {
        alert("Please enter a valid email or phone number");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "https://brjobsedu.com/Temple_portal/api/login/",
        payload
      );

      console.log("Login Response:", response.data);

      if (response.data.role) {
        localStorage.setItem("role", response.data.role);
      }

      alert("Login successfully!");
      navigate("/DashBoard"); 
    } catch (error) {
      console.error("Login Error:", error);
      alert(" Invalid username or password");
    }
    setLoading(false);
  };
  return (
    <div>
      <Container className="temp-container">
        <div>
          <div className="temple-registration-heading">
            <h1>Temple Login</h1>
            <div>
            
              <Form onSubmit={handleSubmit}>
                <Row className="mt-3">
                  <Col lg={6} md={6}>
                    <Row>
                      <Col lg={12} md={12} sm={12} className="mt-4">
                        <Form.Group className="mb-3">
                          <Form.Label className="temp-label-lg-bg">
                            Email or Phone Number{" "}
                            <span className="temp-span-star">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Registered Mobile No. / Email"
                            className="temp-form-control-bg"
                          />
                        </Form.Group>
                      </Col>

                      <Col lg={12} md={12} sm={12}>
                        <Form.Group className="mb-3">
                          <Form.Label className="temp-label">
                            Password <span className="temp-span-star">*</span>
                          </Form.Label>
                          <div className="password-wrapper">
                            <Form.Control
                              type="password"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              placeholder="Your Password"
                              className="temp-form-control-bg"
                            />
                            <i className="fa fa-eye toggle-password"></i>
                          </div>
                        </Form.Group>
                      </Col>

                      <div className="d-grid gap-3 text-center mt-3">
                        <Row>
                          <Col lg={12} md={12} sm={12}>
                            <Button
                              variant="danger"
                              className="temp-submit-btn"
                              type="submit"
                              disabled={loading}
                            >
                              {loading ? "Logging in..." : "Login"}
                            </Button>
                          </Col>
                          <Col lg={12} md={12} sm={12} className="mt-3">
                            <Button
                              variant="danger"
                              className="temp-submit-btn-login"
                              type="button"
                              onClick={() =>
                                (window.location.href = "/forgot-password")
                              }
                            >
                              Forgot Password ?
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </Row>
                  </Col>

                  <Col
                    lg={6}
                    md={6}
                    sm={12}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <div>
                      <img
                        src={Regimg1}
                        className="img-fluid"
                        alt="Temple Login"
                      />
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AuthorityLogin;
