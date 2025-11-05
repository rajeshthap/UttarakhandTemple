import React, { useEffect, useState } from "react";
import "../../../assets/CSS/AdminLeftNav.css";
import { Row, Button, Breadcrumb } from "react-bootstrap";
import AdminLeftnav from "../AdminLeftnav";
import { useAuth } from "../../GlobleAuth/AuthContext";
import axios from "axios";
import { BASE_URLL } from "../../../Component/BaseURL";
import SearchFeature from "../../temp_dashboard/temp_innerdashboard/SearchFeature";

const AllTempleBooking = () => {
  const { uniqueId } = useAuth();
  const [temples, setTemples] = useState([]);
  const [filteredTemples, setFilteredTemples] = useState([]);
  const [loading, setLoading] = useState(false);

  // ===================== FETCH TEMPLES =====================
  const fetchTemples = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URLL}api/get-all-registered/?role=temple`
      );

      const templeList = res.data?.results || [];

      if (Array.isArray(templeList)) {
        const formatted = templeList
          .filter((temple) => temple.temple_status === "accepted") //  Only accepted temples
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
                <Breadcrumb.Item href="/AdminDashboard">
                  <span className="fw700h1">Admin</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Accepted Temple Booking</Breadcrumb.Item>
              </Breadcrumb>
            </h1>

            <div>
              <SearchFeature onSearch={handleSearch} />
            </div>
          </div>

          {/* ============== TABLE ============== */}
          <Row className="mt-3">
            <div className="col-md-12">
              <table className="rwd-table">
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
                    <th>Documents</th>
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

                        <td data-th="Documents">
                          {temple.temple_image_url && (
                            <a
                              href={temple.temple_image_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="event-click-btn text-decoration-none"
                              style={{ fontSize: "12px", padding: "3px 8px" }}
                            >
                              🖼️ Image
                            </a>
                          )}
                          {temple.land_doc_url && (
                            <a
                              href={temple.land_doc_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="event-click-btn text-decoration-none ms-1"
                              style={{ fontSize: "12px", padding: "3px 8px" }}
                            >
                              📄 Land
                            </a>
                          )}
                          {temple.noc_doc_url && (
                            <a
                              href={temple.noc_doc_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="event-click-btn text-decoration-none ms-1"
                              style={{ fontSize: "12px", padding: "3px 8px" }}
                            >
                              📑 NOC
                            </a>
                          )}
                          {temple.trust_cert_url && (
                            <a
                              href={temple.trust_cert_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="event-click-btn text-decoration-none ms-1"
                              style={{ fontSize: "12px", padding: "3px 8px" }}
                            >
                              🏛️ Trust
                            </a>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
                        {loading ? "Loading..." : "No Accepted Temples Found"}
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

export default AllTempleBooking;
