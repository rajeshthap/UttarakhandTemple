import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsInfoCircleFill } from "react-icons/bs";
import "../../assets/CSS/TempleAuthority.css";

const LoginPopup = ({ show, handleClose, handleLoginRegister }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>You Are Already Registered</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center p-4 my-4 temp-regis">
          <h5>
            <BsInfoCircleFill className="temp-info-icon" />
            Please log in to continue. {" "} Click the
            <strong> login</strong>
          </h5>
          <p>
            Button below to <strong>Access</strong> your Account.
          </p>
          <Row className="mb-3">
            <Col lg={12} md={6} className="mb-2 mb-md-0">
              <Link to="/Login">
                <Button
                  className=" temp-login-btn text-center"
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
