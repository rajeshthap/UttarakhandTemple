import React, { useEffect, useState } from "react";
import "../../../../assets/CSS/PanditLeftNav.css";
import { Breadcrumb, Button, Modal, Form, Row, Col } from "react-bootstrap";
import SearchFeature from "../../../temp_dashboard/temp_innerdashboard/SearchFeature";
import PanditLeftNav from "../../PanditLeftNav";
import axios from "axios";

const poojaOptions = [
  { pooja_name: "Annaprashan Sanskar Puja" },
  { pooja_name: "Satyanarayan Puja" },
  { pooja_name: "Bhoomi Puja" },
  { pooja_name: "Griha Pravesh Puja" },
  { pooja_name: "New Office Opening Puja" },
  { pooja_name: "Vivah (Marriage) Puja" },
  { pooja_name: "Vishwakarma Puja" },
  { pooja_name: "Yagnopavit Sanskar" },
  { pooja_name: "Rudrabhishek Puja" },
  { pooja_name: "Engagement Ceremony (Sagai)" },
  { pooja_name: "Naming Ceremony" },
  { pooja_name: "Ganesh Chaturthi Puja" },
  { pooja_name: "Vehicle / Vahan Puja" },
  { pooja_name: "Mundan Sanskar Puja" },
  { pooja_name: "Navratri Durga Puja" },
  { pooja_name: "Brihaspati Vrat Udyapan Puja" },
  { pooja_name: "Ekadashi Vrat Udyapan Puja" },
  { pooja_name: "Godh Bharai Puja (Baby Shower)" },
  { pooja_name: "Haldi Ceremony" },
  { pooja_name: "Janamdin / Birthday Puja" },
  { pooja_name: "Mahalakshmi Puja" },
  { pooja_name: "Vastu Shanti Puja" },
  { pooja_name: "Vishnu Sahastranam Path Puja" },
  { pooja_name: "Kaal Sarp Dosh Nivaran Puja" },
  { pooja_name: "Office / Business Puja" },
  { pooja_name: "Namakarana Puja" },
  { pooja_name: "Hartalika Teej Puja" },
  { pooja_name: "Karwa Chauth Puja" },
  { pooja_name: "Diwali Lakshmi Puja" },
  { pooja_name: "Dhanteras Puja" },
  { pooja_name: "Vara Mahalakshmi Puja" },
  { pooja_name: "Devi Poojan" },
  { pooja_name: "Kuber Puja" },
  { pooja_name: "Narak Chaturdashi Puja" },
  { pooja_name: "Kali Puja" },
  { pooja_name: "Ganesh Lakshmi Puja" },
  { pooja_name: "Govardhan Puja" },
  { pooja_name: "Annakut Puja" },
  { pooja_name: "Bhai Dooj Puja" },
  { pooja_name: "Chopda Puja" },
  { pooja_name: "Ayush Havan" },
  { pooja_name: "Chandi Path Havan" },
  { pooja_name: "Lakshmi Kubera Havan" },
  { pooja_name: "Navagraha Havan" },
  { pooja_name: "Shuddhikaran Puja and Havan" },
  { pooja_name: "Maha Ganapati Homa" },
  { pooja_name: "Dhanvantari Homa" },
  { pooja_name: "Bhagavathi Homa" },
  { pooja_name: "Navmi Havan" },
  { pooja_name: "Drishti Durga Homa" },
  { pooja_name: "Mahalaxmi Havan" },
  { pooja_name: "Maha Mrityunjaya Jaap Puja" },
  { pooja_name: "Gayatri Mantra Jaap Puja" },
  { pooja_name: "Santan Gopal Mantra Jaap" },
  { pooja_name: "Shani Dosh Nivaran Jaap" },
  { pooja_name: "Rahu Graha Shanti Mantra Jaap" },
  { pooja_name: "Sampoorna Sunderkand Paath" },
  { pooja_name: "Akhand Ramayana Path" },
  { pooja_name: "Hanuman Chalisa Paath" },
  { pooja_name: "Bajrang Baan Path" },
  { pooja_name: "Navchandi Paath" },
  { pooja_name: "Durga Saptashati Path" },
  { pooja_name: "Kanak Dhara Path" },
  { pooja_name: "Shri Sukt Paath" },
  { pooja_name: "Lalita Sahasranama Path" },
  { pooja_name: "Kanakadhara Stotram Path" },
  { pooja_name: "Pitru Dosh Nivaran Puja" },
  { pooja_name: "Shradh Puja & Karma for Ancestors Peace" },
  { pooja_name: "Barsi Puja" },
  { pooja_name: "Bharani Shradh Pitru Paksha" },
  { pooja_name: "Tripindi Shradha Puja" },
  { pooja_name: "Garud Puran Path" },
  { pooja_name: "Tarpan Shradh Puja" },
  { pooja_name: "Pind Daan Shradh Puja" },
];

const AddPuja = () => {
  const panditId = "PAN/2025/56779";
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

  // ================== FETCH DATA ==================
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

  // ================== HANDLE SEARCH ==================
  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredPoojas(poojas);
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = poojas.filter(
        (p) =>
          p.pooja_name?.toLowerCase().includes(lowerQuery) ||
          panditName?.toLowerCase().includes(lowerQuery) ||
          p.pooja_price?.toString().includes(lowerQuery)
      );
      setFilteredPoojas(filtered);
    }
  };

  // ================== HANDLE FORM ==================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPooja({ ...currentPooja, [name]: value });
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setCurrentPooja({ pooja_name: "", pooja_price: "" });
    setShowModal(true);
  };

  const handleEdit = (pooja) => {
    setIsEditMode(true);
    setCurrentPooja(pooja);
    setShowModal(true);
  };

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

  const handleUpdate = async () => {
    try {
      const payload = {
        pandit_id: panditId,
        pandit_pooja_details: [
          {
            pandit_pooja_id: currentPooja.pandit_pooja_id,
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

  const handleSubmit = () => {
    if (isEditMode) {
      handleUpdate();
    } else {
      handleAddPooja();
    }
  };

  // ================== RENDER ==================
  return (
    <>
      <div className="dashboard-wrapper">
        <aside className="pandit-sidebar">
          <PanditLeftNav />
        </aside>

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
                {/* ✅ Connected Search Feature */}
                <SearchFeature onSearch={handleSearch} />
              </div>
            </div>

            {/* TABLE SECTION */}
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
                          {loading ? "Loading..." : "No matching poojas found."}
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

      {/* ADD / EDIT MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
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
                  <Form.Select
                    className="temp-form-control-option"
                    name="pooja_name"
                    value={currentPooja.pooja_name || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select Pooja</option>
                    {poojaOptions.map((option, index) => (
                      <option key={index} value={option.pooja_name}>
                        {option.pooja_name}
                      </option>
                    ))}
                  </Form.Select>
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
          <Button className="event-click-cancel" onClick={() => setShowModal(false)}>
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
