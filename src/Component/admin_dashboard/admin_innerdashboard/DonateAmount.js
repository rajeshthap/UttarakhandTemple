import React, { useEffect, useState } from "react";
import { Row, Button, Breadcrumb, Modal, Form, Col } from "react-bootstrap";
import "../../../assets/CSS/AdminLeftNav.css";
import AdminLeftnav from "../AdminLeftnav";
import axios from "axios";
import { BASE_URLL } from "../../../Component/BaseURL";
import SearchFeature from "../../temp_dashboard/temp_innerdashboard/SearchFeature";
import ModifyAlert from "../../Alert/ModifyAlert";
import * as XLSX from "xlsx";
import { FaPrint } from "react-icons/fa6";
import { FaFileExcel } from "react-icons/fa";

const DonateAmount = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  // ===================== FETCH DONATIONS =====================
  const fetchDonations = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URLL}api/get-all-donations/`);
      const donationList = res.data?.donations || [];
      setDonations(donationList);
      setFilteredDonations(donationList);
    } catch (err) {
      console.error("Error fetching donations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  // ===================== SEARCH =====================
  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredDonations(donations);
      return;
    }
    const lower = query.toLowerCase();
    const filtered = donations.filter(
      (d) =>
        d.pilgrim_name?.toLowerCase().includes(lower) ||
        d.temple_name?.toLowerCase().includes(lower) ||
        d.email_id?.toLowerCase().includes(lower) ||
        d.mobile_number?.toLowerCase().includes(lower) ||
        d.donation_id?.toLowerCase().includes(lower)
    );
    setFilteredDonations(filtered);
  };

  //  Handle view click
  const handleView = (donation) => {
    setSelectedDonation(donation);
    setShowModal(true);
  };

  const handlePrint = () => {
    const table = document.querySelector(".admin-rwd-table").cloneNode(true);
    // Remove Action column (last one)
    table.querySelectorAll("th:last-child, td:last-child").forEach((el) => el.remove());

    const newWin = window.open("");
    newWin.document.write(`
      <html>
        <head>
          <title>Donation Report</title>
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
          <h2>Donation Report</h2>
          ${table.outerHTML}
        </body>
      </html>
    `);
    newWin.print();
    newWin.close();
  };

    const handleDownload = () => {
    if (!filteredDonations.length) return window.alert("No data to export!");

    const exportData = filteredDonations.map((d, i) => ({
      "S.No": i + 1,
      "Donation ID": d.donation_id,
      "Pilgrim Name": d.pilgrim_name,
      "Email": d.email_id,
      "Mobile": d.mobile_number,
      "Temple Name": d.temple_name,
      "Amount (₹)": d.amount,
      "Status": d.donation_status ? "Completed" : "Pending",
      "Donation Date": d.created_at
        ? new Date(d.created_at).toLocaleString()
        : "",
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
            fill: R % 2 === 0 ? { fgColor: { rgb: "F9F9F9" } } : undefined,
          };
        }
      }
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DonationReport");
    XLSX.writeFile(wb, "Donation_Report_Styled.xlsx");
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
                <Breadcrumb.Item active>Donation Details</Breadcrumb.Item>
              </Breadcrumb>
            </h1>

            <div>
              <SearchFeature onSearch={handleSearch} />

              
                            <div className="mt-2 vmb-2 text-end">
                                                                 <Button variant="" size="sm" className="mx-2 print-btn" onClick={handlePrint}>
                                                                  <FaPrint /> Print
                                                                 </Button>
                                                   
                                                                 <Button variant="" size="sm" className="download-btn" onClick={handleDownload}>
                                                                   <FaFileExcel />Download
                                                                 </Button>
                                                               </div>
            </div>
          </div>

          {/* ============== ALERT ============== */}
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
                    <th>Donation ID</th>
                    <th>Pilgrim Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Temple Name</th>
                    <th>Amount (₹)</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>

                  {filteredDonations.length > 0 ? (
                    filteredDonations.map((donation, index) => (
                      <tr key={donation.id}>
                        <td data-th="S. No">{index + 1}</td>
                        <td data-th="Donation ID">{donation.donation_id}</td>
                        <td data-th="Pilgrim Name">{donation.pilgrim_name}</td>
                        <td data-th="Email">{donation.email_id}</td>
                        <td data-th="Mobile">{donation.mobile_number}</td>
                        <td data-th="Temple Name">{donation.temple_name}</td>
                        <td data-th="Amount">{donation.amount}</td>
                        <td data-th="Status">
                          {donation.donation_status ? "Completed" : "Pending"}
                        </td>
                        <td>
                          <Button
                            className="event-click-btn"
                            size="sm"
                            onClick={() => handleView(donation)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
                        {loading ? "Loading..." : "No Donations Found"}
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
              <Modal.Title>Donation Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {selectedDonation ? (
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label  className="temp-label">Donation ID</Form.Label>
                        <Form.Control
                        className="temp-form-control-option"

                          value={selectedDonation.donation_id || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Pilgrim Name</Form.Label>
                        <Form.Control
                        className="temp-form-control-option"
                          value={selectedDonation.pilgrim_name || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Email ID</Form.Label>
                        <Form.Control
                        className="temp-form-control-option"
                          value={selectedDonation.email_id || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Mobile Number</Form.Label>
                        <Form.Control
                        className="temp-form-control-option"
                          value={selectedDonation.mobile_number || ""}
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
                          value={selectedDonation.temple_name || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Amount (₹)</Form.Label>
                        <Form.Control
                        className="temp-form-control-option"
                          value={selectedDonation.amount || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Status</Form.Label>
                        <Form.Control
                        className="temp-form-control-option"
                          value={
                            selectedDonation.donation_status
                              ? "Completed"
                              : "Pending"
                          }
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Donation Date</Form.Label>
                        <Form.Control
                        className="temp-form-control-option"
                          value={
                            selectedDonation.created_at
                              ? new Date(
                                  selectedDonation.created_at
                                ).toLocaleString()
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
                          value={selectedDonation.created_by_name || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Updated By</Form.Label>
                        <Form.Control
                        className="temp-form-control-option"
                          value={selectedDonation.updated_by_name || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              ) : (
                <div className="text-center text-muted py-3">
                  No donation selected.
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

export default DonateAmount;
