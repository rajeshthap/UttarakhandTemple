import React, { useState, useEffect, useMemo } from "react";
import { Breadcrumb, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../../GlobleAuth/AuthContext";
import TempleLeftNav from "../../TempleLeftNav";

const Donations = () => {
  const { uniqueId } = useAuth();
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!uniqueId) return;

    const fetchDonations = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `https://mahadevaaya.com/backend/api/get-donation-booking/?creator_id=${uniqueId}`
        );

        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.results || [];

        setDonations(data);
        setFilteredDonations(data);
      } catch (err) {
        console.error("Error fetching donation data:", err);
        setError("Failed to fetch donation data. Please try again later.");
        setDonations([]);
        setFilteredDonations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [uniqueId]);

  useEffect(() => {
    const filtered = donations.filter((item) => {
      const id = item.donatiom_id?.toLowerCase() || "";
      const name = item.pilgrim_name?.toLowerCase() || "";
      const mobile = item.mobile_number?.toString() || "";
      const amount = item.amount?.toString() || "";

      return (
        id.includes(searchTerm.toLowerCase()) ||
        name.includes(searchTerm.toLowerCase()) ||
        mobile.includes(searchTerm) ||
        amount.includes(searchTerm)
      );
    });
    setFilteredDonations(filtered);
  }, [searchTerm, donations]);

  const totalDonation = useMemo(() => {
    return filteredDonations.reduce(
      (sum, item) => sum + (parseFloat(item.amount) || 0),
      0
    );
  }, [filteredDonations]);

  return (
    <>
      <div className="dashboard-wrapper">
        <aside className="sidebar">
          <TempleLeftNav />
        </aside>

        <main className="main-container-box">
          <div className="content-box">
            <Row>
              <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
                <h1 className="fw500">
                  <Breadcrumb>
                    <Breadcrumb.Item href="/MainDashBoard">
                      <span className="fw700h1">DashBoard </span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                      Donation Details
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </h1>

                <div>
                  <div className="d-flex justify-content-center h-100">
                    <div className="search">
                      <input
                        className="search_input"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search here..."
                      />
                      <button type="button" className="search_icon">
                        <i className="fa fa-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                {loading ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                  </div>
                ) : error ? (
                  <div className="text-center text-danger fw-bold py-5">
                    {error}
                  </div>
                ) : (
                  <table className="rwd-table">
                    <tbody>
                      <tr>
                        <th>Donation ID</th>
                        <th>Pilgrim Name</th>
                        <th>Mobile Number</th>
                        <th>Amount (₹)</th>
                      </tr>

                      {filteredDonations.length > 0 ? (
                        <>
                          {filteredDonations.map((item, index) => (
                            <tr key={index}>
                              <td data-th="Donation ID">{item.donatiom_id}</td>
                              <td data-th="Pilgrim Name">
                                {item.pilgrim_name}
                              </td>
                              <td data-th="Mobile Number">
                                {item.mobile_number}
                              </td>
                              <td data-th="Amount">{item.amount}</td>
                            </tr>
                          ))}

                          <tr>
                            <td colSpan="3" className="text-end fw-bold">
                              Total Donation:
                            </td>
                            <td className="fw-bold">₹{totalDonation.toFixed(2)}</td>
                          </tr>
                        </>
                      ) : (
                        <tr>
                          <td
                            colSpan="4"
                            className="text-center text-muted fw-bold"
                          >
                            No donation records found.
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

export default Donations;
