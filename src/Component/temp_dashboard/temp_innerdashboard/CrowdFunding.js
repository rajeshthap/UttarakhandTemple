import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Breadcrumb, InputGroup } from "react-bootstrap";
import "../../../assets/CSS/LeftNav.css";
import TempleLeftNav from "../TempleLeftNav";
import { useAuth } from "../../GlobleAuth/AuthContext";
import axios from "axios";
import { BASE_URLL } from "../../../Component/BaseURL";
import ModifyAlert from "../../Alert/ModifyAlert";
import UploadFile from "../../../assets/images/upload-icon.png";
import { FaCheckCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const CrowdFunding = () => {
    const { uniqueId } = useAuth();

    const [formData, setFormData] = useState({
        temple_id: uniqueId,
        temple_name: "",
        mobile_number: "",
        fund_raise_name: "",
        estimated_cost: "",
        description: "",
        documents: null,
    });

    const [formDataFiles, setFormDataFiles] = useState({ documents: null });
    const [errors, setErrors] = useState({});
    const [fileErrors, setFileErrors] = useState({});
    const [dragging, setDragging] = useState(null);
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState("success");

    // Fetch temple name only (no mobile autofill)
    useEffect(() => {
        if (!uniqueId) return;

        const fetchTemple = async () => {
            try {
                const response = await axios.get(
                    `${BASE_URLL}api/get-temple/?temple_id=${uniqueId}`
                );

                // Handle both possible response structures
                const temple =
                    response.data.data && typeof response.data.data === "object"
                        ? response.data.data
                        : response.data;

                setFormData((prev) => ({
                    ...prev,
                    temple_name: temple.temple_name || "",
                    temple_id: uniqueId,
                    mobile_number: temple.phone || "",
                }));

                console.log("Temple details fetched:", temple);
            } catch (error) {
                console.error("Error fetching temple data:", error);
            }
        };

        fetchTemple();
    }, [uniqueId]);


    // Handle input field change
    const handleChange = (e) => {
        const { name, value } = e.target;



        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    // Validate fields
    const validateFields = () => {
        const tempErrors = {};


        if (!formData.fund_raise_name)
            tempErrors.fund_raise_name = "Fund Raise Name is required";
        if (!formData.estimated_cost)
            tempErrors.estimated_cost = "Estimated Cost is required";
        if (!formData.description)
            tempErrors.description = "Description is required";
        if (!formDataFiles.documents)
            tempErrors.documents = "Supporting Document is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // Handle file input
    const handleInputChange = (e) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            const file = files[0];

            // Validate file size (10KB - 2MB)
            if (file.size < 10 * 1024 || file.size > 2 * 1024 * 1024) {
                setFileErrors((prev) => ({
                    ...prev,
                    [name]: "File size must be between 10KB and 2MB",
                }));
                return;
            } else {
                setFileErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[name];
                    return newErrors;
                });
            }

            setFormDataFiles((prev) => ({ ...prev, [name]: file }));
        }
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === "documents") {
                if (formDataFiles.documents)
                    data.append(key, formDataFiles.documents);
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            await axios.post(`${BASE_URLL}api/reg-fund-raise/`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setAlertMessage("Fundraising request submitted successfully!");
            setAlertType("success");
            setShowAlert(true);

            // Reset form
            setFormData({
                ...formData,
                fund_raise_name: "",
                estimated_cost: "",
                description: "",
            });
            setFormDataFiles({ documents: null });
            setErrors({});
        } catch (error) {
            console.error("Error submitting crowdfunding:", error);
            setAlertMessage("Failed to submit fundraising request. Please try again.");
            setAlertType("error");
            setShowAlert(true);
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
                                <Breadcrumb.Item active>Crowd Funding</Breadcrumb.Item>
                            </Breadcrumb>
                        </h1>
                    </div>

                    <div className="temp-container">
                        <div className="temp-donate">
                            {showAlert && (
                                <ModifyAlert
                                    message={alertMessage}
                                    type={alertType}
                                    show={showAlert}
                                    setShow={setShowAlert}
                                />
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col lg={6} sm={12} md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="temp-label">
                                                Temple Name<span className="temp-span-star"> *</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="temple_name"
                                                value={formData.temple_name}
                                                disabled
                                                className="temp-form-control"
                                            />
                                        </Form.Group>
                                    </Col>


                                    <Col lg={6} sm={12} md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="temp-label">
                                                Temple Mobile Number
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="mobile_number"
                                                value={formData.mobile_number}
                                                disabled
                                                className="temp-form-control"
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col lg={6} sm={12} md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="temp-label">
                                                Fund Raise Name<span className="temp-span-star"> *</span>
                                            </Form.Label>
                                            <Form.Select
                                                name="fund_raise_name"
                                                value={formData.fund_raise_name}
                                                onChange={handleChange}
                                                className="temp-form-control"
                                            >
                                                <option value="">-- Select Fund Raise Type --</option>
                                                <option value="Construction">Construction</option>
                                                <option value="Electrical">Electrical</option>
                                                <option value="Water Facility">Water Facility</option>
                                            </Form.Select>
                                            {errors.fund_raise_name && (
                                                <small className="text-danger">{errors.fund_raise_name}</small>
                                            )}
                                        </Form.Group>
                                    </Col>

                                    <Col lg={6} sm={12} md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="temp-label">
                                                Estimated Cost (₹)<span className="temp-span-star"> *</span>
                                            </Form.Label>
                                            <Form.Select
                                                name="estimated_cost"
                                                value={formData.estimated_cost}
                                                onChange={handleChange}
                                                className="temp-form-control"
                                            >
                                                <option value="">-- Select Estimated Cost Range --</option>
                                                <option value="5000">5000</option>
                                                <option value="10000">10000</option>
                                                <option value="15000">15000</option>
                                                <option value="20000">20000</option>
                                            </Form.Select>
                                            {errors.estimated_cost && (
                                                <small className="text-danger">{errors.estimated_cost}</small>
                                            )}
                                        </Form.Group>
                                    </Col>

                                    <Col lg={6} sm={12} md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="temp-label">
                                                Description<span className="temp-span-star"> *</span>
                                            </Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={4}
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                className="temp-form-control"
                                            />
                                            {errors.description && (
                                                <small className="text-danger">
                                                    {errors.description}
                                                </small>
                                            )}
                                        </Form.Group>
                                    </Col>

                                    {/* Document Upload */}
                                    <Col lg={6} sm={12} md={6} className="add-event-f-mob">
                                        <fieldset
                                            className={`upload_dropZone text-center ${dragging === "documents" ? "drag-over" : ""
                                                }`}
                                            onDragOver={(e) => {
                                                e.preventDefault();
                                                setDragging("documents");
                                            }}
                                            onDragLeave={() => setDragging(null)}
                                            onDrop={(e) => {
                                                e.preventDefault();
                                                setDragging(null);
                                                const file = e.dataTransfer.files[0];
                                                if (file) {
                                                    handleInputChange({
                                                        target: { name: "documents", files: [file] },
                                                    });
                                                }
                                            }}
                                        >
                                            <legend className="visually-hidden">Upload Document</legend>
                                            <img src={UploadFile} alt="upload" />
                                            <p className="temp-drop-txt my-2">
                                                Drag & drop document <br /> <i>or</i>
                                            </p>
                                            <input
                                                id="documents"
                                                name="documents"
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                className="invisible"
                                                onChange={handleInputChange}
                                            />
                                            <label
                                                className="btn temp-primary-btn mb-1"
                                                htmlFor="documents"
                                                style={{
                                                    display: "block",
                                                    margin: "8px auto 0 auto",
                                                    width: "20%",
                                                    maxWidth: "200px",
                                                    textAlign: "center",
                                                }}
                                            >
                                                Choose file
                                            </label>
                                            <p className="temp-upload-file">
                                                Upload size 10KB-2MB (PDF, JPG, PNG)
                                            </p>
                                        </fieldset>

                                        {fileErrors.documents && (
                                            <div className="alert-txt text-center">
                                                {fileErrors.documents}
                                            </div>
                                        )}

                                        {formDataFiles.documents && (
                                            <div className="mt-2">
                                                <div className="d-flex temp-doc-info">
                                                    <Col lg={3}>{new Date().toLocaleDateString()}</Col>
                                                    <Col lg={9} className="px-4 temp-success-doc">
                                                        <FaCheckCircle /> Uploaded Successfully
                                                    </Col>
                                                </div>
                                                <div
                                                    className="col temp-delete-icon"
                                                    onClick={() => {
                                                        setFormDataFiles({ documents: null });
                                                        setFileErrors((prev) => ({
                                                            ...prev,
                                                            documents: "Supporting Document is required",
                                                        }));
                                                    }}
                                                >
                                                    <h3>
                                                        <RiDeleteBin6Line className="mx-1" /> Click here to Remove
                                                    </h3>
                                                </div>
                                            </div>
                                        )}
                                    </Col>

                                    <div className="text-center">
                                        <Button type="submit" className="temp-submit-btn mt-3">
                                            Submit
                                        </Button>
                                    </div>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CrowdFunding;
