import React, { useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ModifyAlert from "../../Alert/ModifyAlert";
import OTPModel from "../../OTPModel/OTPModel";
import { BASE_URLL } from "../../../Component/BaseURL";
import { useAuth } from "../../GlobleAuth/AuthContext";
import "../../../assets/CSS/TempleBooking.css";

const DonateCrowd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { uniqueId } = useAuth();

  // Values passed via navigate()
  const { temple_name, fund_raise_name, fund_id } = location.state || {
    temple_name: "",
    fund_raise_name: "",
    fund_id: "",
  };

  // Local states
  const [formData, setFormData] = useState({
    temple_name: temple_name || "",
    fund_name: fund_raise_name || "",
    fund_id: fund_id || "",
    mobile_number: "",
    pilgrim_name: "",
    email_id: "",
    amount: "",
    creator_id: uniqueId || "",
  });

  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [pendingDonation, setPendingDonation] = useState(null);

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validation
  const validateForm = () => {
    let formErrors = {};
    if (!formData.amount) formErrors.amount = "Donation amount is required.";
    if (!formData.pilgrim_name) formErrors.pilgrim_name = "Pilgrim Name is required.";
    if (!formData.mobile_number)
      formErrors.mobile_number = "Mobile number is required.";
    else if (!/^[6-9]\d{9}$/.test(formData.mobile_number))
      formErrors.mobile_number = "Enter a valid 10-digit number.";
    if (!formData.email_id)
      formErrors.email_id = "Email ID is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_id))
      formErrors.email_id = "Enter a valid email address.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Send OTP
  const handleSendOtp = async () => {
    if (!validateForm()) {
      setAlertMessage("Please fill all required fields correctly.");
      setShowAlert(true);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URLL}api/send-otp/`, {
        phone: formData.mobile_number,
      });

      if (res.data?.success) {
        setAlertMessage("OTP sent successfully. Please verify.");
        setShowAlert(true);
        setPendingDonation({ ...formData });
        setShowOtpModal(true);
      } else {
        setAlertMessage(res.data?.message || "Failed to send OTP.");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Send OTP Error:", error);
      setAlertMessage("Error sending OTP. Try again.");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (!pendingDonation?.mobile_number) return;
    try {
      setResending(true);
      const res = await axios.post(`${BASE_URLL}api/send-otp/`, {
        phone: pendingDonation.mobile_number,
      });

      if (res.data?.success) {
        setAlertMessage("OTP resent successfully!");
        setShowAlert(true);
      } else {
        setAlertMessage(res.data?.message || "Failed to resend OTP.");
        setShowAlert(true);
      }
    } catch (err) {
      console.error("Resend OTP Error:", err);
      setAlertMessage("Error resending OTP. Try again.");
      setShowAlert(true);
    } finally {
      setResending(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      setAlertMessage("Please enter OTP.");
      setShowAlert(true);
      return;
    }

    try {
      setVerifying(true);
      const phoneToVerify = String(pendingDonation.mobile_number).trim();
      const otpValue = String(otp).trim();

      const res = await axios.post(`${BASE_URLL}api/verify-otp/`, {
        phone: phoneToVerify,
        otp: otpValue,
      });

      if (!(res.status === 200 && res.data?.success)) {
        setAlertMessage(res.data?.message || "OTP verification failed");
        setShowAlert(true);
        return;
      }

      setIsVerified(true);
      setAlertMessage(res.data?.message || "OTP verified successfully!");
      setShowAlert(true);
      setShowOtpModal(false);

      // Proceed to donation submission
      await handleDonationSubmit();

      // Navigate after success
      setTimeout(() => navigate("/PaymentConfirmation"), 5000);
    } catch (err) {
      console.error("OTP verification error:", err);
      setAlertMessage(err.response?.data?.message || "Error verifying OTP");
      setShowAlert(true);
    } finally {
      setVerifying(false);
    }
  };

  // Final Donation Submit
  const handleDonationSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        temple_name: formData.temple_name,
        fund_name: formData.fund_name,
        fund_id: formData.fund_id,
        mobile_number: formData.mobile_number,
        pilgrim_name: formData.pilgrim_name,
        email_id: formData.email_id,
        amount: formData.amount,
        creator_id: formData.creator_id,
      };

      const res = await axios.post(`${BASE_URLL}api/crowdfund/donate/`, payload);

      if (res.status === 200 && res.data?.status === "success") {
        setAlertMessage("Donation successful!");
        setShowAlert(true);
      } else {
        setAlertMessage(res.data?.message || "Donation failed. Try again.");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Donation API Error:", error);
      setAlertMessage("Error during donation. Try again.");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="temp-donate">
      <Container className="temp-container">
        <h1>Crowdfunding Donation</h1>
        <p>
          <i>
            Support temple development and sacred causes through your generous
            contribution.
          </i>
        </p>

        <Row>
          <Col lg={8} md={8} sm={12} className="mt-4">
            <Form>
              <Row className="mt-4">
                {/* Autofilled Fields */}
                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="temp-label">Temple Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.temple_name}
                      disabled
                      className="temp-form-control"
                    />
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="temp-label">Fund Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.fund_name}
                      disabled
                      className="temp-form-control"
                    />
                  </Form.Group>
                </Col>

                {/* Donator Details */}

                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="temp-label">
                      Pilgrim Name <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="pilgrim_name"
                      value={formData.pilgrim_name}
                      onChange={handleInputChange}
                      className="temp-form-control"
                      placeholder="Enter Your Name"
                    />
                    {errors.pilgrim_name && (
                      <small className="text-danger">
                        {errors.pilgrim_name}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="temp-label">
                      Mobile Number <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="mobile_number"
                      value={formData.mobile_number}
                      onChange={handleInputChange}
                      className="temp-form-control"
                      placeholder="Enter Your Number"
                    />
                    {errors.mobile_number && (
                      <small className="text-danger">
                        {errors.mobile_number}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="temp-label">
                      Email ID <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email_id"
                      value={formData.email_id}
                      onChange={handleInputChange}
                      className="temp-form-control"
                      placeholder="Enter Your Email"
                    />
                    {errors.email_id && (
                      <small className="text-danger">{errors.email_id}</small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="temp-label">
                      Donation Amount (₹){" "}
                      <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="temp-form-control"
                      placeholder="Enter Donation Amount"
                    />
                    {errors.amount && (
                      <small className="text-danger">{errors.amount}</small>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <div className="Temp-btn-submit mt-4 mb-3">
                <Button
                  variant="temp-submit-btn"
                  className="temp-submit-btn mx-3"
                  type="button"
                  disabled={loading || verifying}
                  onClick={handleSendOtp}
                >
                  {loading ? "Processing..." : "Donate Now"}
                </Button>

                <Button variant="secondary" className="temp-cancle-btn">
                  Cancel
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>

      {/* OTP Modal */}
      <OTPModel
        show={showOtpModal}
        handleClose={() => setShowOtpModal(false)}
        otp={otp}
        setOtp={setOtp}
        handleVerifyOtp={handleVerifyOtp}
        handleResendOtp={handleResendOtp}
        resending={resending}
        phone={formData.mobile_number}
      />

      {/* Alert */}
      <ModifyAlert
        message={alertMessage}
        show={showAlert}
        setShow={setShowAlert}
      />
    </div>
  );
};

export default DonateCrowd;
