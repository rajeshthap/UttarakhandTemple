import React, { useState } from "react";
import "../../../assets/CSS/PanditLeftNav.css";
import {
  Breadcrumb,
  Form,
  Button,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import PanditLeftNav from "../PanditLeftNav";
import { BASE_URLL } from "../../BaseURL"; // ✅ Update to your backend base URL

const PanditSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    subject: "",
    message: "",
    file: null,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  // ✅ Live validation
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required.";
        break;
      case "mobile":
        if (!value) error = "Mobile number is required.";
        else if (!/^[0-9]{10}$/.test(value))
          error = "Enter a valid 10-digit mobile number.";
        break;
      case "email":
        if (!value) error = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(value))
          error = "Enter a valid email address.";
        break;
      case "subject":
        if (!value.trim()) error = "Subject is required.";
        break;
      case "message":
        if (!value.trim()) error = "Message is required.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  //  Input change handler
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;
    setFormData({ ...formData, [name]: newValue });
    validateField(name, newValue);
  };

  //  Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    Object.keys(formData).forEach((key) => {
      if (key !== "file") validateField(key, formData[key]);
      if (!formData[key] && key !== "file") valid = false;
    });

    if (!valid) return;

    setSubmitting(true);
    setErrorAlert(false);
    setSubmitted(false);

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (formData[key]) formDataToSend.append(key, formData[key]);
      }

      await axios.post(`${BASE_URLL}/api/support/`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      window.alert(" Your support request has been submitted successfully!");

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);

      //  Reset form fields
      setFormData({
        name: "",
        mobile: "",
        email: "",
        subject: "",
        message: "",
        file: null,
      });
      setErrors({});
    } catch (error) {
      console.error("Support form error:", error);
      setErrorAlert(true);
      setTimeout(() => setErrorAlert(false), 4000);

      // Show JS alert for error
      window.alert(" Something went wrong! Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="pandit-sidebar">
        <PanditLeftNav />
      </aside>

      <main className="main-container-box">
        <div className="content-box">
          {/* Header */}
          <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
            <h1 className="fw500">
              <Breadcrumb>
                <Breadcrumb.Item href="/Pandit_DashBoard">
                  <span className="fw700h1">Dashboard</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Support</Breadcrumb.Item>
              </Breadcrumb>
            </h1>
          </div>
          {errorAlert && (
            <Alert
              variant="danger"
              className="mt-2 shadow-sm text-center fw-semibold"
            >
               Something went wrong. Please try again.
            </Alert>
          )}

          {/*  Support Form */}
          <Row className="mt-4">
            <Card className="p-4 shadow-sm rounded-4 border-0">
              <Form onSubmit={handleSubmit}>
                <Row>
                  {/* Name */}
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="temp-label">
                        Name <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className={`temp-form-control-option ${
                          errors.name ? "is-invalid" : ""
                        }`}
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </Form.Group>
                  </Col>

                  {/* Mobile */}
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="temp-label">
                        Mobile <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Enter your mobile number"
                        className={`temp-form-control-option ${
                          errors.mobile ? "is-invalid" : ""
                        }`}
                      />
                      {errors.mobile && (
                        <div className="invalid-feedback">{errors.mobile}</div>
                      )}
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
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className={`temp-form-control-option ${
                          errors.email ? "is-invalid" : ""
                        }`}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </Form.Group>
                  </Col>

                  {/* Subject */}
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="temp-label">
                        Subject <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Enter subject here..."
                        className={`temp-form-control-option ${
                          errors.subject ? "is-invalid" : ""
                        }`}
                      />
                      {errors.subject && (
                        <div className="invalid-feedback">{errors.subject}</div>
                      )}
                    </Form.Group>
                  </Col>

                  {/* Message */}
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="temp-label">
                        Message <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Enter your message"
                        className={`temp-form-control-option ${
                          errors.message ? "is-invalid" : ""
                        }`}
                      />
                      {errors.message && (
                        <div className="invalid-feedback">{errors.message}</div>
                      )}
                    </Form.Group>
                  </Col>

                  {/* File Upload */}
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="temp-label">
                        Attachment (optional)
                      </Form.Label>
                      <Form.Control
                        type="file"
                        name="file"
                        onChange={handleChange}
                        className="temp-form-control-option"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Submit Button */}
                <div className=" mt-3">
                  <Button
                    type="submit"
                    className="btn-save py-2 px-4"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Spinner animation="border" size="sm" /> Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>
              </Form>
            </Card>
          </Row>
        </div>
      </main>
    </div>
  );
};

export default PanditSupport;
