

import React, { useEffect, useState } from "react";
import "../../../assets/CSS/LeftNav.css";
import TempleLeftNav from "../TempleLeftNav";
import SearchFeature from "./SearchFeature";
import { Button, Modal, Form, Row, Col, } from "react-bootstrap";
import axios from "axios";
import LocationState from "../../userregistration/LocationState";
import UploadFile from "../../../assets/images/upload-icon.png";

const ManageTemple = () => {
  const [temples, setTemples] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTemple, setCurrentTemple] = useState({});
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(null);
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
  });

  const uniqueId = sessionStorage.getItem("uniqueId");

  const handleInputChangeCity = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // validateField(name, value); // live validation on custom handler
  };



  // const getImageUrl = (imgPath) => {
  //   if (!imgPath)
  //     return "https://mahadevaaya.com/backend/media/temple_images/default.png";
  //   const filename = imgPath.split("/").pop();
  //   return `https://mahadevaaya.com/backend/media/temple_images/${filename}`;
  // };

  const fetchTemples = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://mahadevaaya.com/backend/api/get-temple/",
        { params: { temple_id: uniqueId } }
      );

      if (res.data) {
        const data = Array.isArray(res.data) ? res.data : [res.data];

        const formatMediaUrl = (filePath) => {
          if (!filePath) return "";

          // Case 1: Already has backend prefix → use as-is
          if (filePath.includes("/backend/")) return filePath;

          // Case 2: Full URL but missing /backend/
          if (filePath.startsWith("http")) {
            return filePath.replace("https://mahadevaaya.com/", "https://mahadevaaya.com/backend/");
          }

          // Case 3: Relative path → prepend complete correct base
          return `https://mahadevaaya.com/backend/media/${filePath}`;
        };

        const formatted = data.map((t) => ({
          ...t,
          temple_image_url: formatMediaUrl(t.temple_image),
          land_doc_url: formatMediaUrl(t.land_doc),
          noc_doc_url: formatMediaUrl(t.noc_doc),
          trust_cert_url: formatMediaUrl(t.trust_cert),
        }));

        setTemples(formatted);
        const temple = formatted.find((t) => t.temple_id === uniqueId);
        if (temple) {
          setFormData({
            country: temple.country || "",
            state: temple.state || "",
            city: temple.city || "",
          });
        }
      }
    } catch (err) {
      console.error("Error fetching temples:", err);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    if (uniqueId) fetchTemples();
  }, [uniqueId]);

  const handleEdit = (temple) => {
    if (temple.temple_id !== uniqueId) {
      alert(" You can only edit your own temple!");
      return;
    }
    setCurrentTemple({ ...temple });
    setFormData({
      country: temple.country || "",
      state: temple.state || "",
      city: temple.city || "",
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setCurrentTemple({
        ...currentTemple,
        [name]: file,
        [`${name}_preview`]: URL.createObjectURL(file),
      });
    } else {
      setCurrentTemple({ ...currentTemple, [name]: value });
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();

    [
      "temple_name",
      "temple_address",
      "city",
      "state",
      "country",
      "email",
      "phone",
    ].forEach((key) => {
      if (currentTemple[key]) formData.append(key, currentTemple[key]);
    });

    ["temple_image", "land_doc", "noc_doc", "trust_cert"].forEach((key) => {
      if (currentTemple[key] instanceof File) {
        formData.append(key, currentTemple[key]);
      }
    });

    try {
      const res = await axios.put(
        "https://mahadevaaya.com/backend/api/get-temple/",
        formData,
        {
          params: { temple_id: uniqueId },
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 200) {
        alert(" Temple updated successfully!");
        setShowModal(false);
        fetchTemples();
      }
    } catch (err) {
      console.error("Update error:", err);
      alert(" Failed to update temple!");
    }
  };

  const handleDelete = async (templeId) => {
    if (templeId !== uniqueId) {
      alert(" You can only delete your own temple!");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this temple?")) return;

    try {
      await axios.delete("https://mahadevaaya.com/backend/api/delete-temple/", {
        params: { temple_id: uniqueId },
      });
      alert(" Temple deleted successfully!");
      setTemples([]);
    } catch (err) {
      console.error("Delete error:", err);
      alert(" Unable to delete temple!");
    }
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <TempleLeftNav />
      </aside>

      <main className="main-container-box">
        <div className="content-box">
          <SearchFeature />


          <Row className="mt-3">
            <h4>Manage Temple</h4>
            <div className="col-md-12">
              <table className="rwd-table">
                <tbody>
                  <tr>
                    <th>S.No</th>
                    <th>Temple Name</th>
                    <th>Temple Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Country</th>
                    <th>Action</th>
                  </tr>

                  {temples.length > 0 ? (
                    temples.map((temple, index) => (
                      <tr key={temple.temple_id}>
                        <td data-th="S. No">{index + 1}</td>
                        <td data-th="Temple Name">{temple.temple_name}</td>
                        <td data-th="Temple Address">{temple.temple_address}</td>
                        <td data-th="City">{temple.city}</td>
                        <td data-th="State">{temple.state}</td>
                        <td data-th="Country">{temple.country}</td>
                        <td>
                          <Button className="event-click-cancel" size="sm" onClick={() => handleEdit(temple)}>Edit</Button>{" "}
                          <Button className="event-click-btn-danger" size="sm" onClick={() => handleDelete(temple.temple_id)}>Delete</Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        {loading ? "Loading..." : "No Data Available"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Row>

          {/* Edit Modal */}
          <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit Temple</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                {/* TEXT FIELDS */}
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="temp-label">Temple Name</Form.Label>
                      <Form.Control
                        className="temp-form-control-option"
                        name="temple_name"
                        value={currentTemple.temple_name || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="temp-label">Phone</Form.Label>
                      <Form.Control
                        className="temp-form-control-option"
                        value={currentTemple.phone || ""} disabled />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mt-2">
                  <LocationState
                    formData={formData}
                    handleInputChange={handleInputChangeCity}
                  // formErrors={errorReason_querys} // Pass errorReason_querys instead of formErrors
                  />
                </Row>

                <Row className="mt-2">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="temp-label">Email</Form.Label>
                      <Form.Control
                        className="temp-form-control-option"
                        value={currentTemple.email || ""} disabled />
                    </Form.Group>
                  </Col>

                </Row>

                <Form.Group className="mt-2">
                  <Form.Label className="temp-label">Temple Address</Form.Label>
                  <Form.Control
                    className="temp-form-control-option"
                    as="textarea"
                    rows={2}
                    name="temple_address"
                    value={currentTemple.temple_address || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Temple Image Upload Section */}
                <Row className="temp-stepform-box mt-4">
                  <Col lg={5} md={5} sm={12}>
                    <fieldset
                      className={`upload_dropZone text-center ${dragging === "temple_image" ? "drag-over" : ""
                        }`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragging("temple_image");
                      }}
                      onDragLeave={() => setDragging(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragging(null);
                        const file = e.dataTransfer.files[0];
                        if (file) {
                          handleChange({
                            target: { name: "temple_image", files: [file], type: "file" },
                          });
                        }
                      }}
                    >
                      <legend className="visually-hidden">Temple Image</legend>
                      <img
                        src={UploadFile} alt="upload-file"
                        style={{ width: "60px" }}
                      />
                      <p className="temp-drop-txt my-2">
                        Drag &amp; drop files
                        <br />
                        <i>or</i>
                      </p>

                      <input
                        id="temple_image"
                        name="temple_image"
                        type="file"
                        accept="image/jpeg, image/png"
                        className="invisible"
                        onChange={handleChange}
                      />

                      <label className="btn temp-primary-btn mb-1" htmlFor="temple_image">
                        Choose file
                      </label>
                      <p className="temp-upload-file">Upload size up to 2MB (jpg, png)</p>
                    </fieldset>
                  </Col>

                  <Col lg={7} md={7} sm={12} className="mt-2">
                    <h6 style={{ fontSize: "14px", fontWeight: "600" }}>
                      Temple Image <span style={{ color: "red" }}>*</span>
                    </h6>

                    {/*  Existing Temple Image from backend */}
                    {currentTemple.temple_image_url && !currentTemple.temple_image?.name && (
                      <div className="my-2">

                        <img
                          src={currentTemple.temple_image_url}
                          alt="Temple"
                          style={{
                            width: "100%",
                            height: "180px",
                            objectFit: "contain",
                            borderRadius: "10px",
                            border: "1px solid #ccc",
                          }}
                        />
                        <div className="mt-2">
                          <a
                            href={currentTemple.temple_image_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-primary btn-sm"
                            style={{ fontSize: "12px", padding: "3px 8px" }}
                          >
                            View Full Image
                          </a>
                        </div>
                      </div>
                    )}

                    {/*  New uploaded image preview */}
                    {currentTemple.temple_image instanceof File && (
                      <div className="mt-2">
                        <p className="fw-bold">New Upload Preview:</p>
                        <img
                          src={URL.createObjectURL(currentTemple.temple_image)}
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
                            href={URL.createObjectURL(currentTemple.temple_image)}
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
                              setCurrentTemple({
                                ...currentTemple,
                                temple_image: "",
                                temple_image_preview: "",
                              })
                            }
                          >
                            ❌ Remove
                          </span>
                        </div>
                      </div>
                    )}
                  </Col>
                </Row>

                {/* ===================== DOCUMENTS SECTION ===================== */}
                {[
                  { label: "Land Document", key: "land_doc" },
                  { label: "NOC Document", key: "noc_doc" },
                  { label: "Trust Certificate", key: "trust_cert" },
                ].map(({ label, key }) => (
                  <Row className="temp-stepform-box mt-4" key={key}>
                    <Col lg={5} md={5} sm={12}>
                      <fieldset
                        className={`upload_dropZone text-center ${dragging === key ? "drag-over" : ""
                          }`}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragging(key);
                        }}
                        onDragLeave={() => setDragging(null)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragging(null);
                          const file = e.dataTransfer.files[0];
                          if (file) {
                            handleChange({
                              target: { name: key, files: [file], type: "file" },
                            });
                          }
                        }}
                      >
                        <legend className="visually-hidden">{label}</legend>
                        <img
                          src={UploadFile} alt="upload-file"
                          style={{ width: "60px" }}
                        />
                        <p className="temp-drop-txt my-2">
                          Drag &amp; drop files
                          <br />
                          <i>or</i>
                        </p>

                        <input
                          id={key}
                          name={key}
                          type="file"
                          accept="image/jpeg, image/png, application/pdf"
                          className="invisible"
                          onChange={handleChange}
                        />

                        <label className="btn temp-primary-btn mb-1" htmlFor={key}>
                          Choose file
                        </label>
                        <p className="temp-upload-file">Upload size up to 2MB (jpg, png, pdf)</p>
                      </fieldset>
                    </Col>

                    <Col lg={7} md={7} sm={12} className="mt-2">
                      <h6 style={{ fontSize: "14px", fontWeight: "600" }}>
                        {label} <span style={{ color: "red" }}>*</span>
                      </h6>

                      {/*  Existing Document from backend */}
                      {currentTemple[`${key}_url`] && !currentTemple[key]?.name && (
                        <div className="my-2">


                          {/* Image or PDF */}
                          {/\.(jpg|jpeg|png)$/i.test(currentTemple[`${key}_url`]) ? (
                            <>
                              <img
                                src={currentTemple[`${key}_url`]}
                                alt={label}
                                style={{
                                  width: "100%",
                                  height: "150px",
                                  objectFit: "contain",
                                  borderRadius: "10px",
                                  border: "1px solid #ccc",
                                }}
                              />
                              <div className="mt-2">
                                <a
                                  href={currentTemple[`${key}_url`]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-outline-primary btn-sm"
                                  style={{ fontSize: "12px", padding: "3px 8px" }}
                                >
                                  View Full Image
                                </a>
                              </div>
                            </>
                          ) : (
                            <a
                              href={currentTemple[`${key}_url`]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-outline-primary btn-sm"
                              style={{ fontSize: "12px", padding: "3px 8px" }}
                            >
                              📄 View Full PDF
                            </a>
                          )}
                        </div>
                      )}

                      {/*  New uploaded file preview */}
                      {currentTemple[key] instanceof File && (
                        <div className="mt-2">


                          {currentTemple[key].type.startsWith("image/") ? (
                            <>
                              <img
                                src={URL.createObjectURL(currentTemple[key])}
                                alt="Preview"
                                style={{
                                  width: "100%",
                                  height: "150px",
                                  objectFit: "contain",
                                  borderRadius: "10px",
                                  border: "1px solid #ccc",
                                }}
                              />
                              <div className="mt-2 d-flex align-items-center gap-3">
                                <a
                                  href={URL.createObjectURL(currentTemple[key])}
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
                                    setCurrentTemple({
                                      ...currentTemple,
                                      [key]: "",
                                      [`${key}_preview`]: "",
                                    })
                                  }
                                >
                                  ❌ Remove
                                </span>
                              </div>
                            </>
                          ) : currentTemple[key].type === "application/pdf" ? (
                            <div className="mt-2">
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                                alt="PDF icon"
                                style={{ width: "50px" }}
                              />
                              <span className="ms-2">{currentTemple[key].name}</span>
                              <div className="mt-2 d-flex align-items-center gap-3">
                                <a
                                  href={URL.createObjectURL(currentTemple[key])}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-outline-primary btn-sm"
                                >
                                  📄 View Full PDF
                                </a>
                                <span
                                  className="text-danger"
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    setCurrentTemple({
                                      ...currentTemple,
                                      [key]: "",
                                      [`${key}_preview`]: "",
                                    })
                                  }
                                >
                                  ❌ Remove
                                </span>
                              </div>
                            </div>
                          ) : (
                            <span>{currentTemple[key].name}</span>
                          )}
                        </div>
                      )}
                    </Col>
                  </Row>
                ))}

              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button className="event-click-cancel" onClick={() => setShowModal(false)}>
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

export default ManageTemple;
