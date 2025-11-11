import React, { useEffect, useState } from "react";
import { Row, Button, Breadcrumb, Modal, Form, Col } from "react-bootstrap"; //  Added Modal, Form, Col
import "../../../assets/CSS/AdminLeftNav.css";
import AdminLeftnav from "../AdminLeftnav";
import { useAuth } from "../../GlobleAuth/AuthContext";
import axios from "axios";
import { BASE_URLL } from "../../../Component/BaseURL";
import SearchFeature from "../../temp_dashboard/temp_innerdashboard/SearchFeature";
import LocationState from "../../userregistration/LocationState"; //  Added for location fields
import ModifyAlert from "../../Alert/ModifyAlert"; //  Added for alert
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const AllTempleBooking = () => {
  const { uniqueId } = useAuth();
  const [temples, setTemples] = useState([]);
  const [filteredTemples, setFilteredTemples] = useState([]);
  const [loading, setLoading] = useState(false);

  //  Added state for modal & selected temple
  const [selectedTemple, setSelectedTemple] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  // ===================== FETCH TEMPLES =====================
  const fetchTemples = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URLL}api/get-all-registered/?role=temple`);

      const templeList = res.data?.results || [];

      if (Array.isArray(templeList)) {
        const formatted = templeList
          .filter((temple) => temple.temple_status === "accepted")
          .map((temple) => ({
            ...temple,
            temple_image_url: `https://mahadevaaya.com/backend${temple.temple_image}`,
            land_doc_url: `https://mahadevaaya.com/backend${temple.land_doc}`,
            noc_doc_url: `https://mahadevaaya.com/backend${temple.noc_doc}`,
            trust_cert_url: `https://mahadevaaya.com/backend${temple.trust_cert}`,
          }));
        setTemples(formatted);
        setFilteredTemples(formatted);
      }
    } catch (err) {
      console.error("Error fetching temples:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemples();
  }, []);

  // ===================== SEARCH =====================
  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredTemples(temples);
      return;
    }
    const lower = query.toLowerCase();
    const filtered = temples.filter(
      (t) =>
        t.temple_name?.toLowerCase().includes(lower) ||
        t.temple_address?.toLowerCase().includes(lower) ||
        t.city?.toLowerCase().includes(lower) ||
        t.state?.toLowerCase().includes(lower) ||
        t.country?.toLowerCase().includes(lower)
    );
    setFilteredTemples(filtered);
  };

  //  Print Function
  const handlePrint = () => {
    const table = document.getElementById("temple-table");
    if (!table) {
      alert("Table not found!");
      return;
    }

    const printContent = table.outerHTML;
    const newWin = window.open("", "_blank");

    newWin.document.write(`
    <html>
      <head>
        <title>Accepted Temples</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h2 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; font-size: 13px; }
          th { background-color: #f4f4f4; font-weight: bold; }
          tr:nth-child(even) { background-color: #fafafa; }
          /* Hide Action column */
          th:nth-child(10), td:nth-child(10) { display: none; }
        </style>
      </head>
      <body>
        <h2>Accepted Temples List</h2>
        ${printContent}
      </body>
    </html>
  `);
    newWin.document.close();
    newWin.focus();
    newWin.print();
  };

  // ===================== DOWNLOAD EXCEL (Styled) =====================
  const handleDownload = () => {
    if (!filteredTemples.length) return alert("No data to export!");

    // Prepare the data
    const exportData = filteredTemples.map((t, i) => ({
      "S.No": i + 1,
      "Temple Name": t.temple_name,
      "Temple Address": t.temple_address,
      City: t.city,
      State: t.state,
      Country: t.country,
      Email: t.email,
      Phone: t.phone,
      Status: t.temple_status || "Accepted",
    }));

    // Create worksheet
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

    // Decode range (for rows/cols)
    const range = XLSX.utils.decode_range(ws["!ref"]);

    // Apply header styles (bold, centered, blue background)
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: C });
      if (ws[cellRef]) {
        ws[cellRef].s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          alignment: { horizontal: "center", vertical: "center" },
          fill: { fgColor: { rgb: "4472C4" } }, // Blue header
          border: {
            top: { style: "thin", color: { rgb: "AAAAAA" } },
            bottom: { style: "thin", color: { rgb: "AAAAAA" } },
            left: { style: "thin", color: { rgb: "AAAAAA" } },
            right: { style: "thin", color: { rgb: "AAAAAA" } },
          },
        };
      }
    }

    // Apply zebra row styling
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
                ? { fgColor: { rgb: "F9F9F9" } } // light grey rows
                : undefined,
          };
        }
      }
    }

    // Create a new workbook and add the styled worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "TempleBookings");

    // Export to file
    XLSX.writeFile(wb, "All_Temple_Bookings_Styled.xlsx");
  };


  //  File URL helper
  const getFileUrl = (path) => {
    if (!path) return null;
    return `https://mahadevaaya.com/backend${path.startsWith("/") ? path : "/" + path}`;
  };

  //  Handle view click
  const handleView = (temple) => {
    setSelectedTemple(temple);
    setShowModal(true);
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
                <Breadcrumb.Item active>Temple Booking</Breadcrumb.Item>
              </Breadcrumb>
            </h1>

            <div>
              <SearchFeature onSearch={handleSearch} />
              <div className="mt-2 vmb-2">
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
              <table className="admin-rwd-table" id="temple-table">
                <tbody>
                  <tr>
                    <th>S.No</th>
                    <th>Temple Name</th>
                    <th>Temple Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Country</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Action</th> {/*  Added Action Column */}
                  </tr>

                  {filteredTemples.length > 0 ? (
                    filteredTemples.map((temple, index) => (
                      <tr key={temple.id}>
                        <td data-th="S. No">{index + 1}</td>
                        <td data-th="Temple Name">{temple.temple_name}</td>
                        <td data-th="Temple Address">{temple.temple_address}</td>
                        <td data-th="City">{temple.city}</td>
                        <td data-th="State">{temple.state}</td>
                        <td data-th="Country">{temple.country}</td>
                        <td data-th="Email">{temple.email}</td>
                        <td data-th="Phone">{temple.phone}</td>
                        <td data-th="Status">{temple.temple_status || "Accepted"}</td>
                        <td>
                          {/*  Added View button */}
                          <Button
                            className="event-click-btn"
                            size="sm"
                            onClick={() => handleView(temple)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center">
                        {loading ? "Loading..." : "No Accepted Temples Found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Row>

          {/*   */}
          <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title>Temple Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {selectedTemple ? (
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Temple Name</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedTemple.temple_name || ""} disabled />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Phone</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedTemple.phone || ""} disabled />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <LocationState
                      formData={{
                        country: selectedTemple.country || "",
                        state: selectedTemple.state || "",
                        city: selectedTemple.city || "",
                      }}
                      handleInputChange={() => { }}
                      disabled={true}
                    />
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Email</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedTemple.email || ""} disabled />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Temple Address</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          as="textarea"
                          rows={2}
                          value={selectedTemple.temple_address || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Temple Type</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedTemple.temple_type || ""} disabled />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Year Of Establishment</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedTemple.year_of_establishment || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Temple Ownership Type</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedTemple.temple_ownership_type || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Trust Committee Type</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedTemple.trust_committee_type || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Trust Committee Details</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedTemple.trust_committee_details || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Temple Description</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedTemple.temple_description || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Zip Code</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedTemple.zip_code || ""} disabled />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/*  Documents Section */}
                  <Row className="mt-4 gy-4">
                    {[
                      { label: "Temple Image", key: "temple_image" },
                      { label: "Land Document", key: "land_doc" },
                      { label: "NOC Document", key: "noc_doc" },
                      { label: "Trust Certificate", key: "trust_cert" },
                    ].map(({ label, key }, index) => (
                      <Col md={6} key={index}>
                        <h6 style={{ fontSize: "14px", fontWeight: "600" }}>{label}</h6>

                        {selectedTemple[key] ? (
                          <div className="my-2">
                            {/\.(jpg|jpeg|png)$/i.test(selectedTemple[key]) ? (
                              <>
                                <img
                                  src={getFileUrl(selectedTemple[key])}
                                  alt={label}
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
                                    href={getFileUrl(selectedTemple[key])}
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
                                href={getFileUrl(selectedTemple[key])}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="event-click-btn"
                                style={{
                                  fontSize: "12px",
                                  padding: "3px 8px",
                                  textDecoration: "none",
                                }}
                              >
                                📄 View Full PDF
                              </a>
                            )}
                          </div>
                        ) : (
                          <p className="text-muted">No document uploaded.</p>
                        )}
                      </Col>
                    ))}
                  </Row>
                </Form>
              ) : (
                <div className="text-center text-muted py-3">No temple selected.</div>
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

export default AllTempleBooking;
