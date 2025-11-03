import React, { useState, useEffect, useRef, useMemo } from "react";
import "../../../assets/CSS/LeftNav.css";
import "../../../assets/CSS/DashBoard.css";
import { Col, Row, Form, Button, Spinner, Breadcrumb } from "react-bootstrap";
import "../../../assets/CSS/MyProfile.css";
import LeftNav from "../LeftNav";
import { useAuth } from "../../GlobleAuth/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../assets/CSS/MyProfile.css";
import { FaCamera } from "react-icons/fa";
import DefaultProfile from "../../../assets/images/Diya.png";
import { BASE_URLL } from "../../BaseURL";
import SearchFeature from "../../temp_dashboard/temp_innerdashboard/SearchFeature";
import ModifyAlert from "../../Alert/ModifyAlert";

const MyProfile = () => {
  const navigate = useNavigate();
  const { uniqueId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [profile, setProfile] = useState({
    displayName: "",
    mobile: "",
    email: "",
    dob: "",
    gender: "",
    devotee_photo: "",
  });
  const [originalProfile, setOriginalProfile] = useState({});
  const [imageVersion, setImageVersion] = useState(Date.now());
  
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const displayImageUrl = useMemo(() => {
    // ✅ Check if there's a selected file (local preview)
    if (selectedFile) {
      return URL.createObjectURL(selectedFile);
    }
    // ✅ Otherwise, use the server image with cache-busting
    if (profile.devotee_photo) {
      const filename = profile.devotee_photo.split("/").pop();
      return `https://mahadevaaya.com/backend/media/devotee_photos/${filename}?v=${imageVersion}`;
    }
    return DefaultProfile;
  }, [selectedFile, profile.devotee_photo, imageVersion]);

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

  const handleProfileImageUpload = async (file) => {
    if (!file) return;
    
    setImageUploading(true);
    
    try {
      const formData = new FormData();
      formData.append("user_id", uniqueId || "");
      formData.append("devotee_photo", file);
      
      const res = await axios.put(
        `${BASE_URLL}api/get-user/?user_id=${uniqueId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      
      if (res.status >= 200 && res.status < 300) {
        const updated = res.data || {};
        
        // ✅ Update the image version to force refresh
        setImageVersion(Date.now());
        
        // ✅ Update profile state with the new image path
        setProfile((prev) => ({
          ...prev,
          devotee_photo: updated.devotee_photo || prev.devotee_photo,
        }));
        
        // ✅ Emit event for LeftNav with cache-busted URL
        const photoUrl = updated.devotee_photo
          ? `https://mahadevaaya.com/backend/media/devotee_photos/${updated.devotee_photo
              .split("/")
              .pop()}?v=${Date.now()}`
          : DefaultProfile;
        
        window.dispatchEvent(
          new CustomEvent("profileUpdated", {
            detail: {
              displayName: profile.displayName,
              devotee_photo: photoUrl,
            },
          })
        );
        
        setAlertMsg("Profile picture updated successfully!");
        setShowAlert(true);
      } else {
        setAlertMsg(res.data?.message || "Failed to update profile picture");
        setShowAlert(true);
      }
    } catch (err) {
      console.error("Profile image update error:", err);
      setAlertMsg(err.response?.data?.message || err.message || "Error updating profile picture");
      setShowAlert(true);
    } finally {
      setImageUploading(false);
      // ✅ Clear the selected file state to show the server image
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Function to check for changes
  const checkForChanges = (currentProfile, original) => {
    const hasChanged = JSON.stringify(currentProfile) !== JSON.stringify(original);
    setHasChanges(hasChanged);
  };

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
          const profileData = {
            displayName: user.devotee_name || "",
            mobile: user.phone || "",
            email: user.email || "",
            dob: user.dob || "",
            gender: user.gender || "",
            devotee_photo: user.devotee_photo || "",
          };
          
          setProfile(profileData);
          setOriginalProfile(JSON.parse(JSON.stringify(profileData)));
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setAlertMsg("Failed to fetch profile data.");
        setShowAlert(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [uniqueId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newProfile = { ...profile, [name]: value };
    setProfile(newProfile);
    checkForChanges(newProfile, originalProfile);
  };
  
  const handleEditPhoto = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const sizeKB = file.size / 1024;
    if (sizeKB < 10 || sizeKB > 2048) {
      setAlertMsg("File size must be between 10KB and 2MB.");
      setShowAlert(true);
      return;
    }
    
    setSelectedFile(file);
    handleProfileImageUpload(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const userId = uniqueId || "";
      const res = await updateProfile({
        userId,
        profileData: profile,
        file: null,
      });

      if (res.status >= 200 && res.status < 300) {
        const updated = res.data || {};
        const profileData = {
          displayName: updated.devotee_name || profile.displayName,
          mobile: updated.phone || profile.mobile,
          email: updated.email || profile.email,
          dob: updated.dob || profile.dob,
          gender: updated.gender || profile.gender,
          devotee_photo: updated.devotee_photo || profile.devotee_photo,
        };

        setProfile(profileData);
        setOriginalProfile(JSON.parse(JSON.stringify(profileData)));
        setHasChanges(false);

        // ✅ Create a proper URL for the event
        const photoUrl = updated.devotee_photo
          ? `https://mahadevaaya.com/backend/media/devotee_photos/${updated.devotee_photo
              .split("/")
              .pop()}?t=${Date.now()}`
          : DefaultProfile;
        
        window.dispatchEvent(
          new CustomEvent("profileUpdated", {
            detail: {
              displayName: updated.devotee_name || profile.displayName,
              devotee_photo: photoUrl,
            },
          })
        );

        setAlertMsg("Profile updated successfully");
        setShowAlert(true);
      } else {
        setAlertMsg(res.data?.message || "Failed to update profile");
        setShowAlert(true);
      }
    } catch (err) {
      console.error("Profile update error:", err);
      setAlertMsg(err.response?.data?.message || err.message || "Error updating profile");
      setShowAlert(true);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasChanges) {
        const message = "You have unsaved changes. Are you sure you want to leave?";
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasChanges]);

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <LeftNav />
      </aside>

      <main className="main-container">
        <div className="content-box">
          <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
            <h1 className="fw500">
              <Breadcrumb>
                <Breadcrumb.Item href="/MainDashBoard">
                  <span className="fw700h1">DashBoard</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>My Profile</Breadcrumb.Item>
              </Breadcrumb>
            </h1>
            {hasChanges && (
              <div className="alert alert-warning py-2 px-3 mb-0">
                You have unsaved changes
              </div>
            )}
          </div>
          
          <ModifyAlert message={alertMsg} show={showAlert} setShow={setShowAlert} />

          {loading ? (
            <p>Loading profile...</p>
          ) : (
            <Form onSubmit={handleSubmit} className="profile-form mt-4">
              <Row className="mb-3">
                <Col lg={2} md={4} sm={12} className="text-center">
                  <div className="profile-photo-wrapper position-relative mx-auto">
                    <img
                      src={displayImageUrl}
                      alt={profile.displayName || "Devotee"}
                      className="profile-photo"
                      key={displayImageUrl}
                    />
                    <div className="edit-overlay" onClick={handleEditPhoto}>
                      {imageUploading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        <FaCamera className="edit-icon" />
                      )}
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

              <Button type="submit" className="btn-save mt-3" disabled={!hasChanges || saving}>
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