import React, { useEffect, useState } from "react";
import { Row, Button, Breadcrumb, Modal, Form, Col } from "react-bootstrap";
import "../../../assets/CSS/AdminLeftNav.css";
import AdminLeftnav from "../AdminLeftnav";
import { useAuth } from "../../GlobleAuth/AuthContext";
import axios from "axios";
import { BASE_URLL } from "../../../Component/BaseURL";
import SearchFeature from "../../temp_dashboard/temp_innerdashboard/SearchFeature";
import ModifyAlert from "../../Alert/ModifyAlert";
import * as XLSX from "xlsx"; 
import { saveAs } from "file-saver";

const AllDevoteeBooking = () => {
  const { uniqueId } = useAuth();
  const [devotees, setDevotees] = useState([]);
  const [filteredDevotees, setFilteredDevotees] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedDevotee, setSelectedDevotee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  // ===================== FETCH DEVOTEES =====================
  const fetchDevotees = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URLL}api/get-all-registered/?role=user`
      );

      const devoteeList = res.data?.results || [];

      if (Array.isArray(devoteeList)) {
        const formatted = devoteeList.map((d) => ({
          ...d,
          devotee_photo_url: d.devotee_photo
            ? `https://mahadevaaya.com/backend${d.devotee_photo}`
            : null,
        }));
        setDevotees(formatted);
        setFilteredDevotees(formatted);
      }
    } catch (err) {
      console.error("Error fetching devotees:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevotees();
  }, []);

  // ===================== SEARCH =====================
  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredDevotees(devotees);
      return;
    }
    const lower = query.toLowerCase();
    const filtered = devotees.filter(
      (d) =>
        d.devotee_name?.toLowerCase().includes(lower) ||
        d.email?.toLowerCase().includes(lower) ||
        d.phone?.toLowerCase().includes(lower) ||
        d.user_id?.toLowerCase().includes(lower) ||
        d.gender?.toLowerCase().includes(lower)
    );
    setFilteredDevotees(filtered);
  };

  // ===================== HANDLE VIEW =====================
  const handleView = (devotee) => {
    setSelectedDevotee(devotee);
    setShowModal(true);
  };

  const getFileUrl = (path) => {
    if (!path) return null;
    return `https://mahadevaaya.com/backend${
      path.startsWith("/") ? path : "/" + path
    }`;
  };

    const handlePrint = () => {
    const table = document.getElementById("devotee-table");
    if (!table) {
      alert("Table not found!");
      return;
    }

    const printContent = table.outerHTML;
    const newWin = window.open("", "_blank");

    newWin.document.write(`
      <html>
        <head>
          <title>Devotee List</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; font-size: 13px; }
            th { background-color: #f4f4f4; font-weight: bold; }
            tr:nth-child(even) { background-color: #fafafa; }
            /* Hide Action column */
            th:nth-child(8), td:nth-child(8) { display: none; }
          </style>
        </head>
        <body>
          <h2>Registered Devotees List</h2>
          ${printContent}
        </body>
      </html>
    `);
    newWin.document.close();
    newWin.focus();
    newWin.print();
  };

   const handleDownload = () => {
    if (!filteredDevotees.length) return alert("No data to export!");

    const exportData = filteredDevotees.map((d, i) => ({
      "S.No": i + 1,
      "User ID": d.user_id,
      "Devotee Name": d.devotee_name,
      Gender: d.gender,
      Email: d.email,
      Phone: d.phone,
      Status: d.user_status,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);

    // Auto column widths
    const maxWidth = Object.keys(exportData[0]).map(
      (key) =>
        Math.max(
          key.length,
          ...exportData.map((row) => String(row[key] || "").length)
        ) + 5
    );
    ws["!cols"] = maxWidth.map((w) => ({ wch: w }));

    const range = XLSX.utils.decode_range(ws["!ref"]);

    // Header styling
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: C });
      if (ws[cellRef]) {
        ws[cellRef].s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          alignment: { horizontal: "center", vertical: "center" },
          fill: { fgColor: { rgb: "4472C4" } },
          border: {
            top: { style: "thin", color: { rgb: "AAAAAA" } },
            bottom: { style: "thin", color: { rgb: "AAAAAA" } },
            left: { style: "thin", color: { rgb: "AAAAAA" } },
            right: { style: "thin", color: { rgb: "AAAAAA" } },
          },
        };
      }
    }

    // Row styling (zebra)
    for (let R = 1; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
        if (ws[cellRef]) {
          ws[cellRef].s = {
            alignment: { vertical: "center" },
            border: {
              top: { style: "thin", color: { rgb: "DDDDDD" } },
              bottom: { style: "thin", color: { rgb: "DDDDDD" } },
              left: { style: "thin", color: { rgb: "DDDDDD" } },
              right: { style: "thin", color: { rgb: "DDDDDD" } },
            },
            fill:
              R % 2 === 0
                ? { fgColor: { rgb: "F9F9F9" } }
                : undefined,
          };
        }
      }
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DevoteeBookings");
    XLSX.writeFile(wb, "All_Devotee_Bookings_Styled.xlsx");
  };




  return (
    <div className="dashboard-wrapper">
      <aside className="admin-sidebar">
        <AdminLeftnav />
      </aside>

      <main className="main-container">
        <div className="content-box">
          {/* ============== HEADER + SEARCH ============== */}
          <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
            <h1 className="fw500">
              <Breadcrumb>
                <Breadcrumb.Item href="/AdminDashBoard">
                  <span className="fw700h1">DashBoard</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Devotee Booking</Breadcrumb.Item>
              </Breadcrumb>
            </h1>

            <div>
              <SearchFeature onSearch={handleSearch} />

               <div className="mt-2 vmb-2 text-end">
                <Button variant="" size="sm" className="mx-2 print-btn" onClick={handlePrint}>
                  Print
                </Button>

                <Button variant="" size="sm" className="download-btn" onClick={handleDownload}>
                  Download
                </Button>
              </div>
            </div>
          </div>

          {/*  Alert */}
          {alert.show && (
            <ModifyAlert
              variant={alert.variant}
              message={alert.message}
              onClose={() => setAlert({ show: false })}
            />
          )}

          {/* ============== TABLE ============== */}
          <Row className="mt-3">
            <div className="col-md-12">
              <table className="admin-rwd-table" id="devotee-table">
                <tbody>
                  <tr>
                    <th>S.No</th>
                    <th>User ID</th>
                    <th>Devotee Name</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>

                  {filteredDevotees.length > 0 ? (
                    filteredDevotees.map((devotee, index) => (
                      <tr key={devotee.id}>
                        <td data-th="S.No">{index + 1}</td>
                        <td data-th="User ID">{devotee.user_id}</td>
                        <td data-th="Devotee Name">{devotee.devotee_name}</td>
                        <td data-th="Gender">{devotee.gender}</td>
                        <td data-th="Email">{devotee.email}</td>
                        <td data-th="Phone">{devotee.phone}</td>
                        <td data-th="Status">{devotee.user_status}</td>
                        <td>
                          <Button
                            className="event-click-btn"
                            size="sm"
                            onClick={() => handleView(devotee)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        {loading ? "Loading..." : "No Devotees Found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Row>

          {/* ============== MODAL ============== */}
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            size="lg"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Devotee Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {selectedDevotee ? (
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label  className="temp-label">User ID</Form.Label>
                        <Form.Control
                        className="temp-form-control-option"
                          value={selectedDevotee.user_id || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Devotee Name</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedDevotee.devotee_name || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Gender</Form.Label>
                        <Form.Control
                             className="temp-form-control-option"
                          value={selectedDevotee.gender || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Email</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedDevotee.email || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Phone</Form.Label>
                        <Form.Control
                        className="temp-form-control-option"
                          value={selectedDevotee.phone || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Status</Form.Label>
                        <Form.Control
                        className="temp-form-control-option"
                          value={selectedDevotee.user_status || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Devotee Photo */}
                  <Row className="mt-4">
                    <Col md={6}>
                      <h6 style={{ fontSize: "14px", fontWeight: "600" }}>
                        Devotee Photo
                      </h6>
                      {selectedDevotee.devotee_photo ? (
                        <div className="my-2">
                          <img
                            src={getFileUrl(selectedDevotee.devotee_photo)}
                            alt="Devotee"
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
                              href={getFileUrl(selectedDevotee.devotee_photo)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="event-click-btn"
                              style={{
                                fontSize: "12px",
                                padding: "3px 8px",
                                textDecoration: "none",
                              }}
                            >
                              View Full Image
                            </a>
                          </div>
                        </div>
                      ) : (
                        <p className="text-muted">No photo uploaded.</p>
                      )}
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col>
                      <p>
                        <strong>Created At:</strong>{" "}
                        {new Date(
                          selectedDevotee.created_at
                        ).toLocaleString()}
                      </p>
                    </Col>
                  </Row>
                </Form>
              ) : (
                <div className="text-center text-muted py-3">
                  No devotee selected.
                </div>
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button
                className="event-click-cancel"
                onClick={() => setShowModal(false)}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default AllDevoteeBooking;
