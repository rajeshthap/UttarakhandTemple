import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../assets/CSS/LeftNav.css";
import TempleLeftNav from "../TempleLeftNav";
import SearchFeature from "./SearchFeature";
import { useAuth } from "../../GlobleAuth/AuthContext";
import axios from "axios";
import { BASE_URLL } from "../../../Component/BaseURL";
import ModifyAlert from "../../Alert/ModifyAlert";
import UploadFile from "../../../assets/images/upload-icon.png";
import { FaCheckCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const AddFestival = () => {
  const { uniqueId } = useAuth();

  const [formData, setFormData] = useState({
    temple_name: "",
    festival_name: "",
    start_date_time: "",
    end_date_time: "",
    start_day: "",
    end_day: "",
    description: "",
    image: null,
    temple_id: uniqueId,
  });

  const [selectedStartDateTime, setSelectedStartDateTime] = useState(null);
  const [selectedEndDateTime, setSelectedEndDateTime] = useState(null);
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");

  const [dragging, setDragging] = useState(null);
  const [formDataFiles, setFormDataFiles] = useState({ image: null });
  const [fileErrors, setFileErrors] = useState({});

  const today = new Date();

  // Fetch temple details
  useEffect(() => {
    if (!uniqueId) return;

    const fetchTemple = async () => {
      try {
        const response = await axios.get(
          `${BASE_URLL}api/get-temple/?temple_id=${uniqueId}`
        );
        const temple = response.data;
        setFormData((prev) => ({
          ...prev,
          temple_name: temple.temple_name || "",
          temple_id: uniqueId,
        }));
      } catch (error) {
        console.error("Error fetching temple data:", error);
      }
    };

    fetchTemple();
  }, [uniqueId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleStartDateChange = (date) => {
    const startDay = date
      ? date.toLocaleDateString("en-US", { weekday: "long" })
      : "";
    setSelectedStartDateTime(date);
    setFormData((prev) => ({
      ...prev,
      start_date_time: date ? date.toISOString() : "",
      start_day: startDay,
      end_date_time:
        selectedEndDateTime && date > selectedEndDateTime
          ? date.toISOString()
          : prev.end_date_time,
      end_day:
        selectedEndDateTime && date > selectedEndDateTime
          ? startDay
          : prev.end_day,
    }));
    setErrors((prev) => ({ ...prev, start_date_time: "" }));
  };

  const handleEndDateChange = (date) => {
    const endDay = date
      ? date.toLocaleDateString("en-US", { weekday: "long" })
      : "";
    setSelectedEndDateTime(date);
    setFormData((prev) => ({
      ...prev,
      end_date_time: date ? date.toISOString() : "",
      end_day: endDay,
    }));
    setErrors((prev) => ({ ...prev, end_date_time: "" }));
  };

  const validateFields = () => {
    const tempErrors = {};
    if (!formData.festival_name)
      tempErrors.festival_name = "Festival Name is required";
    if (!formData.start_date_time)
      tempErrors.start_date_time = "Start Date & Time is required";
    if (!formData.end_date_time)
      tempErrors.end_date_time = "End Date & Time is required";
    if (!formData.description)
      tempErrors.description = "Description is required";
    if (!formDataFiles.image) tempErrors.image = "Festival image is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];

      // Validate file size (10KB - 2MB)
      if (file.size < 10 * 1024 || file.size > 2 * 1024 * 1024) {
        setFileErrors((prev) => ({
          ...prev,
          [name]: "File size must be between 10KB and 2MB",
        }));
        return;
      } else {
        setFileErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }

      setFormDataFiles((prev) => ({ ...prev, [name]: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "image") {
        if (formDataFiles.image) data.append(key, formDataFiles.image);
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      await axios.post(`${BASE_URLL}api/reg-festival/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAlertMessage("Festival added successfully!");
      setAlertType("success");
      setShowAlert(true);

      // Reset form
      setFormData({
        ...formData,
        festival_name: "",
        start_date_time: "",
        end_date_time: "",
        start_day: "",
        end_day: "",
        description: "",
      });
      setSelectedStartDateTime(null);
      setSelectedEndDateTime(null);
      setFormDataFiles({ image: null });
      setErrors({});
    } catch (error) {
      console.error("Error submitting festival:", error);
      setAlertMessage("Failed to add festival. Please try again.");
      setAlertType("error");
      setShowAlert(true);
    }
  };

  const minTime = new Date();
  minTime.setHours(6, 0);
  const maxTime = new Date();
  maxTime.setHours(22, 0);

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <TempleLeftNav />
      </aside>

      <main className="">
        <div className="content-box">
          <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3 ">
            <h1 className="fw500">
              <span className="fw700h1">Add </span> Festival
            </h1>
            <SearchFeature />
          </div>
          <div className="temp-container">
            <div className="temp-donate">
              {showAlert && (
                <ModifyAlert
                  message={alertMessage}
                  type={alertType}
                  show={showAlert}
                  setShow={setShowAlert}
                />
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="temp-label">
                        Name of Temple<span className="temp-span-star"> *</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="temple_name"
                        value={formData.temple_name}
                        disabled
                        className="temp-form-control"
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="temp-label">
                        Name of Festival
                        <span className="temp-span-star"> *</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="festival_name"
                        className="temp-form-control"
                        value={formData.festival_name}
                        onChange={handleChange}
                      />
                      {errors.festival_name && (
                        <small className="text-danger">
                          {errors.festival_name}
                        </small>
                      )}
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="temp-label">
                        Festival Start Date & Time
                        <span className="temp-span-star"> *</span>
                      </Form.Label>
                      <DatePicker
                        selected={selectedStartDateTime}
                        onChange={handleStartDateChange}
                        showTimeSelect
                        timeFormat="hh:mm aa"
                        timeIntervals={30}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        placeholderText="Select Start Date and Time"
                        className="form-control temp-form-control-option"
                        minDate={today}
                        minTime={minTime}
                        maxTime={maxTime}
                      />
                      {formData.start_day && (
                        <small className="text-muted d-block mt-1">
                          Day: {formData.start_day}
                        </small>
                      )}
                      {errors.start_date_time && (
                        <small className="text-danger">
                          {errors.start_date_time}
                        </small>
                      )}
                    </Form.Group>
                  </Col>

                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="temp-label">
                        Festival End Date & Time
                        <span className="temp-span-star"> *</span>
                      </Form.Label>
                      <DatePicker
                        selected={selectedEndDateTime}
                        onChange={handleEndDateChange}
                        showTimeSelect
                        timeFormat="hh:mm aa"
                        timeIntervals={30}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        placeholderText="Select End Date and Time"
                        className="form-control temp-form-control-option"
                        minDate={selectedStartDateTime || today}
                        minTime={minTime}
                        maxTime={maxTime}
                      />
                      {formData.end_day && (
                        <small className="text-muted d-block mt-1">
                          Day: {formData.end_day}
                        </small>
                      )}
                      {errors.end_date_time && (
                        <small className="text-danger">
                          {errors.end_date_time}
                        </small>
                      )}
                    </Form.Group>
                  </Col>
                  <Col lg={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="temp-label">
                        Description<span className="temp-span-star"> *</span>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="description"
                        className="temp-form-control"
                        value={formData.description}
                        onChange={handleChange}
                      />
                      {errors.description && (
                        <small className="text-danger">
                          {errors.description}
                        </small>
                      )}
                    </Form.Group>
                  </Col>

                  {/* <Col lg={12}>
                    <fieldset
                      className={`upload_dropZone text-center ${
                        dragging === "image" ? "drag-over" : ""
                      }`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragging("image");
                      }}
                      onDragLeave={() => setDragging(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragging(null);
                        const file = e.dataTransfer.files[0];
                        if (file) {
                          handleInputChange({
                            target: { name: "image", files: [file] },
                          });
                        }
                      }}
                    >
                      <legend className="visually-hidden">Upload Image</legend>
                      <img src={UploadFile} alt="upload-file" />
                      <p className="temp-drop-txt my-2">
                        Drag & drop image <br /> <i>or</i>
                      </p>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        className="invisible"
                        onChange={handleInputChange}
                      />
                      <label
                        className="btn temp-primary-btn mb-1"
                        htmlFor="image"
                      >
                        Choose file
                      </label>
                      <p className="temp-upload-file">
                        Upload size 10KB-2MB (jpg, png, jpeg)
                      </p>
                    </fieldset>
                    {fileErrors.image && (
                      <div className="alert-txt text-center">
                        {fileErrors.image}
                      </div>
                    )}
                    {formDataFiles.image && (
                      <div className="mt-2">
                        <div className="d-flex temp-doc-info">
                          <Col lg={3}>{new Date().toLocaleDateString()}</Col>
                          <Col lg={9} className="px-4 temp-success-doc">
                            <FaCheckCircle /> Uploaded Successfully
                          </Col>
                        </div>
                        <div
                          className="col temp-delete-icon"
                          onClick={() => {
                            setFormDataFiles({ image: null });
                            setFileErrors((prev) => ({
                              ...prev,
                              image: "Festival image is required",
                            }));
                          }}
                        >
                          <h3>
                            <RiDeleteBin6Line className="mx-1" /> Click here to
                            Remove
                          </h3>
                        </div>
                      </div>
                    )}
                  </Col> */}
                  <div className="text-center">
                    <Button type="submit" className="temp-submit-btn mt-3">
                      Submit
                    </Button>
                  </div>
                </Row>

                {/* Image Upload */}
              </Form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddFestival;
