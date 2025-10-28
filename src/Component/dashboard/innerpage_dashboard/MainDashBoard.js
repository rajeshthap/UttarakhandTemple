import React, { useEffect, useState } from "react";
import "../../../assets/CSS/LeftNav.css";
import "../../../assets/CSS/DashBoard.css";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import LeftNav from "../LeftNav";
import { FaOm } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { MdEventAvailable } from "react-icons/md";
import { RiFilePaper2Line } from "react-icons/ri";
import PanditImg from "../../../assets/images/pandit_icon.png";
import { BiSolidDonateBlood } from "react-icons/bi";
import { GiByzantinTemple } from "react-icons/gi";
import axios from "axios";
import { useAuth } from "../../GlobleAuth/AuthContext";
import NewsUpdates from "../AboutUsDashBoard/NewsUpdate";
import { useNavigate } from "react-router-dom";
import { BASE_URLL } from "../../BaseURL";
const MainDashBoard = () => {
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
  const navigate = useNavigate();
  const { uniqueId } = useAuth();
  const [sevaCount, setSevaCount] = useState(0);
  const [donationCount, setDonationCount] = useState(0);
  const [panditCount, setPanditCount] = useState(0);
  const [darshanCount, setDarshanCount] = useState(0);

  React.useEffect(() => {
    if (!uniqueId) navigate("/Login");
  }, [uniqueId, navigate]);

  useEffect(() => {
    if (!uniqueId) return;

    const fetchSevaData = async () => {
      try {
        const res = await axios.get(
          `${BASE_URLL}/api/seva-booking/?creator_id=${uniqueId}`
        );

        if (Array.isArray(res.data)) {
          setSevaCount(res.data.length);
        } else if (res.data && Array.isArray(res.data.results)) {
          setSevaCount(res.data.results.length);
        } else {
          // console.warn("Unexpected API response:", res.data);
          setSevaCount(0);
        }
      } catch (error) {
        // console.error("Error fetching Seva booking data:", error);
        setSevaCount(0);
      }
    };

    fetchSevaData();
  }, [uniqueId]);

  useEffect(() => {
    if (!uniqueId) return;

    const fetchDonationData = async () => {
      try {
        const res = await axios.get(
          `${BASE_URLL}/api/donation/?creator_id=${uniqueId}`
        );
        if (Array.isArray(res.data)) {
          setDonationCount(res.data.length);
        } else if (res.data && Array.isArray(res.data.results)) {
          setDonationCount(res.data.results.length);
        } else {
          // console.warn("Unexpected donation API response:", res.data);
          setDonationCount(0);
        }
      } catch (error) {
        // console.error("Error fetching Donation data:", error);
        setDonationCount(0);
      }
    };

    fetchDonationData();
  }, [uniqueId]);

  useEffect(() => {
    if (!uniqueId) return;

    const fetchPanditData = async () => {
      try {
        const res = await axios.get(
          `${BASE_URLL}/api/hire-pandit/?creator_id=${uniqueId}`
        );

        if (Array.isArray(res.data)) {
          setPanditCount(res.data.length);
        } else if (res.data && Array.isArray(res.data.results)) {
          setPanditCount(res.data.results.length);
        } else {
          // console.warn("Unexpected pandit API response:", res.data);
          setPanditCount(0);
        }
      } catch (error) {
        // console.error("Error fetching Pandit booking data:", error);
        setPanditCount(0);
      }
    };

    fetchPanditData();
  }, [uniqueId]);

  useEffect(() => {
    if (!uniqueId) return;

    const fetchDarshanData = async () => {
      try {
        const res = await axios.get(
          `${BASE_URLL}/api/darshan-pooja-booking/?creator_id=${uniqueId}`
        );

        if (Array.isArray(res.data)) {
          setDarshanCount(res.data.length);
        } else if (res.data && Array.isArray(res.data.results)) {
          setDarshanCount(res.data.results.length);
        } else {
          // console.warn("Unexpected darshan API response:", res.data);
          setDarshanCount(0);
        }
      } catch (error) {
        // console.error("Error fetching Darshan data:", error);
        setDarshanCount(0);
      }
    };

    fetchDarshanData();
  }, [uniqueId]);

  return (
    <>
      {/* Main Wrapper */}
      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <LeftNav />
        </aside>
        {/* Right-hand Main Container */}
        <main className="main-container">
          <div className="content-box">
            <h1 className=" fw500">
              <span class="fw700h1">Devotee </span> Dashboard
            </h1>
            {/* <div>
              <h1>Main Dashboard</h1>
              <p>Unique ID: {uniqueId}</p>{" "}
            </div> */}
            <Row>
              <Col lg={3} md={3} sm={12}>
                <Card className="shadow-sm rounded dbcard-box-1 flex-fill mb-2" onClick={() => navigate("/SevaDetails")}
    style={{ cursor: "pointer" }} >
                  <Card.Body>
                    <div className="d-flex align-items-start justify-content-between gap-1 flex-wrap">
                      <div>
                        <span className="text-muted d-block mb-1 user-sub-title">
                          Seva
                        </span>
                        <h4 className="fw-medium mb-0">{sevaCount}</h4>
                        <div>
                          <span className="user-span">Seva Booked</span>
                        </div>
                      </div>
                      <div className="lh-1">
                        <div className="avatar-md avatar-rounded save-bg d-flex align-items-center justify-content-center">
                          <FaOm />
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={3} sm={12}>
                <Card className="shadow-sm dbcard-box-2 flex-fill" onClick={() => navigate("/DarshanDetails")}
    style={{ cursor: "pointer" }}>
                  <Card.Body>
                    <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap  ">
                      <div>
                        <span className="text-muted d-block mb-1 text-nowrap  user-sub-title">
                          {" "}
                          Darshans
                        </span>{" "}
                        <h4 className="fw-medium mb-0">{darshanCount}</h4>
                        <div>
                          <span className="user-span">Darshan Booked</span>
                        </div>
                      </div>
                      <div className="lh-1">
                        <div className=" avatar-md avatar-rounded Darshan-bg flex-shrink-0 d-flex align-items-center justify-content-center ">
                          <GiByzantinTemple />{" "}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={3} sm={12}>
                <Card className="shadow-sm rounded  flex-fill dbcard-box-4" onClick={() => navigate("/PanditDetails")}
    style={{ cursor: "pointer" }}>
                  <Card.Body>
                    <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap  ">
                      <div>
                        <span className="text-muted d-block mb-1 text-nowrap  user-sub-title">
                          {" "}
                          Pandit
                        </span>{" "}
                        <h4 className="fw-medium mb-0">{panditCount}</h4>
                        <div>
                          <span className="user-span">Booking Count</span>
                        </div>
                      </div>
                      <div className="lh-1">
                        <div className=" avatar-md avatar-rounded pandit-bg flex-shrink-0 d-flex align-items-center justify-content-center ">
                          <img
                            src={PanditImg}
                            alt="Pandit"
                            className=" img-fluid"
                          />{" "}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={3} sm={12}>
                <Card className="shadow-sm rounded  flex-fill dbcard-box-3" onClick={() => navigate("/DonationsDetails")}
    style={{ cursor: "pointer" }}>
                  <Card.Body>
                    <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap  ">
                      <div>
                        <span className="text-muted d-block mb-1 text-nowrap  user-sub-title">
                          {" "}
                          Donations
                        </span>{" "}
                        <h4 className="fw-medium mb-0">{donationCount}</h4>
                        <div>
                          <span className="user-span">Donations</span>
                        </div>
                      </div>

                      <div className="lh-1">
                        <div className=" avatar-md avatar-rounded Donations-bg flex-shrink-0 d-flex align-items-center justify-content-center ">
                          <BiSolidDonateBlood />{" "}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col lg={8} md={8} sm={12} className=" mt-3">
                <div class="sd-upcoming-bookings">
                  <div class="">
                    <h3 class="sd-side-heading-2 fw600">
                      {" "}
                      <MdEventAvailable className="up-come-icon" />
                      <span class="fw700">Upcoming</span> Bookings
                    </h3>
                    <div class="clearfix sd-upcoming-bookings-table">
                      <table>
                        <p>
                          {" "}
                          <RiFilePaper2Line className="up-come-icon-sub mx-2" />{" "}
                          Sorry! There seems to be no current bookings.
                        </p>
                      </table>
                    </div>
                  </div>
                </div>

                <Row>
                  <Col lg={6} md={6} sm={12}>
                    <div className="mt-3 user-upcoming-bookings d-flex">
                      <Col lg={2} md={2} sm={12}>
                        {/* <div className="">
                            <img src={PanditImg} alt="Pandit" className="seva-come-icon-darshanam img-fluid" />
                          </div> */}

                        <FaOm className="seva-come-icon-darshanam" />
                      </Col>
                      <Col lg={10} md={10} sm={12} className="user-seva-text">
                        <h3>Seva and Darshanam</h3>
                        <p>
                          Darshan and Seva tickets can now be bought offline at
                          the ticket counter and online via our website. Relish
                          by visiting Sri Kanaka Durgamma Devasthanam
                        </p>
                        <div className="clearfix user-btn-all mt-4">
                          <button className="sd-btn-blue">
                            Book Now{" "}
                            <IoIosArrowForward className="user-seva-btn-icon" />
                          </button>
                        </div>
                      </Col>
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <div className="mt-3 pandit-upcoming-bookings d-flex">
                      <Col lg={2} md={2} sm={12}>
                        <div className="pnadit-w">
                          <img
                            src={PanditImg}
                            alt="Pandit"
                            className="seva-come-icon-darshanam img-fluid"
                          />
                        </div>

                        {/* <FaOm className="seva-come-icon-darshanam" /> */}
                      </Col>
                      <Col lg={10} md={10} sm={12} className="user-seva-text">
                        <h3>Pandit Booking</h3>
                        <p>
                          Darshanam and Seva tickets can now be bought offline
                          at the ticket counter and online via our website.
                          Relish by visiting Sri Kanaka Durgamma Devasthanam
                        </p>
                        <div className="clearfix user-btn-all mt-4">
                          <button className="pandit-btn-blue">
                            Book Now{" "}
                            <IoIosArrowForward className="user-seva-btn-icon" />
                          </button>
                        </div>
                      </Col>
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <div className="mt-3 donation-upcoming-bookings d-flex">
                      <Col lg={2} md={2} sm={12}>
                        {/* <div className="">
                            <img src={PanditImg} alt="Pandit" className="seva-come-icon-darshanam img-fluid" />
                          </div> */}

                        <BiSolidDonateBlood className="seva-come-icon-darshanam" />
                      </Col>
                      <Col lg={10} md={10} sm={12} className="user-seva-text">
                        <h3>Donations</h3>
                        <p>
                          Darshanam and Seva tickets can now be bought offline
                          at the ticket counter and online via our website.
                          Relish by visiting Sri Kanaka Durgamma Devasthanam
                        </p>
                        <div className="clearfix user-btn-all mt-4">
                          <button className="donation-btn-blue">
                            Donate Now{" "}
                            <IoIosArrowForward className="user-seva-btn-icon" />
                          </button>
                        </div>
                      </Col>
                    </div>
                  </Col>

                  <Col lg={6} md={6} sm={12}>
                    <div className="mt-3 pooja-upcoming-bookings d-flex">
                      <Col lg={2} md={2} sm={12}>
                        {/* <div className="">
                            <img src={PanditImg} alt="Pandit" className="seva-come-icon-darshanam img-fluid" />
                          </div> */}

                        <GiByzantinTemple className="seva-come-icon-darshanam" />
                      </Col>
                      <Col lg={10} md={10} sm={12} className="user-seva-text">
                        <h3>Poojs Booking</h3>
                        <p>
                          Darshanam and Seva tickets can now be bought offline
                          at the ticket counter and online via our website.
                          Relish by visiting Sri Kanaka Durgamma Devasthanam
                        </p>
                        <div className="clearfix user-btn-all mt-4">
                          <button className="pooja-btn-blue">
                            Book Now{" "}
                            <IoIosArrowForward className="user-seva-btn-icon" />
                          </button>
                        </div>
                      </Col>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col lg={4} md={4} sm={12} className="">
                <Row>
                  <NewsUpdates />
                </Row>
              </Col>
            </Row>

            <Row className="mt-3">
              <h2>Transaction History</h2>
              <div class="col-md-12">
                <table class="rwd-table">
                  <tbody>
                   
                    <tr>
                      <th>Supplier Code</th>
                      <th>Supplier Name</th>
                      <th>Invoice Number</th>
                      <th>Invoice Date</th>
                      <th>Due Date</th>
                      <th>Net Amount</th>
                    </tr>
                    <tr>
                      <td data-th="Supplier Code">UPS5005</td>
                      <td data-th="Supplier Name">UPS</td>
                      <td data-th="Invoice Number">ASDF19218</td>
                      <td data-th="Invoice Date">06/25/2016</td>
                      <td data-th="Due Date">12/25/2016</td>
                      <td data-th="Net Amount">$8,322.12</td>
                    </tr>
                    <tr>
                      <td data-th="Supplier Code">UPS3449</td>
                      <td data-th="Supplier Name">UPS South Inc.</td>
                      <td data-th="Invoice Number">ASDF29301</td>
                      <td data-th="Invoice Date">6/24/2016</td>
                      <td data-th="Due Date">12/25/2016</td>
                      <td data-th="Net Amount">$3,255.49</td>
                    </tr>
                    <tr>
                      <td data-th="Supplier Code">BOX5599</td>
                      <td data-th="Supplier Name">BOX Pro West</td>
                      <td data-th="Invoice Number">ASDF43000</td>
                      <td data-th="Invoice Date">6/27/2016</td>
                      <td data-th="Due Date">12/25/2016</td>
                      <td data-th="Net Amount">$45,255.49</td>
                    </tr>
                    <tr>
                      <td data-th="Supplier Code">PAN9999</td>
                      <td data-th="Supplier Name">Pan Providers and Co.</td>
                      <td data-th="Invoice Number">ASDF33433</td>
                      <td data-th="Invoice Date">6/29/2016</td>
                      <td data-th="Due Date">12/25/2016</td>
                      <td data-th="Net Amount">$12,335.69</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </>
  );
};

export default MainDashBoard;
