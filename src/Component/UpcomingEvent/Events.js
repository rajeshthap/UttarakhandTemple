import React from "react";
import { Button, Col, Container, Row, Card } from "react-bootstrap";
import TempleLeftNav from "../temp_dashboard/TempleLeftNav";
const Events = () => {
  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <TempleLeftNav />
      </aside>

      {/* Right-hand Main Container */}

      <main className="main-container-box">
        <div className="content-box">
          <Container className="temp-container">
            <h1>Temple Facility Booking</h1>
            <p>
              <i>
                Your support helps us preserve sacred traditions, maintain
                temple facilities, and serve the community with devotion and
                care.
              </i>
            </p>

            <Row>
              <Col lg={8} md={8} sm={12} className="mt-2">
                <div lg={12} md={12} sm={12} className="event-row">
                  <Col lg={6} md={6} sm={12}>
                    <div className="">
                      {" "}
                      <Card>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                          <Card.Title>Card Title</Card.Title>
                          <Card.Text>
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </Card.Text>
                          <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <Card>
                      <Card.Img variant="top" src="holder.js/100px180" />
                      <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </div>
              </Col>

              {/* ---- Right Section ---- */}
              <Col lg={4} md={4} sm={12} className="mt-2">
                <div className="tem-rhs">
                  <h3>Guidelines for Online Donation</h3>

                  <div>
                    <ul>
                      <li>
                        Fields marked with{" "}
                        <span className="temp-span-star">*</span> are mandatory.
                      </li>

                      <li>
                        As per Government of India (GOI) regulations,{" "}
                        <span className="temp-span-star">
                          foreign cards are not supported
                        </span>
                        . Devotees residing outside{" "}
                        <span className="temp-span-star">
                          India may donate through Indian payment modes/cards{" "}
                        </span>
                        only.
                      </li>

                      <li>
                        Donations above{" "}
                        <span className="temp-span-star">₹1,00,000</span>{" "}
                        entitle you to{" "}
                        <span className="temp-span-star">
                          free Puja and Darshan for one year
                        </span>
                        .
                      </li>

                      <li>
                        Donations can be made{" "}
                        <span className="temp-span-star">on any day</span>, even
                        when the temple is closed.
                      </li>
                    </ul>

                    <h2>Accepted Payment Methods</h2>
                    <ul>
                      <li>
                        Net Banking – Secure online transfers through major
                        Indian banks.
                      </li>
                      <li>
                        Debit Card – Quick and convenient payment using your
                        bank card.
                      </li>
                      <li>
                        Credit Card – Hassle-free donations with instant
                        confirmation.
                      </li>
                      <li>
                        UPI (Unified Payments Interface) – Fast, mobile-based
                        payment option.
                      </li>
                      <li>
                        BharatPe QR – Scan & Pay instantly via supported payment
                        apps.
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </main>
    </div>
  );
};

export default Events;
