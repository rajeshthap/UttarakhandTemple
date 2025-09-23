import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import OTPModel from "../OTPModel/OTPModel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ModifyAlert from "../Alert/ModifyAlert";

const ExtendYourDivine = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [otp, setOtp] = useState("");
  const [temples, setTemples] = useState([]);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [formData, setFormData] = useState({
    temple_id: "",
    amount: "",
    pilgrim_name: "",
    mobile_number: "",
    email_id: "",
  });
  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const res = await axios.get(
          "https://brjobsedu.com/Temple_portal/api/temples-for-divine/"
        );
        if (res.data && Array.isArray(res.data.temples)) {
          setTemples(res.data.temples);
        }
      } catch (err) {}
    };
    fetchTemples();
  }, []);

  const navigate = useNavigate();
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const validateForm = () => {
    let formErrors = {};

    if (!formData.temple_id) {
      formErrors.temple_id = "Temple selection is required.";
    }
    if (!formData.amount) {
      formErrors.amount = "Amount is required.";
    } else if (isNaN(formData.amount) || Number(formData.amount) <= 0) {
      formErrors.amount = "Enter a valid amount.";
    }
    if (!formData.pilgrim_name.trim()) {
      formErrors.pilgrim_name = "Pilgrim name is required.";
    }
    if (!formData.mobile_number) {
      formErrors.mobile_number = "Mobile number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile_number)) {
      formErrors.mobile_number = "Enter a valid 10-digit mobile number.";
    }
    if (!formData.email_id) {
      formErrors.email_id = "Email ID is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_id)) {
      formErrors.email_id = "Enter a valid email address.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "mobile_number") {
      if (!/^[6-9]\d{9}$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          mobile_number: "Enter a valid 10-digit mobile number.",
        }));
      } else {
        setErrors((prev) => {
          const { mobile_number, ...rest } = prev;
          return rest;
        });
      }
    }

    if (name === "email_id") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          email_id: "Enter a valid email address.",
        }));
      } else {
        setErrors((prev) => {
          const { email_id, ...rest } = prev;
          return rest;
        });
      }
    }

    if (name !== "mobile_number" && name !== "email_id") {
      setErrors((prev) => {
        const { [name]: removed, ...rest } = prev;
        return rest;
      });
    }
  };
  const handleResendOtp = async () => {
    try {
      const res = await axios.post(
        "https://brjobsedu.com/Temple_portal/api/Sentotp/",
        {
          phone: formData.mobile_number,
        }
      );

      if (res.data.success) {
        setAlertMessage("OTP Resent Successfully!");
        setShowAlert(true);
      } else {
        setAlertMessage("Failed to resend OTP. Try again.");
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage("Something went wrong. Please try again.");
      setShowAlert(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setAlertMessage("Please fill all required fields.");
      setShowAlert(true);

      return;
    }

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
        await axios.post("https://brjobsedu.com/Temple_portal/api/Sentotp/", {
          phone: formData.mobile_number,
        });
        handleShow();
      } else {
        setAlertMessage("Something went wrong!");
        setShowAlert(true);
      }
    } catch (error) {
      // console.log(error.response?.data || error.message);
      setAlertMessage(
        "Error: " +
          (error.response?.data?.message ||
            error.response?.data ||
            error.message)
      );
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
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
        setAlertMessage("OTP Verified Successfully!");
        setShowAlert(true);
        setTimeout(() => {
          navigate("/PaymentConfirmation");
        }, 2000);
        handleClose();
      } else {
        setAlertMessage(response.data.message || "OTP verification failed.");
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage("Please Enter Correct OTP");
      setShowAlert(true);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="temp-donate">
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
                    Select Temple Name <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Select
                    className="temp-form-control-option"
                    name="temple_id"
                    value={formData.temple_id}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Temple Name</option>
                    {temples.map((temple) => (
                      <option key={temple.id} value={temple.id}>
                        {temple.temple_name} – {temple.city}, {temple.state}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.temple_id && (
                    <small className="text-danger">{errors.temple_id}</small>
                  )}
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
                    placeholder="Enter Amount"
                    className="temp-form-control"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                  />
                  {errors.amount && (
                    <small className="text-danger">{errors.amount}</small>
                  )}
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
                    placeholder="Enter Pilgrim Name"
                    className="temp-form-control"
                    name="pilgrim_name"
                    value={formData.pilgrim_name}
                    onChange={handleInputChange}
                  />
                  {errors.pilgrim_name && (
                    <small className="text-danger">{errors.pilgrim_name}</small>
                  )}
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
                    placeholder="Enter Mobile Number"
                    className="temp-form-control"
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleInputChange}
                  />
                  {errors.mobile_number && (
                    <small className="text-danger">
                      {errors.mobile_number}
                    </small>
                  )}
                </Form.Group>
              </Col>
              {/* Email */}
              <Col lg={6} md={6} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="temp-label">
                    Email ID<span className="temp-span-star"> *</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email ID"
                    className="temp-form-control"
                    name="email_id"
                    value={formData.email_id}
                    onChange={handleInputChange}
                  />
                  {errors.email_id && (
                    <small className="text-danger">{errors.email_id}</small>
                  )}
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
      <ModifyAlert
        message={alertMessage}
        show={showAlert}
        setShow={setShowAlert}
      />

      <OTPModel
        show={show}
        handleClose={handleClose}
        otp={otp}
        setOtp={setOtp}
        handleVerifyOtp={handleVerifyOtp}
        phone={formData.mobile_number}
        handleResendOtp={handleResendOtp}
      />
    </div>
  );
};

export default ExtendYourDivine;
