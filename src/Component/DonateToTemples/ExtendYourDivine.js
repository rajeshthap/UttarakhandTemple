import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import OTPModel from "../OTPModel/OTPModel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ModifyAlert from "../Alert/ModifyAlert";
import { BASE_URLL } from "../BaseURL";
import { useAuth } from "../GlobleAuth/AuthContext";
import LoginPopup from "../OTPModel/LoginPopup";

const ExtendYourDivine = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [pendingDonation, setPendingDonation] = useState(null);
  const [profile, setProfile] = useState(null);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [, setAgree] = useState(false);
  const [otp, setOtp] = useState("");
  const [temples, setTemples] = useState([]);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { uniqueId } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);

  const checkUserExists = async (fieldValue, fieldName) => {
    try {
      if (uniqueId) return;

      const res = await axios.get(`${BASE_URLL}api/all-reg/`);
      const userExists = res.data.some((user) => {
        if (fieldName === "mobile_number")
          return String(user.phone) === String(fieldValue);
        if (fieldName === "email")
          return String(user.email) === String(fieldValue);
        return false;
      });
      if (userExists) {
        setShowLoginModal(true);
      }
    } catch (err) {
      console.error("Error checking user existence:", err);
    }
  };

  const [formData, setFormData] = useState({
    temple_name: "",
    amount: "",
    pilgrim_name: "",
    mobile_number: "",
    email_id: "",
    creator_id: uniqueId,
  });
  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const res = await axios.get(`${BASE_URLL}api/temple-poojas-list/`);

        if (res.data && res.data.temple_name) {
          setTemples([res.data]);
        } else if (Array.isArray(res.data)) {
          setTemples(res.data);
        } else if (Array.isArray(res.data.temples)) {
          setTemples(res.data.temples);
        }
      } catch (err) {
        console.error("Error fetching temples:", err);
      }
    };

    fetchTemples();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const userId = uniqueId || "";
        const response = await axios.get(
          `https://mahadevaaya.com/backend/api/get-user/?user_id=${userId}`
        );

        if (response.data) {
          const user = response.data;
          const fetched = {
            displayName: user.devotee_name || "",
            mobile: user.phone || "",
            email: user.email || "",
            firstName: user.devotee_name?.split(" ")[0] || "",
            gender: user.gender || "",
            devotee_photo: user.devotee_photo || "",
          };
          console.log("Fetched User Data:", fetched);
          setProfile(fetched);

          // populate formData with fetched mobile/email and pilgrim name (if available)
          setFormData((prev) => ({
            ...prev,
            mobile_number: fetched.mobile || prev.mobile_number,
            email_id: fetched.email || prev.email_id,
            pilgrim_name: fetched.displayName || prev.pilgrim_name,
            creator_id: uniqueId || prev.creator_id,
          }));
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
        setProfileLoaded(true);
      }
    };

    fetchProfile();
  }, [uniqueId]);

  const navigate = useNavigate();
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const validateForm = () => {
    let formErrors = {};

    if (!formData.temple_name) {
      formErrors.temple_name = "Temple selection is required.";
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
        checkUserExists(value, "mobile_number");
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
        checkUserExists(value, "email");
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
      const res = await axios.post(`${BASE_URLL}api/send-otp/`, {
        phone: formData.mobile_number,
      });

      if (res.data?.success) {
        setAlertMessage("OTP sent successfully!");
        setShowAlert(true);
      } else {
        setAlertMessage(
          res.data?.message || "Failed to resend OTP. Try again."
        );
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      setAlertMessage("Something went wrong. Please try again.");
      setShowAlert(true);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();

    if (!validateForm()) {
      setAlertMessage("Please fill all required fields.");
      setShowAlert(true);
      return;
    }

    // If OTP not verified yet
    if (!isVerified) {
      try {
        setLoading(true);
        const otpRes = await axios.post(`${BASE_URLL}api/send-otp/`, {
          phone: formData.mobile_number,
        });

        if (otpRes.data?.success) {
          setPendingDonation({ ...formData });
          setIsButtonEnabled(false);
          setAlertMessage("OTP sent. Please verify to proceed to Payment.");
          setShowAlert(true);
          setShow(true); // open OTP modal
        } else {
          setAlertMessage(
            otpRes.data?.message || "Failed to send OTP. Try again."
          );
          setShowAlert(true);
        }
      } catch (err) {
        console.error("Error sending OTP:", err);
        setAlertMessage("Error sending OTP. Please try again.");
        setShowAlert(true);
      } finally {
        setLoading(false);
      }

      return;
    }

    // OTP already verified → redirect to Payment Page
    setTimeout(() => navigate("/PaymentConfirmation"), 500);
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setAlertMessage("Please enter OTP.");
      setShowAlert(true);
      return;
    }

    setVerifying(true);
    try {
      const phoneToVerify = String(
        pendingDonation?.mobile_number || formData.mobile_number
      ).trim();
      const otpValue = String(otp).trim();

      const res = await axios.post(`${BASE_URLL}api/verify-otp/`, {
        phone: phoneToVerify,
        otp: otpValue,
      });

      if (!(res.status === 200 && res.data?.success)) {
        setAlertMessage(res.data?.message || "OTP verification failed");
        setShowAlert(true);
        setAgree(false);
        setIsButtonEnabled(true);
        return;
      }

      setIsVerified(true);
      setAlertMessage(res.data?.message || "OTP verified successfully");
      setShowAlert(true);
      setAgree(true);
      setShow(false);

      setTimeout(() => navigate("/PaymentConfirmation"), 1200);
    } catch (err) {
      console.error("verify OTP error:", err);
      setAlertMessage(err.response?.data?.message || "Error verifying OTP");
      setShowAlert(true);
      setAgree(false);
      setIsButtonEnabled(true);
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
                    name="temple_name"
                    value={formData.temple_name}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Temple Name</option>
                    {temples.map((temple, index) => (
                      <option key={index} value={temple.temple_name}>
                        {temple.temple_name}
                      </option>
                    ))}
                  </Form.Select>

                  {errors.temple_name && (
                    <small className="text-danger">{errors.temple_name}</small>
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
                    disabled={!!profile?.mobile}
                    title={profile?.mobile ? "Phone loaded from profile" : ""}
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
                    disabled={!!profile?.email}
                    title={profile?.email ? "Email loaded from profile" : ""}
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
                disabled={loading || !isButtonEnabled || verifying} // include verifying to block multiple clicks
                onClick={handleSubmit}
              >
                {loading || verifying ? "Processing..." : "Donate Now"}
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
      <LoginPopup
        show={showLoginModal}
        mobileNumber={formData.mobile_number}
        email={formData.email_id}
        handleClose={() => {
          setShowLoginModal(false);
          setFormData((prev) => ({ ...prev, mobile_number: "", email_id: "" }));
        }}
      />
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
