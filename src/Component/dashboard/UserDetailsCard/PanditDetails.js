import React, { useEffect, useState } from "react";
import "../../../assets/CSS/LeftNav.css";
import LeftNav from "../LeftNav";
import { Breadcrumb, Row, Spinner } from "react-bootstrap";
import SearchFeature from "../../temp_dashboard/temp_innerdashboard/SearchFeature";
import axios from "axios";
import { useAuth } from "../../GlobleAuth/AuthContext";

const PanditDetails = () => {
  const [panditData, setPanditData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { uniqueId } = useAuth();

  const fetchPanditDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://mahadevaaya.com/backend/api/hire-pandit/?creator_id=${uniqueId}`
      );

      if (Array.isArray(res.data)) {
        setPanditData(res.data);
        setFilteredData(res.data);
      } else {
        console.warn("Unexpected API response format:", res.data);
      }
    } catch (error) {
      console.error("Error fetching Pandit details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPanditDetails();
  }, []);

  const handleSearch = (term) => {
    const searchTerm = term.toLowerCase().trim();

    if (!searchTerm) {
      setFilteredData(panditData);
      return;
    }

    const filtered = panditData.filter((item) => {
      const phone = item.mobile_number?.toLowerCase() || "";
      const name = item.full_name?.toLowerCase() || "";
      const pooja = item.pooja_type?.toLowerCase() || "";
      const location = item.location?.toLowerCase() || "";

      // Match from start
      return (
        phone.startsWith(searchTerm) ||
        name.startsWith(searchTerm) ||
        pooja.startsWith(searchTerm) ||
        location.startsWith(searchTerm)
      );
    });

    setFilteredData(filtered);
  };

  return (
    <>
      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <LeftNav />
        </aside>

        {/* Main Section */}
        <main className="main-container-box">
          <div className="content-box">
            <Row>
              {/* Header */}
              <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
                <h1 className="fw500">
                  <Breadcrumb>
                    <Breadcrumb.Item href="/MainDashBoard">
                      <span className="fw700h1">Dashboard</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Pandit Details</Breadcrumb.Item>
                  </Breadcrumb>
                </h1>

                <div>
                  <SearchFeature onSearch={handleSearch} />
                </div>
              </div>

              {/* Table */}
              <div className="col-md-12">
                {loading ? (
                  <div className="text-center my-4">
                    <Spinner animation="border" />
                  </div>
                ) : (
                  <table className="rwd-table">
                    <tbody>
                      <tr>
                        <th>Full Name</th>
                        <th>Mobile Number</th>
                        <th>Address</th>
                        <th>Pooja Type</th>
                        <th>Pandit Details</th>
                        <th>Language Preference</th>
                        <th>Date & Time</th>
                        <th>Location</th>
                        <th>Special Requirements</th>
                        <th>Payment Mode</th>
                        <th>Grand Total</th>
                      </tr>

                      {filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                          <tr key={index}>
                            <td>{item.full_name || "—"}</td>
                            <td>{item.mobile_number || "—"}</td>
                            <td>{item.address || "—"}</td>
                            <td>{item.pooja_type || "—"}</td>
                            <td>
                              {item.number_of_pandits?.length > 0 ? (
                                <ul className="mb-0">
                                  {item.number_of_pandits.map((p, i) => (
                                    <li key={i}>
                                      {p.name} ({p.pandit_id}) - ₹{p.price}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                "—"
                              )}
                            </td>
                            <td>{item.language_preference || "—"}</td>
                            <td>
                              {item.date_and_time
                                ? new Date(item.date_and_time).toLocaleString(
                                    "en-IN",
                                    {
                                      dateStyle: "medium",
                                      timeStyle: "short",
                                    }
                                  )
                                : "—"}
                            </td>
                            <td>{item.location || "—"}</td>
                            <td>{item.special_requirements || "—"}</td>
                            <td>{item.payment_mode || "—"}</td>
                            <td>
                              {item.grand_total
                                ? `₹${item.grand_total}`
                                : "—"}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="11" className="text-center py-3">
                            No records found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </Row>
          </div>
        </main>
      </div>
    </>
  );
};

export default PanditDetails;
