import React, { useEffect, useState } from "react";
import "../../../assets/CSS/LeftNav.css";
import TempleLeftNav from "../TempleLeftNav";
import SearchFeature from "./SearchFeature";
import { Table, Button, Modal, Form, Row, Col, Image } from "react-bootstrap";
import axios from "axios";

const ManageTemple = () => {
  const [temples, setTemples] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTemple, setCurrentTemple] = useState({});
  const uniqueId = sessionStorage.getItem("uniqueId"); // Logged-in temple/user id
  const [loading, setLoading] = useState(false);

  // Fetch temple info by uniqueId
  const fetchTemples = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://mahadevaaya.com/backend/api/get-temple/`,
        { params: { temple_id: uniqueId } }
      );

      console.log(" GET Status:", response.status);
      console.log(" GET Data:", response.data);

      if (response.data) {
        const data = Array.isArray(response.data) ? response.data : [response.data];

        // Add file URLs to state for preview
        const templeWithUrls = data.map((temple) => ({
          ...temple,
          land_doc_url: temple.land_doc || "",
          noc_doc_url: temple.noc_doc || "",
          temple_image_url: temple.temple_image || "",
          trust_cert_url: temple.trust_cert || "",
        }));

        setTemples(templeWithUrls);
      }
    } catch (error) {
      console.error(" Error fetching temples:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (uniqueId) fetchTemples();
  }, [uniqueId]);

  // Open modal
  const handleEdit = (temple) => {
    if (temple.temple_id !== uniqueId) {
      alert("You can only edit your own temple!");
      return;
    }
    setCurrentTemple({ ...temple });
    setShowModal(true);
  };

  // Handle input/file change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
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

  // Update temple API
  const handleUpdate = async () => {
    const formData = new FormData();

    ["temple_name", "temple_address", "city", "state", "country"].forEach((key) => {
      if (currentTemple[key]) formData.append(key, currentTemple[key]);
    });

    [
      "land_doc",
      "noc_doc",
      "temple_image",
      "trust_cert",
    ].forEach((key) => {
      if (currentTemple[key] instanceof File) formData.append(key, currentTemple[key]);
    });

    try {
      const response = await axios.put(
        `https://mahadevaaya.com/backend/api/get-temple/`,
        formData,
        {
          params: { temple_id: uniqueId },
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(" Update Status:", response.status);
      console.log(" Update Response:", response.data);

      if (response.status === 200) {
        alert("Temple updated successfully!");
        setShowModal(false);
        fetchTemples();
      }
    } catch (error) {
      console.error(" API Error Status:", error.response?.status);
      console.error(" API Error Data:", error.response?.data);
      alert("Update failed!");
    }
  };

  // Delete temple
  const handleDelete = async (templeId) => {
    if (templeId !== uniqueId) {
      alert("You can only delete your own temple!");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this temple?")) return;

    try {
      const response = await axios.delete(
        `https://mahadevaaya.com/backend/api/delete-temple/`,
        { params: { temple_id: uniqueId } }
      );

      console.log(" Delete Status:", response.status);
      console.log(" Delete Response:", response.data);

      alert("Temple deleted successfully!");
      setTemples([]);
    } catch (error) {
      console.error(" Delete Error:", error.response?.data);
      alert("Unable to delete temple!");
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
          <h4>Manage Temple</h4>

          <Table striped bordered hover responsive className="mt-3">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Temple Name</th>
                <th>Temple Address</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {temples.length > 0 ? (
                temples.map((temple, index) => (
                  <tr key={temple.temple_id}>
                    <td>{index + 1}</td>
                    <td>{temple.temple_name}</td>
                    <td>{temple.temple_address}</td>
                    <td>{temple.city}</td>
                    <td>{temple.state}</td>
                    <td>{temple.country}</td>
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(temple)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(temple.temple_id)}
                      >
                        Delete
                      </Button>
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
          </Table>

          {/* Edit Modal */}
          <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Edit Temple</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>Temple Name</Form.Label>
                      <Form.Control
                        name="temple_name"
                        value={currentTemple.temple_name || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        name="city"
                        value={currentTemple.city || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        name="state"
                        value={currentTemple.state || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        name="country"
                        value={currentTemple.country || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-2">
                  <Form.Label>Temple Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="temple_address"
                    value={currentTemple.temple_address || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* File Uploads with previews */}
                {[
                  { label: "Land Document", key: "land_doc", type: "doc" },
                  { label: "NOC Document", key: "noc_doc", type: "doc" },
                  { label: "Temple Image", key: "temple_image", type: "image" },
                  { label: "Trust Certificate", key: "trust_cert", type: "doc" },
                ].map(({ label, key, type }) => (
                  <Form.Group className="mb-3" key={key}>
                    <Form.Label>{label}</Form.Label>

                    {type === "image" && (currentTemple[`${key}_preview`] || currentTemple[`${key}_url`]) && (
                      <div className="mb-2">
                        <Image
                          src={currentTemple[`${key}_preview`] || currentTemple[`${key}_url`]}
                          thumbnail
                          style={{ maxHeight: "150px" }}
                        />
                      </div>
                    )}

                    {type === "doc" && currentTemple[`${key}_url`] && (
                      <div className="mb-2">
                        <a href={currentTemple[`${key}_url`]} target="_blank" rel="noopener noreferrer">
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
