import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../assets/CSS/TempleAuthority.css";
import { FaCheckCircle } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import UploadFile from "../../assets/images/upload-icon.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SendOtp from "../SendOtp/SendOtp";
import VerifyOtp from "../VerifyOtp/VerifyOtp";
import LocationState from "../userregistration/LocationState";
import Regimg1 from "../../assets/images/pandit-img.png";
import Select from "react-select";
import ModifyAlert from "../Alert/ModifyAlert";
import { BASE_URLL } from "../BaseURL";

function PanditRegistration() {
  const [phone, setPhone] = useState("");
  useEffect(() => {
    setFormData((prev) => ({ ...prev, phone }));
  }, [phone]);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    father_name: "",
    email: "",
    password: "",
    phone: "",
    aadhar_number: "",
    permanent_address: "",
    country: "",
    state: "",
    city: "",
    zipcode: "",
    pandit_role: "",
    temple_association: "",
    pandit_image: "",
    aadhar_document: "",
    role: "pandit",
    pandit_pooja_details: [{ pooja_name: "", pooja_price: "" }],
  });

  const [fileErrors, setFileErrors] = useState({
    pandit_image: "",
    aadhar_document: "",
  });

  const roleOptions = [
    { value: "pooja", label: "पूजा विशेषज्ञ" },
    { value: "vedic_chanting", label: "वैदिक मंत्रोच्चार" },
    { value: "astrology", label: "ज्योतिष" },
    { value: "wedding", label: "विवाह संस्कार" },
    { value: "funeral", label: "अंत्येष्टि संस्कार" },
    { value: "festival", label: "त्योहार आयोजन" },
    { value: "temple_priest", label: "मंदिर पुजारी" },
    { value: "home_pooja", label: "गृह पूजा" },
    { value: "yagya", label: "यज्ञ विशेषज्ञ" },
    { value: "other", label: "अन्य" },
  ];

  const [preview, setPreview] = useState({
    pandit_image: null,
    aadhar_document: null,
  });
  const poojaOptions = [
    { pooja_name: "Annaprashan Sanskar Puja" },
    { pooja_name: "Satyanarayan Puja" },
    { pooja_name: "Bhoomi Puja" },
    { pooja_name: "Griha Pravesh Puja" },
    { pooja_name: "New Office Opening Puja" },
    { pooja_name: "Vivah (Marriage) Puja" },
    { pooja_name: "Vishwakarma Puja" },
    { pooja_name: "Yagnopavit Sanskar" },
    { pooja_name: "Rudrabhishek Puja" },
    { pooja_name: "Engagement Ceremony (Sagai)" },
    { pooja_name: "Naming Ceremony" },
    { pooja_name: "Ganesh Chaturthi Puja" },
    { pooja_name: "Vehicle / Vahan Puja" },
    { pooja_name: "Mundan Sanskar Puja" },
    { pooja_name: "Navratri Durga Puja" },
    { pooja_name: "Brihaspati Vrat Udyapan Puja" },
    { pooja_name: "Ekadashi Vrat Udyapan Puja" },
    { pooja_name: "Godh Bharai Puja (Baby Shower)" },
    { pooja_name: "Haldi Ceremony" },
    { pooja_name: "Janamdin / Birthday Puja" },
    { pooja_name: "Mahalakshmi Puja" },
    { pooja_name: "Vastu Shanti Puja" },
    { pooja_name: "Vishnu Sahastranam Path Puja" },
    { pooja_name: "Kaal Sarp Dosh Nivaran Puja" },
    { pooja_name: "Office / Business Puja" },
    { pooja_name: "Namakarana Puja" },
    { pooja_name: "Hartalika Teej Puja" },
    { pooja_name: "Karwa Chauth Puja" },
    { pooja_name: "Diwali Lakshmi Puja" },
    { pooja_name: "Dhanteras Puja" },
    { pooja_name: "Vara Mahalakshmi Puja" },
    { pooja_name: "Devi Poojan" },
    { pooja_name: "Kuber Puja" },
    { pooja_name: "Narak Chaturdashi Puja" },
    { pooja_name: "Kali Puja" },
    { pooja_name: "Ganesh Lakshmi Puja" },
    { pooja_name: "Govardhan Puja" },
    { pooja_name: "Annakut Puja" },
    { pooja_name: "Bhai Dooj Puja" },
    { pooja_name: "Chopda Puja" },
    { pooja_name: "Ayush Havan" },
    { pooja_name: "Chandi Path Havan" },
    { pooja_name: "Lakshmi Kubera Havan" },
    { pooja_name: "Navagraha Havan" },
    { pooja_name: "Shuddhikaran Puja and Havan" },
    { pooja_name: "Maha Ganapati Homa" },
    { pooja_name: "Dhanvantari Homa" },
    { pooja_name: "Bhagavathi Homa" },
    { pooja_name: "Navmi Havan" },
    { pooja_name: "Drishti Durga Homa" },
    { pooja_name: "Mahalaxmi Havan" },
    { pooja_name: "Maha Mrityunjaya Jaap Puja" },
    { pooja_name: "Gayatri Mantra Jaap Puja" },
    { pooja_name: "Santan Gopal Mantra Jaap" },
    { pooja_name: "Shani Dosh Nivaran Jaap" },
    { pooja_name: "Rahu Graha Shanti Mantra Jaap" },
    { pooja_name: "Sampoorna Sunderkand Paath" },
    { pooja_name: "Akhand Ramayana Path" },
    { pooja_name: "Hanuman Chalisa Paath" },
    { pooja_name: "Bajrang Baan Path" },
    { pooja_name: "Navchandi Paath" },
    { pooja_name: "Durga Saptashati Path" },
    { pooja_name: "Kanak Dhara Path" },
    { pooja_name: "Shri Sukt Paath" },
    { pooja_name: "Lalita Sahasranama Path" },
    { pooja_name: "Kanakadhara Stotram Path" },
    { pooja_name: "Pitru Dosh Nivaran Puja" },
    { pooja_name: "Shradh Puja & Karma for Ancestors Peace" },
    { pooja_name: "Barsi Puja" },
    { pooja_name: "Bharani Shradh Pitru Paksha" },
    { pooja_name: "Tripindi Shradha Puja" },
    { pooja_name: "Garud Puran Path" },
    { pooja_name: "Tarpan Shradh Puja" },
    { pooja_name: "Pind Daan Shradh Puja" },
  ];

  const [errorReason_querys, setErrorReason_querys] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleInputChangeCity = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value); // live validation on custom handler
  };
  useEffect(() => {
    // Push the current page into history so user can't go back
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      // Disable back button by re-pushing the same page
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  const addPooja = () => {
    setFormData((prev) => ({
      ...prev,
      pandit_pooja_details: [
        ...prev.pandit_pooja_details,
        { pooja_name: "", pooja_price: "" },
      ],
    }));
  };

  const removePooja = (index) => {
    const newPoojas = [...formData.pandit_pooja_details];
    if (index === 0) {
      newPoojas[0] = { pooja_name: "", pooja_price: "" };
    } else {
      newPoojas.splice(index, 1);
    }
    setFormData((prev) => ({ ...prev, pandit_pooja_details: newPoojas }));
  };

  const handlePoojaChange = (index, poojaName) => {
    const newPoojas = [...formData.pandit_pooja_details];

    // const selectedPooja = poojaOptions.find((p) => p.pooja_name === poojaName);

    newPoojas[index] = {
      ...newPoojas[index],
      pooja_name: poojaName,
      pooja_price: "",
    };

    setFormData((prev) => ({ ...prev, pandit_pooja_details: newPoojas }));
  };

  // Validate individual fields
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "first_name":
        if (!value) error = "First name is required";
        else if (!/^[A-Z][a-zA-Z]*$/.test(value))
          error =
            "First name must start with a capital letter and contain only alphabets";
        break;

      case "country":
        if (!value) error = "Country is Required";
        break;

      case "last_name":
        if (!value) error = "Last name is required";
        else if (!/^[A-Z][a-zA-Z]*$/.test(value))
          error =
            "Last name must start with a capital letter and contain only alphabets";
        break;

      case "father_name":
        if (!value) {
          error = "Father's name is required";
        } else if (!/^([A-Z][a-z]+)(\s[A-Z][a-z]+)*$/.test(value)) {
          error =
            "Each word in father's name must start with a capital letter and contain only alphabets";
        }
        break;

      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Invalid email format";
        }
        break;

      case "phone":
        if (!value) {
          error = "Mobile number is required";
        } else if (!/^\d{10}$/.test(value)) {
          error = "Mobile number must be exactly 10 digits";
        }
        break;

      case "aadhar_number":
        if (!value) {
          error = "Aadhar number is required";
        } else if (!/^\d{12}$/.test(value)) {
          error = "Aadhar number must be exactly 12 digits";
        }
        break;

      case "password":
        if (!value) {
          error = "Password is required";
        } else if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          )
        ) {
          error =
            "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
        }
        break;

      case "confirmPassword":
        if (value !== formData.password) {
          error = "Passwords do not match";
        }
        break;

      case "pandit_image":
        if (!value) {
          error = "Pandit image is required";
        }
        break;

      case "aadhar_document":
        if (!value) {
          error = "Aadhar document is required";
        }
        break;

      default:
        break;
    }

    setErrorReason_querys((prev) => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files.length > 0) {
      const file = files[0];

      // Allowed types
      let allowedTypes = ["image/jpeg", "image/png"];
      if (name === "aadhar_document") {
        allowedTypes.push("application/pdf");
      }

      if (!allowedTypes.includes(file.type)) {
        setFileErrors((prev) => ({
          ...prev,
          [name]:
            name === "aadhar_document"
              ? "Only JPG, PNG, or PDF files are allowed."
              : "Only JPG or PNG files are allowed.",
        }));
        setFormData((prev) => ({ ...prev, [name]: "" }));
        return;
      }

      // Max size 2MB
      if (file.size > 2 * 1024 * 1024) {
        setFileErrors((prev) => ({
          ...prev,
          [name]: "File size must be less than or equal to 2MB.",
        }));
        setFormData((prev) => ({ ...prev, [name]: "" }));
        return;
      }

      // Clear previous file errors & set file
      setFormData({ ...formData, [name]: file });
      setPreview({ ...preview, [name]: URL.createObjectURL(file) });
      setFileErrors((prev) => ({ ...prev, [name]: "" }));
      validateField(name, file);
    } else {
      // All your existing non-file handling stays the same
      let newValue = value;

      if (name === "first_name" || name === "last_name") {
        newValue = newValue.replace(/\s/g, "");
        if (newValue.length > 0) {
          newValue =
            newValue.charAt(0).toUpperCase() + newValue.slice(1).toLowerCase();
        }
      }

      if (name === "father_name") {
        newValue = newValue
          .split(" ")
          .map((word) =>
            word
              ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              : ""
          )
          .join(" ");
      }

      if (name === "phone") {
        newValue = newValue.replace(/\D/g, "");
        if (newValue.length > 10) newValue = newValue.slice(0, 10);
      }

      if (name === "aadhar_number") {
        newValue = newValue.replace(/\D/g, "");
        if (newValue.length > 12) newValue = newValue.slice(0, 12);
      }

      setFormData({ ...formData, [name]: newValue });
      validateField(name, newValue);
    }
  };

  const validateForm = () => {
    let errors = {};

    //  First Name
    if (!formData.first_name) {
      errors.first_name = "First name is required";
    } else if (!/^[A-Z][a-zA-Z]*$/.test(formData.first_name)) {
      errors.first_name =
        "First name must start with a capital letter and contain only alphabets";
    }

    //  Last Name
    if (!formData.last_name) {
      errors.last_name = "Last name is required";
    } else if (!/^[A-Z][a-zA-Z]*$/.test(formData.last_name)) {
      errors.last_name =
        "Last name must start with a capital letter and contain only alphabets";
    }

    // Father Name
    if (!formData.father_name) {
      errors.father_name = "Father name is required";
    }

    //  Email validation
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    //  Mobile number (10 digits only)
    if (!formData.phone) {
      errors.phone = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Mobile number must be exactly 10 digits";
    }

    //  Aadhaar (12 digits only)
    if (!formData.aadhar_number) {
      errors.aadhar_number = "Aadhar number is required";
    } else if (!/^\d{12}$/.test(formData.aadhar_number)) {
      errors.aadhar_number = "Aadhar number must be exactly 12 digits";
    }

    //  Password strength
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData.password
      )
    ) {
      errors.password =
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
    }

    //  Confirm Password
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!formData.pandit_role) {
      errors.pandit_role = "Pandit Role is required";
    }

    //  Address validations - Fixed to use errors instead of formErrors
    if (!formData.permanent_address)
      errors.permanent_address = "Address is required";
    if (!formData.country) errors.country = "Country is required";
    if (!formData.state) errors.state = "State is required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.zipcode) errors.zipcode = "Pin code is required";
    if (!formData.temple_association)
      errors.temple_association = "Temple association is required";

    //  File validations
    if (!formData.pandit_image)
      errors.pandit_image = "Pandit image is required";
    if (!formData.aadhar_document)
      errors.aadhar_document = "Aadhar document is required";

    setErrorReason_querys(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const formDataToSend = new FormData();

      for (let key in formData) {
        if (key === "pandit_role" || key === "pandit_pooja_details") {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }

      const res = await axios.post(`${BASE_URLL}api/all-reg/`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (
        res.data.success === true ||
        res.data.success === "true" ||
        res.status === 201
      ) {
        setAlertMessage("Pandit Registered Successfully!");
        setShowAlert(true);

        setFormData({
          first_name: "",
          last_name: "",
          father_name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          aadhar_number: "",
          permanent_address: "",
          country: "",
          state: "",
          city: "",
          zipcode: "",
          temple_association: "",
          pandit_image: "",
          aadhar_document: "",
          pandit_role: [],
          pandit_pooja_details: [{ pooja_name: "", pooja_price: "" }],
          role: "pandit",
        });

        setTimeout(() => navigate("/Login"), 1500);
      } else {
        setAlertMessage(res.data.message || "Registration failed");
        setShowAlert(true);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const errorData = err.response.data;

        if (errorData.error?.toLowerCase().includes("email")) {
          setErrorReason_querys((prev) => ({
            ...prev,
            email: errorData.error,
          }));
          document.getElementsByName("email")[0]?.focus();
        } else if (errorData.error?.toLowerCase().includes("phone")) {
          setErrorReason_querys((prev) => ({
            ...prev,
            phone: errorData.error,
          }));
          document.getElementsByName("phone")[0]?.focus();
        } else if (errorData.error?.toLowerCase().includes("aadhar")) {
          setErrorReason_querys((prev) => ({
            ...prev,
            aadhar_number: errorData.error,
          }));
          document.getElementsByName("aadhar_number")[0]?.focus();
        } else {
          setAlertMessage(errorData.message || "Something went wrong");
          setShowAlert(true);
        }
      } else {
        setAlertMessage(err.message || "Something went wrong");
        setShowAlert(true);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="temp-donate">
      <Container className="temp-container">
        <div>
          <div className=" temple-registration-heading  ">
            <h1>Pandit Registration</h1>
            <div>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Row>
                    {!otpSent && !otpVerified && (
                      <>
                        <Col lg={6} md={6} sm={12}>
                          <SendOtp
                            phone={phone}
                            setPhone={setPhone}
                            onOtpSent={() => setOtpSent(true)}
                          />
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                          <img
                            src={Regimg1}
                            className="img-fluid"
                            alt="User Registration"
                          />
                        </Col>
                      </>
                    )}

                    {otpSent && !otpVerified && (
                      <>
                        <Col lg={6} md={6} sm={12}>
                          <VerifyOtp
                            phone={phone}
                            onVerified={() => {
                              setOtpVerified(true);
                              setOtpSent(false);
                            }}
                          />
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                          <img
                            src={Regimg1}
                            className="img-fluid"
                            alt="User Registration"
                          />
                        </Col>
                      </>
                    )}
                  </Row>
                  {otpVerified && (
                    <>
                      <Row className="mt-4">
                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              First Name{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter First Name"
                              className="temp-form-control"
                              name="first_name"
                              value={formData.first_name}
                              onChange={handleInputChange}
                            />
                            {errorReason_querys.first_name && (
                              <div className="alert-txt">
                                {errorReason_querys.first_name}
                              </div>
                            )}
                          </Form.Group>
                        </Col>

                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Last Name{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Last Name"
                              className="temp-form-control"
                              name="last_name"
                              value={formData.last_name}
                              onChange={handleInputChange}
                            />
                            {errorReason_querys.last_name && (
                              <div className="alert-txt">
                                {errorReason_querys.last_name}
                              </div>
                            )}
                          </Form.Group>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Father's Name{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Father Name"
                              className="temp-form-control"
                              name="father_name"
                              value={formData.father_name}
                              onChange={handleInputChange}
                            />
                            {errorReason_querys.father_name && (
                              <div className="alert-txt">
                                {errorReason_querys.father_name}
                              </div>
                            )}
                          </Form.Group>
                        </Col>

                        <Col lg={4} md={4} sm={12}>
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
                            {errorReason_querys.email && (
                              <div className="alert-txt">
                                {errorReason_querys.email}
                              </div>
                            )}
                          </Form.Group>
                        </Col>

                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Mobile Number{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Mobile Number"
                              className="temp-form-control"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              disabled={otpSent || otpVerified}
                            />

                            {errorReason_querys.phone && (
                              <div className="alert-txt">
                                {errorReason_querys.phone}
                              </div>
                            )}
                          </Form.Group>
                        </Col>

                        <Col md={4} lg={4} sm={12}>
                          <Form.Group className="mb-3">
                            <Form.Label>
                              Password{" "}
                              <span className="temp-span-star"> *</span>
                            </Form.Label>
                            <InputGroup>
                              <Form.Control
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Your Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="temp-form-control"
                              />
                              <InputGroup.Text
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ cursor: "pointer" }}
                              >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                              </InputGroup.Text>
                            </InputGroup>
                            {errorReason_querys.password && (
                              <div className="alert-txt">
                                {errorReason_querys.password}
                              </div>
                            )}
                          </Form.Group>
                        </Col>

                        <Col md={4} lg={4} sm={12}>
                          <Form.Group className="mb-3">
                            <Form.Label>
                              Confirm Password
                              <span className="temp-span-star"> *</span>
                            </Form.Label>
                            <InputGroup>
                              <Form.Control
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm Your Password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="temp-form-control"
                              />
                              <InputGroup.Text
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                style={{ cursor: "pointer" }}
                              >
                                {showConfirmPassword ? (
                                  <FaEyeSlash />
                                ) : (
                                  <FaEye />
                                )}
                              </InputGroup.Text>
                            </InputGroup>
                            {errorReason_querys.confirmPassword && (
                              <div className="alert-txt">
                                {errorReason_querys.confirmPassword}
                              </div>
                            )}
                          </Form.Group>
                        </Col>

                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Aadhar Number (for ID verification){" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Aadhar Number"
                              className="temp-form-control"
                              name="aadhar_number"
                              value={formData.aadhar_number}
                              onChange={handleInputChange}
                            />
                            {errorReason_querys.aadhar_number && (
                              <div className="alert-txt">
                                {errorReason_querys.aadhar_number}
                              </div>
                            )}
                          </Form.Group>
                        </Col>

                        <Col lg={4} md={4} sm={12}>
                          <Form.Group className="mb-3">
                            <Form.Label className="temp-label">
                              Pandit Role
                              <span className="temp-span-star"> *</span>
                            </Form.Label>
                            <Select
                              isMulti
                              options={roleOptions}
                              placeholder="Select Role"
                              closeMenuOnSelect={false}
                              className="temp-form-control-input"
                              value={roleOptions.filter((option) =>
                                formData.pandit_role?.includes(option.value)
                              )}
                              onChange={(selected) => {
                                const values = selected
                                  ? selected.map((opt) => opt.value)
                                  : [];
                                setFormData((prev) => ({
                                  ...prev,
                                  pandit_role: values,
                                }));
                              }}
                              styles={{
                                valueContainer: (provided) => ({
                                  ...provided,
                                  maxHeight: "38px",
                                  overflowY: "auto",
                                }),
                              }}
                            />
                            {errorReason_querys.pandit_role && (
                              <div className="alert-txt">
                                {errorReason_querys.pandit_role}
                              </div>
                            )}
                          </Form.Group>
                        </Col>

                        <Col lg={12} md={12} sm={12} className="mt-2">
                          <Form.Label className="temp-label">
                            Select Pooja & Price
                            <span className="alert-txt mx-5">
                              नोट: पंडित लॉगिन के बाद और पूजा जोड़ सकते हैं
                            </span>
                          </Form.Label>

                          {formData.pandit_pooja_details?.map(
                            (pooja, index) => (
                              <Row key={index} className="align-items-end">
                                <Col md={5}>
                                  <Form.Group
                                    className="mb-3"
                                    controlId={`poojaName-${index}`}
                                  >
                                    <Form.Select
                                      className="temp-form-control"
                                      value={pooja.pooja_name}
                                      onChange={(e) =>
                                        handlePoojaChange(index, e.target.value)
                                      }
                                    >
                                      <option value="">
                                        Select Pooja Name
                                      </option>
                                      {poojaOptions
                                        .filter(
                                          (opt) =>
                                            !formData.pandit_pooja_details.some(
                                              (p, i) =>
                                                p.pooja_name ===
                                                  opt.pooja_name && i !== index
                                            )
                                        )
                                        .map((opt) => (
                                          <option
                                            key={opt.pooja_name}
                                            value={opt.pooja_name}
                                          >
                                            {opt.pooja_name}
                                          </option>
                                        ))}
                                    </Form.Select>
                                  </Form.Group>
                                </Col>

                                <Col md={5}>
                                  <Form.Group
                                    className="mb-3"
                                    controlId={`poojaPrice-${index}`}
                                  >
                                    <Form.Control
                                      type="number"
                                      placeholder="Enter Price"
                                      className="temp-form-control"
                                      value={pooja.pooja_price}
                                      onChange={(e) => {
                                        const newPoojas = [
                                          ...formData.pandit_pooja_details,
                                        ];
                                        newPoojas[index].pooja_price =
                                          e.target.value;
                                        setFormData((prev) => ({
                                          ...prev,
                                          pandit_pooja_details: newPoojas,
                                        }));
                                      }}
                                    />
                                  </Form.Group>
                                </Col>

                                <Col
                                  md={2}
                                  className="d-flex align-items-end mb-4"
                                >
                                  <Button
                                    variant="danger"
                                    onClick={() => removePooja(index)}
                                  >
                                    {index === 0 ? "Clear" : "Remove"}
                                  </Button>
                                </Col>
                              </Row>
                            )
                          )}

                          {formData.pandit_pooja_details.length <
                            poojaOptions.length && (
                            <Button
                              variant="primary"
                              className="mb-2"
                              onClick={addPooja}
                            >
                              Add Puja
                            </Button>
                          )}
                        </Col>

                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Permanent Address{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Address"
                              className="temp-form-control"
                              name="permanent_address"
                              value={formData.permanent_address}
                              onChange={handleInputChange}
                            />
                            {errorReason_querys.permanent_address && (
                              <div className="alert-txt">
                                {errorReason_querys.permanent_address}
                              </div>
                            )}
                          </Form.Group>
                        </Col>

                        <LocationState
                          formData={formData}
                          handleInputChange={handleInputChangeCity}
                          formErrors={errorReason_querys} // Pass errorReason_querys instead of formErrors
                        />

                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Pin Code <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Pin Code"
                              className="temp-form-control"
                              name="zipcode"
                              value={formData.zipcode}
                              onChange={handleInputChange}
                            />
                            {errorReason_querys.zipcode && (
                              <div className="alert-txt">
                                {errorReason_querys.zipcode}
                              </div>
                            )}
                          </Form.Group>
                        </Col>

                        <Col lg={4} md={4} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="temp-label">
                              Temple Association{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <Form.Select
                              className="temp-form-control-option"
                              placeholder="Enter Temple Association"
                              name="temple_association"
                              value={formData.temple_association}
                              onChange={handleInputChange}
                            >
                              <option value="Select a option">
                                Select a Temple Association
                              </option>
                              <option value="Local Temple Association">
                                Local Temple Association
                              </option>
                              <option value="State Temple Association">
                                State Temple Association
                              </option>
                              <option value="National Temple Association">
                                National Temple Association
                              </option>
                              <option value="Independent">Independent</option>
                            </Form.Select>
                            {errorReason_querys.temple_association && (
                              <div className="alert-txt">
                                {errorReason_querys.temple_association}
                              </div>
                            )}
                          </Form.Group>
                        </Col>
                      </Row>

                      <div className="temple-registration-heading">
                        <h1>Supporting Documents</h1>
                      </div>

                      <Row>
                        {/* Pandit Image Upload */}
                        <Col lg={6} md={12} sm={12}>
                          <Row className="temp-stepform-box">
                            <Col lg={5} md={5} sm={5}>
                              <fieldset
                                className={`upload_dropZone text-center ${
                                  dragging === "pandit_image" ? "drag-over" : ""
                                }`}
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  setDragging("pandit_image");
                                }}
                                onDragLeave={() => setDragging(null)}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  setDragging(null);
                                  const file = e.dataTransfer.files[0];
                                  if (file) {
                                    handleInputChange({
                                      target: {
                                        name: "pandit_image",
                                        files: [file],
                                        type: "file",
                                      },
                                    });
                                  }
                                }}
                              >
                                <legend className="visually-hidden">
                                  Pandit Identification Photo{" "}
                                </legend>
                                <img src={UploadFile} alt="upload-file" />

                                <p className="temp-drop-txt my-2">
                                  Drag &amp; drop files
                                  <br />
                                  <i>or</i>
                                </p>

                                <input
                                  id="pandit_image"
                                  name="pandit_image"
                                  type="file"
                                  accept="image/jpeg, image/png"
                                  className="invisible"
                                  onChange={handleInputChange}
                                />
                                <label
                                  className="btn temp-primary-btn mb-1"
                                  htmlFor="pandit_image"
                                >
                                  Choose file
                                </label>
                                <p className="temp-upload-file">
                                  Upload size up to 10KB to 2MB (jpg, png, jpeg)
                                  {fileErrors.pandit_image && (
                                    <div className="alert-txt">
                                      {fileErrors.pandit_image}
                                    </div>
                                  )}
                                </p>
                              </fieldset>
                            </Col>

                            <Col
                              lg={7}
                              md={7}
                              sm={7}
                              className="temp-doc-subinfo mt-2"
                            >
                              <h3>
                                Pandit Identification Photo{" "}
                                <span className="temp-span-star">*</span>
                              </h3>
                              {!formData.pandit_image &&
                                errorReason_querys.pandit_image && (
                                  <div className="alert-txt">
                                    {errorReason_querys.pandit_image}
                                  </div>
                                )}

                              {formData.pandit_image && (
                                <>
                                  <div className="d-flex temp-doc-info">
                                    <Col lg={3}>
                                      {new Date().toLocaleDateString()}
                                    </Col>
                                    <Col
                                      lg={9}
                                      className="px-4 temp-success-doc"
                                    >
                                      <FaCheckCircle /> Uploaded Successfully
                                    </Col>
                                  </div>
                                  <div
                                    className="col temp-delete-icon"
                                    onClick={() =>
                                      setFormData({
                                        ...formData,
                                        pandit_image: "",
                                      })
                                    }
                                  >
                                    <h3>
                                      <RiDeleteBin6Line className="mx-1" />
                                      Click here to Remove
                                    </h3>
                                  </div>
                                </>
                              )}
                            </Col>
                          </Row>
                        </Col>
                        {/* Aadhaar Card Upload */}
                        <Col lg={6} md={12} sm={12}>
                          <Row className="temp-stepform-box">
                            <Col lg={5} md={5} sm={5}>
                              <fieldset
                                className={`upload_dropZone text-center ${
                                  dragging === "aadhar_document"
                                    ? "drag-over"
                                    : ""
                                }`}
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  setDragging("aadhar_document");
                                }}
                                onDragLeave={() => setDragging(null)}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  setDragging(null);
                                  const file = e.dataTransfer.files[0];
                                  if (file) {
                                    handleInputChange({
                                      target: {
                                        name: "aadhar_document",
                                        files: [file],
                                        type: "file",
                                      },
                                    });
                                  }
                                }}
                              >
                                <legend className="visually-hidden">
                                  Aadhar Card Upload
                                </legend>
                                <img src={UploadFile} alt="upload-file" />

                                <p className="temp-drop-txt my-2">
                                  Drag &amp; drop files
                                  <br />
                                  <i>or</i>
                                </p>

                                <input
                                  id="aadhar_document"
                                  name="aadhar_document"
                                  type="file"
                                  accept="image/jpeg, image/png, application/pdf"
                                  className="invisible"
                                  onChange={handleInputChange}
                                />

                                <label
                                  className="btn temp-primary-btn mb-1"
                                  htmlFor="aadhar_document"
                                >
                                  Choose file
                                </label>
                                <p className="temp-upload-file">
                                  Upload size up to 10KB to 2MB (jpg, png, jpeg)
                                  {fileErrors.aadhar_document && (
                                    <div className="alert-txt">
                                      {fileErrors.aadhar_document}
                                    </div>
                                  )}
                                </p>
                              </fieldset>
                            </Col>

                            <Col
                              lg={7}
                              md={7}
                              sm={7}
                              className="temp-doc-subinfo mt-2"
                            >
                              <h3>
                                Aadhar Card Document{" "}
                                <span className="temp-span-star">*</span>
                              </h3>
                              {!formData.aadhar_document &&
                                errorReason_querys.aadhar_document && (
                                  <div className="alert-txt">
                                    {errorReason_querys.aadhar_document}
                                  </div>
                                )}

                              {formData.aadhar_document && (
                                <>
                                  <div className="d-flex temp-doc-info">
                                    <Col lg={3}>
                                      {new Date().toLocaleDateString()}
                                    </Col>
                                    <Col
                                      lg={9}
                                      className="px-4 temp-success-doc"
                                    >
                                      <FaCheckCircle /> Uploaded Successfully
                                      {formData.aadhar_document.type ===
                                        "application/pdf" && (
                                        <div>
                                          {formData.aadhar_document.name}
                                        </div>
                                      )}
                                    </Col>
                                  </div>
                                  <div
                                    className="col temp-delete-icon"
                                    onClick={() =>
                                      setFormData({
                                        ...formData,
                                        aadhar_document: "",
                                      })
                                    }
                                  >
                                    <h3>
                                      <RiDeleteBin6Line className="mx-1" />
                                      Click here to Remove
                                    </h3>
                                  </div>
                                </>
                              )}
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      <div className="gap-3 mt-3 Temp-btn-submit">
                        <Button
                          variant="temp-submit-btn"
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? "Submitting..." : "Register Now"}
                        </Button>
                      </div>
                    </>
                  )}
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </Container>
      <ModifyAlert
        message={alertMessage}
        show={showAlert}
        setShow={setShowAlert}
      />
    </div>
  );
}

export default PanditRegistration;
