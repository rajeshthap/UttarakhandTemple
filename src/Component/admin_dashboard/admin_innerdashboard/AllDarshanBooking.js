
import React, { useEffect, useState } from "react";
import "../../../assets/CSS/AdminLeftNav.css";
import { Form,Row, Breadcrumb, Button, Modal, Table, Spinner,Col } from "react-bootstrap";
import AdminLeftnav from "../AdminLeftnav";
import { useAuth } from "../../GlobleAuth/AuthContext";
import axios from "axios";
import SearchFeature from "../../temp_dashboard/temp_innerdashboard/SearchFeature";
import * as XLSX from "xlsx";  

const AllDarshanBooking = () => {
  const { uniqueId } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null); //  Added
  const [showModal, setShowModal] = useState(false); // 

  // ===================== FETCH DARSHAN BOOKINGS =====================
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://mahadevaaya.com/backend/api/get-all-darshan-and-pooja-bookings/`
      );
      const bookingList = res.data?.darshans || [];
      setBookings(bookingList);
      setFilteredBookings(bookingList);
    } catch (err) {
      console.error("Error fetching darshan bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ===================== SEARCH =====================
  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredBookings(bookings);
      return;
    }
    const lower = query.toLowerCase();
    const filtered = bookings.filter(
      (b) =>
        b.full_name?.toLowerCase().includes(lower) ||
        b.temple_name?.toLowerCase().includes(lower) ||
        b.email?.toLowerCase().includes(lower) ||
        b.mobile_number?.toLowerCase().includes(lower) ||
        b.darshan_pooja_id?.toLowerCase().includes(lower) ||
        b.status?.toLowerCase().includes(lower)
    );
    setFilteredBookings(filtered);
  };


  const handlePrint = () => {
  const table = document.getElementById("booking-table");
  if (!table) {
    alert("Table not found!");
    return;
  }

  const printContent = table.outerHTML;
  const newWin = window.open("", "_blank");

  newWin.document.write(`
    <html>
      <head>
        <title>Darshan Bookings</title>
         <style>
         body { font-family: Arial, sans-serif; margin: 20px; }
          h2 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; font-size: 13px;  }
          th {  background-color: #f4f4f4; font-weight: bold; }

          /* Hide Action column */
          th:nth-child(10), td:nth-child(10) { display: none; }
        </style>
      </head>
      <body>
        <h2>All Darshan & Pooja Bookings</h2>
        ${printContent}
      </body>
    </html>
  `);
  newWin.document.close();
  newWin.focus();
  newWin.print();
};


 const handleDownload = () => {
  if (!filteredBookings.length) return alert("No data to export!");

  // Prepare the data
  const exportData = filteredBookings.map((b, i) => ({
    "S.No": i + 1,
    "Darshan ID": b.darshan_pooja_id,
    "Full Name": b.full_name,
    "Temple": b.temple_name,
    "Email": b.email,
    "Phone": b.mobile_number,
    "Booking Date": new Date(b.book_date_and_time).toLocaleString(),
    "Grand Total (₹)": b.grand_total,
    "Status": b.status,
  }));

  // Create worksheet
  const ws = XLSX.utils.json_to_sheet(exportData);

  // Set column widths automatically
  const maxWidth = Object.keys(exportData[0]).map(
    (key) => Math.max(key.length, ...exportData.map((row) => String(row[key] || "").length)) + 5
  );
  ws["!cols"] = maxWidth.map((w) => ({ wch: w }));

  // Decode the range (rows & columns)
  const range = XLSX.utils.decode_range(ws["!ref"]);

  // Apply header styles (bold, center, background color)
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cellRef = XLSX.utils.encode_cell({ r: 0, c: C });
    if (ws[cellRef]) {
      ws[cellRef].s = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        alignment: { horizontal: "center", vertical: "center" },
        fill: { fgColor: { rgb: "4472C4" } }, // Blue background
        border: {
          top: { style: "thin", color: { rgb: "AAAAAA" } },
          bottom: { style: "thin", color: { rgb: "AAAAAA" } },
          left: { style: "thin", color: { rgb: "AAAAAA" } },
          right: { style: "thin", color: { rgb: "AAAAAA" } },
        },
      };
    }
  }

  // Apply row styling (zebra striping)
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
              ? { fgColor: { rgb: "F9F9F9" } } // light grey for even rows
              : undefined,
        };
      }
    }
  }

  // Create a new workbook and add the styled worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "DarshanBookings");

  // Export to file
  XLSX.writeFile(wb, "All_Darshan_Bookings_Styled.xlsx");
};



  // ===================== MODAL HANDLERS =====================
  const handleShow = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };
  const handleClose = () => {
    setSelectedBooking(null);
    setShowModal(false);
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
                <Breadcrumb.Item active>All Darshan & Pooja Bookings</Breadcrumb.Item>
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

          {/* ============== TABLE ============== */}
          <Row className="mt-3">
            <div className="col-md-12">
              <table className="admin-rwd-table" id="booking-table">
                <tbody>
                  <tr>
                    <th>S.No</th>
                    <th>Darshan ID</th>
                    <th>Full Name</th>
                    <th>Temple Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Booking Date</th>
                    <th>Grand Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>

                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking, index) => (
                      <tr key={booking.id}>
                        <td data-th="S.No">{index + 1}</td>
                        <td data-th="Darshan ID">{booking.darshan_pooja_id}</td>
                        <td data-th="Full Name">{booking.full_name}</td>
                        <td data-th="Temple">{booking.temple_name}</td>
                        <td data-th="Email">{booking.email}</td>
                        <td data-th="Phone">{booking.mobile_number}</td>
                        <td data-th="Date">
                          {new Date(booking.book_date_and_time).toLocaleString()}
                        </td>
                        <td data-th="Total">₹{booking.grand_total}</td>
                        <td data-th="Status" className="text-capitalize">
                          {booking.status}
                        </td>
                        <td data-th="Action">
                          <Button
                            className="event-click-btn"
                            size="sm"
                            onClick={() => handleShow(booking)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center">
                        {loading ? <Spinner animation="border" /> : "No bookings found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Row>
        </div>
      </main>

    {/* ===================== MODAL ===================== */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Darshan Booking Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedBooking ? (
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="temp-label" >Darshan ID</Form.Label>
                    <Form.Control 
                   className="temp-form-control-option"
                   value={selectedBooking.darshan_pooja_id || ""} disabled />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="temp-label" >Full Name</Form.Label>
                    <Form.Control 
                     className="temp-form-control-option"
                    value={selectedBooking.full_name || ""} disabled />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="temp-label" >Gender</Form.Label>
                    <Form.Control 
                     className="temp-form-control-option"
                    value={selectedBooking.gender || ""} disabled />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="temp-label" >Age</Form.Label>
                    <Form.Control 
                     className="temp-form-control-option"
                    value={selectedBooking.age || ""} disabled />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="temp-label" >Mobile</Form.Label>
                    <Form.Control 
                     className="temp-form-control-option"
                    value={selectedBooking.mobile_number || ""} disabled />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="temp-label" >Email</Form.Label>
                    <Form.Control 
                     className="temp-form-control-option"
                    value={selectedBooking.email || ""} disabled />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="temp-label" >Temple</Form.Label>
                    <Form.Control
                     className="temp-form-control-option" 
                    value={selectedBooking.temple_name || ""} disabled />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="temp-label" >Payment Mode</Form.Label>
                    <Form.Control 
                     className="temp-form-control-option"
                    value={selectedBooking.payment_mode || ""} disabled />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="temp-label" >Total Amount (₹)</Form.Label>
                    <Form.Control 
                     className="temp-form-control-option"
                    value={selectedBooking.grand_total || ""} disabled />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="temp-label" >No. of Persons</Form.Label>
                    <Form.Control 
                     className="temp-form-control-option"
                    value={selectedBooking.no_of_persons || ""} disabled />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="temp-label" >Address</Form.Label>
                    <Form.Control
                     className="temp-form-control-option"
                      as="textarea"
                      rows={2}
                      value={`${selectedBooking.address || ""}, ${selectedBooking.city || ""}, ${
                        selectedBooking.state || ""
                      }, ${selectedBooking.country || ""} - ${selectedBooking.pin_code || ""}`}
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* ============= Pooja Details Table ============= */}
              <Row className="mt-4">
                <Col>
                  <h5>Pooja Details</h5>
                  {selectedBooking.pooja_details?.length ? (
                    <table className="admin-rwd-table">
                      <tbody>
                        <tr>
                          <th>Pooja ID</th>
                          <th>Pooja Name</th>
                          <th>Price (₹)</th>
                        </tr>
                        {selectedBooking.pooja_details.map((p, i) => (
                          <tr key={i}>
                            <td>{p.pooja_id}</td>
                            <td>{p.pooja_name}</td>
                            <td>{p.pooja_price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-muted">No pooja details available.</p>
                  )}
                </Col>
              </Row>
            </Form>
          ) : (
            <div className="text-center text-muted py-3">No booking selected.</div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button className="event-click-cancel" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllDarshanBooking;
