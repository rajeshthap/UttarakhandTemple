import React, { useState } from "react";
import "../../../assets/CSS/PanditLeftNav.css";
import {
  Breadcrumb,
  Form,
  Button,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
} from "react-bootstrap";
// import { Mail, Phone, MessageSquare } from "lucide-react";
import PanditLeftNav from "../PanditLeftNav";

const PanditSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    subject: "",
    message: "",
    file: "",

  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      setTimeout(() => {
        setSubmitted(true);
        setSubmitting(false);
        setFormData({
          name: "",
          mobile: "",
          email: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setSubmitted(false), 4000);
      }, 1000);
    } catch (err) {
      console.error("Support form error:", err);
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="dashboard-wrapper">
        <aside className="sidebar">
          <PanditLeftNav />
        </aside>

        <main className="main-container-box">
          <div className="content-box">
            {/* Header Section */}
            <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
              <h1 className="fw500">
                <Breadcrumb>
                  <Breadcrumb.Item href="/Pandit_DashBoard">
                    <span className="fw700h1">Dashboard</span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>Support</Breadcrumb.Item>
                </Breadcrumb>
              </h1>
              <div>
              
              </div>
            </div>

            {/* Support Section */}
            <Row className="mt-4">
              <Card className="p-4 shadow-sm rounded-4 border-0">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col lg={6} md={6} sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">
                          User Name <span className="temp-span-star">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="displayName"
                          className="temp-form-control-option"
                          onChange={handleChange}
                          placeholder="Enter name"
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">
                          Phone <span className="temp-span-star">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="displayName"
                          className="temp-form-control-option"
                          onChange={handleChange}
                          placeholder="Enter Phone"
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">
                          Email <span className="temp-span-star">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="displayName"
                          className="temp-form-control-option"
                          onChange={handleChange}
                          placeholder="Enter Email"
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">
                          Subject <span className="temp-span-star">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="subject"
                          className="temp-form-control-option shadow-sm rounded-3"
                          onChange={handleChange}
                          placeholder="Enter subject here..."
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">
                          Message <span className="temp-span-star">*</span>
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="subject"
                          className="temp-form-control-option shadow-sm rounded-3"
                          onChange={handleChange}
                          placeholder="Enter message here..."
                          required
                        />
                      </Form.Group>
                    </Col>
                     <Col lg={6} md={6} sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">
                          File
                        </Form.Label>
                        <Form.Control
                          type="file"
                          name="subject"
                          className="temp-form-control-option shadow-sm rounded-3"
                          onChange={handleChange}
                          placeholder="Enter message here..."
                          required
                        />
                      </Form.Group>
                    </Col>

                  </Row>

                  <div className="">
                    <Button
                      type="submit"
                      className="btn-save mt-2 py-2"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </div>
                </Form>
              </Card>
            </Row>
          </div>
        </main>
      </div>
    </>
  );
};

export default PanditSupport;
