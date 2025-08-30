import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../../assets/CSS/TopInfo.css"; // Importing the CSS file for styling
import logo from "../../assets/images/company-logo.png";
const TopNavBar = () => {
  return (
    <>
      <div className="menu-wrapper menubar">
        <div>
          <Navbar expand="lg" className="bg-body-tertiary nav-temp">
            <Container fluid>
              <Navbar.Brand href="#">
                <img src={logo} alt="Company Logo" className="img-fluid"></img>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <NavDropdown title="Home" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#action3">
                      About Us
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action3">
                      Platform info
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Mission & Vision
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Contact Info
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action3">
                      Mandir aur platform ka overview
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Special announcements / Upcoming Events
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="/DonateTemples">Donate to Temples</Nav.Link>

                  <NavDropdown
                    title="Mandir Booking"
                    id="navbarScrollingDropdown"
                  >
                    <NavDropdown.Item href="#action3">
                      Mandir Registration{" "}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Darshan Booking
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Special Darshan / VIP Pass
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown
                    title="Pooja & Seva"
                    id="navbarScrollingDropdown"
                  >
                    <NavDropdown.Item href="#action3">
                      Pooja Booking{" "}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Seva Registration
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Event Participation
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown
                    title="Pandit Booking"
                    id="navbarScrollingDropdown"
                  >
                    <NavDropdown.Item href="#action3">
                      Online Pandit Registration{" "}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Hire a Pandit
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title="Facilities" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#action3">
                      Room Booking{" "}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Hall Booking
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Parking Booking
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Other Services
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title="Events" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#action3">
                      Upcoming Mandir Events
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Past Event Gallery
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                {/* <Form className="d-flex">
                  <div className="search">
                    <form id="searchFormTop" action="" method="get">
                      <input
                        type="text"
                        className="searchbox"
                        name="q"
                        id="q"
                        placeholder="Search..."
                      />
                      <span className="search-btn-wrap">
                        <button className="search-btn" type="submit">
                          <i className="fa fa-search"></i>
                        </button>
                      </span>
                    </form>
                  </div>
                  
                </Form> */}
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>
    </>
  );
};

export default TopNavBar;
