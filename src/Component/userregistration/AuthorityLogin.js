import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../assets/CSS/TempleAuthority.css";
import Regimg1 from "../../assets/images/temple-img.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ModifyAlert from "../Alert/ModifyAlert";

function AuthorityLogin() {
  const [formData, setFormData] = useState({
    identifier: "", //  renamed to identifier (can be email or phone)
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // alert state
  const [showModifyAlert, setShowModifyAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.identifier || !formData.password) {
      setAlertMessage(" Please fill in both fields");
      setShowModifyAlert(true);
      return;
    }

    setLoading(true);
    try {
      // check if it's email or phone
      const isEmail = /\S+@\S+\.\S+/.test(formData.identifier);
      const isPhone = /^[0-9]{10}$/.test(formData.identifier);

      let payload = {
        password: formData.password,
      };

      if (isEmail) {
        payload.email = formData.identifier; //  backend expects `email`
      } else if (isPhone) {
        payload.phone = formData.identifier; //  backend expects `phone`
      } else {
        setAlertMessage(" Please enter a valid email or phone number");
        setShowModifyAlert(true);
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "https://brjobsedu.com/Temple_portal/api/login/",
        payload
      );
      setTimeout(() => {
        navigate("/MainDashBoard");
      }, 1500);

      if (response.data.role) {
        localStorage.setItem("role", response.data.role);
      }
      const role = response.data.role;
      if (role === "temple") {
        setAlertMessage(" Login successful!");
        setShowModifyAlert(true);
      } else {
        setAlertMessage(response.data.message || " Login failed");
        setShowModifyAlert(true);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setAlertMessage(" Invalid username or password");
      setShowModifyAlert(true);
    }
    setLoading(false);
  };

  return (
    <div>
      <Container className="temp-container">
        <div className="temple-registration-heading">
          <h1>Temple Login</h1>
          <Form onSubmit={handleSubmit}>
            <Row className="mt-3">
              <Col lg={6} md={6}>
                <Row>
                  <Col lg={12} md={12} sm={12} className="mt-4">
                    <Form.Group className="mb-3">
                      <Form.Label className="temp-label-lg-bg">
                        Email or Mobile Number{" "}
                        <span className="temp-span-star"> *</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="identifier"
                        value={formData.identifier}
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
                      <div
                        className="password-wrapper"
                        style={{ position: "relative" }}
                      >
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Your Password"
                          className="temp-form-control-bg"
                        />
                        <i
                          className={`fa ${
                            showPassword ? "fa-eye-slash" : "fa-eye"
                          } toggle-password`}
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                          }}
                        ></i>
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
                            (window.location.href = "/ForgotPassword")
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
                  <img src={Regimg1} className="img-fluid" alt="Temple Login" />
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
      <ModifyAlert
        message={alertMessage}
        show={showModifyAlert}
        setShow={setShowModifyAlert}
      />
    </div>
  );
}

export default AuthorityLogin;
