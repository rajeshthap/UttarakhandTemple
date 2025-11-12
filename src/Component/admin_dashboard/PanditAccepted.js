import React, { useEffect, useState } from "react";
import { Row, Button } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../GlobleAuth/AuthContext";
import * as XLSX from "xlsx";
import { FaPrint } from "react-icons/fa6";
import { FaFileExcel } from "react-icons/fa";

const PanditAccepted = () => {
    const { uniqueId } = useAuth();
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    // ====== FETCH ACCEPTED PANDIT REQUESTS ======
    const fetchRequests = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                "https://mahadevaaya.com/backend/api/get-all-registered/",
                {
                    params: {
                        role: "pandit",
                        status: "accepted",
                    },
                }
            );

            const data = Array.isArray(res.data?.results) ? res.data.results : [];
            setRequests(data);
            setFilteredRequests(data);
        } catch (err) {
            console.error("Error fetching accepted pandit requests:", err);
            setRequests([]);
            setFilteredRequests([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    // ====== SEARCH FUNCTION ======
    const handleSearch = (query) => {
        if (!query) {
            setFilteredRequests(requests);
            return;
        }
        const lowerQuery = query.toLowerCase();
        const filtered = requests.filter(
            (req) =>
                req.first_name?.toLowerCase().includes(lowerQuery) ||
                req.last_name?.toLowerCase().includes(lowerQuery) ||
                req.pandit_id?.toLowerCase().includes(lowerQuery) ||
                req.email?.toLowerCase().includes(lowerQuery)
        );
        setFilteredRequests(filtered);
    };

    // ====== UPDATE PANDIT STATUS ======
    const handleStatusChange = async (pandit_id, newStatus) => {
        const confirmAction = window.confirm(
            `Are you sure you want to change status to "${newStatus}"?`
        );
        if (!confirmAction) return;

        const payload = {
            pandit_id: pandit_id,
            pandit_status: newStatus.toLowerCase(),
            admin_id: uniqueId, // required by API
        };

        try {
            const res = await axios.patch(
                "https://mahadevaaya.com/backend/api/update-pandit-status/",
                payload,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (res.status === 200) {
                alert(`Pandit status updated to ${newStatus}`);
                // Refresh data after successful update
                fetchRequests();
            } else {
                alert("Failed to update status.");
            }
        } catch (err) {
            console.error("Error updating pandit status:", err);
            console.error("Backend response:", err.response?.data);
            alert("Error updating pandit status.");
        }
    };

    const handlePrint = () => {
    const table = document.querySelector(".admin-rwd-table").cloneNode(true);
    // Remove "Action" column
    table.querySelectorAll("th:last-child, td:last-child").forEach((el) => el.remove());
    const newWin = window.open("");
    newWin.document.write(`
      <html>
        <head>
          <title>Pandit Accepted List</title>
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
          <h2>Pandit Accepted List</h2>
          ${table.outerHTML}
        </body>
      </html>
    `);
    newWin.print();
    newWin.close();
  };

   const handleDownload = () => {
    if (!filteredRequests.length) return alert("No data to export!");

    const exportData = filteredRequests.map((r, i) => ({
      "S.No": i + 1,
      "Pandit ID": r.pandit_id,
      "First Name": r.first_name,
      "Last Name": r.last_name,
      "Email": r.email,
      "Phone": r.phone,
      "City": r.city,
      "State": r.state,
      "Country": r.country,
      "Status": r.pandit_status,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);

    const maxWidth = Object.keys(exportData[0]).map(
      (key) => Math.max(key.length, ...exportData.map((row) => String(row[key] || "").length)) + 5
    );
    ws["!cols"] = maxWidth.map((w) => ({ wch: w }));

    const range = XLSX.utils.decode_range(ws["!ref"]);

    // Header styling
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: C });
      if (ws[cellRef]) {
        ws[cellRef].s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          alignment: { horizontal: "center", vertical: "center" },
          fill: { fgColor: { rgb: "4472C4" } },
          border: {
            top: { style: "thin", color: { rgb: "AAAAAA" } },
            bottom: { style: "thin", color: { rgb: "AAAAAA" } },
            left: { style: "thin", color: { rgb: "AAAAAA" } },
            right: { style: "thin", color: { rgb: "AAAAAA" } },
          },
        };
      }
    }

    // Row styling (zebra effect)
    for (let R = 1; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
        if (ws[cellRef]) {
          ws[cellRef].s = {
            alignment: { vertical: "center" },
            border: {
              top: { style: "thin", color: { rgb: "DDDDDD" } },
              bottom: { style: "thin", color: { rgb: "DDDDDD" } },
              left: { style: "thin", color: { rgb: "DDDDDD" } },
              right: { style: "thin", color: { rgb: "DDDDDD" } },
            },
            fill: R % 2 === 0 ? { fgColor: { rgb: "F9F9F9" } } : undefined,
          };
        }
      }
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "PanditAccepted");
    XLSX.writeFile(wb, "Pandit_Accepted_List_Styled.xlsx");
  };

    return (
        <div className="dashboard-wrapper">
            {/* Main Section */}
            <main className="admin-container">
                <div className="content-box">
                    {/* Header */}
                    <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
                        {/* Search */}
                        <div className="d-flex justify-content-center h-100">
                            <div className="search">
                                <input
                                    className="search_input"
                                    type="text"
                                    placeholder="Search here..."
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                                <button type="submit" className="search_icon">
                                    <i className="fa fa-search"></i>
                                </button>
                                
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
                    </div>

                    {/* ===== TABLE SECTION ===== */}
                    <Row className="mt-3">
                        <div className="col-md-12">
                            <table className="admin-rwd-table">
                                <tbody>
                                    <tr>

                                        <th>S.No</th>
                                        <th>Pandit Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>City</th>
                                        <th>State</th>
                                        <th>Country</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>

                                    {filteredRequests.length > 0 ? (
                                        filteredRequests.map((req, index) => (
                                            <tr key={index}>
                                                <td data-th="S. No">{index + 1}</td>

                                                <td data-th="Pandit Name">
                                                    {req.first_name} {req.last_name}
                                                </td>
                                                <td data-th="Email">{req.email || "N/A"}</td>
                                                <td data-th="Phone">{req.phone || "N/A"}</td>
                                                <td data-th="City">{req.city}</td>
                                                <td data-th="State">{req.state}</td>
                                                <td data-th="Country">{req.country}</td>
                                                <td data-th="Status">{req.pandit_status || "accepted"}</td>
                                                <td>
                                                    <Button
                                                        className="event-click-btn me-2"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleStatusChange(req.pandit_id, "pending")
                                                        }
                                                    >
                                                        Pending
                                                    </Button>
                                                    <Button
                                                        className="event-click-cancel"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleStatusChange(req.pandit_id, "rejected")
                                                        }
                                                    >
                                                        Rejected
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center">
                                                {loading ? "Loading..." : "No accepted pandits found."}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Row>
                </div>
            </main>
        </div>
    );
};

export default PanditAccepted;
