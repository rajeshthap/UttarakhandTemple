import React, { useEffect, useState } from "react";
import { Row, Button, Modal, Form, Spinner, Col } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../GlobleAuth/AuthContext";

const BASE_URL = "https://mahadevaaya.com/backend/";

const PanditPending = () => {
  const { uniqueId } = useAuth();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPandit, setSelectedPandit] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [status, setStatus] = useState("");
  const [selectedRows, setSelectedRows] = useState([]); // ✅ selected IDs
  const [selectAll, setSelectAll] = useState(false); // ✅ select all

  // ====== FETCH PENDING PANDITS ======
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}api/get-all-registered/`, {
        params: { role: "pandit", status: "pending" },
      });
      const data = Array.isArray(res.data?.results) ? res.data.results : [];
      setRequests(data);
      setFilteredRequests(data);
    } catch (err) {
      console.error("Error fetching pending pandits:", err);
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

  // ====== SEARCH ======
  const handleSearch = (query) => {
    if (!query) return setFilteredRequests(requests);
    const lower = query.toLowerCase();
    setFilteredRequests(
      requests.filter(
        (r) =>
          r.first_name?.toLowerCase().includes(lower) ||
          r.last_name?.toLowerCase().includes(lower) ||
          r.pandit_id?.toLowerCase().includes(lower) ||
          r.email?.toLowerCase().includes(lower)
      )
    );
  };

  // ====== OPEN MODAL ======
  const handleView = (pandit) => {
    setSelectedPandit(pandit);
    setRemarks("");
    setStatus("");
    setShowModal(true);
  };

  // ====== SINGLE UPDATE STATUS ======
  const handleRequestUpdate = async () => {
    if (!status) return alert("Please select a status.");
    const payload = {
      pandit_id: selectedPandit.pandit_id,
      pandit_status: status.toLowerCase(),
      remarks,
      admin_id: uniqueId,
    };

    try {
      const res = await axios.patch(`${BASE_URL}api/update-pandit-status/`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) {
        alert("Pandit status updated successfully!");
        setShowModal(false);
        fetchRequests();
      } else alert("Failed to update status.");
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Error updating pandit status.");
    }
  };

  // ====== MULTISELECT HANDLERS ======
  const handleRowSelect = (panditId) => {
    setSelectedRows((prev) =>
      prev.includes(panditId)
        ? prev.filter((id) => id !== panditId)
        : [...prev, panditId]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredRequests.map((r) => r.pandit_id));
    }
    setSelectAll(!selectAll);
  };

  // ====== BULK ACCEPT / REJECT ======
  const handleBulkAction = async (actionType) => {
    if (selectedRows.length === 0) {
      alert("Please select at least one record.");
      return;
    }

    try {
      setLoading(true);
      for (const pandit_id of selectedRows) {
        const payload = {
          pandit_id,
          pandit_status: actionType,
          remarks: `${actionType} by admin`,
          admin_id: uniqueId,
        };
        await axios.patch(`${BASE_URL}api/update-pandit-status/`, payload, {
          headers: { "Content-Type": "application/json" },
        });
      }
      alert(`Selected records ${actionType === "accepted" ? "accepted" : "rejected"} successfully!`);
      setSelectedRows([]);
      setSelectAll(false);
      fetchRequests();
    } catch (error) {
      console.error("Error in bulk update:", error);
      alert("Something went wrong while updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <main className="admin-container">
        <div className="content-box">
          {/* ===== Search ===== */}

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


          {/* ===== Bulk Action Buttons ===== */}
          <div className="d-flex justify-content-end mb-2 gap-2">
            <Button
              variant="success"
              className="event-click-btn"
              disabled={selectedRows.length === 0 || loading}
              onClick={() => handleBulkAction("accepted")}
            >
              Accept Selected
            </Button>
            <Button
              variant="danger"
              className="event-click-cancel"
              disabled={selectedRows.length === 0 || loading}
              onClick={() => handleBulkAction("rejected")}
            >
              Reject Selected
            </Button>
          </div>

          {/* ===== Table ===== */}
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
                    <th>Pandit ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>

                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((req, i) => (
                      <tr key={i}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(req.pandit_id)}
                            onChange={() => handleRowSelect(req.pandit_id)}
                          />
                        </td>
                        <td data-th="S. No">{i + 1}</td>
                        <td data-th="Pandit ID">{req.pandit_id}</td>
                        <td data-th="First Name">{req.first_name}</td>
                        <td data-th="Last Name">{req.last_name}</td>
                        <td data-th="Email">{req.email}</td>
                        <td data-th="Phone">{req.phone}</td>
                        <td data-th="Status">{req.pandit_status}</td>
                        <td>
                          <Button
                            className="event-click-btn"
                            size="sm"
                            onClick={() => handleView(req)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
                        {loading ? <Spinner /> : "No pending pandits found."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Row>

          {/* ===== Modal ===== */}
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            size="lg"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Pandit Request</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {selectedPandit ? (
                <Form>
                  {/* Pandit Info */}
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Pandit ID</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedPandit.pandit_id || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Name</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={`${selectedPandit.first_name || ""} ${selectedPandit.last_name || ""
                            }`}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Father Name</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedPandit.father_name || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Email</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedPandit.email || ""}
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
                          value={selectedPandit.phone || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Aadhar Number</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedPandit.aadhar_number || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Address</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          className="temp-form-control-option"
                          value={selectedPandit.permanent_address || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">City / State</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={`${selectedPandit.city || ""}, ${selectedPandit.state || ""
                            }`}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Country</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedPandit.country || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Zipcode</Form.Label>
                        <Form.Control
                          className="temp-form-control-option"
                          value={selectedPandit.zipcode || ""}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Pooja Details */}
                  <Row className="mt-4">
                    <Col>
                      <h5>Pooja Details</h5>
                      {selectedPandit.pandit_pooja_details?.length ? (
                        <table className="admin-rwd-table">
                          <tbody>
                            <tr>
                              <th>Pooja ID</th>
                              <th>Pooja Name</th>
                              <th>Price (₹)</th>
                            </tr>
                            {selectedPandit.pandit_pooja_details.map((pooja, i) => (
                              <tr key={i}>
                                <td>{pooja.pandit_pooja_id}</td>
                                <td>{pooja.pooja_name}</td>
                                <td>{pooja.pooja_price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p className="text-muted">No pooja details available.</p>
                      )}
                    </Col>
                  </Row>


                  {/* Image + Document */}
                  <Row className="mt-4 gy-4">
                    {[
                      { label: "Pandit Image", key: "pandit_image" },
                      { label: "Aadhar Document", key: "aadhar_document" },
                    ].map(({ label, key }, i) => (
                      <Col md={6} key={i}>
                        <h6 style={{ fontSize: "14px", fontWeight: "600" }}>{label}</h6>

                        {selectedPandit[key] ? (
                          <div className="my-2">
                            {/\.(jpg|jpeg|png)$/i.test(selectedPandit[key]) ? (
                              <>
                                <img
                                  src={getFileUrl(selectedPandit[key])}
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
                                    href={getFileUrl(selectedPandit[key])}
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
                                href={getFileUrl(selectedPandit[key])}
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


                  {/* Remarks and Status */}
                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Status</Form.Label>
                        <Form.Select
                          className="temp-form-control-option"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="">Select Status</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="temp-label">Remarks</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          placeholder="Leave a remark"
                          value={remarks}
                          onChange={(e) => setRemarks(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              ) : (
                <div className="text-center text-muted py-3">
                  No Pandit selected.
                </div>
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button
                className="event-click-btn"
                onClick={handleRequestUpdate}
                disabled={!selectedPandit}
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

export default PanditPending;
