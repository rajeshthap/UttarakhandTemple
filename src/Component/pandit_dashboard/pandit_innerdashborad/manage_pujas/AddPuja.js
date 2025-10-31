import React, { useEffect, useState } from "react";
import "../../../../assets/CSS/PanditLeftNav.css";
import { Breadcrumb, Button, Modal, Form, Row, Col } from "react-bootstrap";
import SearchFeature from "../../../temp_dashboard/temp_innerdashboard/SearchFeature";
import PanditLeftNav from "../../PanditLeftNav";
import axios from "axios";

const AddPuja = () => {
  const panditId = "PAN/2025/56779"; // 🔹 Your current logged-in pandit_id
  const BASE_API = "https://mahadevaaya.com/backend/api/get-pandit-pooja/";

  const [panditName, setPanditName] = useState("");
  const [poojas, setPoojas] = useState([]);
  const [filteredPoojas, setFilteredPoojas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [currentPooja, setCurrentPooja] = useState({
    pooja_name: "",
    pooja_price: "",
  });

  //  Fetch Pooja details
  const fetchPoojas = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_API}?pandit_id=${panditId}`);
      const data = response.data;
      setPanditName(data.pandit_name);
      setPoojas(data.pandit_pooja_details);
      setFilteredPoojas(data.pandit_pooja_details);
    } catch (error) {
      console.error("Error fetching pooja details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoojas();
  }, []);

  //  Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPooja({ ...currentPooja, [name]: value });
  };

  //  Open modal for Add
  const handleAdd = () => {
    setIsEditMode(false);
    setCurrentPooja({ pooja_name: "", pooja_price: "" });
    setShowModal(true);
  };

  //  Open modal for Edit
  const handleEdit = (pooja) => {
    setIsEditMode(true);
    setCurrentPooja(pooja);
    setShowModal(true);
  };

  //  Add new pooja (POST)
  const handleAddPooja = async () => {
    try {
      const payload = {
        pandit_id: panditId,
        pandit_pooja_details: [
          {
            pooja_name: currentPooja.pooja_name,
            pooja_price: parseFloat(currentPooja.pooja_price),
          },
        ],
      };

      await axios.post(BASE_API, payload);
      alert("Pooja added successfully!");
      setShowModal(false);
      fetchPoojas();
    } catch (error) {
      console.error("Error adding pooja:", error);
      alert("Failed to add pooja!");
    }
  };

  //  Update pooja (PUT)
  const handleUpdate = async () => {
    try {
      const payload = {
        pandit_id: panditId,
        pandit_pooja_details: [
          {
            pooja_name: currentPooja.pooja_name,
            pooja_price: parseFloat(currentPooja.pooja_price),
          },
        ],
      };

      await axios.put(BASE_API, payload);
      alert("Pooja updated successfully!");
      setShowModal(false);
      fetchPoojas();
    } catch (error) {
      console.error("Error updating pooja:", error);
      alert("Failed to update pooja!");
    }
  };

  //  Delete pooja (DELETE)
  const handleDelete = async (pooja) => {
    if (!window.confirm(`Are you sure you want to delete ${pooja.pooja_name}?`)) return;

    try {
      await axios.delete(`${BASE_API}?action=remove_pooja&pooja_id=${pooja.pandit_pooja_id}`, {
        data: { pandit_id: panditId },
      });
      alert("Pooja deleted successfully!");
      fetchPoojas();
    } catch (error) {
      console.error("Error deleting pooja:", error);
      alert("Failed to delete pooja!");
    }
  };

  //  Submit Handler
  const handleSubmit = () => {
    if (isEditMode) {
      handleUpdate();
    } else {
      handleAddPooja();
    }
  };

  return (
    <>
      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <aside className="pandit-sidebar">
          <PanditLeftNav />
        </aside>

        {/* Main Content */}
        <main className="main-container-box">
          <div className="content-box">
            <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
              <h1 className="fw500">
                <Breadcrumb>
                  <Breadcrumb.Item href="/Pandit_DashBoard">
                    <span className="fw700h1">Dashboard</span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>Manage Puja</Breadcrumb.Item>
                  <Breadcrumb.Item active>Add Pujas</Breadcrumb.Item>
                </Breadcrumb>
              </h1>
              <div>
                <SearchFeature />
              </div>
            </div>

            {/* Table Section */}
            <Row className="mt-3">
              <div className="col-md-12">
                <div className="d-flex justify-content-end mb-2">
                  <Button className="event-click-btn" onClick={handleAdd}>
                    Add New Pooja
                  </Button>
                </div>

                <table className="rwd-table">
                  <tbody>
                    <tr>
                      <th>S.No</th>
                      <th>Pandit Name</th>
                      <th>Pooja Name</th>
                      <th>Pooja Price (₹)</th>
                      <th>Action</th>
                    </tr>

                    {filteredPoojas.length > 0 ? (
                      filteredPoojas.map((pooja, index) => (
                        <tr key={pooja.pandit_pooja_id}>
                          <td data-th="S.No">{index + 1}</td>
                          <td data-th="Pandit Name">{panditName}</td>
                          <td data-th="Pooja Name">{pooja.pooja_name}</td>
                          <td data-th="Pooja Price">{pooja.pooja_price}</td>
                          <td>
                            <Button
                              className="event-click-cancel"
                              size="sm"
                              onClick={() => handleEdit(pooja)}
                            >
                              Edit
                            </Button>{" "}
                            <Button
                              className="event-click-btn-danger"
                              size="sm"
                              onClick={() => handleDelete(pooja)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          {loading ? "Loading..." : "No poojas found."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Row>
          </div>
        </main>
      </div>

      {/* ================= ADD/EDIT MODAL ================= */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Edit Pooja" : "Add New Pooja"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="temp-label">Pandit Name</Form.Label>
                  <Form.Control
                    className="temp-form-control-option"
                    name="pandit_name"
                    value={panditName || ""}
                    disabled
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="temp-label">Pooja Name</Form.Label>
                  <Form.Control
                    className="temp-form-control-option"
                    name="pooja_name"
                    value={currentPooja.pooja_name || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-2">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="temp-label">Pooja Price (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    className="temp-form-control-option"
                    name="pooja_price"
                    value={currentPooja.pooja_price || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="event-click-cancel"
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
          <Button className="event-click-btn" onClick={handleSubmit}>
            {isEditMode ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddPuja;
