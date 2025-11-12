import React, { useEffect, useState } from "react";
import "../../../../assets/CSS/PanditLeftNav.css";
import { Breadcrumb, Button, Modal, Form, Row, Col } from "react-bootstrap";
import SearchFeature from "../../../temp_dashboard/temp_innerdashboard/SearchFeature";
import PanditLeftNav from "../../PanditLeftNav";
import axios from "axios";

import { MdOutlineDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaRegTimesCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAuth } from "../../../GlobleAuth/AuthContext";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaPrint } from "react-icons/fa6";
import { FaFileExcel } from "react-icons/fa";

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
  const { uniqueId } = useAuth();
  const panditId = uniqueId;
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


  const handlePrint = () => {
    const actionColIndex = 4; // "Action" column index (0-based)
    const table = document.querySelector(".pandit-rwd-table").cloneNode(true);

    table.querySelectorAll("tr").forEach((row) => {
      const cells = row.querySelectorAll("th, td");
      if (cells[actionColIndex]) cells[actionColIndex].remove();
    });

    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Pandit Pooja List</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; font-size: 13px; }
            th { background-color: #f4f4f4; font-weight: bold; }
            tr:nth-child(even) { background-color: #fafafa; }
          </style>
        </head>
        <body>
          <h2>Pandit Pooja List</h2>
          ${table.outerHTML}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };


  const handleDownload = () => {
    if (filteredPoojas.length === 0) {
      window.alert("No Pooja records to download!");
      return;
    }

    const data = filteredPoojas.map((pooja, index) => ({
      "S.No": index + 1,
      "Pandit Name": panditName,
      "Pooja Name": pooja.pooja_name,
      "Pooja Price (₹)": pooja.pooja_price,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const range = XLSX.utils.decode_range(ws["!ref"]);

    // Style header
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: C });
      if (!ws[cellRef]) continue;
      ws[cellRef].s = {
        font: { bold: true, color: { rgb: "FFFFFF" }, sz: 12 },
        fill: { fgColor: { rgb: "2B5797" } },
        alignment: { horizontal: "center", vertical: "center" },
        border: {
          top: { style: "thin", color: { rgb: "999999" } },
          bottom: { style: "thin", color: { rgb: "999999" } },
          left: { style: "thin", color: { rgb: "999999" } },
          right: { style: "thin", color: { rgb: "999999" } },
        },
      };
    }

    ws["!cols"] = [
      { wch: 6 },
      { wch: 25 },
      { wch: 30 },
      { wch: 20 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pooja List");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Pandit_Pooja_List.xlsx");
  };



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
                {/*  Connected Search Feature */}
                <SearchFeature onSearch={handleSearch} />
              </div>


            </div>




            <Row className="d-flex ">
              <Col className="">
                <Button className="event-click-btn" onClick={handleAdd}>
                  Add New Pooja
                </Button>
              </Col>
              <Col className="mt-2 vmb-2 text-end">
                <Button variant="" size="sm" className="mx-2 print-btn" onClick={handlePrint}>
                  <FaPrint /> Print
                </Button>

                <Button variant="" size="sm" className="download-btn" onClick={handleDownload}>
                  <FaFileExcel />Download
                </Button>
              </Col>


            </Row>
            {/* TABLE SECTION */}
            <Row className="mt-2">
              <div className="col-md-12">

                  <table className="pandit-rwd-table">
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
                              <FiEdit className="add-edit-icon" />
                              Edit
                            </Button>{" "}
                            <Button
                              className="event-click-btn-danger"
                              size="sm"
                              onClick={() => handleDelete(pooja)}
                            >
                              <RiDeleteBin6Line className="add-edit-icon" />
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
