import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Form, Button, Spinner, Breadcrumb } from "react-bootstrap";
import axios from "axios";
import TempleLeftNav from "./TempleLeftNav";
import ModifyAlert from "../Alert/ModifyAlert";
import UploadFile from "../../assets/images/upload-icon.png";
import { FaCheckCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import LocationState from "../userregistration/LocationState";
import { useAuth } from "../GlobleAuth/AuthContext";

const TempleProfile = () => {
  const { uniqueId } = useAuth();

  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [dragging, setDragging] = useState(null);

  const [preview, setPreview] = useState({
    temple_image: "",
    land_doc: "",
    noc_doc: "",
    trust_cert: "",
  });

  const fileRefs = {
    temple_image: useRef(null),
    land_doc: useRef(null),
    noc_doc: useRef(null),
    trust_cert: useRef(null),
  };

  const getImageUrl = (imgPath) => {
    if (!imgPath) return "https://mahadevaaya.com/backend/media/temple_images/default.png";
    const filename = imgPath.split("/").pop();
    return `https://mahadevaaya.com/backend/media/temple_images/${filename}`;
  };

  //  Fetch Temple Profile
  useEffect(() => {
    const fetchTemple = async () => {
      try {
        const res = await axios.get(
          `https://mahadevaaya.com/backend/api/get-temple/?temple_id=${uniqueId}`
        );
        setProfile(res.data || {});
        setPreview({
          temple_image: "",
          land_doc: "",
          noc_doc: "",
          trust_cert: "",
        });
      } catch (err) {
        console.error("Error fetching temple profile:", err);
        setAlertMsg("Failed to load temple profile.");
        setShowAlert(true);
      } finally {
        setLoading(false);
      }
    };
    if (uniqueId) fetchTemple();
  }, [uniqueId]);

  //  Handle Input Change
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

  const removeSelectedFile = (field) => {
    setPreview((p) => ({ ...p, [field]: "" }));
    setProfile((p) => ({ ...p, [field]: "" }));
    if (fileRefs[field]?.current) fileRefs[field].current.value = "";
  };

  //  Submit Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const fd = new FormData();
      const fields = [
        "temple_name",
        "temple_address",
        "city",
        "state",
        "country",
        "zip_code",
        "temple_type",
        "temple_ownership_type",
        "trust_committee_type",
        "trust_committee_details",
        "temple_description",
        "year_of_establishment",
        "email",
        "phone",
        "bank_name",
        "account_number",
        "account_type",
        "account_name",
        "ifsc_code",
      ];
      fields.forEach((f) => fd.append(f, profile[f] ?? ""));

      // Upload files
      ["temple_image", "land_doc", "noc_doc", "trust_cert"].forEach((key) => {
        if (profile[key] instanceof File) fd.append(key, profile[key]);
      });

      await axios.put(
        `https://mahadevaaya.com/backend/api/get-temple/?temple_id=${uniqueId}`,
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setAlertMsg("Temple profile updated successfully!");
      setShowAlert(true);

      // Refresh
      const updated = await axios.get(
        `https://mahadevaaya.com/backend/api/get-temple/?temple_id=${uniqueId}`
      );
      setProfile(updated.data || {});
      setPreview({
        temple_image: "",
        land_doc: "",
        noc_doc: "",
        trust_cert: "",
      });
    } catch (err) {
      console.error("Update error:", err);
      setAlertMsg("Error updating temple profile.");
      setShowAlert(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="temp-sidebar">
        <TempleLeftNav />
      </aside>

      <main className="main-container">
        <div className="content-box">
          <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
                            <h1 className="fw500">
                              <Breadcrumb>
                                <Breadcrumb.Item href="/TempleDashBoard">
                                  <span className="fw700h1">DashBoard</span>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>Temple Profile</Breadcrumb.Item>
                              </Breadcrumb>
                            </h1>
            
                            
                          </div>
      

          <ModifyAlert message={alertMsg} show={showAlert} setShow={setShowAlert} />

          {loading ? (
            <div className="mt-4">
              <Spinner animation="border" /> Loading profile...
            </div>
          ) : (
            <Form onSubmit={handleSubmit} className="profile-form mt-4">
              <Row>
                {/* Temple Image */}
                <Col lg={3} md={4} sm={12} className="text-center mb-3">
                  <div className="card-image-wrapper-temple">
                    <img
                      src={
                        preview.temple_image
                          ? preview.temple_image
                          : getImageUrl(profile.temple_image)
                      }
                      alt="Temple"
                      className="card-image"
                    />
                  </div>
                </Col>

                <Col lg={9} md={8} sm={12}>
                  <Row>
                    {/* Basic Info */}
                    <Col lg={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">Temple Name</Form.Label>
                        <Form.Control
                          name="temple_name"
                          value={profile.temple_name || ""}
                          onChange={handleInputChange}
                           className="temp-form-control"
                        />
                      </Form.Group>
                    </Col>

                    <Col lg={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">Year of Establishment</Form.Label>
                        <Form.Control
                          name="year_of_establishment"
                          value={profile.year_of_establishment || ""}
                          onChange={handleInputChange}
                           className="temp-form-control"
                        />
                      </Form.Group>
                    </Col>

                    <Col lg={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">Ownership Type</Form.Label>
                        <Form.Select
                          name="temple_ownership_type"
                          value={profile.temple_ownership_type || ""}
                          onChange={handleInputChange}
                              className="temp-form-control"
                        >
                          <option value="">Select Ownership</option>
                          <option value="private">Private</option>
                          <option value="government">Government</option>
                          <option value="trust">Trust</option>
                          <option value="other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    {/* Address */}
                    <Col lg={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">Address</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          name="temple_address"
                          value={profile.temple_address || ""}
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

                    <Col lg={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">Zip Code</Form.Label>
                        <Form.Control
                          name="zip_code"
                          value={profile.zip_code || ""}
                          onChange={handleInputChange}
                          className="temp-form-control"
                        />
                      </Form.Group>
                    </Col>

                    {/* Trust Info */}
                    <Col lg={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">Trust Committee Type</Form.Label>
                        <Form.Control
                          name="trust_committee_type"
                          value={profile.trust_committee_type || ""}
                          onChange={handleInputChange}
                          className="temp-form-control"
                        />
                      </Form.Group>
                    </Col>

                    <Col lg={8}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">Trust Committee Details</Form.Label>
                        <Form.Control
                          name="trust_committee_details"
                          value={profile.trust_committee_details || ""}
                          onChange={handleInputChange}
                          className="temp-form-control"
                        />
                      </Form.Group>
                    </Col>

                    <Col lg={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="temple_description"
                          value={profile.temple_description || ""}
                          onChange={handleInputChange}
                          className="temp-form-control"
                        />
                      </Form.Group>
                    </Col>

                    {/* Contact */}
                    <Col lg={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">Email</Form.Label>
                        <Form.Control
                          name="email"
                          type="email"
                          value={profile.email || ""}
                          disabled
                           className="temp-form-control"
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={6}>
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

                    {/* Bank Info */}
                    <Col lg={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">Bank Name</Form.Label>
                        <Form.Control
                          name="bank_name"
                          value={profile.bank_name || ""}
                          onChange={handleInputChange}
                          className="temp-form-control"
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">Account Number</Form.Label>
                        <Form.Control
                          name="account_number"
                          value={profile.account_number || ""}
                          onChange={handleInputChange}
                          className="temp-form-control"
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">Account Name</Form.Label>
                        <Form.Control
                          name="account_name"
                          value={profile.account_name || ""}
                          onChange={handleInputChange}
                          className="temp-form-control"
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">Account Type</Form.Label>
                        <Form.Select
                          name="account_type"
                          value={profile.account_type || ""}
                          onChange={handleInputChange}
                          className="temp-form-control"
                        >
                          <option value="">Select</option>
                          <option value="savings">Savings</option>
                          <option value="current">Current</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="temp-label">IFSC Code</Form.Label>
                        <Form.Control
                          name="ifsc_code"
                          value={profile.ifsc_code || ""}
                          onChange={handleInputChange}
                            className="temp-form-control"
                        />
                      </Form.Group>
                    </Col>

                    {/* File Uploads */}
                    {["temple_image", "land_doc", "noc_doc", "trust_cert"].map((field) => (
                      <Col lg={6} key={field} className="add-event-f-mob">
                        <fieldset
                          className={`upload_dropZone text-center ${
                            dragging === field ? "drag-over" : ""
                          }`}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragging(field);
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
                              handleInputChange({ target: { name: field, files: [file] } });
                            }
                          }}
                        >
                          <img src={UploadFile} alt="upload-file" />
                          <p className="temp-drop-txt my-2">
                            {field.replace("_", " ").toUpperCase()} <br />
                            <i>or drag & drop here</i>
                          </p>
                          <input
                            id={field}
                            name={field}
                            type="file"
                            accept="image/jpeg, image/png, application/pdf"
                            className="invisible"
                            onChange={handleInputChange}
                            ref={fileRefs[field]}
                          />
                          <label className="btn temp-primary-btn mb-1" htmlFor={field}>
                            Choose file
                          </label>
                          <p className="temp-upload-file">Upload size 10KB–2MB</p>
                        </fieldset>

                        {preview[field] && (
                          <div className="mt-2">
                            <div className="d-flex temp-doc-info">
                              <Col lg={3}>{new Date().toLocaleDateString()}</Col>
                              <Col lg={9} className="px-4 temp-success-doc">
                                <FaCheckCircle /> Uploaded Successfully
                              </Col>
                            </div>
                            <div
                              className="col temp-delete-icon"
                              onClick={() => removeSelectedFile(field)}
                            >
                              <h3>
                                <RiDeleteBin6Line className="mx-1" /> Click here to Remove
                              </h3>
                            </div>
                          </div>
                        )}
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>

              <div className="gap-3 mt-3 Temp-btn-submit">
                <Button className="btn-save mt-3" type="submit" disabled={saving}>
                  {saving ? (
                    <>
                      <Spinner animation="border" size="sm" /> Saving...
                    </>
                  ) : (
                    "Update Temple"
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

export default TempleProfile;
