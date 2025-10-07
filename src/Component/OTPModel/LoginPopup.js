import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsInfoCircleFill } from "react-icons/bs";
import "../../assets/CSS/TempleAuthority.css";

const LoginPopup = ({ show, handleClose, handleLoginRegister }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center p-4 my-4 temp-regis">
          <h5>
            <BsInfoCircleFill className="temp-info-icon" />
            To continue with your Booking, please{" "}
            <strong>login</strong>
          </h5>
          <p>
            Kindly click on the <strong>Login</strong> button below to continue.
          </p>
          <Row className="mb-3">
            <Col xs={12} md={6} className="mb-2 mb-md-0">
              <Link to="/Login">
                <Button
                  className="w-100 temp-login-btn text-center"
                  onClick={handleLoginRegister}
                >
                  Login
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginPopup;
