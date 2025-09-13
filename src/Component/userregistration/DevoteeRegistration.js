import React, { useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import axios from "axios";
import "../../assets/CSS/TempleAuthority.css";
import Regimg from "../../assets/images/User-regi-img.png";
import SendOtp from "../SendOtp/SendOtp";
import VerifyOtp from "../VerifyOtp/VerifyOtp";

function DevoteeRegistration() {
  const [phone, setPhone] = useState(""); 
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setMessage] = useState("");

  const handleRegister = async (e) => {
  e.preventDefault();
  setMessage("");

  const form = e.target;
  const devotee_name = form.devotee_name.value.trim();
  const gender = form.gender.value;
  const email = form.email.value.trim();
  const password =form.password.value.trim();

  if (!phone || !devotee_name || !gender || !email || !password) {
    setMessage("Please fill all fields");
    return;
  }

  setLoading(true);

  const formData = new FormData();
  formData.append("phone", phone);
  formData.append("devotee_name", devotee_name);
  formData.append("gender", gender);
  formData.append("email", email);
  formData.append("password", password);

  try {
    const res = await axios.post(
      "https://brjobsedu.com/Temple_portal/api/Userregistration/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.data.success) {
      setMessage("Registration successful!");
      form.reset();
    } else {
      setMessage(res.data.message || "Registration failed");
    }
  } catch (err) {
    console.error(err);
    if (err.response && err.response.data) {
      setMessage(err.response.data.message || JSON.stringify(err.response.data));
    } else {
      setMessage("Error while registering");
    }
  } finally {
    setLoading(false);
  }
};



  return (
    <Container className="temp-container">
      <div className="temple-registration-heading">
        <h1>User Registration</h1>
        <Form onSubmit={handleRegister}>
          <Row>
            <Col lg={6} md={6}>
              <Row>
                
                {!otpSent && !otpVerified && (
                  <Col lg={12} md={12} sm={12}>
                    <SendOtp
                      phone={phone}
                      setPhone={setPhone}
                      onOtpSent={() => setOtpSent(true)}
                    />
                  </Col>
                )}

                {otpSent && !otpVerified && (
                  <Col lg={12} md={12} sm={12}>
                    <VerifyOtp
                      phone={phone}
                      onVerified={() => {
                        setOtpVerified(true);
                        setOtpSent(false);
                      }}
                    />
                  </Col>
                )}

                {otpVerified && (
                  <>
                    <Col lg={12} md={12} sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Phone Number <span className="temp-span-star">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={phone}
                          readOnly
                          className="temp-form-control-bg"
                        />
                      </Form.Group>
                    </Col>

                    <Col lg={12} md={12} sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Devotee Name <span className="temp-span-star">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="devotee_name"
                          placeholder="Enter Name"
                          className="temp-form-control-bg"
                        />
                      </Form.Group>
                    </Col>

                    <Col lg={12} md={12} sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Gender <span className="temp-span-star">*</span>
                        </Form.Label>
                        <Form.Select name="gender" className="temp-form-control-option-bg">
                          <option value="">Please Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Others">Others</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col lg={12} md={12} sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Email <span className="temp-span-star">*</span>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter Email"
                          className="temp-form-control-bg"
                        />
                      </Form.Group>
                    </Col>

                    <Col lg={12} md={12} sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Password <span className="temp-span-star">*</span>
                        </Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Enter Password"
                          className="temp-form-control-bg"
                        />
                      </Form.Group>
                    </Col>

                    {/* {message && <p>{message}</p>} */}

                    <div className="d-grid gap-3 text-center mt-3">
                      <Row>
                        <Col lg={12} md={12} sm={12}>
                          <Button
                            variant="danger"
                            type="submit"
                            disabled={loading}
                            className="temp-submit-btn"
                          >
                            {loading ? "Registering..." : "Register"}
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </>
                )}
              </Row>
            </Col>

            <Col lg={6} md={6} sm={12}>
              <img src={Regimg} className="img-fluid" alt="User Registration" />
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
}

export default DevoteeRegistration;
