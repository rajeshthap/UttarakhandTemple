import React, { useEffect, useState } from "react";
import { Row, Button, Modal, Form, Col } from "react-bootstrap";
import axios from "axios";
import { BASE_URLL } from "../../../../Component/BaseURL";
import SearchFeature from "../../../temp_dashboard/temp_innerdashboard/SearchFeature";
import ModifyAlert from "../../../Alert/ModifyAlert";
import * as XLSX from "xlsx";
import { FaPrint } from "react-icons/fa6";
import { FaFileExcel } from "react-icons/fa";

const AdminPastEvent = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  // ===================== FETCH PAST EVENTS =====================
  const fetchPastEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URLL}api/get-all-festival/?status=past`);
      const eventList = res.data?.data || [];

      if (Array.isArray(eventList)) {
        const formatted = eventList.map((e) => ({
          ...e,
          image_url: e.image
            ? `https://mahadevaaya.com/backend${e.image}`
            : null,
        }));
        setEvents(formatted);
        setFilteredEvents(formatted);
      }
    } catch (err) {
      console.error("Error fetching past events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPastEvents();
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

  //  Helper for file URL
  const getFileUrl = (path) => {
    if (!path) return null;
    return `https://mahadevaaya.com/backend${
      path.startsWith("/") ? path : "/" + path
    }`;
  };

  // Handle view click
  const handleView = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

   const handlePrint = () => {
    const table = document.querySelector(".admin-rwd-table").cloneNode(true);
    // Remove "Action" column before printing
    table.querySelectorAll("th:last-child, td:last-child").forEach((el) => el.remove());

    const newWin = window.open("");
    newWin.document.write(`
      <html>
        <head>
          <title>Past Events List</title>
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
          <h2>Past Events List</h2>
          ${table.outerHTML}
        </body>
      </html>
    `);
    newWin.print();
    newWin.close();
  };

   const handleDownload = () => {
    if (!filteredEvents.length) return alert("No data to export!");

    const exportData = filteredEvents.map((e, i) => ({
      "S.No": i + 1,
      "Festival ID": e.festival_id,
      "Festival Name": e.festival_name,
      "Temple Name": e.temple_name,
      "Start Date": new Date(e.start_date_time).toLocaleString(),
      "End Date": new Date(e.end_date_time).toLocaleString(),
      "Status": e.festival_status,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);

    // Auto column width
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
          fill: { fgColor: { rgb: "1F4E78" } }, // Blue header for events
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
            fill: R % 2 === 0 ? { fgColor: { rgb: "F9F9F9" } } : undefined,
          };
        }
      }
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "PastEvents");
    XLSX.writeFile(wb, "Past_Events_List_Styled.xlsx");
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
                        {loading ? "Loading..." : "No Past Events Found"}
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
              <Modal.Title>Past Event Details</Modal.Title>
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

export default AdminPastEvent;
