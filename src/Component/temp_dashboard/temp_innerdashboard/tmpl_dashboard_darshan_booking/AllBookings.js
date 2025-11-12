import React, { useEffect, useState } from "react";
import "../../../../assets/CSS/LeftNav.css";
import TempleLeftNav from "../../TempleLeftNav";
import SearchFeature from "../SearchFeature";
import { Form, Button, Modal, Row, Col, Breadcrumb } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../../GlobleAuth/AuthContext";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaPrint } from "react-icons/fa6";
import { FaFileExcel } from "react-icons/fa";

const AllBooking = () => {
  const { uniqueId } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://mahadevaaya.com/backend/api/get-darshan-pooja-booking/",
        {
          params: { creator_id: uniqueId },
        }
      );

      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
          ? res.data.data
          : [];

      setBookings(data);
      setFilteredBookings(data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setBookings([]);
      setFilteredBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (uniqueId) fetchBookings();
  }, [uniqueId]);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredBookings(bookings);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = bookings.filter(
      (b) =>
        b.full_name?.toLowerCase().includes(lowerQuery) ||
        b.email?.toLowerCase().includes(lowerQuery) ||
        b.temple_name?.toLowerCase().includes(lowerQuery) ||
        b.darshan_pooja_id?.toLowerCase().includes(lowerQuery)
    );
    setFilteredBookings(filtered);
  };

  const handleView = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setSelectedBooking((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBookingUpdate = async () => {
    if (!selectedBooking) return;

    try {
      const { darshan_pooja_id, status, temple_id } = selectedBooking;

      if (!temple_id || !darshan_pooja_id) {
        alert("Missing temple_id or darshan_pooja_id — cannot update.");
        console.error("Missing IDs:", { temple_id, darshan_pooja_id });
        return;
      }

      const payload = {
        temple_id,
        darshan_pooja_id,
        status: status?.toLowerCase() || "",
      };

      await axios.put(
        "https://mahadevaaya.com/backend/api/get-darshan-pooja-booking/",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Booking status updated successfully!");
      setShowModal(false);
      fetchBookings();
    } catch (error) {
      console.error(error);
      alert("Failed to update booking. Try again!");
    }
  };

  const handlePrint = () => {
    const actionColIndex = 7; // Action column index
    const table = document.querySelector(".temp-rwd-table").cloneNode(true);

    table.querySelectorAll("tr").forEach((row) => {
      const cells = row.querySelectorAll("th, td");
      if (cells[actionColIndex]) cells[actionColIndex].remove();
    });

    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
      <head>
        <title>All Booking List</title>
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
        <h2>All Booking List</h2>
        ${table.outerHTML}
      </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };

  //  EXCEL DOWNLOAD (Styled)
  const handleDownload = () => {
    if (filteredBookings.length === 0) {
      window.alert("No booking records to download!");
      return;
    }

    const data = filteredBookings.map((booking, index) => ({
      "S.No": index + 1,
      "Darshan & Pooja ID": booking.darshan_pooja_id,
      "Temple Name": booking.temple_name,
      "Devotee Name": booking.full_name,
      "Devotee Email": booking.email,
      "Devotee Mobile": booking.mobile_number,
      Status: booking.status,
    }));

    const ws = XLSX.utils.json_to_sheet(data);

    // Style header
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
      { wch: 25 },
      { wch: 25 },
      { wch: 30 },
      { wch: 20 },
      { wch: 15 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "All Bookings");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "All_Booking_List.xlsx"
    );
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className="temp-sidebar">
        <TempleLeftNav />
      </aside>

      {/* Main Section */}
      <main className="main-container-box">
        <div className="content-box">
          <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
            <h1 className="fw500">
              <Breadcrumb>
                <Breadcrumb.Item href="/TempleDashBoard">
                  <span className="fw700h1">DashBoard</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>All Booking</Breadcrumb.Item>
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

          {/* Table */}
          <Row className="mt-3">
            <div className="col-md-12">
              <table className="temp-rwd-table">
                <tbody>
                  <tr>
                    <th>S.No</th>
                    <th>Darshan & Pooja ID</th>
                    <th>Temple Name</th>
                    <th>Devotee Name</th>
                    <th>Devotee Email</th>
                    <th>Devotee Mobile</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>

                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking, index) => (
                      <tr key={index}>
                        <td data-th="S.No">{index + 1}</td>
                        <td data-th="Darshan & Pooja ID">
                          {booking.darshan_pooja_id || "N/A"}
                        </td>
                        <td data-th="Temple Name">{booking.temple_name}</td>
                        <td data-th="Devotee Name">{booking.full_name}</td>
                        <td data-th="Devotee Email">
                          {booking.email || "N/A"}
                        </td>
                        <td data-th="Devotee Mobile">
                          {booking.mobile_number}
                        </td>
                        <td data-th="Status">{booking.status || "N/A"}</td>
                        <td>
                          <Button
                            className="event-click-btn"
                            size="sm"
                            onClick={() => handleView(booking)}
                          >
                            Accept/Reject
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        {loading ? "Loading..." : "No bookings found."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Row>

          {/* Edit Modal */}
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            size="lg"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Booking</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {selectedBooking && (
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">
                          Darshan & Pooja ID
                        </Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedBooking.darshan_pooja_id || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">
                          Temple Name
                        </Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedBooking.temple_name || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">
                          Devotee Name
                        </Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedBooking.full_name || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">
                          Devotee Mobile
                        </Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedBooking.mobile_number || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Email</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedBooking.email || ""}
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
                          value={selectedBooking.status || ""}
                          onChange={handleBookingChange}
                        >
                          <option value="">Select Status</option>
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
              <Button
                className="event-click-btn"
                onClick={handleBookingUpdate}
                disabled={!selectedBooking}
              >
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
  );
};

export default AllBooking;
