import React, { useState } from "react";
import "../../../assets/CSS/TempleLeftNav.css";
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
import { BASE_URLL } from "../../BaseURL";

import UploadFileIcon from "../../../assets/images/upload-icon.png";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";

const SupportPage = () => {
  // Basic Form State
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    subject: "",
    message: "",
    devotee_photo: null,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  // Drag and Drop States
  const [dragging, setDragging] = useState(false);
  const [fileErrors, setFileErrors] = useState({});

  // Validation
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  // File upload handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // file size limit 10KB–2MB
      if (file.size < 10240 || file.size > 2 * 1024 * 1024) {
        setFileErrors({
          devotee_photo: "File size must be between 10KB and 2MB.",
        });
        setFormData((prev) => ({ ...prev, devotee_photo: null }));
      } else {
        setFormData((prev) => ({ ...prev, devotee_photo: file }));
        setFileErrors({});
      }
    }
  };

  // Drag-and-drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange({ target: { files: [file] } });
    }
  };

  const handleDeleteFile = () => {
    setFormData((prev) => ({ ...prev, devotee_photo: null }));
    setFileErrors({ devotee_photo: "Devotee photo is required" });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    Object.keys(formData).forEach((key) => {
      if (key !== "devotee_photo") validateField(key, formData[key]);
      if (!formData[key] && key !== "devotee_photo") valid = false;
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

      window.alert("Your support request has been submitted successfully!");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);

      setFormData({
        name: "",
        mobile: "",
        email: "",
        subject: "",
        message: "",
        devotee_photo: null,
      });
      setErrors({});
    } catch (error) {
      console.error("Support form error:", error);
      setErrorAlert(true);
      setTimeout(() => setErrorAlert(false), 4000);
      window.alert("Something went wrong! Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
   
          <>
          {errorAlert && (
            <Alert
              variant="danger"
              className="mt-2 shadow-sm text-center fw-semibold"
            >
              Something went wrong. Please try again.
            </Alert>
          )}

          <Row>
            <Card className="p-2 shadow-sm rounded-4 border-0">
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
                          errors.name ? "" : ""
                        }`}
                      />
                      {errors.name && (
                        <div className="alert-txt">{errors.name}</div>
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
                          errors.mobile ? "" : ""
                        }`}
                      />
                      {errors.mobile && (
                        <div className="alert-txt">{errors.mobile}</div>
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
                          errors.email ? "" : ""
                        }`}
                      />
                      {errors.email && (
                        <div className="alert-txt">{errors.email}</div>
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
                          errors.subject ? "" : ""
                        }`}
                      />
                      {errors.subject && (
                        <div className="alert-txt">{errors.subject}</div>
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
                          errors.message ? "" : ""
                        }`}
                      />
                      {errors.message && (
                        <div className="alert-txt">{errors.message}</div>
                      )}
                    </Form.Group>
                  </Col>

                  {/* File Upload */}
                  <Col lg={6} md={6} sm={12}>
                    <Row className="temp-stepform-box-support">
                      <Col lg={8} md={8} sm={12}>
                        <fieldset
                          className={`upload_dropZone text-center ${
                            dragging ? "drag-over" : ""
                          }`}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                        >
                          <legend className="visually-hidden">
                            Upload Photo
                          </legend>
                          <img src={UploadFileIcon} alt="upload" />
                          <p className="temp-drop-txt my-2">
                            Drag & drop photo <br /> <i>or</i>
                          </p>
                          <input
                            id="devotee_photo"
                            name="devotee_photo"
                            type="file"
                            accept="image/*"
                            className="invisible"
                            onChange={handleFileChange}
                          />
                          <label
                            className="btn temp-primary-btn mb-1"
                            htmlFor="devotee_photo"
                          >
                            Choose file
                          </label>
                          <p className="temp-upload-file">
                            Upload size 10KB–2MB (jpg, png, jpeg)
                          </p>
                        </fieldset>

                        {fileErrors.devotee_photo && (
                          <div className="alert-txt text-center">
                            {fileErrors.devotee_photo}
                          </div>
                        )}
                      </Col>

                      <Col lg={4} md={4} sm={12} className="temp-doc-subinfo mt-2">
                        {formData.devotee_photo && (
                          <>
                            <div className="d-flex temp-doc-info">
                              <Col lg={3}>{new Date().toLocaleDateString()}</Col>
                              <Col lg={9} className="px-4 temp-success-doc">
                                <FaCheckCircle /> Uploaded Successfully
                              </Col>
                            </div>
                            <div
                              className="col temp-delete-icon"
                              onClick={handleDeleteFile}
                            >
                              <h3>
                                <RiDeleteBin6Line className="mx-1" /> Click here
                                to Remove
                              </h3>
                            </div>
                          </>
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>

                {/* Submit Button */}
                <div className="mt-3">
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
       </>

  );
};

export default SupportPage;
