import React, { useEffect, useState } from "react";
import "../../../assets/CSS/LeftNav.css";
import TempleLeftNav from "../TempleLeftNav";
import SearchFeature from "./SearchFeature";
import { BASE_URLL } from "../../../Component/BaseURL";
import { Button, Modal, Form, Row, Col, Breadcrumb } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../GlobleAuth/AuthContext";
import LocationState from "../../userregistration/LocationState";
import UploadFile from "../../../assets/images/upload-icon.png";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaPrint } from "react-icons/fa6";
import { FaFileExcel } from "react-icons/fa";

const ManageTemple = () => {
  const [temples, setTemples] = useState([]);
  const [filteredTemples, setFilteredTemples] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTemple, setCurrentTemple] = useState({});
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(null);
  const { uniqueId } = useAuth();
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
  });

  const handleInputChangeCity = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setCurrentTemple((prev) => ({ ...prev, [name]: value }));
  };

  const fetchTemples = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URLL}api/temple-names-list/`);

      if (res.data) {
        const data = Array.isArray(res.data.temples) ? res.data.temples : [];

        const filteredByOwner = data.filter(
          (t) => t.temple_id === uniqueId || t.created_by === uniqueId
        );

        const detailPromises = filteredByOwner.map(async (temple) => {
          try {
            const detailRes = await axios.get(`${BASE_URLL}api/get-temple/`, {
              params: { temple_id: temple.temple_id },
            });
            const details = Array.isArray(detailRes.data)
              ? detailRes.data[0]
              : detailRes.data;

            const formatMediaUrl = (filePath) => {
              if (!filePath) return "";
              if (filePath.includes("/backend/")) return filePath;
              if (filePath.startsWith("http")) {
                return filePath.replace(
                  "https://mahadevaaya.com/",
                  "https://mahadevaaya.com/backend/"
                );
              }
              return `https://mahadevaaya.com/backend/media/${filePath}`;
            };

            return {
              ...temple,
              ...details,
              temple_image_url: formatMediaUrl(details.temple_image),
              land_doc_url: formatMediaUrl(details.land_doc),
              noc_doc_url: formatMediaUrl(details.noc_doc),
              trust_cert_url: formatMediaUrl(details.trust_cert),
            };
          } catch (error) {
            console.error(`Error fetching details for ${temple.temple_id}:`, error);
            return { ...temple };
          }
        });

        const detailedTemples = await Promise.all(detailPromises);

        setTemples(detailedTemples);
        setFilteredTemples(detailedTemples); //  initialize filtered list

        const userTemple = detailedTemples.find(
          (t) => t.temple_id === uniqueId || t.created_by === uniqueId
        );
        if (userTemple) {
          setFormData({
            country: userTemple.country || "",
            state: userTemple.state || "",
            city: userTemple.city || "",
          });
        }
      }
    } catch (err) {
      console.error("Error fetching temples:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (uniqueId) fetchTemples();
  }, [uniqueId]);

  //  Search functionality 
  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredTemples(temples);
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = temples.filter(
        (t) =>
          t.temple_name?.toLowerCase().includes(lowerQuery) ||
          t.temple_address?.toLowerCase().includes(lowerQuery) ||
          t.city?.toLowerCase().includes(lowerQuery) ||
          t.state?.toLowerCase().includes(lowerQuery) ||
          t.country?.toLowerCase().includes(lowerQuery)
      );
      setFilteredTemples(filtered);
    }
  };

  const handleEdit = (temple) => {
    if (temple.temple_id !== uniqueId && temple.created_by !== uniqueId) {
      alert("You can only edit temples created by you!");
      return;
    }

    setCurrentTemple({ ...temple });
    setFormData({
      country: temple.country || "",
      state: temple.state || "",
      city: temple.city || "",
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setCurrentTemple({
        ...currentTemple,
        [name]: file,
        [`${name}_preview`]: URL.createObjectURL(file),
      });
    } else {
      setCurrentTemple({ ...currentTemple, [name]: value });
    }
  };

  const handleUpdate = async () => {
    if (
      currentTemple.temple_id !== uniqueId &&
      currentTemple.created_by !== uniqueId
    ) {
      alert("You can only update temples created by you!");
      return;
    }

    if (formData?.country) currentTemple.country = formData.country;
    if (formData?.state) currentTemple.state = formData.state;
    if (formData?.city) currentTemple.city = formData.city;

    const formDataToSend = new FormData();

    [
      "temple_name",
      "temple_address",
      "city",
      "state",
      "country",
      "email",
      "phone",
    ].forEach((key) => {
      if (currentTemple[key]) formDataToSend.append(key, currentTemple[key]);
    });

    ["temple_image", "land_doc", "noc_doc", "trust_cert"].forEach((key) => {
      if (currentTemple[key] instanceof File) {
        formDataToSend.append(key, currentTemple[key]);
      }
    });

    try {
      const res = await axios.put(
        `${BASE_URLL}api/get-temple/`,
        formDataToSend,
        {
          params: { temple_id: currentTemple.temple_id },
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 200) {
        alert("Temple updated successfully!");
        setShowModal(false);
        fetchTemples();
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update temple!");
    }
  };

  const handleDelete = async (templeId) => {
    if (templeId !== uniqueId) {
      alert("You can only delete your own temple!");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this temple?")) return;

    try {
      await axios.delete("https://mahadevaaya.com/backend/api/delete-temple/", {
        params: { temple_id: uniqueId },
      });
      alert("Temple deleted successfully!");
      setTemples([]);
      setFilteredTemples([]); // clear filtered list too
    } catch (err) {
      console.error("Delete error:", err);
      alert("Unable to delete temple!");
    }
  };

  const handlePrint = () => {
    const actionColIndex = 6; // "Action" column index (0-based)
    const table = document.querySelector(".temp-rwd-table").cloneNode(true);

    // Remove "Action" column from header and rows
    table.querySelectorAll("tr").forEach((row) => {
      const cells = row.querySelectorAll("th, td");
      if (cells[actionColIndex]) cells[actionColIndex].remove();
    });

    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
      <head>
        <title>Temple List</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h2 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; font-size: 13px; }
          th { background-color: #f4f4f4; font-weight: bold; }
          tr:nth-child(even) { background-color: #fafafa; }
        </style>
      </head>
      <body>
        <h2>Temple List</h2>
        ${table.outerHTML}
      </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };

  const handleDownload = () => {
    if (filteredTemples.length === 0) {
      window.alert("No temple records to download!");
      return;
    }

    const data = filteredTemples.map((temple, index) => ({
      "S.No": index + 1,
      "Temple Name": temple.temple_name,
      "Temple Address": temple.temple_address,
      City: temple.city,
      State: temple.state,
      Country: temple.country,
    }));

    const ws = XLSX.utils.json_to_sheet(data);

    // Style header (bold + blue)
    const range = XLSX.utils.decode_range(ws["!ref"]);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: C });
      if (!ws[cellRef]) continue;
      ws[cellRef].s = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "2B5797" } },
        alignment: { horizontal: "center", vertical: "center" },
      };
    }

    // Set column widths
    ws["!cols"] = [
      { wch: 6 },
      { wch: 25 },
      { wch: 30 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Temple List");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Temple_List.xlsx");
  };


  return (
    <div className="dashboard-wrapper">
      <aside className="temp-sidebar">
        <TempleLeftNav />
      </aside>

      <main className="main-container-box">
        <div className="content-box">
          <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
            <h1 className="fw500">
              <Breadcrumb>
                <Breadcrumb.Item href="/TempleDashBoard">
                  <span className="fw700h1">DashBoard</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Manage Temple</Breadcrumb.Item>
              </Breadcrumb>
            </h1>
            <div>
              <SearchFeature onSearch={handleSearch} />
            </div>
           


          </div>

           <div className="mt-2 vmb-2 text-end">
              <Button variant="" size="sm" className="mx-2 print-btn" onClick={handlePrint}>
                <FaPrint /> Print
              </Button>

              <Button variant="" size="sm" className="download-btn" onClick={handleDownload}>
                <FaFileExcel />Download
              </Button>
            </div>

          <Row className="mt-3">
            <div className="col-md-12">
              <table className="temp-rwd-table">
                <tbody>
                  <tr>
                    <th>S.No</th>
                    <th>Temple Name</th>
                    <th>Temple Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Country</th>
                    <th>Action</th>
                  </tr>

                  {filteredTemples.length > 0 ? (
                    filteredTemples.map((temple, index) => (
                      <tr key={temple.temple_id}>
                        <td data-th="S. No">{index + 1}</td>
                        <td data-th="Temple Name">{temple.temple_name}</td>
                        <td data-th="Temple Address">{temple.temple_address}</td>
                        <td data-th="City">{temple.city}</td>
                        <td data-th="State">{temple.state}</td>
                        <td data-th="Country">{temple.country}</td>
                        <td>
                          <Button
                            className="event-click-cancel"
                            size="sm"
                            onClick={() => handleEdit(temple)}
                          >
                            <FiEdit className="add-edit-icon" />  Edit
                          </Button>{" "}
                          <Button
                            className="event-click-btn-danger"
                            size="sm"
                            onClick={() => handleDelete(temple.temple_id)}
                          >
                            <RiDeleteBin6Line className="add-edit-icon" />   Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        {loading ? "Loading..." : "No Data Available"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Row>

          {/* Edit Modal */}
          <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit Temple</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                {/* TEXT FIELDS */}
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="temp-label">Temple Name</Form.Label>
                      <Form.Control
                        className="temp-form-control-option"
                        name="temple_name"
                        value={currentTemple.temple_name || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="temp-label">Phone</Form.Label>
                      <Form.Control
                        className="temp-form-control-option"
                        value={currentTemple.phone || ""} disabled />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mt-2">
                  <LocationState
                    formData={formData}
                    handleInputChange={handleInputChangeCity}
                  // formErrors={errorReason_querys} // Pass errorReason_querys instead of formErrors
                  />
                </Row>

                <Row className="mt-2">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="temp-label">Email</Form.Label>
                      <Form.Control
                        className="temp-form-control-option"
                        value={currentTemple.email || ""} disabled />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mt-2">
                      <Form.Label className="temp-label">Temple Address</Form.Label>
                      <Form.Control
                        className="temp-form-control-option"
                        as="textarea"
                        rows={2}
                        name="temple_address"
                        value={currentTemple.temple_address || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>


                </Row>



                {/* Temple Image Upload Section */}
                <Row className="temp-stepform-box mt-4">
                  <Col lg={5} md={5} sm={12}>
                    <fieldset
                      className={`upload_dropZone text-center ${dragging === "temple_image" ? "drag-over" : ""
                        }`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragging("temple_image");
                      }}
                      onDragLeave={() => setDragging(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragging(null);
                        const file = e.dataTransfer.files[0];
                        if (file) {
                          handleChange({
                            target: { name: "temple_image", files: [file], type: "file" },
                          });
                        }
                      }}
                    >
                      <legend className="visually-hidden">Temple Image</legend>
                      <img
                        src={UploadFile} alt="upload-file"
                        style={{ width: "35px" }}
                      />
                      <p className="temp-drop-txt my-2">
                        Drag &amp; drop files
                        <br />
                        <i>or</i>
                      </p>

                      <input
                        id="temple_image"
                        name="temple_image"
                        type="file"
                        accept="image/jpeg, image/png"
                        className="invisible"
                        onChange={handleChange}
                      />

                      <label className="btn temp-primary-btn mb-1" htmlFor="temple_image">
                        Choose file
                      </label>
                      <p className="temp-upload-file">Upload size up to 2MB (jpg, png)</p>
                    </fieldset>
                  </Col>

                  <Col lg={7} md={7} sm={12} className="mt-2">
                    <h6 style={{ fontSize: "14px", fontWeight: "600" }}>
                      Temple Image <span style={{ color: "red" }}>*</span>
                    </h6>

                    {/*  Existing Temple Image from backend */}
                    {currentTemple.temple_image_url && !currentTemple.temple_image?.name && (
                      <div className="my-2">

                        <img
                          src={currentTemple.temple_image_url}
                          alt="Temple"
                          style={{
                            width: "100%",
                            height: "140px",
                            objectFit: "contain",
                            borderRadius: "10px",

                          }}
                        />
                        <div className="mt-2">
                          <a
                            href={currentTemple.temple_image_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="event-click-btn"
                            style={{ fontSize: "12px", padding: "3px 8px", textDecoration: "none" }}
                          >
                            View Full Image
                          </a>
                        </div>
                      </div>
                    )}

                    {/*  New uploaded image preview */}
                    {currentTemple.temple_image instanceof File && (
                      <div className="mt-2">
                        <p className="fw-bold">New Upload Preview:</p>
                        <img
                          src={URL.createObjectURL(currentTemple.temple_image)}
                          alt="Preview"
                          style={{
                            width: "100%",
                            height: "180px",
                            objectFit: "contain",
                            borderRadius: "10px",
                            border: "1px solid #ccc",
                          }}
                        />
                        <div className="mt-2 d-flex align-items-center gap-3">
                          <a
                            href={URL.createObjectURL(currentTemple.temple_image)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-primary btn-sm"
                          >
                            View Full Image
                          </a>
                          <span
                            className="text-danger"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              setCurrentTemple({
                                ...currentTemple,
                                temple_image: "",
                                temple_image_preview: "",
                              })
                            }
                          >
                            ❌ Remove
                          </span>
                        </div>
                      </div>
                    )}
                  </Col>
                </Row>

                {/* ===================== DOCUMENTS SECTION ===================== */}
                {[
                  { label: "Land Document", key: "land_doc" },
                  { label: "NOC Document", key: "noc_doc" },
                  { label: "Trust Certificate", key: "trust_cert" },
                ].map(({ label, key }) => (
                  <Row className="temp-stepform-box mt-4" key={key}>
                    <Col lg={5} md={5} sm={12}>
                      <fieldset
                        className={`upload_dropZone text-center ${dragging === key ? "drag-over" : ""
                          }`}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragging(key);
                        }}
                        onDragLeave={() => setDragging(null)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragging(null);
                          const file = e.dataTransfer.files[0];
                          if (file) {
                            handleChange({
                              target: { name: key, files: [file], type: "file" },
                            });
                          }
                        }}
                      >
                        <legend className="visually-hidden">{label}</legend>
                        <img
                          src={UploadFile} alt="upload-file"
                          style={{ width: "35px" }}
                        />
                        <p className="temp-drop-txt my-2">
                          Drag &amp; drop files
                          <br />
                          <i>or</i>
                        </p>

                        <input
                          id={key}
                          name={key}
                          type="file"
                          accept="image/jpeg, image/png, application/pdf"
                          className="invisible"
                          onChange={handleChange}
                        />

                        <label className="btn temp-primary-btn mb-1" htmlFor={key}>
                          Choose file
                        </label>
                        <p className="temp-upload-file">Upload size up to 2MB (jpg, png, pdf)</p>
                      </fieldset>
                    </Col>

                    <Col lg={7} md={7} sm={12} className="mt-2">
                      <h6 style={{ fontSize: "14px", fontWeight: "600" }}>
                        {label} <span style={{ color: "red" }}>*</span>
                      </h6>

                      {/*  Existing Document from backend */}
                      {currentTemple[`${key}_url`] && !currentTemple[key]?.name && (
                        <div className="my-2">


                          {/* Image or PDF */}
                          {/\.(jpg|jpeg|png)$/i.test(currentTemple[`${key}_url`]) ? (
                            <>
                              <img
                                src={currentTemple[`${key}_url`]}
                                alt={label}
                                style={{
                                  width: "100%",
                                  height: "150px",
                                  objectFit: "contain",
                                  borderRadius: "10px",
                                  border: "1px solid #ccc",
                                }}
                              />
                              <div className="mt-2">
                                <a
                                  href={currentTemple[`${key}_url`]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="event-click-btn"
                                  style={{ fontSize: "12px", padding: "3px 8px", textDecoration: "none" }}
                                >
                                  View Full Image
                                </a>
                              </div>
                            </>
                          ) : (
                            <a
                              href={currentTemple[`${key}_url`]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="event-click-btn"
                              style={{ fontSize: "12px", padding: "3px 8px", textDecoration: "none" }}
                            >
                              📄 View Full PDF
                            </a>
                          )}
                        </div>
                      )}

                      {/*  New uploaded file preview */}
                      {currentTemple[key] instanceof File && (
                        <div className="mt-2">


                          {currentTemple[key].type.startsWith("image/") ? (
                            <>
                              <img
                                src={URL.createObjectURL(currentTemple[key])}
                                alt="Preview"
                                style={{
                                  width: "100%",
                                  height: "150px",
                                  objectFit: "contain",
                                  borderRadius: "10px",
                                  border: "1px solid #ccc",
                                }}
                              />
                              <div className="mt-2 d-flex align-items-center gap-3">
                                <a
                                  href={URL.createObjectURL(currentTemple[key])}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-outline-primary btn-sm"
                                >
                                  View Full Image
                                </a>
                                <span
                                  className="text-danger"
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    setCurrentTemple({
                                      ...currentTemple,
                                      [key]: "",
                                      [`${key}_preview`]: "",
                                    })
                                  }
                                >
                                  ❌ Remove
                                </span>
                              </div>
                            </>
                          ) : currentTemple[key].type === "application/pdf" ? (
                            <div className="mt-2">
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                                alt="PDF icon"
                                style={{ width: "50px" }}
                              />
                              <span className="ms-2">{currentTemple[key].name}</span>
                              <div className="mt-2 d-flex align-items-center gap-3">
                                <a
                                  href={URL.createObjectURL(currentTemple[key])}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-outline-primary btn-sm"
                                >
                                  📄 View Full PDF
                                </a>
                                <span
                                  className="text-danger"
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    setCurrentTemple({
                                      ...currentTemple,
                                      [key]: "",
                                      [`${key}_preview`]: "",
                                    })
                                  }
                                >
                                  ❌ Remove
                                </span>
                              </div>
                            </div>
                          ) : (
                            <span>{currentTemple[key].name}</span>
                          )}
                        </div>
                      )}
                    </Col>
                  </Row>
                ))}

              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button className="event-click-cancel" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button className="event-click-btn" onClick={handleUpdate}>
                Update
              </Button>
            </Modal.Footer>
          </Modal>

        </div>
      </main>
    </div>
  );
};

export default ManageTemple;
