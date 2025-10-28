import React, { useEffect, useState } from "react";
import "../../../assets/CSS/LeftNav.css";
import LeftNav from "../LeftNav";
import { Breadcrumb, Row, Spinner } from "react-bootstrap";
import SearchFeature from "../../temp_dashboard/temp_innerdashboard/SearchFeature";
import axios from "axios";
import { useAuth } from "../../GlobleAuth/AuthContext";

const DarshanDetails = () => {
  const [bookingData, setBookingData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { uniqueId } = useAuth();

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://mahadevaaya.com/backend/api/darshan-pooja-booking/?creator_id=${uniqueId}`
      );

      if (Array.isArray(res.data)) {
        setBookingData(res.data);
        setFilteredData(res.data);
      } else {
        console.warn("Unexpected API format:", res.data);
      }
    } catch (error) {
      console.error("Error fetching booking details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingDetails();
  }, []);

  const handleSearch = (term) => {
    const searchTerm = term.toLowerCase().trim();
    if (!searchTerm) {
      setFilteredData(bookingData);
      return;
    }

    const filtered = bookingData.filter((item) => {
      const phone = item.mobile_number?.toLowerCase() || "";
      const name = item.full_name?.toLowerCase() || "";
      const temple = item.temple_name?.toLowerCase() || "";
      const city = item.city?.toLowerCase() || "";

      return (
        phone.startsWith(searchTerm) ||
        name.startsWith(searchTerm) ||
        temple.startsWith(searchTerm) ||
        city.startsWith(searchTerm)
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
                    <Breadcrumb.Item active>Temple Booking Details</Breadcrumb.Item>
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
                        <th>Full Name</th>
                        <th>Mobile Number</th>
                        <th>ID Proof</th>
                        <th>Temple Name</th>
                        <th>Booking Date & Time</th>
                        <th>State</th>
                        <th>City</th>
                        <th>Address</th>
                        <th>Devotee Details</th>
                        <th>Pooja Details</th>
                        <th>No. of Persons</th>
                        <th>Payment Mode</th>
                        <th>Grand Total</th>
                      </tr>

                      {filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                          <tr key={index}>
                            <td>{item.full_name || "—"}</td>
                            <td>{item.mobile_number || "—"}</td>
                            <td>
                              {item.id_proof_type && item.id_proof_number
                                ? `${item.id_proof_type}: ${item.id_proof_number}`
                                : "—"}
                            </td>
                            <td>{item.temple_name || "—"}</td>
                            <td>
                              {item.book_date_and_time
                                ? new Date(item.book_date_and_time).toLocaleString(
                                    "en-IN",
                                    { dateStyle: "medium", timeStyle: "short" }
                                  )
                                : "—"}
                            </td>
                            <td>{item.state || "—"}</td>
                            <td>{item.city || "—"}</td>
                            <td>{item.address || "—"}</td>

                            {/* Devotee Details */}
                            <td>
                              {item.devotte_details?.length > 0 ? (
                                <ul className="mb-0">
                                  {item.devotte_details.map((dev, i) => (
                                    <li key={i}>
                                      {dev.full_name} ({dev.gender}, {dev.age}y) <br />
                                      {dev.id_proof_type}: {dev.id_proof_number}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                "—"
                              )}
                            </td>

                            {/* Pooja Details */}
                            <td>
                              {item.pooja_details?.length > 0 ? (
                                <ul className="mb-0">
                                  {item.pooja_details.map((pooja, i) => (
                                    <li key={i}>
                                      {pooja.pooja_name} ({pooja.pooja_id}) - ₹
                                      {pooja.pooja_price}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                "—"
                              )}
                            </td>

                            <td>{item.no_of_persons || "—"}</td>
                            <td>{item.payment_mode || "—"}</td>
                            <td>
                              {item.grand_total ? `₹${item.grand_total}` : "—"}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="13" className="text-center py-3">
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

export default DarshanDetails;
