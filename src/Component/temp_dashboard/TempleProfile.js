import React, { useEffect, useState } from "react";
import "../../assets/CSS/TempleLeftNav.css";
import "../../assets/CSS/DashBoard.css";
import { Col, Row, Card, Button, Image, Spinner } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaUserAlt, FaEdit, FaLandmark, FaUniversity } from "react-icons/fa";
import TempleLeftNav from "./TempleLeftNav";
import "../../assets/CSS/Temple_DashBoard.css";
import axios from "axios";

const TempleProfile = () => {
  const [templeData, setTempleData] = useState(null);
  const [loading, setLoading] = useState(true);

  const TEMPLE_API = "https://mahadevaaya.com/backend/api/get-temple/?temple_id=TEM/2025/95801";

  useEffect(() => {
    const fetchTempleData = async () => {
      try {
        const response = await axios.get(TEMPLE_API);
        setTempleData(response.data);
      } catch (error) {
        console.error("Error fetching temple data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTempleData();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="warning" /> <p>Loading Temple Details...</p>
      </div>
    );
  }

  if (!templeData) {
    return (
      <div className="text-center mt-5 text-danger">
        <p>Temple data not found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <aside className="temp-sidebar">
          <TempleLeftNav />
        </aside>

        {/* Main Section */}
        <main className="main-container">
          <div className="content-box">
            <Row className="justify-content-center">
              <Col lg={12} md={12} sm={12}>
                <Card className="shadow pandit-profile-card">
                  <Card.Body>
                    <Row>
                      {/* Left Section */}
                      <Col md={4} className="text-center border-end">
                        <Image
                          src={templeData.temple_image}
                          roundedCircle
                          className="profile-avatar mb-3"
                          alt={templeData.temple_name}
                        />
                        <h4 className="pandit-name">{templeData.temple_name}</h4>
                        <p className="pandit-role text-capitalize">{templeData.temple_type} Temple</p>
                        <Button variant="warning" className="mt-2 edit-btn">
                          <FaEdit className="me-2" /> Edit Profile
                        </Button>
                      </Col>

                      {/* Right Section */}
                      <Col md={8}>
                        <h5 className="mb-3 text-center text-md-start">Temple Information</h5>
                        <hr />
                        <Row>
                          <Col sm={6} className="mb-3">
                            <p className="info-label">
                              <FaLandmark className="me-2 text-warning" /> Temple ID
                            </p>
                            <p className="info-value">{templeData.temple_id}</p>
                          </Col>
                          <Col sm={6} className="mb-3">
                            <p className="info-label">
                              <FaPhoneAlt className="me-2 text-warning" /> Phone
                            </p>
                            <p className="info-value">{templeData.phone}</p>
                          </Col>
                          <Col sm={6} className="mb-3">
                            <p className="info-label">
                              <FaEnvelope className="me-2 text-warning" /> Email
                            </p>
                            <p className="info-value">{templeData.email}</p>
                          </Col>
                          <Col sm={6} className="mb-3">
                            <p className="info-label">
                              <FaMapMarkerAlt className="me-2 text-warning" /> Address
                            </p>
                            <p className="info-value">
                              {templeData.temple_address}, {templeData.city}, {templeData.state} - {templeData.zip_code}
                            </p>
                          </Col>
                        </Row>

                        <h5 className="mt-4 mb-3 text-center text-md-start">Temple Details</h5>
                        <hr />
                        <Row>
                          <Col sm={6}>
                            <p className="info-label">Ownership Type</p>
                            <p className="info-value text-capitalize">{templeData.temple_ownership_type}</p>
                          </Col>
                          <Col sm={6}>
                            <p className="info-label">Year of Establishment</p>
                            <p className="info-value">{templeData.year_of_establishment}</p>
                          </Col>
                        </Row>

                        <p className="bio-text mt-3">{templeData.temple_description}</p>

                        <h5 className="mt-4 mb-3 text-center text-md-start">Bank Details</h5>
                        <hr />
                        <Row>
                          <Col sm={6}>
                            <p className="info-label">
                              <FaUniversity className="me-2 text-warning" /> Bank Name
                            </p>
                            <p className="info-value">{templeData.bank_name}</p>
                          </Col>
                          <Col sm={6}>
                            <p className="info-label">Account Number</p>
                            <p className="info-value">{templeData.account_number}</p>
                          </Col>
                          <Col sm={6}>
                            <p className="info-label">IFSC Code</p>
                            <p className="info-value">{templeData.ifsc_code}</p>
                          </Col>
                          <Col sm={6}>
                            <p className="info-label">Account Type</p>
                            <p className="info-value text-capitalize">{templeData.account_type}</p>
                          </Col>
                        </Row>

                        {templeData.temple_poojas?.length > 0 && (
                          <>
                            <h5 className="mt-4 mb-3 text-center text-md-start">Pooja List</h5>
                            <hr />
                            {templeData.temple_poojas.map((pooja) => (
                              <div key={pooja.temple_pooja_id} className="d-flex justify-content-between border-bottom py-2">
                                <span>{pooja.temple_pooja_name}</span>
                                <span>₹{pooja.temple_pooja_price}</span>
                              </div>
                            ))}
                          </>
                        )}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </main>
      </div>
    </>
  );
};

export default TempleProfile;
