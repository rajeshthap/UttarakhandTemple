import React from "react";
import "../../../assets/CSS/LeftNav.css";
import "../../../assets/CSS/DashBoard.css";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import LeftNav from "../LeftNav";
import { FaHandsPraying, FaOm } from "react-icons/fa6";
import { MdOutlineSwipeUp } from "react-icons/md";
import { BsNewspaper } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { FaHandHoldingWater } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { RiFilePaper2Line } from "react-icons/ri";
import PanditImg from "../../../assets/images/pandit_icon.png";
import { BiSolidDonateBlood } from "react-icons/bi";
import { GiByzantinTemple } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../GlobleAuth/AuthContext";
const MainDashBoard = () => {
  const navigate = useNavigate();
  const { uniqueId } = useAuth();
  // React.useEffect(() => {
  //   if (!uniqueId) navigate("/Login");
  // }, [uniqueId, navigate]);

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
              <Col lg={3} md={3} sm={12} className="d-flex">
                <Card className="shadow-sm  rounded  dbcard-box-1 flex-fill">
                  <Card.Body>
                    <Card.Title className="">
                      <FaHandsPraying />
                    </Card.Title>
                    <Card.Subtitle className="mb-2 user-sub-title">
                      Sevas
                      <br></br>
                      <span className="user-sub-title-data">0</span>
                      <br></br> <span className="user-span">Sevas Booked</span>
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={3} sm={12} className="d-flex">
                <Card className="shadow-sm dbcard-box-2 flex-fill">
                  <Card.Body>
                    <Card.Title className="">
                      <FaHandsPraying />
                    </Card.Title>
                    <Card.Subtitle className="mb-2 user-sub-title">
                      Darshanam
                      <br></br>
                      <span className="user-sub-title-data">0</span>
                      <br></br>{" "}
                      <span className="user-span">Darshanams Booked</span>
                    </Card.Subtitle>
                    {/* <Card.Text>

                                        </Card.Text> */}
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={3} md={3} sm={12} className="d-flex">
                <Card className="shadow-sm rounded  flex-fill dbcard-box-4">
                  <Card.Body>
                    <Card.Title className="">
                      <FaHandsPraying />
                    </Card.Title>
                    <Card.Subtitle className="mb-2 user-sub-title">
                      Pandit
                      <br></br>
                      <span className="user-sub-title-data">0</span>
                      <br></br> <span className="user-span">Booking Count</span>
                    </Card.Subtitle>

                    {/* <Card.Text>

                                        </Card.Text> */}
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={3} sm={12} className="d-flex">
                <Card className="shadow-sm rounded  flex-fill dbcard-box-3">
                  <Card.Body>
                    <Card.Title className="">
                      <FaHandsPraying />
                    </Card.Title>
                    <Card.Subtitle className="mb-2 user-sub-title">
                      Donations
                      <br></br>
                      <span className="user-sub-title-data">0</span>
                      <br></br> <span className="user-span">Donations</span>
                    </Card.Subtitle>

                    {/* <Card.Text>

                                        </Card.Text> */}
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
                      <Col lg={1} md={1} sm={12}>
                        {/* <div className="">
                            <img src={PanditImg} alt="Pandit" className="seva-come-icon-darshanam img-fluid" />
                          </div> */}

                        <FaOm className="seva-come-icon-darshanam" />
                      </Col>
                      <Col lg={11} md={11} sm={12} className="user-seva-text">
                        <h3>Sevas and Darshanam</h3>
                        <p>
                          Darshanam and Seva tickets can now be bought offline
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
                      <Col lg={1} md={2} sm={12}>
                        <div className="pnadit-w">
                          <img
                            src={PanditImg}
                            alt="Pandit"
                            className="seva-come-icon-darshanam img-fluid"
                          />
                        </div>

                        {/* <FaOm className="seva-come-icon-darshanam" /> */}
                      </Col>
                      <Col lg={11} md={10} sm={12} className="user-seva-text">
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
                      <Col lg={1} md={2} sm={12}>
                        {/* <div className="">
                            <img src={PanditImg} alt="Pandit" className="seva-come-icon-darshanam img-fluid" />
                          </div> */}

                        <BiSolidDonateBlood className="seva-come-icon-darshanam" />
                      </Col>
                      <Col lg={11} md={10} sm={12} className="user-seva-text">
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
                      <Col lg={1} md={2} sm={12}>
                        {/* <div className="">
                            <img src={PanditImg} alt="Pandit" className="seva-come-icon-darshanam img-fluid" />
                          </div> */}

                        <GiByzantinTemple className="seva-come-icon-darshanam" />
                      </Col>
                      <Col lg={11} md={10} sm={12} className="user-seva-text">
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
                  <Col lg={12} md={12} sm={12} className="">
                    <div class="sd-upcoming-events mt-3">
                      <div class="sd-side-heading fw500 sd-border-no">
                        <span class="fw700">Upcoming</span> Events
                      </div>
                      <div class="slick-list">No Events</div>
                    </div>
                  </Col>
                  <Col lg={12} md={12} sm={12}>
                    <div className="sd-news-updates ">
                      <h2 className="sd-side-heading fw500">
                        <span className="fw700">News</span> Updates
                      </h2>

                      <div className="sd-news-list mt-20">
                        <div className="item">
                          <div className="sd-news-para">
                            <div className="news-icon-text">
                              <BsNewspaper className="up-come-icon" />
                              <p>
                                Dussera Celebrations will be started with great
                                grandeur from 25-09-2022
                              </p>
                            </div>
                            <span className="sd-news-date">09 Sep 2022</span>
                          </div>
                        </div>
                      </div>

                      <div className="clearfix user-btn-all mt-4">
                        <button className="sd-btn-orange">View All</button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row>
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
