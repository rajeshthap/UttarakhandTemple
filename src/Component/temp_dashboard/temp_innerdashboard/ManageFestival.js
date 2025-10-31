import React, { useEffect, useState, forwardRef } from "react";
import "../../../assets/CSS/LeftNav.css";
import TempleLeftNav from "../TempleLeftNav";
import SearchFeature from "./SearchFeature";
import { BASE_URLL } from "../../../Component/BaseURL";
import { Button, Modal, Form, Row, Col, InputGroup,Breadcrumb } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../GlobleAuth/AuthContext";
import UploadFile from "../../../assets/images/upload-icon.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendar } from "react-icons/fa";

// Custom date picker input with calendar icon
const CustomDatePickerInput = forwardRef(({ value, onClick, placeholder }, ref) => (
  <InputGroup>
    <Form.Control
      ref={ref}
      value={value}
      onClick={onClick}
      placeholder={placeholder}
      className="temp-form-control-option"
      readOnly
    />
    <InputGroup.Text onClick={onClick} style={{ cursor: 'pointer' }}>
      <FaCalendar />
    </InputGroup.Text>
  </InputGroup>
));

const ManageFestival = () => {
  const [festivals, setFestivals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filteredFestivals, setFilteredFestivals] = useState([]); 
  const [currentFestival, setCurrentFestival] = useState({});
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [selectedStartDateTime, setSelectedStartDateTime] = useState(null);
  const [selectedEndDateTime, setSelectedEndDateTime] = useState(null);
  const { uniqueId } = useAuth();

  // ================= FETCH FESTIVAL DATA ==================
  const fetchFestivals = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URLL}api/reg-festival/`,
        { params: { creator_id: uniqueId } }
      );

      if (res.data) {
        const data = Array.isArray(res.data) ? res.data : [res.data];

        const formatMediaUrl = (filePath) => {
          if (!filePath) return "";

          // Case 1: Full valid backend URL (already correct)
          if (filePath.startsWith("https://mahadevaaya.com/backend/")) {
            return filePath;
          }

          // Case 2: Path already contains "/media/" but missing backend base
          if (filePath.includes("/media/")) {
            return `https://mahadevaaya.com/backend${filePath.startsWith("/") ? "" : "/"}${filePath}`;
          }

          // Case 3: Only relative filename (no media/ prefix)
          return `https://mahadevaaya.com/backend/media/${filePath}`;
        };

        const formatted = data.map((f) => {
          const url = formatMediaUrl(f.image);
          console.log("FESTIVAL image raw:", f.image, "-> normalized:", url);
          return { ...f, image_url: url };
        });
        setFestivals(formatted);
        setFilteredFestivals(formatted);
      }
    } catch (err) {
      console.error("Error fetching festivals:", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (uniqueId) fetchFestivals();
  }, [uniqueId]);

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredFestivals(festivals);
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = festivals.filter(
        (f) =>
          f.festival_name?.toLowerCase().includes(lowerQuery) ||
          f.temple_name?.toLowerCase().includes(lowerQuery) ||
          f.phone?.toLowerCase().includes(lowerQuery)
      );
      setFilteredFestivals(filtered);
    }
  };

  // ================= HANDLE EDIT ==================
  const handleEdit = (festival) => {
    const storedId = (uniqueId || "").trim().toLowerCase();
    const creatorId = (festival.creator_id || "").trim().toLowerCase();

    console.log("Logged-in Creator ID:", storedId);
    console.log("Festival Creator ID:", creatorId);

    // Allow editing if creator matches or backend didn't return creator_id
    if (creatorId && creatorId !== storedId) {
      alert("You can only edit festivals you created!");
      return;
    }

    // Initialize date picker states
    if (festival.start_date_time) {
      setSelectedStartDateTime(new Date(festival.start_date_time));
    }
    if (festival.end_date_time) {
      setSelectedEndDateTime(new Date(festival.end_date_time));
    }

    setCurrentFestival({ ...festival });
    setShowModal(true);
  };

  // ================= HANDLE CHANGE ==================
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setCurrentFestival({
        ...currentFestival,
        [name]: file,
        [`${name}_preview`]: URL.createObjectURL(file),
      });
    } else {
      setCurrentFestival({ ...currentFestival, [name]: value });
    }
  };

  // ================= HANDLE DATE CHANGE ==================
  const handleStartDateChange = (date) => {
    setSelectedStartDateTime(date);
    setCurrentFestival({
      ...currentFestival,
      start_date_time: date ? date.toISOString() : "",
      start_day: date ? date.toLocaleDateString("en-US", { weekday: "long" }) : "",
    });
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDateTime(date);
    setCurrentFestival({
      ...currentFestival,
      end_date_time: date ? date.toISOString() : "",
      end_day: date ? date.toLocaleDateString("en-US", { weekday: "long" }) : "",
    });
  };

  // ================= HANDLE UPDATE ==================
  const handleUpdate = async () => {
    const formData = new FormData();

    [
      "festival_name",
      "start_date_time",
      "end_date_time",
      "start_day",
      "end_day",
      "description",
      "temple_name",
    ].forEach((key) => {
      if (currentFestival[key]) formData.append(key, currentFestival[key]);
    });

    if (currentFestival.image instanceof File) {
      formData.append("image", currentFestival.image);
    }

    formData.append("updated_by", uniqueId);

    try {
      const res = await axios.put(`${BASE_URLL}api/reg-festival/`,
        formData,
        {
          params: { creator_id: uniqueId, festival_id: currentFestival.festival_id },
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 200) {
        alert("Festival updated successfully!");
        setShowModal(false);
        fetchFestivals();
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update festival!");
    }
  };

  // ================= HANDLE DELETE ==================
  const handleDelete = async (festival) => {
    if (festival.creator_id !== uniqueId) {
      alert("You can only delete your own festival!");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this festival?"))
      return;

    try {
      await axios.delete("https://mahadevaaya.com/backend/api/reg-festival/", {
        params: { creator_id: uniqueId, festival_id: festival.festival_id },
      });
      alert("Festival deleted successfully!");
      fetchFestivals();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Unable to delete festival!");
    }
  };

  // ================= RENDER ==================
  return (
    <div className="dashboard-wrapper">
      <aside className="temp-sidebar">
        <TempleLeftNav />
      </aside>

      <main className="main-container-box">
        <div className="content-box">
          <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
                                     <h1 className="fw500">
                                       <Breadcrumb>
                                         <Breadcrumb.Item href="/TempleDashBoard">
                                           <span className="fw700h1">DashBoard</span>
                                         </Breadcrumb.Item>
                                         <Breadcrumb.Item active>Manage Festival</Breadcrumb.Item>
                                       </Breadcrumb>
                                     </h1>
                                     <div>
                <SearchFeature onSearch={handleSearch} />
              </div>
                     
                                     
                                   </div>
          <Row className="mt-3">

            <div className="col-md-12">
              <table className="rwd-table">
                <tbody>
                  <tr>
                    <th>S.No</th>
                    <th>Festival Name</th>
                    <th>Temple Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>

                  {filteredFestivals.length > 0 ? (
                    filteredFestivals.map((festival, index) => (
                      <tr key={festival.festival_id}>
                        <td data-th="S.No">{index + 1}</td>
                        <td data-th="Festival Name">{festival.festival_name}</td>
                        <td data-th="Temple Name">{festival.temple_name}</td>
                        <td data-th="Start Date">
                          {new Date(festival.start_date_time).toLocaleString()}
                        </td>
                        <td data-th="End Date">
                          {new Date(festival.end_date_time).toLocaleString()}
                        </td>
                        <td data-th="Description">{festival.description}</td>
                        <td>
                          <Button
                            className="event-click-cancel"
                            size="sm"
                            onClick={() => handleEdit(festival)}
                          >
                            Edit
                          </Button>{" "}
                          <Button
                            className="event-click-btn-danger"
                            size="sm"
                            onClick={() => handleDelete(festival)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        {loading ? "Loading..." : "No matching festivals found."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Row>

          {/* ================= EDIT MODAL ================= */}
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            size="lg"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Festival</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="temp-label">Festival Name</Form.Label>
                      <Form.Control
                        className="temp-form-control-option"
                        name="festival_name"
                        value={currentFestival.festival_name || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="temp-label">Temple Name</Form.Label>
                      <Form.Control
                        className="temp-form-control-option"
                        name="temple_name"
                        value={currentFestival.temple_name || ""} disabled
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="temp-label">Start Date & Time</Form.Label>
                      <DatePicker
                        selected={selectedStartDateTime}
                        onChange={handleStartDateChange}
                        showTimeSelect
                        timeFormat="hh:mm aa"
                        timeIntervals={30}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        placeholderText="Select Start Date and Time"
                        customInput={<CustomDatePickerInput placeholder="Select Start Date and Time" />}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="temp-label">End Date & Time</Form.Label>
                      <DatePicker
                        selected={selectedEndDateTime}
                        onChange={handleEndDateChange}
                        showTimeSelect
                        timeFormat="hh:mm aa"
                        timeIntervals={30}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        placeholderText="Select End Date and Time"
                        customInput={<CustomDatePickerInput placeholder="Select End Date and Time" />}
                      />
                    </Form.Group>
                  </Col>
                  <Col><Form.Group className="mt-2">
                    <Form.Label className="temp-label">Description</Form.Label>
                    <Form.Control
                      className=""
                      as="textarea"
                      rows={2}
                      name="description"
                      value={currentFestival.description || ""}
                      onChange={handleChange}
                      style={{ fontSize: "11px", height: "100px", }}
                    />
                  </Form.Group></Col>
                  <Col md={6}>
                    <Row className="temp-stepform-box mt-4">
                      <Col lg={8} md={12} sm={12}>
                        <fieldset
                          className={`upload_dropZone text-center ${dragging ? "drag-over" : ""
                            }`}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragging(true);
                          }}
                          onDragLeave={() => setDragging(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setDragging(false);
                            const file = e.dataTransfer.files[0];
                            if (file) {
                              handleChange({
                                target: {
                                  name: "image",
                                  files: [file],
                                  type: "file",
                                },
                              });
                            }
                          }}
                        >
                          <legend className="visually-hidden">Festival Image</legend>
                          <img src={UploadFile} alt="upload" style={{ width: "35px" }} />

                          <p className="temp-drop-txt my-2">
                            Drag &amp; drop file<br />
                            <i>or</i>
                          </p>
                          <input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/jpeg,image/png"
                            className="invisible"
                            onChange={handleChange}
                          />
                          <label className="btn temp-primary-btn mb-1" htmlFor="image">
                            Choose file
                          </label>
                          <p className="temp-upload-file">Upload up to 2MB (jpg, png)</p>
                        </fieldset>
                      </Col>

                      <Col lg={4} md={12} sm={12} className="mt-2">
                        <h6 style={{ fontSize: "11px", fontWeight: "500" }}>
                          Festival Image <span style={{ color: "red" }}>*</span>
                        </h6>

                        {currentFestival.image_url && !currentFestival.image?.name && (
                          <div className="my-2">
                            <img
                              src={currentFestival.image_url}
                              alt="Festival"
                              style={{
                                width: "100%",
                                height: "140px",
                                objectFit: "contain",
                                borderRadius: "10px",

                              }}
                            />

                          </div>

                        )}

                        {/* New Upload Preview */}
                        {currentFestival.image instanceof File && (
                          <div className="mt-2">
                            <p className="fw-bold">New Upload Preview:</p>
                            <img
                              src={URL.createObjectURL(currentFestival.image)}
                              alt="Preview"
                              style={{
                                width: "100%",
                                height: "180px",
                                objectFit: "contain",
                                borderRadius: "10px",
                                border: "1px solid #ccc",
                              }}
                            />
                            <div className="mt-2 d-flex align-items-center gap-3">
                              <a
                                href={URL.createObjectURL(currentFestival.image)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-primary btn-sm"
                              >
                                View Full Image
                              </a>
                              <span
                                className="text-danger"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  setCurrentFestival({
                                    ...currentFestival,
                                    image: "",
                                    image_preview: "",
                                  })
                                }
                              >

                              </span>
                            </div>
                          </div>
                        )}


                      </Col>
                      <div className="mt-2 d-flex justify-content-center">
                        <a
                          href={currentFestival.image_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="event-click-btn"
                          style={{ fontSize: "12px", padding: "3px 8px", textDecoration: "none" }}
                        >
                          View Full Image
                        </a>
                      </div>
                    </Row>



                  </Col>
                </Row>



                {/* Image Upload */}

              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="event-click-cancel"
                onClick={() => setShowModal(false)}
              >
                Close
              </Button>
              <Button className="event-click-btn" onClick={handleUpdate}>
                Update
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default ManageFestival;