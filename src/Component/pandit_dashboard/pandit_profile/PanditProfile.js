import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Form, Button, Spinner, Breadcrumb } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import { useAuth } from "../../GlobleAuth/AuthContext";
import PanditLeftNav from "../PanditLeftNav";
import ModifyAlert from "../../Alert/ModifyAlert";
import LocationState from "../../userregistration/LocationState";
import UploadFile from "../../../assets/images/upload-icon.png";
import { FaCheckCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCamera } from "react-icons/fa";
import DefaultProfile from "../../../assets/images/Diya.png";

const PanditProfile = () => {
  const { uniqueId } = useAuth();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [dragging, setDragging] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageVersion, setImageVersion] = useState(Date.now()); // Add this for cache busting
  const [preview, setPreview] = useState({
    pandit_image: "",
    land_document: "",
  });

  const fileInputRef = useRef(null);
  const docInputRef = useRef(null);

  const handleEditPhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Store the file in profile state
    setProfile(prev => ({ ...prev, pandit_image: file }));
    setSelectedFile(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreviewUrl(ev.target.result);
      setImageVersion(Date.now()); // Update version to force re-render
    };
    reader.readAsDataURL(file);
  };

  const roleOptions = [
    { value: "pooja", label: "पूजा विशेषज्ञ" },
    { value: "vedic_chanting", label: "वैदिक मंत्रोच्चार" },
    { value: "astrology", label: "ज्योतिष" },
    { value: "wedding", label: "विवाह संस्कार" },
    { value: "funeral", label: "अंत्येष्टि संस्कार" },
    { value: "festival", label: "त्योहार आयोजन" },
    { value: "temple_priest", label: "मंदिर पुजारी" },
    { value: "home_pooja", label: "गृह पूजा" },
    { value: "yagya", label: "यज्ञ विशेषज्ञ" },
    { value: "other", label: "अन्य" },
  ];

  // Updated image URL resolver with cache busting
  const getImageUrl = (imgPath) => {
    if (!imgPath) return DefaultProfile;
    if (imgPath.startsWith("data:image")) return imgPath; // local preview
    const filename = imgPath.split("/").pop();
    return `https://mahadevaaya.com/backend/media/pandit_images/${filename}?v=${imageVersion}`;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `https://mahadevaaya.com/backend/api/get-pandit/?pandit_id=${uniqueId}`
        );
        const data = res.data || {};
        setProfile(data);

        if (data.pandit_image) {
          const filename = data.pandit_image.split("/").pop();
          setPreviewUrl(
            `https://mahadevaaya.com/backend/media/pandit_images/${filename}?v=${imageVersion}`
          );
        } else {
          setPreviewUrl(DefaultProfile);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setAlertMsg("Failed to fetch profile data.");
        setShowAlert(true);
      } finally {
        setLoading(false);
      }
    };

    if (uniqueId) fetchProfile();
  }, [uniqueId, imageVersion]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const sizeKB = file.size / 1024;
      if (sizeKB < 10 || sizeKB > 2048) {
        alert("File size must be between 10KB and 2MB.");
        return;
      }
      setPreview((p) => ({ ...p, [name]: URL.createObjectURL(file) }));
      setProfile((p) => ({ ...p, [name]: file }));
    } else {
      setProfile((p) => ({ ...p, [name]: value }));
    }
  };

  const handleInputChangeCity = (field, value) => {
    setProfile((p) => ({ ...p, [field]: value }));
  };

  const handleRoleChange = (selected) => {
    const values = selected ? selected.map((s) => s.value) : [];
    setProfile((p) => ({ ...p, pandit_role: values }));
  };

  const removeSelectedFile = (field) => {
    setPreview((p) => ({ ...p, [field]: "" }));
    setProfile((p) => ({ ...p, [field]: "" }));
    if (field === "pandit_image") {
      setSelectedFile(null);
      setPreviewUrl(DefaultProfile);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
    if (field === "land_document" && docInputRef.current)
      docInputRef.current.value = "";
  };

  // Updated handleSubmit with more robust image refresh
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const fd = new FormData();
      const keys = [
        "first_name",
        "last_name",
        "father_name",
        "aadhar_number",
        "permanent_address",
        "country",
        "state",
        "city",
        "zipcode",
        "temple_association",
        "phone",
        "email",
      ];
      keys.forEach((k) => fd.append(k, profile[k] ?? ""));

      if (profile.pandit_role)
        fd.append("pandit_role", JSON.stringify(profile.pandit_role));

      if (profile.pandit_image instanceof File)
        fd.append("pandit_image", profile.pandit_image);
      if (profile.land_document instanceof File)
        fd.append("land_document", profile.land_document);

      await axios.put(
        `https://mahadevaaya.com/backend/api/get-pandit/?pandit_id=${uniqueId}`,
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setAlertMsg("Profile updated successfully!");
      setShowAlert(true);

      // Fetch updated profile
      const fresh = await axios.get(
        `https://mahadevaaya.com/backend/api/get-pandit/?pandit_id=${uniqueId}`
      );

      // Update profile state
      setProfile(fresh.data || {});

      // Update image version to force refresh
      setImageVersion(Date.now());

      // If there's a new image, update the preview URL
      if (fresh.data?.pandit_image) {
        const filename = fresh.data.pandit_image.split("/").pop();
        const newUrl = `https://mahadevaaya.com/backend/media/pandit_images/${filename}?v=${Date.now()}`;
        setPreviewUrl(newUrl);
      } else {
        setPreviewUrl(DefaultProfile);
      }

      // Reset file input and selected file
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      setPreview({
        pandit_image: "",
        land_document: fresh.data?.land_document || "",
      });

      // Sidebar update
      window.dispatchEvent(
        new CustomEvent("profileUpdated", {
          detail: {
            displayName: fresh.data.first_name || "",
            devotee_photo: fresh.data.pandit_image
              ? `https://mahadevaaya.com/backend/media/pandit_images/${fresh.data.pandit_image
                  .split("/")
                  .pop()}?v=${Date.now()}`
              : DefaultProfile,
          },
        })
      );
    } catch (err) {
      console.error("Update error:", err);
      setAlertMsg("Error updating profile. Please try again.");
      setShowAlert(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="pandit-sidebar">
        <PanditLeftNav />
      </aside>

      <main className="main-container">
        <div className="content-box">
          <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
            <h1 className="fw500">
              <Breadcrumb>
                <Breadcrumb.Item href="/Pandit_DashBoard">
                  <span className="fw700h1">DashBoard</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Pandit Profile</Breadcrumb.Item>
              </Breadcrumb>
            </h1>
          </div>
          <ModifyAlert
            message={alertMsg}
            show={showAlert}
            setShow={setShowAlert}
          />

          {loading ? (
            <div className="mt-4">
              <Spinner animation="border" /> Loading profile...
            </div>
          ) : (
            <Form onSubmit={handleSubmit} className="profile-form mt-4">
              <Row>
                <Col lg={2} md={4} sm={12} className="text-center">
                  <div className="profile-photo-wrapper position-relative mx-auto">
                    <img
                      src={getImageUrl(previewUrl || profile.pandit_image)}
                      alt={profile.first_name || "Pandit"}
                      className="profile-photo"
                      key={`${previewUrl}-${imageVersion}`} // More robust key
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

                <Col lg={9} md={8} sm={12}>
                  <Row>
                    {/* Basic Details */}
                    <Col lg={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">
                          First Name
                        </Form.Label>
                        <Form.Control
                          name="first_name"
                          value={profile.first_name || ""}
                          onChange={handleInputChange}
                          className="temp-form-control"
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">
                          Last Name
                        </Form.Label>
                        <Form.Control
                          name="last_name"
                          value={profile.last_name || ""}
                          onChange={handleInputChange}
                          className="temp-form-control"
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">
                          Father's Name
                        </Form.Label>
                        <Form.Control
                          name="father_name"
                          value={profile.father_name || ""}
                          onChange={handleInputChange}
                          className="temp-form-control"
                        />
                      </Form.Group>
                    </Col>

                    {/* Email + Phone */}
                    <Col lg={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={profile.email || ""}
                          disabled
                          className="temp-form-control"
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">Phone</Form.Label>
                        <Form.Control
                          name="phone"
                          value={profile.phone || ""}
                          disabled
                          className="temp-form-control"
                        />
                      </Form.Group>
                    </Col>

                    {/* Aadhar + Address */}
                    <Col lg={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">
                          Aadhar Number
                        </Form.Label>
                        <Form.Control
                          name="aadhar_number"
                          value={profile.aadhar_number || ""}
                          onChange={handleInputChange}
                          className="temp-form-control"
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">
                          Permanent Address
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          name="permanent_address"
                          value={profile.permanent_address || ""}
                          onChange={handleInputChange}
                          className="temp-form-control"
                        />
                      </Form.Group>
                    </Col>

                    <LocationState
                      formData={profile}
                      handleInputChange={handleInputChangeCity}
                      formErrors={{}}
                    />

                    {/* Zip, Role, Temple */}
                    <Col lg={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">Pin Code</Form.Label>
                        <Form.Control
                          name="zipcode"
                          value={profile.zipcode || ""}
                          onChange={handleInputChange}
                          className="temp-form-control"
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">
                          Pandit Role
                        </Form.Label>
                        <Select
                          isMulti
                          options={roleOptions}
                          value={roleOptions.filter((o) =>
                            profile.pandit_role?.includes(o.value)
                          )}
                          onChange={handleRoleChange}
                          className="temp-form-control-input basic-multi-select"
                          classNamePrefix="basic-multi-select"
                          closeMenuOnSelect={false}
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">
                          Temple Association
                        </Form.Label>
                        <Form.Select
                          name="temple_association"
                          value={profile.temple_association || ""}
                          onChange={handleInputChange}
                          className="temp-form-control-option"
                        >
                          <option value="">Select a Temple Association</option>
                          <option value="Local Temple Association">
                            Local Temple Association
                          </option>
                          <option value="State Temple Association">
                            State Temple Association
                          </option>
                          <option value="National Temple Association">
                            National Temple Association
                          </option>
                          <option value="Independent">Independent</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    {/* Land Document Upload */}
                    <Col lg={6} md={6} sm={12} className="add-event-f-mob">
                      <fieldset
                        className={`upload_dropZone text-center ${
                          dragging === "land_document" ? "drag-over" : ""
                        }`}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragging("land_document");
                        }}
                        onDragLeave={() => setDragging(null)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragging(null);
                          const file = e.dataTransfer.files[0];
                          if (file) {
                            const sizeKB = file.size / 1024;
                            if (sizeKB < 10 || sizeKB > 2048) {
                              alert("File size must be between 10KB and 2MB.");
                              return;
                            }
                            handleInputChange({
                              target: { name: "land_document", files: [file] },
                            });
                          }
                        }}
                      >
                        <legend className="visually-hidden">
                          Upload Land Document
                        </legend>
                        <img src={UploadFile} alt="upload-file" />
                        <p className="temp-drop-txt my-2">
                          Land Document <br /> <i>or drag & drop here</i>
                        </p>
                        <input
                          id="land_document"
                          name="land_document"
                          type="file"
                          accept="image/jpeg, image/png, application/pdf"
                          className="invisible"
                          onChange={handleInputChange}
                          ref={docInputRef}
                        />
                        <label
                          className="btn temp-primary-btn mb-1"
                          htmlFor="land_document"
                        >
                          Choose file
                        </label>
                        <p className="temp-upload-file">
                          Upload size 10KB–2MB (jpg, png, jpeg, pdf)
                        </p>
                      </fieldset>

                      {/* Uploaded Preview / Delete */}
                      {preview.land_document && (
                        <div className="mt-2">
                          <div className="d-flex temp-doc-info">
                            <Col lg={3}>{new Date().toLocaleDateString()}</Col>
                            <Col lg={9} className="px-4 temp-success-doc">
                              <FaCheckCircle /> Uploaded Successfully
                            </Col>
                          </div>
                          <div
                            className="col temp-delete-icon"
                            onClick={() => removeSelectedFile("land_document")}
                          >
                            <h3>
                              <RiDeleteBin6Line className="mx-1" /> Click here
                              to Remove
                            </h3>
                          </div>
                        </div>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>

              <div className="gap-3 mt-3 Temp-btn-submit">
                <Button
                  className="btn-save mt-3"
                  type="submit"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Spinner animation="border" size="sm" /> Saving...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </div>
            </Form>
          )}
        </div>
      </main>
    </div>
  );
};

export default PanditProfile;