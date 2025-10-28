import React, { useEffect, useState } from "react";
import "../../../assets/CSS/LeftNav.css";
import LeftNav from "../LeftNav";
import { Breadcrumb, Row, Spinner } from "react-bootstrap";
import SearchFeature from "../../temp_dashboard/temp_innerdashboard/SearchFeature";
import axios from "axios";
import { useAuth } from "../../GlobleAuth/AuthContext";

const SevaDetails = () => {
  const [sevaData, setSevaData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { uniqueId } = useAuth();

  const fetchSevaDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://mahadevaaya.com/backend/api/seva-booking/?creator_id=${uniqueId}`
      );

      if (Array.isArray(res.data)) {
        setSevaData(res.data);
        setFilteredData(res.data);
      } else {
        console.warn("Unexpected API format:", res.data);
      }
    } catch (error) {
      console.error("Error fetching Seva details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSevaDetails();
  }, []);

  const handleSearch = (term) => {
  const searchTerm = term.toLowerCase().trim();

  if (!searchTerm) {
    setFilteredData(sevaData);
    return;
  }

  const filtered = sevaData.filter((item) => {
    const phone = item.mobile_number?.toLowerCase() || "";
    const name = item.full_name?.toLowerCase() || "";
    const temple = item.temple_name?.toLowerCase() || "";

    // Match only from the start of the string
    return (
      phone.startsWith(searchTerm) ||
      name.startsWith(searchTerm) ||
      temple.startsWith(searchTerm)
    );
  });

  setFilteredData(filtered);
};


  return (
    <>
      <div className="dashboard-wrapper">
        <aside className="sidebar">
          <LeftNav />
        </aside>

        <main className="main-container-box">
          <div className="content-box">
            <Row>
              {/* Header and Search */}
              <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
                <h1 className="fw500">
                  <Breadcrumb>
                    <Breadcrumb.Item href="/MainDashBoard">
                      <span className="fw700h1">Dashboard</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Seva Details</Breadcrumb.Item>
                  </Breadcrumb>
                </h1>

                <div>
                  <SearchFeature onSearch={handleSearch} />
                </div>
              </div>

              {/* Table Section */}
              <div className="col-md-12">
                {loading ? (
                  <div className="text-center my-4">
                    <Spinner animation="border" />
                  </div>
                ) : (
                  <table className="rwd-table">
                    <tbody>
                      <tr>
                        <th>Seva ID</th>
                        <th>Full Name</th>
                        <th>Mobile Number</th>
                        <th>Temple Name</th>
                        <th>Type of Seva</th>
                        <th>Seva Date & Time</th>
                        <th>Frequency</th>
                        <th>Instructions</th>
                        <th>Donation Amount</th>
                        
                      </tr>

                      {filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                          <tr key={index}>
                            <td data-th="Seva ID">{item.seva_id || "—"}</td>
                            <td data-th="Full Name">{item.full_name || "—"}</td>
                            <td data-th="Mobile Number">{item.mobile_number || "—"}</td>
                            <td data-th="Temple Name">{item.temple_name || "—"}</td>
                            <td data-th="Type of Seva">{item.type_of_seva || "—"}</td>
                            <td data-th="Seva Date & Time">
                              {item.seva_date_and_time
                                ? new Date(item.seva_date_and_time).toLocaleString(
                                    "en-IN",
                                    {
                                      dateStyle: "medium",
                                      timeStyle: "short",
                                    }
                                  )
                                : "—"}
                            </td>
                            <td data-th="Frequency">{item.frequency || "—"}</td>
                            
                            <td data-th="Instructions">{item.special_instructions || "—"}</td>
                            <td data-th="Donation Amount">
                              {item.seva_donation_amount
                                ? `₹${item.seva_donation_amount}`
                                : "—"}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center py-3">
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

export default SevaDetails;
