import React from "react";
import Select from "react-select";

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
import { BASE_URLL } from "../BaseURL";
import { useAuth } from "../GlobleAuth/AuthContext";


const MandirBooking = () => {
  const [show, setShow] = useState(false);
  const [, setTemples] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { uniqueId } = useAuth();
  

  // Array to hold details for each person
  const [persons, setPersons] = useState([]);
  // Form data state must be declared before any useEffect or logic that uses it
  const [formData, setFormData] = useState({
    full_name: "",
    age: "",
    gender: "",
    id_proof_type: "",
    id_proof_number: "",
    mobile_number: "",
    email: "",
    temple_name: "",
    book_date_and_time: "",
    state: "",
    country: "",
    city: "",
    address: "",
    pin_code: "",
    grand_total: "",
    payment_mode: "",
    no_of_persons: "",
    devotee_details: [

    ],
    pooja_details: [],
    creator_id: uniqueId || "",

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
  const [poojas, setPoojas] = useState([]);
  const [selectedPoojas, setSelectedPoojas] = useState([]);
  const [, setTempleOptions] = useState([]);

  const {
    temple_name,
    no_of_persons,
    book_date_and_time,
    grand_total,
    pooja_id,
    initial_pooja_id,
    selectedPoojaId,
    pooja,
    pooja_details: incomingPoojaDetails,
  } = location.state || {};
  const initialPoojaId =
    pooja_id ||
    initial_pooja_id ||
    selectedPoojaId ||
    (pooja && pooja.temple_pooja_id);

  useEffect(() => {
    if (!incomingPoojaDetails) return;

    const normalize = (item) => {
      if (!item) return null;
      if (typeof item === "string") {
        const m = item.match(/^(.*?)(?:\s*-\s*₹?\s*([\d,]+))?$/);
        const name = m && m[1] ? m[1].trim() : item;
        const price = m && m[2] ? Number(String(m[2]).replace(/,/g, "")) : "";
        return {
          value: name,
          label: price ? `${name} - ₹${price}` : name,
          name,
          price,
        };
      }
      if (typeof item === "object") {
        const name =
          item.temple_pooja_name || item.name || item.pooja_name || "";
        const price =
          item.temple_pooja_price || item.price || item.pooja_price || "";
        const value = item.temple_pooja_id || name || "";
        return {
          value,
          label: price ? `${name} - ₹${price}` : name,
          name,
          price,
        };
      }
      return null;
    };

    const opt = normalize(incomingPoojaDetails);
    if (!opt) return;
    setSelectedPoojas([opt]);
    setFormData((prev) => ({
      ...prev,
      temple_name: temple_name || prev.temple_name,
      no_of_persons: no_of_persons || prev.no_of_persons,
      book_date_and_time: book_date_and_time || prev.book_date_and_time,
      grand_total:
        grand_total || prev.grand_total || opt.price || prev.grand_total,
      pooja_details: [{ pooja_name: opt.name, pooja_price: opt.price }],
    }));
  }, [
    incomingPoojaDetails,
    temple_name,
    no_of_persons,
    book_date_and_time,
    grand_total,
  ]);

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const res = await axios.get(
          "https://mahadevaaya.com/backend/api/temple-poojas-list/"
        );

        if (Array.isArray(res.data)) {
          setPoojas(res.data);

          const temples = res.data.map((temple) => ({
            value: temple.temple_name,
            label: temple.temple_name,
          }));
          setTempleOptions(temples);

          if (initialPoojaId) {
            let foundOption = null;
            for (const t of res.data) {
              if (!Array.isArray(t.poojas)) continue;
              const p = t.poojas.find(
                (pp) =>
                  String(pp.temple_pooja_id) === String(initialPoojaId) ||
                  (pp.temple_pooja_name &&
                    pp.temple_pooja_name === initialPoojaId)
              );
              if (p) {
                foundOption = {
                  value: p.temple_pooja_id,
                  label: `${p.temple_pooja_name} - ₹${p.temple_pooja_price}`,
                  price: p.temple_pooja_price,
                  name: p.temple_pooja_name,
                };
                break;
              }
            }

            if (foundOption) {
              setSelectedPoojas([foundOption]);
              setFormData((prev) => ({
                ...prev,
                pooja_details: [foundOption.value],
                grand_total:
                  prev.grand_total || foundOption.price || prev.grand_total,
              }));
            }
          }
        }
      } catch (error) {
        console.error("Error fetching temples:", error);
      }
    };

    fetchTemples();
  }, []);

  const getPoojasForTemple = (templeName) => {
    if (!templeName) return [];
    const temple = poojas.find((t) => t.temple_name === templeName);
    if (!temple || !Array.isArray(temple.poojas)) return [];

    return temple.poojas.map((pooja) => ({
      value: pooja.temple_pooja_id,
      label: `${pooja.temple_pooja_name} - ₹${pooja.temple_pooja_price}`,
      price: pooja.temple_pooja_price,
      name: pooja.temple_pooja_name,
    }));
  };

  useEffect(() => {
    const num = parseInt(formData.no_of_persons || no_of_persons || 0);

    setPersons((prevPersons) => {
      let updated;
      if (num > 0) {
        if (prevPersons.length === num) {
          updated = prevPersons;
        } else if (prevPersons.length > num) {
          updated = prevPersons.slice(0, num);
        } else {
          updated = [
            ...prevPersons,
            ...Array(num - prevPersons.length)
              .fill()
              .map(() => ({
                full_name: "",
                age: "",
                gender: "",
                id_proof_type: "",
                id_proof_number: "",
              })),
          ];
        }
      } else {
        updated = [];
      }

      setErrors((prev) => {
        const newErr = { ...prev };
        Object.keys(newErr).forEach((k) => {
          const m = k.match(/^person_(\d+)_/);
          if (m) {
            const idx = Number(m[1]);
            if (idx >= updated.length) delete newErr[k];
          }
        });
        const hasPersonErrors = Object.keys(newErr).some((k) =>
          k.startsWith("person_")
        );
        if (!hasPersonErrors) delete newErr.devotee_details;
        return newErr;
      });

      return updated;
    });
  }, [formData.no_of_persons, no_of_persons]);

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
      book_date_and_time: date ? date.toISOString() : "",
    }));
    setErrors((prev) => ({ ...prev, book_date_and_time: "" }));
  };

  // Populate formData from props if available
  useEffect(() => {
    if (temple_name || no_of_persons || book_date_and_time || grand_total) {
      setFormData((prev) => ({
        ...prev,
        temple_name: temple_name || prev.temple_name,
        no_of_persons: no_of_persons || prev.no_of_persons,
        book_date_and_time: book_date_and_time || prev.book_date_and_time,
        grand_total: grand_total || prev.grand_total,
      }));

      // If mandir_book_date_and_time exists, also set DatePicker value
      if (book_date_and_time) {
        setSelectedDateTime(new Date(book_date_and_time));
      }
    }
  }, [temple_name, no_of_persons, book_date_and_time, grand_total]);

  const handlePoojaChange = (selected) => {
    if (!selected) selected = [];

    // Store only pooja IDs (values) instead of full objects
    const poojaIds = selected.map((p) => p.value);

    setFormData((prev) => ({
      ...prev,
      pooja_details: poojaIds, // Now storing array of IDs
      grand_total: selected.reduce((sum, p) => sum + (p.price || 0), 0),
    }));

    setSelectedPoojas(selected);
    setErrors((prev) => {
      const newErr = { ...prev };
      delete newErr.pooja_details;
      return newErr;
    });
  };

  const handleResendOtp = async () => {
    try {
      const res = await axios.post(`${BASE_URLL}api/send-otp/`, {
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
        const res = await axios.get(`${BASE_URLL}api/temple-names-list/`);
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

    // Pooja Details
    if (
      !formData.pooja_details ||
      (Array.isArray(formData.pooja_details) &&
        formData.pooja_details.length === 0)
    ) {
      newErrors.pooja_details = "Please select at least one Pooja";
    }

    // Devotee Information (validate each person)
    let devoteeHasError = false;
    if (!persons || persons.length === 0) {
      newErrors.devotee_details = "Please add at least one devotee";
      devoteeHasError = true;
    } else {
      persons.forEach((person, idx) => {
        if (!person.full_name || !person.full_name.trim()) {
          newErrors[
            `person_${idx}_full_name`
          ] = `Full Name is required for person ${idx + 1}`;
          devoteeHasError = true;
        }
        if (!person.gender) {
          newErrors[`person_${idx}_gender`] = `Gender is required for person ${idx + 1
            }`;
          devoteeHasError = true;
        }
        if (!person.age || isNaN(person.age) || person.age <= 0) {
          newErrors[`person_${idx}_age`] = `Valid age is required for person ${idx + 1
            }`;
          devoteeHasError = true;
        }
        if (!person.id_proof_type) {
          newErrors[
            `person_${idx}_id_proof_type`
          ] = `ID Proof Type is required for person ${idx + 1}`;
          devoteeHasError = true;
        }
        if (!person.id_proof_number) {
          newErrors[
            `person_${idx}_id_proof_number`
          ] = `ID Proof Number is required for person ${idx + 1}`;
          devoteeHasError = true;
        } else if (person.id_proof_number.length > 16) {
          newErrors[
            `person_${idx}_id_proof_number`
          ] = `ID Proof Number cannot exceed 16 characters for person ${idx + 1}`;
          devoteeHasError = true;
        }
      });

      // If per-person fields had errors, set a top-level devotee error for UI summary
      if (devoteeHasError && !newErrors.devotee_details) {
        newErrors.devotee_details =
          "Please fill all devotee details correctly for each person";
      }
    }

    // Mobile, Email, etc. (top-level fields)
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

    if (!formData.book_date_and_time) {
      newErrors.book_date_and_time = "Date of Mandir is required";
    }

    // Address Details
    if (!formData.state || !formData.state.trim())
      newErrors.state = "State is required";

    if (!formData.country || !formData.country.trim())
      newErrors.country = "Country is required";

    if (!formData.city || !formData.city.trim())
      newErrors.city = "City is required";

    if (!formData.pin_code || !formData.pin_code.toString().trim()) {
      newErrors.pin_code = "Pin Code is required";
    } else if (!/^\d{6}$/.test(formData.pin_code)) {
      newErrors.pin_code = "Enter a valid 6-digit Pin Code";
    }

    // Payment Details
    if (
      !formData.grand_total ||
      isNaN(formData.grand_total) ||
      formData.grand_total <= 0
    ) {
      newErrors.grand_total = "Valid Donation Amount is required";
    }

    if (!formData.payment_mode)
      newErrors.payment_mode = "Payment Mode is required";

    if (!formData.address || !formData.address.trim())
      newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkUserExists = async (fieldValue, fieldName) => {
    try {
      const res = await axios.get(`${BASE_URLL}api/all-reg/`);

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
      const res = await axios.post(`${BASE_URLL}api/send-otp/`, {
        phone: formData.mobile_number,
      });

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
      const res = await axios.post(`${BASE_URLL}api/verify-otp/`, {
        phone: formData.mobile_number,
        otp: otp,
      });

      if (res.data.success) {
        setIsVerified(true);
        setAlertMessage("Phone number verified!");
        setShowAlert(true);
        handleClose(); // close modal

        setTimeout(() => {
          navigate("/PaymentConfirmation");
        }, 2000);
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

    setErrors((prev) => {
      const newErr = { ...prev };
      const val = type === "checkbox" ? checked : value;
      if (val !== undefined && val !== null && String(val).trim() !== "") {
        delete newErr[name];
      }
      return newErr;
    });
  };

  const handlePersonChange = (idx, field, value) => {
    setPersons((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });

    setErrors((prev) => {
      const newErr = { ...prev };
      const key = `person_${idx}_${field}`;

      const isValid = (() => {
        if (field === "full_name")
          return value && String(value).trim() !== "";
        if (field === "age")
          return value !== "" && !isNaN(Number(value)) && Number(value) > 0;
        if (field === "gender" || field === "id_proof_type")
          return value && String(value).trim() !== "";
        if (field === "id_proof_number")
          return value && String(value).trim() !== "" && String(value).length <= 16;
        return true;
      })();

      if (isValid) {
        delete newErr[key];
      } else {
        if (!newErr[key]) {
          const messages = {
            full_name: `Full Name is required for person ${idx + 1}`,
            age: `Valid age is required for person ${idx + 1}`,
            gender: `Gender is required for person ${idx + 1}`,
            id_proof_type: `ID Proof Type is required for person ${idx + 1}`,
            id_proof_number: `ID Proof Number is required for person ${idx + 1}`,
          };
          newErr[key] = messages[field] || `Invalid value for person ${idx + 1}`;
        }
      }

      const hasPersonErrors = Object.keys(newErr).some((k) =>
        k.startsWith("person_")
      );
      if (!hasPersonErrors) delete newErr.devotee_details;

      return newErr;
    });

    if (field === "mobile_number" && value.length === 10) {
      checkUserExists(value, "mobile_number");
    }

    if (field === "email" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      checkUserExists(value, "email");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    //  Validate fields
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
      if (!persons || persons.length === 0) {
        throw new Error("Please add at least one devotee.");
      }

      const validDevotees = persons.map((p, idx) => {
        if (
          !p.full_name ||
          !p.age ||
          !p.gender ||
          !p.id_proof_type ||
          !p.id_proof_number
        ) {
          throw new Error(`Please fill all fields for devotee #${idx + 1}`);
        }
        return {
          full_name: p.full_name.trim(),
          age: Number(p.age),
          gender: p.gender,
          id_proof_type: p.id_proof_type,
          id_proof_number: p.id_proof_number,
        };
      });

      let poojaPayload = [];
      if (selectedPoojas && selectedPoojas.length > 0) {
        poojaPayload = selectedPoojas.map((p) => ({
          pooja_id: p.value,
          pooja_name: p.name || p.label || "",
          pooja_price: p.price || 0,
        }));
      } else if (Array.isArray(formData.pooja_details)) {
        const allPoojas = (poojas || []).flatMap((t) => t.poojas || []);
        poojaPayload = formData.pooja_details.map((id) => {
          const found = allPoojas.find(
            (pp) => String(pp.temple_pooja_id) === String(id)
          );
          return found
            ? {
              pooja_id: id,
              pooja_name: found.temple_pooja_name || found.name || "",
              pooja_price: found.temple_pooja_price || found.price || 0,
            }
            : { pooja_id: id };
        });
      }

      let isoDate = "";
      if (selectedDateTime instanceof Date && !isNaN(selectedDateTime)) {
        isoDate = selectedDateTime.toISOString();
      } else if (
        typeof formData.book_date_and_time === "string" &&
        formData.book_date_and_time.trim() !== ""
      ) {
        const parsed = new Date(formData.book_date_and_time);
        isoDate = isNaN(parsed.getTime())
          ? formData.book_date_and_time
          : parsed.toISOString();
      }

      const payload = {
        ...formData,
        book_date_and_time: isoDate,
        devotee_details: validDevotees,
        pooja_details: poojaPayload,
      };

      if (validDevotees.length > 0) {
        const fd = validDevotees[0];
        payload.full_name = fd.full_name;
        payload.age = fd.age;
        payload.gender = fd.gender;
        payload.id_proof_type = fd.id_proof_type;
        payload.id_proof_number = fd.id_proof_number;
      }

      console.log("Darshan payload:", payload);

      

      const res = await axios.post(
        `${BASE_URLL}api/darshan-pooja-booking/`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            
          },
        }
      );

      // handle response
      if (res.data.message === "Darshan Pooja booking successful") {
        setAlertMessage("Darshan Registration Successful!");
        setShowAlert(true);
        setAgree(false);
      } else {
        setAlertMessage(res.data.message || "Darshan Registration failed");
        setShowAlert(true);
        setAgree(false);
      }
    } catch (err) {
      console.error(
        "Darshan Booking Error:",
        err.response?.data || err.message || err
      );
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
                      Number Of Persons{" "}
                      <span className="temp-span-star">*</span>
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
                      <small className="text-danger">
                        {errors.no_of_persons}
                      </small>
                    )}
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
                          (book_date_and_time
                            ? new Date(book_date_and_time)
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
                    {errors.book_date_and_time && (
                      <small className="text-danger">
                        {errors.book_date_and_time}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3" controlId="poojaName">
                    <Form.Label className="temp-label">
                      Pooja Details <span className="temp-span-star">*</span>
                    </Form.Label>

                    <Select
                      isMulti
                      name="pooja_details"
                      options={getPoojasForTemple(formData.temple_name).filter(
                        (opt) =>
                          !selectedPoojas.some(
                            (sel) =>
                              String(sel.value) === String(opt.value) ||
                              String(sel.label) === String(opt.label)
                          )
                      )}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      value={selectedPoojas}
                      onChange={handlePoojaChange} // use the fixed function
                      placeholder="Select one or more Poojas"
                    />

                    {errors.pooja_details && (
                      <small className="text-danger">
                        {errors.pooja_details}
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
                            onChange={(e) =>
                              handlePersonChange(
                                idx,
                                "full_name",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="number"
                            placeholder="Age"
                            value={person.age}
                            onChange={(e) =>
                              handlePersonChange(idx, "age", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <Form.Select
                            value={person.gender}
                            onChange={(e) =>
                              handlePersonChange(idx, "gender", e.target.value)
                            }
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
                            onChange={(e) =>
                              handlePersonChange(
                                idx,
                                "id_proof_type",
                                e.target.value
                              )
                            }
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
                            onChange={(e) =>
                              handlePersonChange(
                                idx,
                                "id_proof_number",
                                e.target.value
                              )
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {errors.devotee_details && (
                  <small className="text-danger">
                    {errors.devotee_details}
                  </small>
                )}
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
                      <small className="text-danger">{errors.pin_code}</small>
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
                      <small className="text-danger">{errors.address}</small>
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
