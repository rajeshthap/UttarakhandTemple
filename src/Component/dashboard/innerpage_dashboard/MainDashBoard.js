import React, { useEffect } from "react";
import "../../../assets/CSS/LeftNav.css";
import "../../../assets/CSS/DashBoard.css";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import LeftNav from "../LeftNav";
import { FaHandsPraying, FaOm } from "react-icons/fa6";
import { BsNewspaper } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { MdEventAvailable } from "react-icons/md";
import { RiFilePaper2Line } from "react-icons/ri";
import PanditImg from "../../../assets/images/pandit_icon.png";
import { BiSolidDonateBlood } from "react-icons/bi";
import { GiByzantinTemple } from "react-icons/gi";

import { useAuth } from "../../GlobleAuth/AuthContext";
import NewsUpdates from "../AboutUsDashBoard/NewsUpdate";
import { useNavigate } from "react-router-dom";
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
  React.useEffect(() => {
    if (!uniqueId) navigate("/Login");
  }, [uniqueId, navigate]);

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
                <Card className="shadow-sm  rounded  dbcard-box-1 flex-fill mb-2">
                  <Card.Body>

                    <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap  ">
                      <div>
                        <span className="text-muted d-block mb-1 text-nowrap  user-sub-title">  Seva</span> <h4 className="fw-medium mb-0">0</h4>
                        <div><span className="user-span">Seva Booked</span></div>
                      </div>

                      <div className="lh-1">
                        <div className=" avatar-md avatar-rounded save-bg flex-shrink-0 d-flex align-items-center justify-content-center ">
                          <FaOm className=" " /> </div>
                      </div></div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={3} sm={12}>
                <Card className="shadow-sm dbcard-box-2 flex-fill">
                  <Card.Body>
                    <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap  ">
                      <div>
                        <span className="text-muted d-block mb-1 text-nowrap  user-sub-title">    Darshan Name</span> <h4 className="fw-medium mb-0">0</h4>
                        <div><span className="user-span">Darshan Booked</span></div>
                      </div>
                      <div className="lh-1">
                        <div className=" avatar-md avatar-rounded Darshan-bg flex-shrink-0 d-flex align-items-center justify-content-center ">
                          <GiByzantinTemple /> </div>
                      </div></div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={3} sm={12}>
                <Card className="shadow-sm rounded  flex-fill dbcard-box-4">
                  <Card.Body>
                    <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap  ">
                      <div>
                        <span className="text-muted d-block mb-1 text-nowrap  user-sub-title">      Pandit</span> <h4 className="fw-medium mb-0">0</h4>
                        <div><span className="user-span">Booking Count</span></div>
                      </div>
                      <div className="lh-1">
                        <div className=" avatar-md avatar-rounded pandit-bg flex-shrink-0 d-flex align-items-center justify-content-center ">
                          <img
                            src={PanditImg}
                            alt="Pandit"
                            className=" img-fluid"
                          /> </div>
                      </div></div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={3} sm={12}>
                <Card className="shadow-sm rounded  flex-fill dbcard-box-3">
                  <Card.Body>
                    <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap  ">
                      <div>
                        <span className="text-muted d-block mb-1 text-nowrap  user-sub-title">      Donations</span> <h4 className="fw-medium mb-0">0</h4>
                        <div><span className="user-span">Donations</span></div>
                      </div>

                      <div className="lh-1">
                        <div className=" avatar-md avatar-rounded Donations-bg flex-shrink-0 d-flex align-items-center justify-content-center ">
                          <BiSolidDonateBlood /> </div>
                      </div></div>

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
                          Darshan and Seva tickets can now be bought offline
                          at the ticket counter and online via our website.
                          Relish by visiting Sri Kanaka Durgamma Devasthanam
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
                  <tbody>jhjhj
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
