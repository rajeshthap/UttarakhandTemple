import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../assets/CSS/LeftNav.css";
import TempleLeftNav from "../TempleLeftNav";
import SearchFeature from "./SearchFeature";
import { useAuth } from "../../GlobleAuth/AuthContext";
import axios from "axios";
import { BASE_URLL } from "../../BaseURL";

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
  const today = new Date();

  // Fetch temple details based on uniqueId
  useEffect(() => {
    const fetchTemple = async () => {
      try {
        const response = await axios.get(
          `${BASE_URLL}/get-temple/?temple_id=${uniqueId}`
        );
        const temple = response.data;

        setFormData((prev) => ({
          ...prev,
          temple_name: temple.temple_name || "",
        }));
      } catch (error) {
        console.error("Error fetching temple data:", error);
      }
    };

    if (uniqueId) fetchTemple();
  }, [uniqueId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Handle Start Date/Time change
  const handleStartDateChange = (date) => {
    setSelectedStartDateTime(date);
    const startDay = date
      ? date.toLocaleDateString("en-US", { weekday: "long" })
      : "";

    setFormData((prev) => ({
      ...prev,
      start_date_time: date ? date.toISOString() : "",
      start_day: startDay,
    }));
  };

  // Handle End Date/Time change
  const handleEndDateChange = (date) => {
    setSelectedEndDateTime(date);
    const endDay = date
      ? date.toLocaleDateString("en-US", { weekday: "long" })
      : "";

    setFormData((prev) => ({
      ...prev,
      end_date_time: date ? date.toISOString() : "",
      end_day: endDay,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("temple_id", formData.temple_id);
      data.append("temple_name", formData.temple_name);
      data.append("festival_name", formData.festival_name);
      data.append("start_date_time", formData.start_date_time);
      data.append("end_date_time", formData.end_date_time);
      data.append("start_day", formData.start_day);
      data.append("end_day", formData.end_day);
      data.append("description", formData.description);

      if (formData.image) data.append("image", formData.image);

      const response = await axios.post(`${BASE_URLL}/add-festival/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Festival submitted successfully:", response.data);
      alert("Festival added successfully!");

      setFormData({
        temple_name: formData.temple_name,
        festival_name: "",
        start_date_time: "",
        end_date_time: "",
        start_day: "",
        end_day: "",
        description: "",
        image: null,
        temple_id: uniqueId,
      });
      setSelectedStartDateTime(null);
      setSelectedEndDateTime(null);
    } catch (error) {
      console.error("Error submitting festival:", error);
      alert("Failed to add festival. Please try again.");
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

      <main className="main-container-box">
        <div className="content-box">
          <SearchFeature />

          <Container className="temp-container">
            <div className="temple-registration-heading">
              <h1>Festival</h1>
            </div>

            <div className="temp-donate">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
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
                      <Form.Label>
                        Name of Festival<span className="temp-span-star"> *</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="festival_name"
                        className="temp-form-control"
                        value={formData.festival_name}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Start & End Date/Time */}
                <Row>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
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
                        className="form-control temp-form-control-option w-100"
                        minDate={today}
                        minTime={minTime}
                        maxTime={maxTime}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
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
                        className="form-control temp-form-control-option w-100"
                        minDate={selectedStartDateTime || today}
                        minTime={minTime}
                        maxTime={maxTime}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Start & End Days */}
                <Row>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Start Day</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.start_day}
                        disabled
                        className="temp-form-control"
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>End Day</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.end_day}
                        disabled
                        className="temp-form-control"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col lg={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>
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
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col lg={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Festival Image</Form.Label>
                      <Form.Control
                        type="file"
                        name="image"
                        className="temp-form-control"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button type="submit" className="temp-submit-btn">
                  Submit
                </Button>
              </Form>
            </div>
          </Container>
        </div>
      </main>
    </div>
  );
};

export default AddFestival;
