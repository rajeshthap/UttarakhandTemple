import React, { useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import "../../assets/CSS/TempleAuthority.css";
import { useNavigate } from "react-router-dom";
import ModifyAlert from "../../Component/Alert/ModifyAlert";
import DevoteeImg from "../../assets/images/User-regi-img.png";
import PanditImg from "../../assets/images/pandit-img.png";
import TempleImg from "../../assets/images/temple-img.jpg";
import AdminImg from "../../assets/images/about-img.png";
import DefaultImg from "../../assets/images/about-inner-img.png";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({
    role: "user",
    email_or_password: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModifyAlert, setShowModifyAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  const roleImages = {
    user: DevoteeImg,
    admin: AdminImg,
    pandit: PanditImg,
    temple: TempleImg,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email_or_password || !formData.password) {
      setAlertMessage("Please fill in all fields");
      setShowModifyAlert(true);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://brjobsedu.com/Temple_portal/api/login/",
        formData
      );
      const userData = res.data;

      // Redirect based on role
      switch (formData.role.toLowerCase()) {
        case "admin":
          navigate("/DashBoard");
          break;
        case "pandit":
          navigate("/Pandit_DashBoard");
          break;
        case "user":
          navigate("/MainDashBoard");
          break;
        case "temple":
          navigate("/TempleDashBoard");
          break;
        default:
          navigate("/");
      }

      setAlertMessage("Login successful!");
      setShowModifyAlert(true);
    } catch (err) {
      setAlertMessage(
        err.response?.data?.detail || "Invalid username or password"
      );
      setShowModifyAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const roleHeading = formData.role
    ? `${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} Login`
    : "Login";

  const roleImage = roleImages[formData.role] || DefaultImg;

  return (
    <div className="temp-donate">
      <Container className="temp-container">
        <div className="temple-registration-heading">
          <h1>{roleHeading}</h1>
          <Form onSubmit={handleSubmit}>
            <Row className="mt-3">
              <Col lg={6} md={6}>
                {/* Role Selection */}
                <Form.Group className="mb-3">
                  <Form.Label className="temp-label-lg-bg">
                    Login As <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Select
                    name="role"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        role: e.target.value.toLowerCase(),
                      })
                    }
                  >
                    <option value="admin">Admin</option>
                    <option value="temple">Temple</option>
                    <option value="pandit">Pandit</option>
                    <option value="user">User</option>
                  </Form.Select>
                </Form.Group>

                {/* Email / Mobile */}
                <Form.Group className="mb-3">
                  <Form.Label className="temp-label-lg-bg">
                    Email or Mobile Number{" "}
                    <span className="temp-span-star">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="email_or_password"
                    value={formData.email_or_password}
                    onChange={handleChange}
                    placeholder="Registered Mobile No. / Email"
                    className="temp-form-control-bg"
                  />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">
                  <Form.Label className="temp-label">
                    Password <span className="temp-span-star">*</span>
                  </Form.Label>
                  <div
                    className="password-wrapper"
                    style={{ position: "relative" }}
                  >
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Your Password"
                      className="temp-form-control-bg"
                    />
                    <i
                      className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"
                        } toggle-password`}
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                    ></i>
                  </div>
                </Form.Group>

                {/* Buttons */}
                <div className="d-grid gap-3 text-center mt-3">
                  <div className=""><Button
                    variant="danger"
                    type="submit"
                    disabled={loading}
                    className="temp-submit-btn"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button></div>
                  <div className="">    <Button
                    variant="danger"
                    className="temp-submit-btn-login"
                    type="button"
                    onClick={() => navigate("/ForgotPassword")}
                  >
                    Forgot Password ?
                  </Button></div>


                </div>
              </Col>

              <Col
                lg={6}
                md={6}
                sm={12}
                className="d-flex justify-content-center align-items-center"
              >
                <img
                  src={roleImage}
                  className="img-fluid"
                  alt={`${formData.role} Login`}
                />
              </Col>
            </Row>
          </Form>
        </div>
      </Container>

      {/* Alert */}
      <ModifyAlert
        message={alertMessage}
        show={showModifyAlert}
        setShow={setShowModifyAlert}
      />
    </div>
  );
}
