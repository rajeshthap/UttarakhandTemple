import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import OTPModel from "../../OTPModel/OTPModel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LocationState from "../../userregistration/LocationState";

const PoojaBooking = () => {
  const [show, setShow] = useState(false);
  const [temples, setTemples] = useState([]);
  const handleClose = () => setShow(false);
  const [agree, setAgree] = useState(false);
  const [otp, setOtp] = useState("");
  const [, setLoading] = useState(false);
  const [, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    gender: "",
    age: "",
    mobile_number: "",
    email: "",
    id_proof_type: "",
    id_proof_number: "",
    temple_name: "",
    pooja_name: "",
    date_of_pooja: "",
    preferred_time_slot: "",
    mode_of_participation: "",
    number_of_participants: "",
    gotra: "",
    nakshatra_rashi: "",
    sankalp: "",
    accommodation_required: "",
    special_requests: "",
    prasad_offerings: "",
    prasad_delivery: "",

    //  Delivery Address (only if prasad_delivery = "yes")
    country: "",
    state: "",
    city: "",
    pin_code: "",

    donation_amount: "",
  });

   const handleResendOtp = async () => {
    try {
      
      const res = await axios.post("https://brjobsedu.com/Temple_portal/api/Sentotp/", {
        phone: formData.mobile_number, 
      });
  
      if (res.data.success) {
        
      } else {
        alert("Failed to resend OTP. Try again.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  
  const handleInputChangeCity = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateFields(name, value); 
  };

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const res = await axios.get(
          "https://brjobsedu.com/Temple_portal/api/temples-for-divine/"
        );
        if (res.data && Array.isArray(res.data.temples)) {
          setTemples(res.data.temples);
        }
      } catch (err) {
        console.error("Error fetching temples:", err);
      }
    };
    fetchTemples();
  }, []);

  const validateFields = () => {
    const newErrors = {};

    //  Devotee Information
    if (!formData.full_name.trim())
      newErrors.full_name = "Full Name is required";

    if (!formData.gender) newErrors.gender = "Gender is required";

    if (!formData.age || isNaN(formData.age) || formData.age <= 0)
      newErrors.age = "Valid age is required";

    if (!formData.mobile_number) {
      newErrors.mobile_number = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile_number)) {
      newErrors.mobile_number = "Enter a valid 10-digit mobile number";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.id_proof_type)
      newErrors.id_proof_type = "ID Proof Type is required";

    if (!formData.id_proof_number) {
      newErrors.id_proof_number = "ID Proof Number is required";
    } else if (formData.id_proof_number.length > 16) {
      newErrors.id_proof_number = "ID Proof Number cannot exceed 16 characters";
    }

    //  Pooja Booking Details
    if (!formData.temple_name)
      newErrors.temple_name = "Temple Name is required";

    if (!formData.pooja_name) newErrors.pooja_name = "Pooja Name is required";

    if (!formData.date_of_pooja)
      newErrors.date_of_pooja = "Date of Pooja is required";

    if (!formData.preferred_time_slot)
      newErrors.preferred_time_slot = "Preferred Time Slot is required";

    if (!formData.mode_of_participation)
      newErrors.mode_of_participation = "Mode of Participation is required";

    //  Additional Details
    if (
      !formData.number_of_participants ||
      isNaN(formData.number_of_participants) ||
      formData.number_of_participants <= 0
    )
      newErrors.number_of_participants = "Enter valid number of participants";

    if (!formData.gotra.trim()) newErrors.gotra = "Gotra is required";

    if (!formData.nakshatra_rashi.trim())
      newErrors.nakshatra_rashi = "Nakshatra / Rashi is required";

    if (!formData.sankalp.trim())
      newErrors.sankalp = "Sankalp / Intentions are required";

    // Accommodation (optional – validate only if user selected Yes)
    if (
      formData.accommodation_required === "Yes" &&
      !formData.special_requests.trim()
    )
      newErrors.special_requests =
        "Please specify special requests for accommodation";

    //  Prasad & Offerings
    if (!formData.prasad_delivery)
      newErrors.prasad_delivery = "Prasad Delivery option is required";

    // Payment Details
    if (
      !formData.donation_amount ||
      isNaN(formData.donation_amount) ||
      formData.donation_amount <= 0
    )
      newErrors.donation_amount = "Valid Donation Amount is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAgreeChange = async (e) => {
    const checked = e.target.checked;

    if (!checked) {
      setAgree(false);
      return;
    }

    //  validate required fields before OTP
    if (!validateFields()) {
      alert("Please fill all required fields correctly before verifying OTP.");
      setAgree(false);
      return;
    }

    //  if OTP already verified, no need to resend
    if (isVerified) {
      setAgree(true);
      return;
    }

    //  otherwise send OTP
    try {
      const res = await axios.post(
        "https://brjobsedu.com/Temple_portal/api/Sentotp/",
        {
          phone: formData.mobile_number,
        }
      );

      if (res.data.success) {
        setOtpSent(true);
        setShow(true); // open modal
        setAgree(true);
       
      } else {
        alert(res.data.message || "Failed to send OTP");
        setAgree(false);
      }
    } catch (err) {
      console.error("OTP Send Error:", err);
      alert("Error sending OTP");
      setAgree(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(
        "https://brjobsedu.com/Temple_portal/api/Verify/",
        {
          phone: formData.mobile_number,
          otp: otp,
        }
      );

      if (res.data.success) {
        setIsVerified(true);
        alert("Phone number verified!");
        handleClose(); // close modal
        //navigate("/PaymentConfirmation");
      } else {
        alert(res.data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error("OTP Verify Error:", err);
      alert("Error verifying OTP");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "mobile_number") {
      let errorMsg = "";
      if (!/^\d*$/.test(value)) {
        errorMsg = "Only digits allowed";
      } else if (value.length > 0 && !/^\d{10}$/.test(value)) {
        errorMsg = "Enter a valid 10-digit mobile number";
      }
      setErrors((prev) => ({ ...prev, mobile_number: errorMsg }));
    }

    if (name === "email") {
      let errorMsg = "";
      if (value.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorMsg = "Enter a valid email address";
      }
      setErrors((prev) => ({ ...prev, email: errorMsg }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return alert("Please fill all required fields.");
    }

    if (!isVerified) {
      alert("Please verify your phone number before submitting.");
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();

      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const res = await axios.post(
        "https://brjobsedu.com/Temple_portal/api/Pooja_booking/",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Pooja Registration Response:", res.data);

      if (res.data.message === "Temple booking created successfully") {
        alert("Pooja Registration Successful!");
        navigate("/PaymentConfirmation");
      } else {
        alert(res.data.message || "Pooja Registration failed");
      }
    } catch (err) {
      console.error(err);

      if (err.response && err.response.data) {
        const errorData = err.response.data;
        alert(errorData.message || "Something went wrong!");
      } else {
        alert(err.message || "Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container className="temp-container">
        <h1>Pooja Booking</h1>
        <p>
          <i>
            Reserve Rituals, Ceremonies & Offerings at Your Preferred Temple{" "}
          </i>
        </p>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={8} md={8} sm={12} className="mt-2">
              <h2>Devotee Information</h2>
              <Row className="mt-3">
                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Full Name <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      className="temp-form-control"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                    />
                    {errors.full_name && (
                      <small className="text-danger">{errors.full_name}</small>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Gender <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      className="temp-form-control-option"
                      placeholder="Gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Gender </option>
                      <option value="Male">Male </option>
                      <option value="Female">Female </option>
                      <option value="Other">Other </option>
                    </Form.Select>
                    {errors.gender && (
                      <small className="text-danger">{errors.gender}</small>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Age <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Age"
                      className="temp-form-control"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                    />
                    {errors.age && (
                      <small className="text-danger">{errors.age}</small>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
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
                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Email ID <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email ID"
                      className="temp-form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <small className="text-danger">{errors.email}</small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      ID Proof Type <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      className="temp-form-control-option"
                      placeholder="ID Proof Type"
                      name="id_proof_type"
                      value={formData.id_proof_type}
                      onChange={handleInputChange}
                    >
                      <option value="">Select ID Proof </option>
                      <option value="Aadhar">Aadhar Card </option>
                      <option value="PAN ">PAN </option>
                      <option value="Passport ">Passport </option>
                      <option value="Voter ID">Voter ID </option>
                    </Form.Select>
                    {errors.id_proof_type && (
                      <small className="text-danger">
                        {errors.id_proof_type}
                      </small>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      ID Proof Number <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter ID Proof Number"
                      className="temp-form-control"
                      name="id_proof_number"
                      value={formData.id_proof_number}
                      onChange={handleInputChange}
                      maxLength={16}
                    />
                    {errors.id_proof_number && (
                      <small className="text-danger">
                        {errors.id_proof_number}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                <h2 className="mb-3 mt-2">Pooja Booking Details </h2>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Temple Name <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      className="temp-form-control-option"
                      name="temple_name"
                      value={formData.temple_name}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Temple Name</option>
                      {temples.map((temple) => (
                        <option key={temple.id} value={temple.temple_name}>
                          {temple.temple_name} – {temple.city}, {temple.state}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.temple_name && (
                      <small className="text-danger">
                        {errors.temple_name}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Pooja Name / Type{" "}
                      <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      className="temp-form-control-option"
                      placeholder="Pooja Name / Type"
                      name="pooja_name"
                      value={formData.pooja_name}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Pooja Name</option>
                      <option value="Rudrabhishek">Rudrabhishek </option>
                      <option value="Satyanarayan">Satyanarayan</option>
                      <option value="Ganesh Pooja">Ganesh Pooja </option>
                    </Form.Select>
                    {errors.pooja_name && (
                      <small className="text-danger">{errors.pooja_name}</small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Date of Pooja <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Date Of Pooja"
                      className="temp-form-control"
                      name="date_of_pooja"
                      value={formData.date_of_pooja}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    {errors.date_of_pooja && (
                      <small className="text-danger">
                        {errors.date_of_pooja}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Preferred Time Slot{" "}
                      <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      className="temp-form-control-option"
                      placeholder="Preferred Time Slot"
                      name="preferred_time_slot"
                      value={formData.preferred_time_slot}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Time Slot</option>
                      <option value="Morning ">Morning </option>
                      <option value="Afternoon ">Afternoon </option>
                      <option value="Evening">Evening </option>
                    </Form.Select>
                    {errors.preferred_time_slot && (
                      <small className="text-danger">
                        {errors.preferred_time_slot}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Mode of Participation{" "}
                      <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      className="temp-form-control-option"
                      placeholder="Mode Of Participation"
                      name="mode_of_participation"
                      value={formData.mode_of_participation}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Mode of Participation</option>
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                      <option value="both">Both</option>
                    </Form.Select>
                    {errors.mode_of_participation && (
                      <small className="text-danger">
                        {errors.mode_of_participation}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                <h2 className="mb-3 mt-2">Additional Details</h2>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Number of Participants{" "}
                      <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Number of Participants "
                      className="temp-form-control"
                      name="number_of_participants"
                      value={formData.number_of_participants}
                      onChange={handleInputChange}
                    />
                    {errors.number_of_participants && (
                      <small className="text-danger">
                        {errors.number_of_participants}
                      </small>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Gotra <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Gotra"
                      className="temp-form-control"
                      name="gotra"
                      value={formData.gotra}
                      onChange={handleInputChange}
                    />
                    {errors.gotra && (
                      <small className="text-danger">{errors.gotra}</small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Nakshatra / Rashi{" "}
                      <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nakshatra / Rashi "
                      className="temp-form-control"
                      name="nakshatra_rashi"
                      value={formData.nakshatra_rashi}
                      onChange={handleInputChange}
                    />
                    {errors.nakshatra_rashi && (
                      <small className="text-danger">
                        {errors.nakshatra_rashi}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Any Specific Sankalp / Instructions for Pooja{" "}
                      <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Any Specific Sankalp"
                      className="temp-form-control"
                      name="sankalp"
                      value={formData.sankalp}
                      onChange={handleInputChange}
                    />
                    {errors.sankalp && (
                      <small className="text-danger">{errors.sankalp}</small>
                    )}
                  </Form.Group>
                </Col>

                <h2 className="mb-3 mt-2">Accomodation</h2>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Accomodation Required{" "}
                      <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      className="temp-form-control-option"
                      name="accommodation_required"
                      value={formData.accommodation_required}
                      onChange={handleInputChange}
                    >
                      <option value="">Select option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </Form.Select>
                    {errors.accommodation_required && (
                      <small className="text-danger">
                        {errors.accommodation_required}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Special Requests <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Special Request"
                      className="temp-form-control"
                      name="special_requests"
                      value={formData.special_requests}
                      onChange={handleInputChange}
                    />
                    {errors.special_requests && (
                      <small className="text-danger">
                        {errors.special_requests}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                {/* Prasad & Offerings */}
                <h2 className="mb-3 mt-2">Prasad & Offerings</h2>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Prasad Type <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      className="temp-form-control-option"
                      name="prasad_offerings"
                      value={formData.prasad_offerings}
                      onChange={handleInputChange}
                    >
                      <option value="">Select option</option>
                      <option value="Coconut">Coconut</option>
                      <option value="Fruits">Fruits</option>
                      <option value="Sweets">Sweets</option>
                    </Form.Select>
                    {errors.prasad_offerings && (
                      <small className="text-danger">
                        {errors.prasad_offerings}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Prasad Delivery<span className="temp-span-star"> *</span>
                    </Form.Label>
                    <Form.Select
                      className="temp-form-control-option"
                      name="prasad_delivery"
                      value={formData.prasad_delivery}
                      onChange={handleInputChange}
                    >
                      <option value="">Select option</option>
                      <option value="yes">Yes</option>
                      {/* <option value="no">No</option> */}
                    </Form.Select>
                    {errors.prasad_delivery && (
                      <small className="text-danger">
                        {errors.prasad_delivery}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                {formData.prasad_delivery === "yes" && (
                  <>
                    <h2 className="mt-2 mb-3">Delivery Address</h2>

                   <LocationState
                          formData={formData}
                          handleInputChange={handleInputChangeCity}
                          formErrors={errors}
                        />

                    <Col lg={6} md={6} sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">
                          Pin Code <span className="temp-span-star">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Pincode"
                          className="temp-form-control"
                          name="pin_code"
                          value={formData.pin_code}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </>
                )}

                <h2 className="mt-2 mb-3">Payment Details</h2>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="temp-label">
                      Donation Amount <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter the Amount"
                      className="temp-form-control"
                      name="donation_amount"
                      value={formData.donation_amount}
                      onChange={handleInputChange}
                    />
                    {errors.donation_amount && (
                      <small className="text-danger">
                        {errors.donation_amount}
                      </small>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    className="mx-2"
                    checked={agree}
                    onChange={handleAgreeChange}
                  />
                  I agree to booking terms &amp; cancellation policy
                </label>
              </div>

              <div className="gap-3 mt-3 mb-3 Temp-btn-submit">
                <Button
                  variant="temp-submit-btn"
                  className="temp-submit-btn mx-3"
                  type="submit"
                  disabled={!agree || !isVerified}
                >
                  Registration Now
                </Button>
                <Button
                  variant="secondary"
                  className="temp-cancle-btn"
                  type="button"
                  onClick={() => setFormData({})}
                >
                  Cancel
                </Button>
              </div>
            </Col>
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
                      . Devotees residing outside{" "}
                      <span className="temp-span-star">
                        India may donate through Indian payment modes/cards{" "}
                      </span>
                      only.
                    </li>
                    <li>
                      Donations above{" "}
                      <span className="temp-span-star">₹1,00,000 </span> entitle
                      you to{" "}
                      <span className="temp-span-star">
                        free Puja and Darshan for one year
                      </span>
                      .
                    </li>
                    <li>
                      Donations can be made{" "}
                      <span className="temp-span-star">on any day</span>, even
                      when the temple is closed.
                    </li>
                  </ul>
                  <h2 className="mt-2 mb-3">Accepted Payment Methods</h2>
                  <ul>
                    <li>
                      Net Banking – Secure online transfers through major Indian
                      banks.
                    </li>
                    <li>
                      Debit Card – Quick and convenient payment using your bank
                      card.
                    </li>
                    <li>
                      Credit Card – Hassle-free donations with instant
                      confirmation.
                    </li>
                    <li>
                      UPI (Unified Payments Interface) – Fast, mobile-based
                      payment option.
                    </li>
                    <li>
                      BharatPe QR – Scan & Pay instantly via supported payment
                      apps.
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
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

export default PoojaBooking;
