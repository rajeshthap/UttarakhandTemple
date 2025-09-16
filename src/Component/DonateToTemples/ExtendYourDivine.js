import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import OTPModel from "../OTPModel/OTPModel";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ExtendYourDivine = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false); 
  const [otp, setOtp] = useState(""); 
  const [formData, setFormData] = useState({
    temple_id: "",
    amount: "",
    pilgrim_name: "",
    mobile_number: "",
    email_id: "",
  });

    const navigate=useNavigate();
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const formDataToSend = new FormData();
    formDataToSend.append("temple_id", formData.temple_id);
    formDataToSend.append("amount", formData.amount);
    formDataToSend.append("pilgrim_name", formData.pilgrim_name);
    formDataToSend.append("mobile_number", formData.mobile_number);
    formDataToSend.append("email_id", formData.email_id);

    const response = await axios.post(
      "https://brjobsedu.com/Temple_portal/api/extend-your-divine/",
      formDataToSend,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (response.status >= 200 && response.status < 300) {
      alert("Registration Successful!");

      
      await axios.post("https://brjobsedu.com/Temple_portal/api/Sentotp/", {
  phone: formData.mobile_number, 
});
alert("OTP sent to your mobile number.");
handleShow(); 
    } else {
      alert("Something went wrong!");
    }
  } catch (error) {
    console.log(error.response?.data || error.message);
    alert(
      "Error: " +
        (error.response?.data?.message ||
          error.response?.data ||
          error.message)
    );
  } finally {
    setLoading(false);
  }
};

const handleVerifyOtp = async () => {
  if (!otp) {
    alert("Please enter OTP");
    return;
  }
  setVerifying(true);
  try {
    const payload = {
      phone: formData.mobile_number, 
      otp: otp, 
    };

    const response = await axios.post(
      "https://brjobsedu.com/Temple_portal/api/Verify/",
      payload
    );

    if (response.data.success) {
      alert("OTP Verified Successfully!");
      handleClose();
      navigate("/PaymentConfirmation"); 
    } else {
      alert(response.data.message || "OTP verification failed.");
    }
  } catch (error) {
    console.error("OTP Verify Error:", error.response?.data || error.message);
    alert("OTP verification error. Try again.");
  } finally {
    setVerifying(false);
  }
};


  return (
    <div>
      <Container className="temp-container">
        <h1>Extend Your Divine Support</h1>
        <p>
          <i>
            Your support helps us preserve sacred traditions, maintain temple
            facilities, and serve the community with devotion and care.
          </i>
        </p>
        <Row>
          <Col lg={8} md={8} sm={12} className="mt-2">
            <Row className="mt-4">
              {/* Temple Selection */}
              <Col lg={6} md={6} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="temp-label">
                    Select Temple <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Select
                    className="temp-form-control-option"
                    name="temple_id"
                    value={formData.temple_id}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Temple Type</option>
                    <option value="42">Vishnu Temple</option>
                    <option value="43">Durga Temple</option>
                    <option value="44">Ganesh Temple</option>
                    <option value="45">Hanuman Temple</option>
                    <option value="46">Shiva Temple</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              {/* Amount */}
              <Col lg={6} md={6} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="temp-label">
                    Amount (Rs.) <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="temp-form-control"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              {/* Pilgrim Name */}
              <Col lg={6} md={6} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="temp-label">
                    Pilgrim Name <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="temp-form-control"
                    name="pilgrim_name"
                    value={formData.pilgrim_name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              {/* Mobile Number */}
              <Col lg={6} md={6} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="temp-label">
                    Mobile Number <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="temp-form-control"
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              {/* Email */}
              <Col lg={6} md={6} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="temp-label">
                    Email <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    className="temp-form-control"
                    name="email_id"
                    value={formData.email_id}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Buttons */}
            <div className="gap-3 mt-3 mb-3 Temp-btn-submit">
              <Button
                variant="temp-submit-btn"
                className="temp-submit-btn mx-3"
                type="button"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Registering..." : "Register Now"}
              </Button>
              <Button
                variant="secondary"
                className="temp-cancle-btn"
                type="button"
              >
                Cancel
              </Button>
            </div>
          </Col>

          {/* Right Side Info */}
          <Col lg={4} md={4} sm={12} className="mt-2 ">
            <div className="tem-rhs">
              <h3>Guidelines for Online Donation</h3>
              <div>
                <ul>
                  <li>
                    Fields marked with{" "}
                    <span className="temp-span-star">* </span>are mandatory.
                  </li>
                  <li>
                    As per Government of India (GOI) regulations,{" "}
                    <span className="temp-span-star">
                      foreign cards are not supported
                    </span>
                    .
                  </li>
                  <li>
                    Donations above{" "}
                    <span className="temp-span-star">₹1,00,000 </span> entitle
                    you to free Puja and Darshan for one year.
                  </li>
                  <li>
                    Donations can be made on any day, even when the temple is
                    closed.
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      
      <OTPModel
        show={show}
        handleClose={handleClose}
        otp={otp}
        setOtp={setOtp}
        handleVerifyOtp={handleVerifyOtp}
        verifying={verifying}
      />
    </div>
  );
};

export default ExtendYourDivine;
