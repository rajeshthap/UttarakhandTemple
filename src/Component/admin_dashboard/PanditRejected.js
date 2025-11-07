import React, { useEffect, useState } from "react";
import { Row, Button } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../GlobleAuth/AuthContext";

const BASE_URLL = "https://mahadevaaya.com/backend/";

const PanditRejected = () => {
  const { uniqueId } = useAuth();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // ====== FETCH REJECTED PANDIT REQUESTS ======
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URLL}api/get-all-registered/`, {
        params: {
          role: "pandit",
          status: "rejected",
        },
      });

      const data = Array.isArray(res.data?.results) ? res.data.results : [];
      setRequests(data);
      setFilteredRequests(data);
    } catch (err) {
      console.error("Error fetching rejected pandit requests:", err);
      setRequests([]);
      setFilteredRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ====== UPDATE PANDIT STATUS ======
  const handleStatusChange = async (pandit_id, newStatus) => {
    const confirmAction = window.confirm(
      `Are you sure you want to change status to "${newStatus}"?`
    );
    if (!confirmAction) return;

    const payload = {
      pandit_id: pandit_id,
      pandit_status: newStatus.toLowerCase(),
      admin_id: uniqueId, // required by API
    };

    try {
      const res = await axios.patch(
        "https://mahadevaaya.com/backend/api/update-pandit-status/",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 200) {
        alert(`Pandit status updated to ${newStatus}`);
        fetchRequests();
      } else {
        alert("Failed to update status.");
      }
    } catch (err) {
      console.error("Error updating pandit status:", err);
      console.error("Backend response:", err.response?.data);
      alert("Error updating pandit status.");
    }
  };

  // ====== SEARCH FUNCTION ======
  const handleSearch = (query) => {
    if (!query) {
      setFilteredRequests(requests);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = requests.filter(
      (req) =>
        req.first_name?.toLowerCase().includes(lowerQuery) ||
        req.last_name?.toLowerCase().includes(lowerQuery) ||
        req.pandit_id?.toLowerCase().includes(lowerQuery) ||
        req.email?.toLowerCase().includes(lowerQuery)
    );
    setFilteredRequests(filtered);
  };

  return (
    <div className="dashboard-wrapper">
      <main className="main-container">
        <div className="content-box">
          {/* Header */}
          <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
            {/* Search */}
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
          </div>

          {/* ===== TABLE SECTION ===== */}
          <Row className="mt-3">
            <div className="col-md-12">
              <table className="admin-rwd-table">
                <tbody>
                  <tr>
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
                    filteredRequests.map((req, index) => (
                      <tr key={index}>
                        <td data-th="S. No">{index + 1}</td>
                        <td data-th="Pandit ID">{req.pandit_id}</td>
                        <td data-th="First Name">{req.first_name}</td>
                        <td data-th="Last Name">{req.last_name}</td>
                        <td data-th="Email">{req.email || "N/A"}</td>
                        <td data-th="Phone">{req.phone || "N/A"}</td>
                        <td data-th="Status">{req.pandit_status || "rejected"}</td>
                        <td>
                          <Button
                            className="event-click-btn me-2"
                            size="sm"
                            onClick={() =>
                              handleStatusChange(req.pandit_id, "pending")
                            }
                          >
                            Pending
                          </Button>
                          <Button
                            className="event-click-cancel"
                            size="sm"
                            onClick={() =>
                              handleStatusChange(req.pandit_id, "accepted")
                            }
                          >
                            Accepted
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        {loading ? "Loading..." : "No rejected pandits found."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Row>
        </div>
      </main>
    </div>
  );
};

export default PanditRejected;
