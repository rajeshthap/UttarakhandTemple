import React, { useEffect, useState } from "react";
import "../../../../assets/CSS/PanditLeftNav.css";
import {
  Breadcrumb,
  Row,
  Spinner,
  Button,
  Modal,
  Form,
  Col,
} from "react-bootstrap";
import SearchFeature from "../../../temp_dashboard/temp_innerdashboard/SearchFeature";
import PanditLeftNav from "../../PanditLeftNav";
import axios from "axios";
import { useAuth } from "../../../GlobleAuth/AuthContext";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaPrint } from "react-icons/fa6";
import { FaFileExcel } from "react-icons/fa";

const PendingRequests = () => {
  const { uniqueId } = useAuth();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //  Fetch all requests
  const fetchRequests = async () => {
    if (!uniqueId) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `https://mahadevaaya.com/backend/api/get-hire-pandit/?pandit_id=${uniqueId}`
      );

      const data = Array.isArray(res.data) ? res.data : [];
      const pendingData = data.filter((item) =>
        item.number_of_pandits?.some(
          (p) =>
            p.pandit_id === uniqueId && p.status?.toLowerCase() === "pending"
        )
      );

      setRequests(pendingData);
      setFilteredRequests(pendingData);
    } catch (error) {
      console.error("Error fetching pending requests:", error);
      setRequests([]);
      setFilteredRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [uniqueId]);

  //  Search
  const handleSearch = (query) => {
    if (!query) {
      setFilteredRequests(requests);
      return;
    }
    const lower = query.toLowerCase();
    const filtered = requests.filter(
      (req) =>
        req.full_name?.toLowerCase().includes(lower) ||
        req.mobile_number?.toLowerCase().includes(lower) ||
        req.pooja_type?.toLowerCase().includes(lower) ||
        req.location?.toLowerCase().includes(lower)
    );
    setFilteredRequests(filtered);
  };

  //  Open Modal
  const handleView = (request) => {
    const pandit = request.number_of_pandits.find(
      (p) => p.pandit_id === uniqueId
    );
    setSelectedRequest({ ...request, status: pandit?.status || "pending" });
    setShowModal(true);
  };

  //  Handle status
  const handleStatusChange = (e) => {
    const { name, value } = e.target;
    setSelectedRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //  Update status
  const handleUpdateStatus = async () => {
    if (!selectedRequest || !uniqueId) return;
    try {
      const payload = {
        hire_pandit_id: selectedRequest.hire_pandit_id,
        pandit_id: uniqueId,
        status: selectedRequest.status,
      };

      await axios.put(
        "https://mahadevaaya.com/backend/api/get-hire-pandit/",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Booking status updated successfully!");
      setShowModal(false);
      fetchRequests();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Try again!");
    }
  };

  const handlePrint = () => {
    const actionColIndex = 7; // "Action" column index (0-based)
    const table = document.querySelector(".pandit-rwd-table").cloneNode(true);

    // remove Action column from header & rows
    table.querySelectorAll("tr").forEach((row) => {
      const cells = row.querySelectorAll("th, td");
      if (cells[actionColIndex]) cells[actionColIndex].remove();
    });

    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
      <head>
        <title>Pending Booking List</title>
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
        <h2>Pending Booking List</h2>
        ${table.outerHTML}
      </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };

  //  Styled Excel Download (no "Action" column)
  const handleDownload = () => {
    if (filteredRequests.length === 0) {
      window.alert("No pending booking records to download!");
      return;
    }

    const data = filteredRequests.map((req, index) => {
      const pandit = req.number_of_pandits.find(
        (p) => p.pandit_id === uniqueId
      );
      return {
        "S.No": index + 1,
        "Full Name": req.full_name,
        "Mobile Number": req.mobile_number,
        "Pooja Type": req.pooja_type,
        Location: req.location,
        "Date & Time": new Date(req.date_and_time).toLocaleString(),
        Status: pandit?.status || "pending",
      };
    });

    const ws = XLSX.utils.json_to_sheet(data);

    const range = XLSX.utils.decode_range(ws["!ref"]);
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
      { wch: 20 },
      { wch: 25 },
      { wch: 25 },
      { wch: 30 },
      { wch: 15 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pending Bookings");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "Pending_Booking_List.xlsx"
    );
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
                  <Breadcrumb.Item active>Booking Requests</Breadcrumb.Item>
                  <Breadcrumb.Item active>Pending Requests</Breadcrumb.Item>
                </Breadcrumb>
              </h1>
              <div>
                <SearchFeature onSearch={handleSearch} />
              </div>
            
            </div>

              <div className="mt-2 vmb-2 text-end">
                <Button variant="" size="sm" className="mx-2 print-btn" onClick={handlePrint}>
                  <FaPrint /> Print
                </Button>

                <Button variant="" size="sm" className="download-btn" onClick={handleDownload}>
                  <FaFileExcel />Download
                </Button>
              </div>

            {/*  Table Section */}
            <Row className="mt-3">
              <div className="col-md-12">
                <table className="pandit-rwd-table">
                  <tbody>
                    <tr>
                      <th>S.No</th>
                      <th>Full Name</th>
                      <th>Mobile</th>
                      <th>Pooja Type</th>
                      <th>Location</th>
                      <th>Date & Time</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>

                    {filteredRequests.length > 0 ? (
                      filteredRequests.map((req, index) => {
                        const pandit = req.number_of_pandits.find(
                          (p) => p.pandit_id === uniqueId
                        );
                        return (
                          <tr key={index}>
                            <td data-th="S.No">{index + 1}</td>
                            <td data-th="Full Name">{req.full_name}</td>
                            <td data-th="Mobile">{req.mobile_number}</td>
                            <td data-th="Pooja Type">{req.pooja_type}</td>
                            <td data-th="Location">{req.location}</td>
                            <td data-th="Date & Time">
                              {new Date(req.date_and_time).toLocaleString()}
                            </td>
                            <td data-th="Status">{pandit?.status || "pending"}</td>
                            <td data-th="Action">
                              <Button
                                className="event-click-btn"
                                size="sm"
                                onClick={() => handleView(req)}
                              >
                                Change Status
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
                          {loading ? (
                            <Spinner animation="border" />
                          ) : (
                            "No pending requests found."
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Row>

            {/* Modal Section */}
            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}
              size="lg"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Booking Details</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                {selectedRequest && (
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">
                            Full Name
                          </Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedRequest.full_name || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">
                            Mobile Number
                          </Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedRequest.mobile_number || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">
                            Pooja Type
                          </Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedRequest.pooja_type || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">
                            Language Preference
                          </Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedRequest.language_preference || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">
                            Date & Time
                          </Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={
                              selectedRequest.date_and_time
                                ? new Date(
                                  selectedRequest.date_and_time
                                ).toLocaleString()
                                : ""
                            }
                            disabled
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">Location</Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedRequest.location || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">
                            Special Requirements
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            className="temp-form-control-option"
                            value={selectedRequest.special_requirements || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">
                            Payment Mode
                          </Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedRequest.payment_mode || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">Grand Total</Form.Label>
                          <Form.Control
                            className="temp-form-control-option"
                            value={selectedRequest.grand_total || ""}
                            disabled
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="temp-label">Status</Form.Label>
                          <Form.Select
                            className="temp-form-control-option"
                            name="status"
                            value={selectedRequest.status || "pending"}
                            onChange={handleStatusChange}
                          >
                            <option value="pending">Pending</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Modal.Body>

              <Modal.Footer>
                <Button className="event-click-btn" onClick={handleUpdateStatus}>
                  Update
                </Button>
                <Button
                  className="event-click-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </main>
      </div>
    </>
  );
};

export default PendingRequests;
