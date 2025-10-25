import React, { useEffect, useState } from "react";
import "../../../assets/CSS/LeftNav.css";
import TempleLeftNav from "../TempleLeftNav";
import SearchFeature from "./SearchFeature";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

const ManageTemple = () => {
  const [templeData, setTempleData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTemple, setCurrentTemple] = useState({
    temple_id: "",
    temple_name: "",
    temple_address: "",
    city: "",
    state: "",
    country: "",
  });

  //  Fetch Temple List (GET API)
  const fetchTemples = async () => {
    try {
      const templeId = localStorage.getItem("temple_id") || "TEM/2025/95801";
      const response = await axios.get(
        `https://mahadevaaya.com/backend/api/get-temple/?temple_id=${templeId}`
      );

      // If backend returns a single object, convert it to an array
      const data = Array.isArray(response.data) ? response.data : [response.data];
      setTempleData(data);
    } catch (error) {
      console.error("Error fetching temple data:", error);
    }
  };

  useEffect(() => {
    fetchTemples();
  }, []);

  //  Open Modal on Edit
  const handleEdit = (temple) => {
    setCurrentTemple(temple);
    setShowModal(true);
  };

  //  Input Change in Modal
  const handleChange = (e) => {
    setCurrentTemple({
      ...currentTemple,
      [e.target.name]: e.target.value,
    });
  };

  //  Update Temple API (PUT)
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `https://mahadevaaya.com/backend/api/get-temple/?temple_id=TEM/2025/95801`, // <-- Update API endpoint
        currentTemple,
        {
          params: { temple_id: currentTemple.temple_id },
        }
      );

      if (response.status === 200) {
        alert("Temple updated successfully!");
        setShowModal(false);
        fetchTemples();
      }
    } catch (error) {
      console.error("Error updating temple data:", error);
      alert("Update failed!");
    }
  };

  //  Delete API (if backend supports it)
  const handleDelete = async (templeId) => {
    if (!window.confirm("Are you sure you want to delete this temple?")) return;
    try {
      await axios.delete(
        `https://mahadevaaya.com/backend/api/delete-temple/?temple_id=${templeId}`
      );
      setTempleData(templeData.filter((temple) => temple.temple_id !== templeId));
      alert("Temple deleted successfully");
    } catch (error) {
      console.error("Error deleting temple:", error);
    }
  };

  return (
    <>
      <div className="dashboard-wrapper">
        <aside className="sidebar">
          <TempleLeftNav />
        </aside>

        <main className="main-container-box">
          <div className="content-box">
            <SearchFeature />
            <h3>Manage Temple</h3>

            {/* Table */}
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Temple Name</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Country</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {templeData.length > 0 ? (
                  templeData.map((temple, index) => (
                    <tr key={temple.temple_id}>
                      <td>{index + 1}</td>
                      <td>{temple.temple_name}</td>
                      <td>{temple.temple_address}</td>
                      <td>{temple.city}</td>
                      <td>{temple.state}</td>
                      <td>{temple.country}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() => handleEdit(temple)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(temple.temple_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No Data Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/*  Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Temple</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {["temple_name", "temple_address", "city", "state", "country"].map((field, idx) => (
              <Form.Group className="mb-2" key={idx}>
                <Form.Label>
                  {field.replace("_", " ").toUpperCase()}
                </Form.Label>
                <Form.Control
                  type="text"
                  name={field}
                  value={currentTemple[field] || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ManageTemple;
