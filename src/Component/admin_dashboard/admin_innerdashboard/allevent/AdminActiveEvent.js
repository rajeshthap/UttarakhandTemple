import React, { useEffect, useState } from "react";
import { Row, Button, Modal, Form, Col } from "react-bootstrap";
import axios from "axios";
import { BASE_URLL } from "../../../../Component/BaseURL";
import SearchFeature from "../../../temp_dashboard/temp_innerdashboard/SearchFeature";
import ModifyAlert from "../../../Alert/ModifyAlert";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaPrint } from "react-icons/fa6";
import { FaFileExcel } from "react-icons/fa";

const AdminActiveEvent = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  // ===================== FETCH ACTIVE EVENTS =====================
  const fetchActiveEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URLL}api/get-all-festival/?status=active`);
       const eventList = res.data?.data || [];

      if (Array.isArray(eventList)) {
        const formatted = eventList.map((e) => ({
          ...e,
          image_url: e.image ? `https://mahadevaaya.com/backend${e.image}` : null,
        }));
        setEvents(formatted);
        setFilteredEvents(formatted);
      }
    } catch (err) {
      console.error("Error fetching active events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveEvents();
  }, []);

  // ===================== SEARCH =====================
  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredEvents(events);
      return;
    }
    const lower = query.toLowerCase();
    const filtered = events.filter(
      (e) =>
        e.festival_name?.toLowerCase().includes(lower) ||
        e.temple_name?.toLowerCase().includes(lower) ||
        e.festival_id?.toLowerCase().includes(lower) ||
        e.created_by_name?.toLowerCase().includes(lower) ||
        e.festival_status?.toLowerCase().includes(lower)
    );
    setFilteredEvents(filtered);
  };

  // ===================== FILE URL HELPER =====================
  const getFileUrl = (path) => {
    if (!path) return null;
    return `https://mahadevaaya.com/backend${
      path.startsWith("/") ? path : "/" + path
    }`;
  };

  // ===================== HANDLE VIEW =====================
  const handleView = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handlePrint = () => {
    const actionColIndex = 7; // "Action" column index
    const table = document.querySelector(".admin-rwd-table").cloneNode(true);

    // Remove "Action" column from header and rows
    table.querySelectorAll("tr").forEach((row) => {
      const cells = row.querySelectorAll("th, td");
      if (cells[actionColIndex]) cells[actionColIndex].remove();
    });

    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
      <head>
        <title>Active Events List</title>
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
        <h2>Active Events List</h2>
        ${table.outerHTML}
      </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };

    const handleDownload = () => {
    if (filteredEvents.length === 0) {
      window.alert("No active events to download!");
      return;
    }

    const data = filteredEvents.map((event, index) => ({
      "S.No": index + 1,
      "Festival ID": event.festival_id,
      "Festival Name": event.festival_name,
      "Temple Name": event.temple_name,
      "Start Date": new Date(event.start_date_time).toLocaleString(),
      "End Date": new Date(event.end_date_time).toLocaleString(),
      Status: event.festival_status,
    }));

    const ws = XLSX.utils.json_to_sheet(data);

    // Style header (bold + blue)
    const range = XLSX.utils.decode_range(ws["!ref"]);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: C });
      if (!ws[cellRef]) continue;
      ws[cellRef].s = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "2B5797" } },
        alignment: { horizontal: "center", vertical: "center" },
      };
    }

    // Set column widths
    ws["!cols"] = [
      { wch: 6 },
      { wch: 15 },
      { wch: 25 },
      { wch: 25 },
      { wch: 22 },
      { wch: 22 },
      { wch: 15 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Active Events");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Active_Events_List.xlsx");
  };


  return (
    <div className="dashboard-wrapper">
      <main className="admin-container">
        <div className="content-box">
          {/* ============== HEADER + SEARCH ============== */}
          <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
            <div>
              <SearchFeature onSearch={handleSearch} />
            </div>
             <div className="mt-2 vmb-2 text-end">
                                      <Button variant="" size="sm" className="mx-2 print-btn" onClick={handlePrint}>
                                       <FaPrint /> Print
                                      </Button>
                        
                                      <Button variant="" size="sm" className="download-btn" onClick={handleDownload}>
                                        <FaFileExcel />Download
                                      </Button>
                                    </div>
          </div>

          {/* Alert */}
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
              <table className="admin-rwd-table">
                <tbody>
                  <tr>
                    <th>S.No</th>
                    <th>Festival ID</th>
                    <th>Festival Name</th>
                    <th>Temple Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>

                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((event, index) => (
                      <tr key={event.id}>
                        <td data-th="S.No">{index + 1}</td>
                        <td data-th="Festival ID">{event.festival_id}</td>
                        <td data-th="Festival Name">{event.festival_name}</td>
                        <td data-th="Temple Name">{event.temple_name}</td>
                        <td data-th="Start Date">
                          {new Date(event.start_date_time).toLocaleString()}
                        </td>
                        <td data-th="End Date">
                          {new Date(event.end_date_time).toLocaleString()}
                        </td>
                        <td data-th="Status">{event.festival_status}</td>
                        <td>
                          <Button
                            className="event-click-btn"
                            size="sm"
                            onClick={() => handleView(event)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        {loading ? "Loading..." : "No Active Events Found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Row>

          {/* ============== MODAL ============== */}
          <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title>Active Event Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {selectedEvent ? (
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Festival ID</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedEvent.festival_id || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Festival Name</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedEvent.festival_name || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Temple Name</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedEvent.temple_name || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Festival Status</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedEvent.festival_status || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Start Date & Time</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={
                            selectedEvent.start_date_time
                              ? new Date(selectedEvent.start_date_time).toLocaleString()
                              : ""
                          }
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">End Date & Time</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={
                            selectedEvent.end_date_time
                              ? new Date(selectedEvent.end_date_time).toLocaleString()
                              : ""
                          }
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Created By</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedEvent.created_by_name || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Updated By</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedEvent.updated_by_name || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col>
                      <Form.Group>
                        <Form.Label className="temp-label">Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          className="temp-form-control-option"
                          value={selectedEvent.description || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Event Image Section */}
                  <Row className="mt-4">
                    <Col md={6}>
                      <h6 style={{ fontSize: "14px", fontWeight: "600" }}>Festival Image</h6>
                      {selectedEvent.image ? (
                        <div className="my-2">
                          {/\.(jpg|jpeg|png)$/i.test(selectedEvent.image) ? (
                            <>
                              <img
                                src={getFileUrl(selectedEvent.image)}
                                alt="Festival"
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
                                  href={getFileUrl(selectedEvent.image)}
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
                            </>
                          ) : (
                            <a
                              href={getFileUrl(selectedEvent.image)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="event-click-btn"
                              style={{
                                fontSize: "12px",
                                padding: "3px 8px",
                                textDecoration: "none",
                              }}
                            >
                              📄 View Full File
                            </a>
                          )}
                        </div>
                      ) : (
                        <p className="text-muted">No image uploaded.</p>
                      )}
                    </Col>
                  </Row>
                </Form>
              ) : (
                <div className="text-center text-muted py-3">No event selected.</div>
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button className="event-click-cancel" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default AdminActiveEvent;
