import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import OTPModel from "../OTPModel/OTPModel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LocationState from "../userregistration/LocationState";
import ModifyAlert from "../Alert/ModifyAlert"

const MandirBooking  = () => {
  const [show, setShow] = useState(false);
  const [temples, setTemples] = useState([]);
  const handleClose = () => setShow(false);
  const [agree, setAgree] = useState(false);
  const [otp, setOtp] = useState("");
  const [, setLoading] = useState(false);
  const [, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
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
    darshan_type: "",
    date_of_darshan: "",
    time_slot: "",
    number_of_devotees: "",
    prasad_delivery: "",
    special_seva_or_puja: "",
    state: "",
    country: "",
    city: "",
    pin_code: "",
    donation_amount: "",
    payment_mode: "",
  });


  const handleResendOtp = async () => {
    try {

      const res = await axios.post("https://brjobsedu.com/Temple_portal/api/Sentotp/", {
        phone: formData.mobile_number,
      });

      if (res.data.success) {

      } else {
         setAlertMessage("Failed to resend OTP. Try again.");
        setShowAlert(true);
        
        
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
       setAlertMessage("Something went wrong. Please try again.");
        setShowAlert(true);
        
        
    
    }
  };




  const handleInputChangeCity = (name, value) => {
    // Update form data
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Remove validation error only for the current field if it has a valid value
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (value && value.trim() !== "") {
        delete newErrors[name]; // Clear only the current field's error
      } else {
        newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
      }
      return newErrors;
    });

    // Reset dependent dropdowns
    if (name === "country") {
      setFormData((prev) => ({ ...prev, state: "", city: "" }));
      // Only clear errors if the fields are not required anymore
      // Don't clear state/city errors here - they should remain until filled
    } else if (name === "state") {
      setFormData((prev) => ({ ...prev, city: "" }));
      // Don't clear city error here - it should remain until filled
    }
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

    // Devotee Information
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

    // Darshan Booking Details
    if (!formData.temple_name)
      newErrors.temple_name = "Temple Name is required";

    if (!formData.darshan_type)
      newErrors.darshan_type = "Darshan Type is required";

    if (!formData.date_of_darshan)
      newErrors.date_of_darshan = "Date of Darshan is required";

    if (!formData.time_slot)
      newErrors.time_slot = "Time Slot is required";

    if (
      !formData.number_of_devotees ||
      isNaN(formData.number_of_devotees) ||
      formData.number_of_devotees <= 0
    )
      newErrors.number_of_devotees = "Enter valid number of devotees";

    if (!formData.special_seva_or_puja.trim())
      newErrors.special_seva_or_puja = "Special Seva / Puja is required";


    // Prasad Delivery (Required field)
    if (formData.prasad_delivery === "" || formData.prasad_delivery === null) {
      newErrors.prasad_delivery = "Prasad Delivery option is required";
    }

    // Address Details (validate only if prasad_delivery is true)
    if (formData.prasad_delivery === true || formData.prasad_delivery === "yes") {
      if (!formData.state.trim()) newErrors.state = "State is required";
      if (!formData.country.trim()) newErrors.country = "Country is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.pin_code.trim()) {
        newErrors.pin_code = "Pin Code is required";
      } else if (!/^\d{6}$/.test(formData.pin_code)) {
        newErrors.pin_code = "Enter a valid 6-digit Pin Code";
      }
    }

    // Payment Details
    if (
      !formData.donation_amount ||
      isNaN(formData.donation_amount) ||
      formData.donation_amount <= 0
    )
      newErrors.donation_amount = "Valid Donation Amount is required";

    if (!formData.payment_mode)
      newErrors.payment_mode = "Payment Mode is required";

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
  setAlertMessage("Please fill all required fields correctly before verifying OTP.");
  setShowAlert(true);
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
   "https://brjobsedu.com/Temple_portal/api/send-otp/",
        {
          phone: formData.mobile_number,
        }
      );

      if (res.data.success) {
        setOtpSent(true);
        setShow(true); // open modal
        setAgree(true);

      } else {
        setAlertMessage(res.data.message || "Failed to send OTP");
        setShowAlert(true)
      }
    } catch (err) {
      console.error("OTP Send Error:", err);
      setAlertMessage("Error sending OTP");
        setShowAlert(true);
        setAgree(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(
   "https://brjobsedu.com/Temple_portal/api/verify-otp/",
        {
          phone: formData.mobile_number,
          otp: otp,
        }
      );

      if (res.data.success) {
        setIsVerified(true);
        setAlertMessage("Phone number verified!");
        setShowAlert(true);
        handleClose(); // close modal

        navigate("/PaymentConfirmation");
      } else {
         setAlertMessage(res.data.message || "Invalid OTP");
        setShowAlert(true);
        
      }
    } catch (err) {
      console.error("OTP Verify Error:", err);
      setAlertMessage("Error verifying OTP");
        setShowAlert(true);
    
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error if value is valid
    setErrors((prev) => ({
      ...prev,
      [name]:
        value && value.trim() !== ""
          ? ""
          : prev[name], // keep error if value empty
    }));

    // Specific validations
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

      setAlertMessage("Please fill all required fields.");
        setShowAlert(true);
      return 
    }

    if (!isVerified) {
          setAlertMessage("Please verify your phone number before submitting.");
        setShowAlert(true);
      
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();

      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const res = await axios.post(
        "https://brjobsedu.com/Temple_portal/api/darshan-booking/",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // console.log("Darshan Registration Response:", res.data);

      if (res.data.message === "Darshan booking created") {
         setAlertMessage("Darshan Registration Successful!");
  setShowAlert(true);
   setAgree(false);

   // delay navigation by 3 seconds
 
  setTimeout(() => {
        navigate("/PaymentConfirmation");
      }, 2000);
      
      } else {
         setAlertMessage(res.data.message || "Darshan Registration failed");
             setShowAlert(true);
            setAgree(false);
      
      }
    } catch (err) {
      console.error(err);

      if (err.response && err.response.data) {
        const errorData = err.response.data;

        setAlertMessage(errorData.message || "Darshan Registration failed");
             setShowAlert(true);
            setAgree(false);
      
      } else {
          setAlertMessage(err.message ||"Darshan Registration failed");
             setShowAlert(true);
            setAgree(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="temp-donate">
      <Container className="temp-container">
        <h1>Mandir Booking</h1>
        <p>
          <i>
            Book Your Sacred Mandir and Connect with the Divine{" "}
          </i>
        </p>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={8} md={8} sm={12} className="mt-2">
              <h2>Personal Details</h2>
              <Row>
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
                      type="number"
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
                      type="number"
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
              </Row>
              <h2>Mandir Booking Details</h2>

              <Row>
                {/* Booking Details */}

                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3" controlId="templeType">
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
                  <Form.Group className="mb-3" controlId="darshanType">
                    <Form.Label className="temp-label">
                     Type of Booking<span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      className="temp-form-control-option"
                      placeholder="Darshan Type"
                      name="darshan_type"
                      value={formData.darshan_type}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Darshan Type</option>
                      <option value="Darshan">Darshan</option>
                      <option value="Puja">Puja</option>
                      <option value="Festival Booking">Festival Booking</option>
                      <option value="Abhishekam">Abhishekam</option>
                      <option value="Archana">Archana</option>
                      <option value="Rudrabhishek">Rudrabhishek</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                    {errors.darshan_type && (
                      <small className="text-danger">
                        {errors.darshan_type}
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
                      Date Of Darshan <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Date Of Darshan"
                      className="temp-form-control"
                      name="date_of_darshan"
                      value={formData.date_of_darshan}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    {errors.date_of_darshan && (
                      <small className="text-danger">
                        {errors.date_of_darshan}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                


                <Col lg={6} md={6} sm={12}>
                  <Form.Group controlId="donationFor">
                    <Form.Label>
                      Time Slot{" "}
                      <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      className="temp-form-control-option"
                      placeholder="Time Slot"
                      name="time_slot"
                      value={formData.time_slot}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Time Slot</option>
                      <option value="Morning ">Morning </option>
                      <option value="Afternoon ">Afternoon </option>
                      <option value="Evening">Evening </option>
                    </Form.Select>
                    {errors.time_slot && (
                      <small className="text-danger">
                        {errors.time_slot}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                <h2 className="pt-4">Address Details</h2>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className="temp-label">
                      Prasad Delivery <span className="temp-span-star">*</span>
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
                          placeholder=" Enter Pin Code"
                          className="temp-form-control"
                          name="pin_code"
                          value={formData.pin_code}
                          onChange={handleInputChange}
                        />
                        {errors.pin_code && (
                          <small className="text-danger">
                            {errors.pin_code}
                          </small>
                        )}

                      </Form.Group>
                    </Col>
                  </>
                )}
  <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3" controlId="darshanType">
                    <Form.Label className="temp-label">
                      Select Accommodation Required <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      className="temp-form-control-option"
                      name="payment_mode"
                      value={formData.payment_mode}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Accommodation</option>
                      <option value="upi">Yes</option>
                      <option value="card">No</option>

                    </Form.Select>
                    {errors.payment_mode && (
                      <small className="text-danger">
                        {errors.payment_mode}
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
                      as="textarea"
                      rows={4}
                      placeholder="Enter Your Special Requests"
                      className="temp-form-control"
                      name="special_seva_or_puja"
                      value={formData.special_seva_or_puja}
                      onChange={handleInputChange}
                    />
                    {errors.special_seva_or_puja && (
                      <small className="text-danger">
                        {errors.special_seva_or_puja}
                      </small>
                    )}

                  </Form.Group>
                </Col>

                <h2>Payment Details</h2>

                {/* Payment Details */}



                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3" controlId="darshanType">
                    <Form.Label className="temp-label">
                      Payment Mode <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Select
                      className="temp-form-control-option"
                      name="payment_mode"
                      value={formData.payment_mode}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Payment Type</option>
                      <option value="upi">UPI</option>
                      <option value="card">Card</option>

                    </Form.Select>
                    {errors.payment_mode && (
                      <small className="text-danger">
                        {errors.payment_mode}
                      </small>
                    )}
                  </Form.Group>
                </Col>


                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3" controlId="amount">
                    <Form.Label className="temp-label">
                      Donation Amount (Rs.) <span className="temp-span-star">*</span>
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
                  <h2>Accepted Payment Methods</h2>
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

export default MandirBooking ;
