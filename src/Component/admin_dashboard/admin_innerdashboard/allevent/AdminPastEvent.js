import React, { useEffect, useState } from "react";
import "../../../../assets/CSS/AdminLeftNav.css";
import AdminLeftnav from "../../AdminLeftnav";
import { Row, Breadcrumb, Button } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../../GlobleAuth/AuthContext";

const BASE_URLL = "https://mahadevaaya.com/backend/";

const AdminPastEvent = () => {
  const { uniqueId } = useAuth();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // ====== FETCH REJECTED REQUESTS ======
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URLL}api/get-all-registered/`, {
        params: {
          role: "temple",
          status: "rejected",
        },
      });

      const data = Array.isArray(res.data?.results) ? res.data.results : [];
      setRequests(data);
      setFilteredRequests(data);
    } catch (err) {
      console.error("Error fetching rejected requests:", err);
      setRequests([]);
      setFilteredRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ====== UPDATE STATUS ======
  const handleStatusChange = async (temple_id, newStatus) => {
    const confirmAction = window.confirm(
      `Are you sure you want to change status to "${newStatus}"?`
    );
    if (!confirmAction) return;

    const payload = {
      temple_id: temple_id,
      temple_status: newStatus.toLowerCase(),
      admin_id: uniqueId, //  required by API
    };

    try {
      const res = await axios.patch(
        "https://mahadevaaya.com/backend/api/update-temple-status/",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 200) {
        alert(`Temple status updated to ${newStatus}`);
        // Refresh data after successful update
        fetchRequests();
      } else {
        alert("Failed to update status.");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      console.error("Backend response:", err.response?.data);
      alert("Error updating temple status.");
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
        req.temple_name?.toLowerCase().includes(lowerQuery) ||
        req.temple_id?.toLowerCase().includes(lowerQuery) ||
        req.email?.toLowerCase().includes(lowerQuery)
    );
    setFilteredRequests(filtered);
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="admin-sidebar">
        <AdminLeftnav />
      </aside>

      <main className="main-container">
        <div className="content-box">
          <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
            <h1 className="fw500">
              <Breadcrumb>
                <Breadcrumb.Item href="/AdminDashboard">
                  <span className="fw700h1">Admin</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Rejected Requests</Breadcrumb.Item>
              </Breadcrumb>
            </h1>

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
              <table className="rwd-table">
                <tbody>
                  <tr>
                    <th>S.No</th>
                    <th>Temple ID</th>
                    <th>Temple Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>

                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((req, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{req.temple_id}</td>
                        <td>{req.temple_name}</td>
                        <td>{req.email || "N/A"}</td>
                        <td>{req.phone || "N/A"}</td>
                        <td>{req.temple_status || "rejected"}</td>
                        <td>
                          <Button
                            className="event-click-btn me-2"
                            size="sm"
                            onClick={() =>
                              handleStatusChange(req.temple_id, "pending")
                            }
                          >
                            Pending
                          </Button>
                          <Button
                            className="event-click-cancel"
                            size="sm"
                            onClick={() =>
                              handleStatusChange(req.temple_id, "accepted")
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
                        {loading ? "Loading..." : "No rejected requests found."}
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

export default AdminPastEvent;
