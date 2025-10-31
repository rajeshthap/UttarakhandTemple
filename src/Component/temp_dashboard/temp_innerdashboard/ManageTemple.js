import React, { useEffect, useState } from "react";
import "../../../assets/CSS/LeftNav.css";
import TempleLeftNav from "../TempleLeftNav";
import SearchFeature from "./SearchFeature";
import { BASE_URLL } from "../../../Component/BaseURL";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../GlobleAuth/AuthContext";
import LocationState from "../../userregistration/LocationState";
import UploadFile from "../../../assets/images/upload-icon.png";

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

  return (
    <div className="dashboard-wrapper">
      <aside className="temp-sidebar">
        <TempleLeftNav />
      </aside>

      <main className="main-container-box">
        <div className="content-box">
          <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
            <h1 className="fw500">
              <span className="fw700h1">Manage </span>Temple
            </h1>
            {/*  Pass search handler */}
            <div>
              <SearchFeature onSearch={handleSearch} />
            </div>
          </div>

          <Row className="mt-3">
            <div className="col-md-12">
              <table className="rwd-table">
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
                            Edit
                          </Button>{" "}
                          <Button
                            className="event-click-btn-danger"
                            size="sm"
                            onClick={() => handleDelete(temple.temple_id)}
                          >
                            Delete
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

          {/* Existing Edit Modal remains unchanged */}
          {/* ... */}
        </div>
      </main>
    </div>
  );
};

export default ManageTemple;
