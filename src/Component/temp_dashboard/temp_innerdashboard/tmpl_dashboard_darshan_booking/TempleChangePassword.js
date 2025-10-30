import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import TempleLeftNav from "../../TempleLeftNav";
import { BASE_URLL } from "../../../BaseURL";
import { useAuth } from "../../../GlobleAuth/AuthContext";

const TempleChangePassword = () => {
  const { uniqueId } = useAuth();
  const [profile, setProfile] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  //  Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URLL}/api/get-temple/?temple_id=${uniqueId}`);
        if (res.data) {
          setProfile(res.data);
          // Masked password for display only
          setOldPassword("********");
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };
    if (uniqueId) fetchProfile();
  }, [uniqueId]);

  //  Live validation
  useEffect(() => {
    const errors = { newPassword: "", confirmPassword: "" };

    if (newPassword && newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters long";
    } else if (newPassword && !/[A-Z]/.test(newPassword)) {
      errors.newPassword = "Include at least one uppercase letter";
    } else if (newPassword && !/[0-9]/.test(newPassword)) {
      errors.newPassword = "Include at least one number";
    } else if (newPassword && !/[@$!%*?&#]/.test(newPassword)) {
      errors.newPassword = "Include at least one special character";
    }
    if (confirmPassword && confirmPassword !== newPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    setValidationErrors(errors);
  }, [newPassword, confirmPassword]);

  // Handle update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (
      validationErrors.newPassword ||
      validationErrors.confirmPassword ||
      !newPassword ||
      !confirmPassword
    )
     {
      setError("Please fix validation errors before submitting");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${BASE_URLL}api/get-temple/?temple_id=${uniqueId}`,
        { password: newPassword }
      );

      if (res.status === 200) {
        alert(" Password updated successfully!");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError("Failed to update password");
      }
    } catch (err) {
      console.error("Error updating password:", err);
      setError("Something went wrong while updating password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <TempleLeftNav />
      </aside>

      <main className="main-container">
        <div className="content-box">
          <div className="nd-tech-heading">
            <h1>Change Password</h1>
          </div>

          {loading && !profile ? (
            <div className="text-center py-4">
              <Spinner animation="border" />
            </div>
          ) : error && !profile ? (
            <Alert variant="danger">{error}</Alert>
          ) : profile ? (
            <Form onSubmit={handlePasswordUpdate}>
              <Row>
                <Col lg={4} md={4} sm={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="temp-label">Login Type</Form.Label>
                    <Form.Control
                      type="text"
                      value="Temple"
                      disabled
                      className="temp-form-control-option"
                    />
                  </Form.Group>
                </Col>

                <Col lg={4} md={4} sm={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="temp-label">Temple Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={profile.temple_name || ""}
                      disabled
                      className="temp-form-control-option"
                    />
                  </Form.Group>
                </Col>

                <Col lg={4} md={4} sm={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="temp-label">Mobile No.</Form.Label>
                    <Form.Control
                      type="text"
                      value={profile.phone || ""}
                      disabled
                      className="temp-form-control-option"
                    />
                  </Form.Group>
                </Col>

                <Col lg={4} md={4} sm={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="temp-label">Old Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={oldPassword}
                      disabled
                      className="temp-form-control-option"
                    />
                  </Form.Group>
                </Col>

                {/* New Password Field */}
                <Col lg={4} md={4} sm={4}>
                  <Form.Group className="mb-2">
                    <Form.Label className="temp-label">New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="temp-form-control-option"
                    />
                    {validationErrors.newPassword && (
                      <small className="text-danger">
                        {validationErrors.newPassword}
                      </small>
                    )}
                  </Form.Group>
                </Col>

                {/* Confirm Password Field */}
                <Col lg={4} md={4} sm={4}>
                  <Form.Group className="mb-2">
                    <Form.Label className="temp-label">
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="temp-form-control-option"
                    />
                    {validationErrors.confirmPassword && (
                      <small className="text-danger">
                        {validationErrors.confirmPassword}
                      </small>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <div className="project-btn mt-3">
                <Button
                  type="submit"
                  className="user-btn-edit"
                  disabled={
                    loading ||
                    validationErrors.newPassword ||
                    validationErrors.confirmPassword ||
                    !newPassword ||
                    !confirmPassword
                  }
                >
                  {loading ? "Updating..." : "Edit Password"}
                </Button>
              </div>

              {message && (
                <Alert variant="success" className="mt-3 text-center fw-bold">
                  {message}
                </Alert>
              )}
              {error && (
                <Alert variant="danger" className="mt-3 text-center fw-bold">
                  {error}
                </Alert>
              )}
            </Form>
          ) : (
            <p>No user data found</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default TempleChangePassword;
