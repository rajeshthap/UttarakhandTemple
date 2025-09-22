import React, { useEffect, useState } from "react";
import { Button, Col, Container, InputGroup, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "../../assets/CSS/TempleAuthority.css";
import Regimg from "../../assets/images/User-regi-img.png";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ModifyAlert from "../Alert/ModifyAlert";

function DevoteeLogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // alert state
  const [showModifyAlert, setShowModifyAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setAlertMessage(" Please fill in both fields");
      setShowModifyAlert(true);
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

      const token = response.data.role;
      if (token === "User") {
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
    <div className='temp-donate'>
 
      <Container className="temp-container">
        <div className="temple-registration-heading">
          <h1>User Login</h1>
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
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Registered Mobile No. / Email"
                        className="temp-form-control-bg "
                      />
                    </Form.Group>
                  </Col>

                  {/* Password */}
                  <Col lg={12} md={12} sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="temp-label">
                        Password <span className="temp-span-star"> *</span>
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Your Password"
                          className="temp-form-control-bg"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
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

                  <div className="d-grid gap-3 text-center  mt-3">
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
                          Forget Password ?
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
                  <img src={Regimg} className="img-fluid" alt="images"></img>
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

export default DevoteeLogin;
