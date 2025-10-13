import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import OTPModel from "../OTPModel/OTPModel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LocationState from "../userregistration/LocationState";
import ModifyAlert from "../Alert/ModifyAlert";
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from "date-fns";
import LoginPopup from "../OTPModel/LoginPopup";
import { useLocation } from "react-router-dom";

const MandirBooking = () => {
  const [show, setShow] = useState(false);
  const [temples, setTemples] = useState([]);
  // Array to hold details for each person
  const [persons, setPersons] = useState([]);
  // Form data state must be declared before any useEffect or logic that uses it
  const [formData, setFormData] = useState({
    full_name: "",
    gender: "",
    age: "",
    mobile_number: "",
    email: "",
    id_proof_type: "",
    id_proof_number: "",
    temple_name: "",
    mandir_book_date_and_time: "",
    check_in_time: "",
    check_out_time: "",
    state: "",
    country: "",
    city: "",
    address: "",
    pin_code: "",
    grand_total: "",
    payment_mode: "",
    no_of_persons: "",
  });
  const handleClose = () => setShow(false);
  const [agree, setAgree] = useState(false);
  const [otp, setOtp] = useState("");
  const [, setLoading] = useState(false);
  const [, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { temple_name, no_of_persons, mandir_book_date_and_time, grand_total } =
    location.state || {};

  // Update persons array when number of persons changes
  useEffect(() => {
    const num = parseInt(formData.no_of_persons || no_of_persons || 0);
    if (num > 0) {
      setPersons((prev) => {
        // If already correct length, do nothing
        if (prev.length === num) return prev;
        // If more, slice
        if (prev.length > num) return prev.slice(0, num);
        // If less, add empty objects
        return [
          ...prev,
          ...Array(num - prev.length).fill().map(() => ({
            full_name: "",
            age: "",
            gender: "",
            id_proof_type: "",
            id_proof_number: "",
          }))
        ];
      });
    } else {
      setPersons([]);
    }
  }, [formData.no_of_persons, no_of_persons]);

  // Helper to round up to next 30 min interval
  const getNextInterval = (date = new Date()) => {
    let minutes = date.getMinutes();
    let nextMinutes = minutes <= 30 ? 30 : 0;
    let nextHour = nextMinutes === 0 ? date.getHours() + 1 : date.getHours();
    return setMinutes(setHours(date, nextHour), nextMinutes);
  };

  const today = new Date();
  const isToday =
    selectedDateTime &&
    selectedDateTime.getDate() === today.getDate() &&
    selectedDateTime.getMonth() === today.getMonth() &&
    selectedDateTime.getFullYear() === today.getFullYear();

  const minTime = isToday
    ? getNextInterval(today)
    : setHours(setMinutes(today, 0), 6);
  const maxTime = setHours(setMinutes(today, 30), 23);

  const handleDateChange = (date) => {
    setSelectedDateTime(date);
    setFormData((prev) => ({
      ...prev,
      mandir_book_date_and_time: date ? date.toISOString() : "",
    }));
    setErrors((prev) => ({ ...prev, mandir_book_date_and_time: "" }));
  };

  // Populate formData from props if available
  useEffect(() => {
    if (temple_name || no_of_persons || mandir_book_date_and_time || grand_total) {
      setFormData((prev) => ({
        ...prev,
        temple_name: temple_name || prev.temple_name,
        no_of_persons: no_of_persons || prev.no_of_persons,
        mandir_book_date_and_time:
          mandir_book_date_and_time || prev.mandir_book_date_and_time,
        grand_total: grand_total || prev.grand_total,
      }));

      // If mandir_book_date_and_time exists, also set DatePicker value
      if (mandir_book_date_and_time) {
        setSelectedDateTime(new Date(mandir_book_date_and_time));
      }
    }
  }, [temple_name, no_of_persons, mandir_book_date_and_time, grand_total]);



  const handleResendOtp = async () => {
    try {
      const res = await axios.post(
        "https://brjobsedu.com/Temple_portal/api/send-otp/",
        {
          phone: formData.mobile_number,
        }
      );

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
    const fieldName = name;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    // Remove validation error only for the current field if it has a valid value
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (value && value.trim() !== "") {
        delete newErrors[fieldName]; // Clear only the current field's error
      } else {
        newErrors[fieldName] = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
          } is required`;
      }
      return newErrors;
    });

    // Reset dependent dropdowns
    if (fieldName === "country") {
      setFormData((prev) => ({ ...prev, state: "", city: "" }));
      // Only clear errors if the fields are not required anymore
      // Don't clear state/city errors here - they should remain until filled
    } else if (fieldName === "state") {
      setFormData((prev) => ({ ...prev, city: "" }));
      // Don't clear city error here - it should remain until filled
    }
  };

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const res = await axios.get(
          "https://brjobsedu.com/Temple_portal/api/temple-names-list/"
        );
        if (res.data && Array.isArray(res.data.temple_names)) {
          setTemples(res.data.temple_names);
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
       
    
    if (!formData.mandir_book_date_and_time){
      newErrors.mandir_book_date_and_time = "Date of Mandir is required";
       }

        if (!formData.check_in_time){
      newErrors.check_in_time = "Check In time is  required";
       }

    // Address Details (validate only if prasad_delivery is true)
    
      if (!formData.state?.trim()) newErrors.state = "State is required";
      if (!formData.country?.trim()) newErrors.country = "Country is required";
      if (!formData.city?.trim()) newErrors.city = "City is required";
      if (!formData.pin_code?.trim()) {
        newErrors.pin_code = "Pin Code is required";
      } else if (!/^\d{6}$/.test(formData.pin_code)) {
        newErrors.pin_code = "Enter a valid 6-digit Pin Code";
      }
    

    // Payment Details
    if (
      !formData.grand_total ||
      isNaN(formData.grand_total) ||
      formData.grand_total <= 0
    )
      newErrors.grand_total = "Valid Donation Amount is required";

    if (!formData.payment_mode)
      newErrors.payment_mode = "Payment Mode is required";

       if (!formData.address)
      newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkUserExists = async (fieldValue, fieldName) => {
    try {
      const res = await axios.get(
        "https://brjobsedu.com/Temple_portal/api/all-reg/"
      );

      const userExists = res.data.some((user) => {
        if (fieldName === "mobile_number") return user.phone === fieldValue;
        if (fieldName === "email") return user.email === fieldValue;
        return false;
      });

      if (userExists) {
        setShowLoginModal(true);
        setAgree(false);
      }
    } catch (err) {
      console.error("Error checking user:", err);
    }
  };

  const handleAgreeChange = async (e) => {
    const checked = e.target.checked;

    if (!checked) {
      setAgree(false);
      return;
    }

    //  validate required fields before OTP
    if (!validateFields()) {
      setAlertMessage(
        "Please fill all required fields correctly before verifying OTP."
      );
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
        setShowAlert(true);
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

        // navigate("/PaymentConfirmation");
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
      [name]: value && value.trim() !== "" ? "" : prev[name], // keep error if value empty
    }));
  };

  // Handle change for person table
  const handlePersonChange = (idx, field, value) => {
    setPersons((prev) => {
      const updated = [...prev];
      updated[idx][field] = value;
      return updated;
    });

    // Specific validations
    if (field === "mobile_number" && value.length === 10) {
      checkUserExists(value, "mobile_number");
    }

    if (field === "email" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      checkUserExists(value, "email");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      setAlertMessage("Please fill all required fields.");
      setShowAlert(true);
      return;
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

      // Basic Auth credentials
      const username = "9058423148";
      const password = "Ritik@123";
      const authHeader = "Basic " + btoa(username + ":" + password);

      const res = await axios.post(
        "https://brjobsedu.com/Temple_portal/api/mandir-booking/ ",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: authHeader,
          },
        }
      );

      if (res.data.message === "Darshan booking created") {
        setAlertMessage("Darshan Registration Successful!");
        setShowAlert(true);
        setAgree(false);

        setFormData({
          full_name: "",
          gender: "",
          age: "",
          mobile_number: "",
          email: "",
          id_proof_type: "",
          id_proof_number: "",
          temple_name: "",
          darshan_date_and_time: "",
          special_requests: "",
          grand_total: "",
          payment_mode: "",
        });

        // setTimeout(() => {
        //   navigate("/PaymentConfirmation");
        // }, 2000);
      } else {
        setAlertMessage(res.data.message || "Darshan Registration failed");
        setShowAlert(true);
        setAgree(false);
      }
    } catch (err) {
      console.error("Darshan Booking Error:", err);

      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong while booking!";
      setAlertMessage(errorMsg);
      setShowAlert(true);
      setAgree(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="temp-donate">
      <Container className="temp-container">
        <h1>Mandir Booking</h1>
        <p>
          <i>Book Your Sacred Mandir and Connect with the Divine </i>
        </p>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={8} md={8} sm={12} className="mt-2">
              <h2>Personal Details</h2>
              <Row>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
                      <small className="text-danger">{errors.mobile_number}</small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className="temp-label">
                      Temple Name <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="temple_name"
                      value={formData.temple_name || temple_name || ""}
                      readOnly
                      className="form-control temp-form-control-option w-100"
                      disabled
                    />
                    {errors.temple_name && (
                      <small className="text-danger">{errors.temple_name}</small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className="temp-label">
                      Number Of Persons <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="no_of_persons"
                      className="form-control temp-form-control-option w-100"
                      disabled
                      value={formData.no_of_persons || no_of_persons || ""}
                      readOnly
                    />
                    {errors.no_of_persons && (
                      <small className="text-danger">{errors.no_of_persons}</small>
                    )}
                  </Form.Group>
                </Col>

                {/* Check-In Time Field (DatePicker) */}
                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3" controlId="checkInTime">
                    <Form.Label className="temp-label">
                      Check-In Time <span className="temp-span-star">*</span>
                    </Form.Label>
                    <DatePicker
                      selected={formData.check_in_time ? new Date(formData.check_in_time) : null}
                      onChange={date =>
                        setFormData(prev => ({
                          ...prev,
                          check_in_time: date ? date.toISOString() : ""
                        }))
                      }
                      showTimeSelect
                      timeFormat="hh:mm aa"
                      timeIntervals={30}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      placeholderText="Select Check-In Date and Time"
                      className="form-control temp-form-control-option w-100"
                      minDate={today}
                    />
                    {errors.check_in_time && (
                      <small className="text-danger">
                        {errors.check_in_time}
                      </small>
                    )}
                  </Form.Group>
                </Col>
                {/* Check-Out Time Field (DatePicker, always 12:00 PM, disabled) */}
                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3" controlId="checkOutTime">
                    <Form.Label className="temp-label">
                      Check-Out Time <span className="temp-span-star">*</span>
                    </Form.Label>
                    <DatePicker
                      selected={(() => {
                        // If check-in is selected, use next day with 12:00 PM
                        if (formData.check_in_time) {
                          const date = new Date(formData.check_in_time);
                          date.setDate(date.getDate() + 1);
                          date.setHours(12, 0, 0, 0);
                          return date;
                        }
                        return null;
                      })()}
                      onChange={() => { }}
                      showTimeSelect
                      timeFormat="hh:mm aa"
                      timeIntervals={30}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      placeholderText="12:00 PM"
                      className="form-control temp-form-control-option w-100"
                      disabled
                    />
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3 ">
                    <Form.Label className="temp-label mb-2">
                      Pooja Date & Time{" "}
                      <span className="temp-span-star">*</span>
                    </Form.Label>
                    <div>
                      <DatePicker
                        selected={
                          selectedDateTime ||
                          (mandir_book_date_and_time
                            ? new Date(mandir_book_date_and_time)
                            : null)
                        }
                        onChange={handleDateChange}
                        showTimeSelect
                        timeFormat="hh:mm aa"
                        timeIntervals={30}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        placeholderText="Select Date and time"
                        className="form-control temp-form-control-option w-100"
                        minDate={today}
                        minTime={minTime}
                        maxTime={maxTime}
                      />
                    </div>
                    {errors.mandir_book_date_and_time && (
                      <small className="text-danger">
                        {errors.mandir_book_date_and_time}
                      </small>
                    )}
                  </Form.Group>
                </Col>

              </Row>
              {/* Dynamic Table for Person Details */}
              <h2>Devotee Details</h2>
              <div style={{ overflowX: "auto" }}>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>ID Proof Type</th>
                      <th>ID Proof Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {persons.map((person, idx) => (
                      <tr key={idx}>
                        <td>
                          <Form.Control
                            type="text"
                            placeholder="Full Name"
                            value={person.full_name}
                            onChange={e => handlePersonChange(idx, "full_name", e.target.value)}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="number"
                            placeholder="Age"
                            value={person.age}
                            onChange={e => handlePersonChange(idx, "age", e.target.value)}
                          />
                        </td>
                        <td>
                          <Form.Select
                            value={person.gender}
                            onChange={e => handlePersonChange(idx, "gender", e.target.value)}
                          >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </Form.Select>
                        </td>
                        <td>
                          <Form.Select
                            value={person.id_proof_type}
                            onChange={e => handlePersonChange(idx, "id_proof_type", e.target.value)}
                          >
                            <option value="">Select</option>
                            <option value="Aadhar">Aadhar Card</option>
                            <option value="PAN">PAN</option>
                            <option value="Passport">Passport</option>
                            <option value="Voter ID">Voter ID</option>
                          </Form.Select>
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            placeholder="ID Proof Number"
                            value={person.id_proof_number}
                            maxLength={16}
                            onChange={e => handlePersonChange(idx, "id_proof_number", e.target.value)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>


              <Row>


                <h2 className="pt-4">Address Details</h2>

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

                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="temp-label">
                      Address <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Address"
                      className="temp-form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                    {errors.address && (
                      <small className="text-danger">
                        {errors.address}
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
                      Grand Total (Rs.){" "}
                      <span className="temp-span-star">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="grand_total"
                   className="form-control temp-form-control-option w-100"
                      disabled
                      value={formData.grand_total || grand_total || ""}
                      readOnly
                    />
                    {errors.grand_total && (
                      <small className="text-danger">
                        {errors.grand_total}
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
      <LoginPopup
        show={showLoginModal}
        mobileNumber={formData.mobile_number}
        email={formData.email}
        handleClose={() => {
          setShowLoginModal(false);
          setFormData((prev) => ({
            ...prev,
            mobile_number: "",
            email: "",
          }));
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

export default MandirBooking;
