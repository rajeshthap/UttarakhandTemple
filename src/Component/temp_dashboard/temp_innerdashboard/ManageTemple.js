

import React, { useEffect, useState } from "react";
import "../../../assets/CSS/LeftNav.css";
import TempleLeftNav from "../TempleLeftNav";
import SearchFeature from "./SearchFeature";
import { Button, Modal, Form, Row, Col, Image } from "react-bootstrap";
import axios from "axios";

const ManageTemple = () => {
  const [temples, setTemples] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTemple, setCurrentTemple] = useState({});
  const [loading, setLoading] = useState(false);
  const uniqueId = sessionStorage.getItem("uniqueId");



  const BASE_MEDIA_URL = "https://mahadevaaya.com/backend/media/";

  const fetchTemples = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://mahadevaaya.com/backend/api/get-temple/",
        { params: { temple_id: uniqueId } }
      );

      if (res.data) {
        const data = Array.isArray(res.data) ? res.data : [res.data];
        const formatted = data.map((t) => ({
          ...t,
          temple_image_url: t.temple_image ? BASE_MEDIA_URL + t.temple_image : "",
          land_doc_url: t.land_doc ? BASE_MEDIA_URL + t.land_doc : "",
          noc_doc_url: t.noc_doc ? BASE_MEDIA_URL + t.noc_doc : "",
          trust_cert_url: t.trust_cert ? BASE_MEDIA_URL + t.trust_cert : "",
        }));
        setTemples(formatted);
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
                    <td  data-th="S. No">{index + 1}</td>
                    <td data-th="Temple Name">{temple.temple_name}</td>
                    <td data-th="Temple Address">{temple.temple_address}</td>
                    <td data-th="City">{temple.city}</td>
                    <td data-th="State">{temple.state}</td>
                    <td data-th="Country">{temple.country}</td>
                        <td>
                          <Button variant="info" size="sm" onClick={() => handleEdit(temple)}>Edit</Button>{" "}
                          <Button variant="danger" size="sm" onClick={() => handleDelete(temple.temple_id)}>Delete</Button>
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
                      <Form.Label>Temple Name</Form.Label>
                      <Form.Control
                        name="temple_name"
                        value={currentTemple.temple_name || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        name="city"
                        value={currentTemple.city || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        name="state"
                        value={currentTemple.state || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        name="country"
                        value={currentTemple.country || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control value={currentTemple.email || ""} disabled />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Phone</Form.Label>
                      <Form.Control value={currentTemple.phone || ""} disabled />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mt-2">
                  <Form.Label>Temple Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="temple_address"
                    value={currentTemple.temple_address || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* DOCUMENT + IMAGE UPLOADS */}
                {[
                  { label: "Temple Image", key: "temple_image", type: "image" },
                  { label: "Land Document", key: "land_doc", type: "doc" },
                  { label: "NOC Document", key: "noc_doc", type: "doc" },
                  { label: "Trust Certificate", key: "trust_cert", type: "doc" },
                ].map(({ label, key, type }) => (
                  <Form.Group className="mt-3" key={key}>
                    <Form.Label>{label}</Form.Label>

                    {/* IMAGE PREVIEW */}
                    {type === "image" &&
                      (currentTemple[`${key}_preview`] || currentTemple[`${key}_url`]) && (
                        <div className="mb-2">
                          <Image
                            src={
                              currentTemple[`${key}_preview`] ||
                              currentTemple[`${key}_url`]
                            }
                            style={{
                              width: "200px",
                              height: "150px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        </div>
                      )}

                    {/* DOCUMENT LINK */}
                    {type === "doc" && currentTemple[`${key}_url`] && (
                      <div className="mb-2">
                        <a
                          href={currentTemple[`${key}_url`]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Existing {label}
                        </a>
                      </div>
                    )}

                    <Form.Control type="file" name={key} onChange={handleChange} />
                  </Form.Group>
                ))}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdate}>
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
