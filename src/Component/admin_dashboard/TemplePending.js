import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../GlobleAuth/AuthContext";
import ModifyAlert from "../Alert/ModifyAlert";
import { BASE_URLL } from "../BaseURL";
import LocationState from "../userregistration/LocationState";
import * as XLSX from "xlsx";
import { FaPrint } from "react-icons/fa6";
import { FaFileExcel } from "react-icons/fa";

const TemplePending = () => {
    const { uniqueId } = useAuth();
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [remarks, setRemarks] = useState("");
    const [alert, setAlert] = useState({ show: false, message: "", variant: "" });
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    // ===== FETCH PENDING REQUESTS (Temple) =====
    const fetchRequests = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BASE_URLL}api/get-all-registered/`, {
                params: { role: "temple", status: "pending" },
            });

            const data = Array.isArray(res.data?.results)
                ? res.data.results
                : Array.isArray(res.data)
                    ? res.data
                    : [];

            setRequests(data);
            setFilteredRequests(data);
        } catch (err) {
            console.error("Error fetching requests:", err);
            setRequests([]);
            setFilteredRequests([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const getFileUrl = (path) => {
        if (!path) return null;
        return `https://mahadevaaya.com/backend${path.startsWith("/") ? path : "/" + path
            }`;
    };

    // ===== SEARCH =====
    const handleSearch = (query) => {
        if (!query) return setFilteredRequests(requests);
        const lowerQuery = query.toLowerCase();
        const filtered = requests.filter(
            (req) =>
                req.temple_name?.toLowerCase().includes(lowerQuery) ||
                req.temple_id?.toLowerCase().includes(lowerQuery) ||
                req.email?.toLowerCase().includes(lowerQuery)
        );
        setFilteredRequests(filtered);
    };

    // ===== SELECT CHECKBOX =====
    const handleSelectRow = (temple_id) => {
        setSelectedRows((prev) =>
            prev.includes(temple_id)
                ? prev.filter((id) => id !== temple_id)
                : [...prev, temple_id]
        );
    };

    // ===== SELECT ALL =====
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedRows([]);
        } else {
            const allIds = filteredRequests.map((r) => r.temple_id);
            setSelectedRows(allIds);
        }
        setSelectAll(!selectAll);
    };

    // ===== BULK ACTION =====
    const handleBulkUpdate = async (status) => {
        if (selectedRows.length === 0) {
            setAlert({
                show: true,
                message: "Please select at least one temple.",
                variant: "warning",
            });
            return;
        }

        try {
            for (const temple_id of selectedRows) {
                const payload = {
                    temple_id,
                    temple_status: status,
                    admin_id: uniqueId,
                    remarks: `Bulk ${status} action`,
                };

                await axios.patch(`${BASE_URLL}api/update-temple-status/`, payload, {
                    headers: { "Content-Type": "application/json" },
                });
            }

            setAlert({
                show: true,
                message: `Selected temples ${status === "accepted" ? "accepted" : "rejected"} successfully!`,
                variant: status === "accepted" ? "success" : "danger",
            });

            setSelectedRows([]);
            setSelectAll(false);
            fetchRequests();
        } catch (error) {
            console.error("Bulk update failed:", error);
            setAlert({
                show: true,
                message: "Failed to update selected temples.",
                variant: "danger",
            });
        }
    };

    // ===== OPEN MODAL =====
    const handleView = (req) => {
        setSelectedRequest(req);
        setRemarks("");
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedRequest((prev) => ({ ...prev, [name]: value }));
    };

    const handleRequestUpdate = async () => {
        if (!selectedRequest) return;
        try {
            const { temple_id, temple_status } = selectedRequest;
            const payload = {
                temple_id,
                temple_status: temple_status?.toLowerCase(),
                admin_id: uniqueId,
                remarks,
            };

            await axios.patch(`${BASE_URLL}api/update-temple-status/`, payload, {
                headers: { "Content-Type": "application/json" },
            });

            setAlert({
                show: true,
                message: `Temple status updated to ${temple_status}!`,
                variant: temple_status === "accepted" ? "success" : "warning",
            });

            setShowModal(false);
            fetchRequests();
        } catch (error) {
            console.error("Update failed:", error);
            setAlert({
                show: true,
                message: "Failed to update temple status.",
                variant: "danger",
            });
        }


    };

    // ===== DELETE TEMPLE (Dummy) =====
    const handleDelete = async () => {
        try {
            await axios.delete(`${BASE_URLL}api/delete-temple/${selectedRequest?.temple_id}/`);
            setAlert({
                show: true,
                message: "Temple deleted successfully! (Dummy API)",
                variant: "danger",
            });
            setShowModal(false);
            fetchRequests();
        } catch (err) {
            console.error("Delete error:", err);
            setAlert({
                show: true,
                message: "Failed to delete temple (Dummy API).",
                variant: "danger",
            });
        }
    };


     const handlePrint = () => {
    const table = document.querySelector(".admin-rwd-table").cloneNode(true);
    // Remove the "Action" column
    table.querySelectorAll("th:last-child, td:last-child").forEach((el) => el.remove());
    const newWin = window.open("");
    newWin.document.write(`
      <html>
        <head>
          <title>Temple Pending List</title>
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
          <h2>Pending Temple List</h2>
          ${table.outerHTML}
        </body>
      </html>
    `);
    newWin.print();
    newWin.close();
  };

  const handleDownload = () => {
    if (!filteredRequests.length) return alert("No data to export!");

    const exportData = filteredRequests.map((r, i) => ({
      "S.No": i + 1,
      "Temple Name": r.temple_name,
      "City": r.city,
      "State": r.state,
      "Country": r.country,
      "Status": r.temple_status,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);

    const maxWidth = Object.keys(exportData[0]).map(
      (key) => Math.max(key.length, ...exportData.map((row) => String(row[key] || "").length)) + 5
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

    // Row styling (zebra effect)
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
    XLSX.utils.book_append_sheet(wb, ws, "TemplePending");
    XLSX.writeFile(wb, "Temple_Pending_List_Styled.xlsx");
  };



    return (
        <div className="dashboard-wrapper">
            <main className="admin-container">
                <div className="content-box">
                    {alert.show && (
                        <ModifyAlert
                            variant={alert.variant}
                            message={alert.message}
                            onClose={() => setAlert({ show: false })}
                        />
                    )}

                    <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
                              <div className="d-flex justify-content-center h-100">
                           <div className="search">
                             <input
                               className="search_input"
                               type="text"
                               placeholder="Search here..."
                               onChange={(e) => handleSearch(e.target.value)}
                             />
                             <button type="submit" className="search_icon">
                               <i className="fa fa-search"></i>
                             </button>
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
                           </div>


                    {/* Bulk Buttons */}
                    <div className="d-flex justify-content-end mb-2">
                        <Button
                            className="event-click-btn me-2"
                            onClick={() => handleBulkUpdate("accepted")}
                            disabled={selectedRows.length === 0}
                        >
                            Accept Selected
                        </Button>
                        <Button
                            className="event-click-cancel"
                            onClick={() => handleBulkUpdate("rejected")}
                            disabled={selectedRows.length === 0}
                        >
                            Reject Selected
                        </Button>
                    </div>

                    {/* Table */}
                    <Row className="mt-3">
                        <div className="col-md-12">
                            <table className="admin-rwd-table">
                                <tbody>
                                    <tr>
                                        <th>
                                            <input
                                                type="checkbox"
                                                checked={selectAll}
                                                onChange={handleSelectAll}
                                            />
                                        </th>
                                        <th>S.No</th>
                                        <th>Temple Name</th>
                                        <th>City</th>
                                        <th>State</th>
                                        <th>Country</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>

                                    {filteredRequests.length > 0 ? (
                                        filteredRequests.map((req, index) => (
                                            <tr key={req.temple_id}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRows.includes(req.temple_id)}
                                                        onChange={() => handleSelectRow(req.temple_id)}
                                                    />
                                                </td>
                                                <td data-th="S.No">{index + 1}</td>
                                                <td data-th="Temple Name">{req.temple_name}</td>
                                                <td data-th="City">{req.city}</td>
                                                <td data-th="State">{req.state}</td>
                                                <td data-th="Country">{req.country}</td>
                                                <td data-th="Status">{req.temple_status || "pending"}</td>
                                                <td>
                                                    <Button
                                                        className="event-click-btn"
                                                        size="sm"
                                                        onClick={() => handleView(req)}
                                                    >
                                                        Accept / Reject
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center">
                                                {loading
                                                    ? "Loading..."
                                                    : "No pending temple requests found."}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Row>






                    <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Temple Request</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            {selectedRequest ? (
                                <Form>
                                    {/* Temple Info */}
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="temp-label">Temple Name</Form.Label>
                                                <Form.Control
                                                    className="temp-form-control-option"
                                                    value={selectedRequest.temple_name || ""}
                                                    disabled
                                                />
                                            </Form.Group>
                                        </Col>


                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="temp-label">Phone</Form.Label>
                                                <Form.Control
                                                    className="temp-form-control-option"
                                                    value={selectedRequest.phone || ""}
                                                    disabled
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="mt-3">
                                        <LocationState
                                            formData={{
                                                country: selectedRequest.country || "",
                                                state: selectedRequest.state || "",
                                                city: selectedRequest.city || "",
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
                                                    value={selectedRequest.email || ""}
                                                    disabled
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="temp-label">Temple Address</Form.Label>
                                                <Form.Control
                                                    className="temp-form-control-option"
                                                    as="textarea"
                                                    rows={2}
                                                    value={selectedRequest.temple_address || ""}
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
                                                    value={selectedRequest.temple_type || ""}
                                                    disabled
                                                />
                                            </Form.Group>
                                        </Col>


                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="temp-label">Year Of Establishment</Form.Label>
                                                <Form.Control
                                                    className="temp-form-control-option"
                                                    value={selectedRequest.year_of_establishment || ""}
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
                                                    value={selectedRequest.temple_ownership_type || ""}
                                                    disabled
                                                />
                                            </Form.Group>
                                        </Col>


                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="temp-label">Trust Commitee Type</Form.Label>
                                                <Form.Control
                                                    className="temp-form-control-option"
                                                    value={selectedRequest.trust_committee_type || ""}
                                                    disabled
                                                />
                                            </Form.Group>
                                        </Col>

                                    </Row>

                                    <Row className="mt-2">


                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="temp-label">Trust Commitee Details</Form.Label>
                                                <Form.Control
                                                    className="temp-form-control-option"
                                                    value={selectedRequest.trust_committee_details || ""}
                                                    disabled
                                                />
                                            </Form.Group>
                                        </Col>


                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="temp-label">Temple Description</Form.Label>
                                                <Form.Control
                                                    className="temp-form-control-option"
                                                    value={selectedRequest.temple_description || ""}
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
                                                    value={selectedRequest.zip_code || ""}
                                                    disabled
                                                />
                                            </Form.Group>
                                        </Col>


                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="temp-label">Status</Form.Label>
                                                <Form.Select
                                                    className="temp-form-control-option"
                                                    name="temple_status"
                                                    value={selectedRequest.temple_status || ""}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select Status</option>
                                                    <option value="accepted">Accepted</option>
                                                    <option value="rejected">Rejected</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>




                                    {/* ================= Temple Image + Documents (2 per row) ================= */}
                                    <Row className="mt-4 gy-4">
                                        {[
                                            { label: "Temple Image", key: "temple_image" },
                                            { label: "Land Document", key: "land_doc" },
                                            { label: "NOC Document", key: "noc_doc" },
                                            { label: "Trust Certificate", key: "trust_cert" },
                                        ].map(({ label, key }, index) => (
                                            <Col md={6} key={index}>
                                                <h6 style={{ fontSize: "14px", fontWeight: "600" }}>
                                                    {label} <span style={{ color: "red" }}>*</span>
                                                </h6>

                                                {selectedRequest[key] ? (
                                                    <div className="my-2">
                                                        {/* Image or PDF preview */}
                                                        {/\.(jpg|jpeg|png)$/i.test(selectedRequest[key]) ? (
                                                            <>
                                                                <img
                                                                    src={getFileUrl(selectedRequest[key])}
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
                                                                        href={getFileUrl(selectedRequest[key])}
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
                                                                href={getFileUrl(selectedRequest[key])}
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


                                    {/* Remarks */}
                                    <Row className="mt-3">
                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Label className="temp-label">Remarks</Form.Label>
                                                <Form.Control
                                                className="temp-form-control-option"
                                                    as="textarea"
                                                    rows={3}
                                                    placeholder="Leave a remark for the user"
                                                    value={remarks}
                                                    onChange={(e) => setRemarks(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            ) : (
                                <div className="text-center text-muted py-3">
                                    No temple selected.
                                </div>
                            )}
                        </Modal.Body>

                        <Modal.Footer>
                            <Button
                                className="event-click-btn"
                                onClick={handleRequestUpdate}
                                disabled={!selectedRequest}
                            >
                                Update
                            </Button>
                            <Button className="event-click-cancel" onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button
                                className="event-click-cancel"
                                variant="danger"
                                disabled // delete disabled for now
                                onClick={handleDelete}
                            >
                                Delete (Disabled)
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </main>
        </div>
    );
};

export default TemplePending;
