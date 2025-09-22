import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../assets/CSS/TempleAuthority.css";
import Regimg1 from "../../assets/images/pandit-img.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ModifyAlert from "../Alert/ModifyAlert";

function PanditLogin() {
  const [formData, setFormData] = useState({
    identifier: "", // can be email or phone
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading,] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

   // alert state
    const [showModifyAlert, setShowModifyAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
useEffect(() => {
  // Push the current page into history so user can't go back
  window.history.pushState(null, "", window.location.href);

  const handlePopState = () => {
    // Disable back button by re-pushing the same page
    window.history.pushState(null, "", window.location.href);
  };

  // Use lowercase 'popstate'
  window.addEventListener("popstate", handlePopState);

  return () => {
    window.removeEventListener("popstate", handlePopState);
  };
}, [navigate]); 
  // Submit login
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.identifier || !formData.password) {
      setAlertMessage(" Please fill in both fields");
      setShowModifyAlert(true);
      return;
    }
  setErrorMsg("");

  try {
    //  Check if input contains "@" (then it's email, else treat as phone)
    const isEmail = formData.identifier.includes("@");

    const payload = {
      password: formData.password,
      ...(isEmail
        ? { email: formData.identifier }
        : { phone: formData.identifier }),
    };


    const response = await axios.post(
      "https://brjobsedu.com/Temple_portal/api/login/",
      payload
    );
    setTimeout(() => {
    navigate("/MainDashBoard");
  }, 1500);


    // Save user info in localStorage
    localStorage.setItem("PanditUser", JSON.stringify(response.data));

    // Save role
    if (response.data.role) {
      localStorage.setItem("role", response.data.role);
    }

   
    //  Navigate only if role is "pandit"
      const role = response.data.role;
    if (role === "Pandit") {
      setAlertMessage(" Login successful!");
        setShowModifyAlert(true);
  
 

    } else {
      setAlertMessage(response.data.message || " Login failed");
        setShowModifyAlert(true);
    }
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    setAlertMessage(" Invalid username or password");
      setShowModifyAlert(true);
  }
};

  return (
    <div className='temp-donate'>
      <Container className="temp-container">
        <div>
          <div className="temple-registration-heading">
            <h1>Pandit Login</h1>
            <div>
              <Form onSubmit={handleSubmit}>
                <Row className="mt-3">
                  <Col lg={6} md={6}>
                    <Row>
                      {/* Email or Phone */}
                      <Col lg={12} md={12} sm={12} className="mt-4">
                        <Form.Group className="mb-3">
                          <Form.Label className="temp-label-lg-bg">
                            Email or Mobile Number{" "}
                            <span className="temp-span-star"> *</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Registered Mobile No. / Email"
                            className="temp-form-control-bg"
                            name="identifier"
                            value={formData.identifier}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

                      {/* Password */}
                      <Col lg={12} md={12} sm={12}>
                        <Form.Group className="mb-3">
                          <Form.Label className="temp-label">
                            Password <span className="temp-span-star">*</span>
                          </Form.Label>
                          <InputGroup>
                            <Form.Control
                              type={showPassword ? "text" : "password"}
                              placeholder="Your Password"
                              className="temp-form-control-bg"
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                            />
                            <InputGroup.Text
                              onClick={() => setShowPassword(!showPassword)}
                              style={{ cursor: "pointer" }}
                            >
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </InputGroup.Text>
                          </InputGroup>
                        </Form.Group>
                      </Col>

                      {/* Error */}
                      {errorMsg && (
                        <div className="text-danger mb-2">{errorMsg}</div>
                      )}

                      {/* Buttons */}
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
                              onClick={() => navigate("/ForgotPassword")}
                            >
                              Forget Password ?
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </Row>
                  </Col>

                  {/* Side Image */}
                  <Col
                    lg={6}
                    md={6}
                    sm={12}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <div>
                      <img src={Regimg1} className="img-fluid" alt="pandit" />
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
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

export default PanditLogin;
