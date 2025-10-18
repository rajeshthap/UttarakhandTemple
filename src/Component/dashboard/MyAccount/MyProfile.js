import React, { useState, useEffect, useRef } from "react";
import "../../../assets/CSS/LeftNav.css";
import "../../../assets/CSS/DashBoard.css";
import { Col, Row, Form, Button, Spinner } from "react-bootstrap";
import "../../../assets/CSS/MyProfile.css";
import LeftNav from "../LeftNav";
import { useAuth } from "../../GlobleAuth/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../assets/CSS/MyProfile.css";
import { FaCamera } from "react-icons/fa";
import DefaultProfile from "../../../assets/images/Diya.png";
import { BASE_URLL } from "../../BaseURL";


const MyProfile = () => {
  const navigate = useNavigate();
  const { uniqueId } = useAuth(); // user id
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    displayName: "",
    mobile: "",
    email: "",
    dob: "",
    gender: "",
    devotee_photo: "",
  });
  const updateProfile = async ({ userId, profileData, file }) => {
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("devotee_name", profileData.displayName || "");
    if (profileData.gender) formData.append("gender", profileData.gender);
    if (profileData.dob) formData.append("dob", profileData.dob);
    if (file) formData.append("devotee_photo", file);

    const res = await axios.put(`${BASE_URLL}api/get-user/?user_id=${userId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res;
  };

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const userId = uniqueId || "";
        const response = await axios.get(
          `https://mahadevaaya.com/backend/api/get-user/?user_id=${userId}`
        );

        if (response.data) {
          const user = response.data;
          setProfile({
            displayName: user.devotee_name || "",
            mobile: user.phone || "",
            email: user.email || "",
            dob: user.dob || "",
            gender: user.gender || "",
            devotee_photo: user.devotee_photo || "",
          });

          if (user.devotee_photo) {
            const filename = user.devotee_photo.split("/").pop();
            setPreviewUrl(
              `https://mahadevaaya.com/backend/media/devotee_photos/${filename}`
            );
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [uniqueId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditPhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);

    // preview
    const reader = new FileReader();
    reader.onload = (ev) => setPreviewUrl(ev.target.result);
    reader.readAsDataURL(file);
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const userId = uniqueId || "";
      const res = await updateProfile({
        userId,
        profileData: profile,
        file: selectedFile,
      });

      if (res.status >= 200 && res.status < 300) {
        const updated = res.data || {};
        setProfile((prev) => ({
          ...prev,
          displayName: updated.devotee_name || profile.displayName,
          devotee_photo: updated.devotee_photo || prev.devotee_photo,
        }));

        if (updated.devotee_photo) {
          const filename = updated.devotee_photo.split("/").pop();
          setPreviewUrl(
            `https://mahadevaaya.com/backend/media/devotee_photos/${filename}`
          );
        }
        alert("Profile updated successfully");
      } else {
        alert(res.data?.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      alert(err.response?.data?.message || err.message || "Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <LeftNav />
      </aside>

      <main className="main-container">
        <div className="content-box">
          <h1 className="fw500">
            <span className="fw700h1">My </span> Profile
          </h1>

          {loading ? (
            <p>Loading profile...</p>
          ) : (
            <Form onSubmit={handleSubmit} className="profile-form mt-4">
              <Row className="mb-3">
                <Col lg={2} md={4} sm={12} className="text-center">
                  <div className="profile-photo-wrapper position-relative mx-auto">
                    <img
                      src={previewUrl || DefaultProfile}
                      alt={profile.displayName || "Devotee"}
                      className="profile-photo"
                    />
                    <div className="edit-overlay" onClick={handleEditPhoto}>
                      <FaCamera className="edit-icon" />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </div>
                </Col>

                <Col lg={10}>
                  <Row>
                    <Col lg={6} md={6} sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">
                          User Name <span className="temp-span-star">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="displayName"
                          value={profile.displayName}
                          className="temp-form-control-option"
                          onChange={handleChange}
                          placeholder="Enter display name"
                        />
                      </Form.Group>
                    </Col>

                    <Col lg={6} md={6} sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">
                          Mobile Number{" "}
                          <span className="temp-span-star">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="mobile"
                          value={profile.mobile}
                          disabled={!!profile?.mobile}
                          onChange={handleChange}
                          placeholder="+91 12345-67890"
                          className="temp-form-control-option"
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6} lg={6} sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">
                          Email Address <span className="temp-span-star">*</span>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={profile.email}
                          disabled={!!profile?.email}
                          onChange={handleChange}
                          placeholder="Enter email"
                          className="temp-form-control-option"
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6} lg={6} sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">
                          Gender <span className="temp-span-star">*</span>
                        </Form.Label>
                        <Form.Select
                          name="gender"
                          value={profile.gender}
                          onChange={handleChange}
                          className="temp-form-control-option"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Button type="submit" className="btn-save mt-3" disabled={saving}>
                {saving ? <Spinner animation="border" size="sm" /> : "Update Profile"}
              </Button>
            </Form>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyProfile;