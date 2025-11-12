import React, { useEffect, useState } from "react";
import "../../../assets/CSS/LeftNav.css";
import LeftNav from "../LeftNav";
import { Breadcrumb, Row, Spinner,Button } from "react-bootstrap";
import SearchFeature from "../../temp_dashboard/temp_innerdashboard/SearchFeature";
import axios from "axios";
import { useAuth } from "../../GlobleAuth/AuthContext";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaPrint } from "react-icons/fa6";
import { FaFileExcel } from "react-icons/fa";

const SevaDetails = () => {
  const [sevaData, setSevaData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { uniqueId } = useAuth();

  const fetchSevaDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://mahadevaaya.com/backend/api/seva-booking/?creator_id=${uniqueId}`
      );

      if (Array.isArray(res.data)) {
        setSevaData(res.data);
        setFilteredData(res.data);
      } else {
        console.warn("Unexpected API format:", res.data);
      }
    } catch (error) {
      console.error("Error fetching Seva details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSevaDetails();
  }, []);

  const handleSearch = (term) => {
  const searchTerm = term.toLowerCase().trim();

  if (!searchTerm) {
    setFilteredData(sevaData);
    return;
  }

  const filtered = sevaData.filter((item) => {
    const phone = item.mobile_number?.toLowerCase() || "";
    const name = item.full_name?.toLowerCase() || "";
    const temple = item.temple_name?.toLowerCase() || "";

    // Match only from the start of the string
    return (
      phone.startsWith(searchTerm) ||
      name.startsWith(searchTerm) ||
      temple.startsWith(searchTerm)
    );
  });

  setFilteredData(filtered);
};

 const handlePrint = () => {
    const table = document.querySelector(".rwd-table").cloneNode(true);

    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
      <head>
        <title>Seva Details</title>
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
        <h2>Seva Details</h2>
        ${table.outerHTML}
      </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };

  //  Styled Excel Download Function
  const handleDownload = () => {
    if (filteredData.length === 0) {
      window.alert("No Seva records to download!");
      return;
    }

    const data = filteredData.map((item, index) => ({
      "S.No": index + 1,
      "Seva ID": item.seva_id || "—",
      "Full Name": item.full_name || "—",
      "Mobile Number": item.mobile_number || "—",
      "Temple Name": item.temple_name || "—",
      "Type of Seva": item.type_of_seva || "—",
      "Seva Date & Time": item.seva_date_and_time
        ? new Date(item.seva_date_and_time).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          })
        : "—",
      Frequency: item.frequency || "—",
      Instructions: item.special_instructions || "—",
      "Donation Amount": item.seva_donation_amount
        ? `₹${item.seva_donation_amount}`
        : "—",
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const range = XLSX.utils.decode_range(ws["!ref"]);

    // Header styling
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: C });
      if (!ws[cellRef]) continue;
      ws[cellRef].s = {
        font: { bold: true, color: { rgb: "FFFFFF" }, sz: 12 },
        fill: { fgColor: { rgb: "2B5797" } },
        alignment: { horizontal: "center", vertical: "center" },
        border: {
          top: { style: "thin", color: { rgb: "999999" } },
          bottom: { style: "thin", color: { rgb: "999999" } },
          left: { style: "thin", color: { rgb: "999999" } },
          right: { style: "thin", color: { rgb: "999999" } },
        },
      };
    }

    // Column widths
    ws["!cols"] = [
      { wch: 6 },
      { wch: 15 },
      { wch: 20 },
      { wch: 20 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 20 },
      { wch: 25 },
      { wch: 15 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Seva Details");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Seva_Details.xlsx");
  };


  return (
    <>
      <div className="dashboard-wrapper">
        <aside className="sidebar">
          <LeftNav />
        </aside>

        <main className="main-container-box">
          <div className="content-box">
            <Row>
              {/* Header and Search */}
              <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
                <h1 className="fw500">
                  <Breadcrumb>
                    <Breadcrumb.Item href="/MainDashBoard">
                      <span className="fw700h1">Dashboard</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Seva Details</Breadcrumb.Item>
                  </Breadcrumb>
                </h1>

                <div>
                  <SearchFeature onSearch={handleSearch} />
                </div>
              </div>

              <div className="mt-2 vmb-2 mb-2 text-end">
                <Button variant="" size="sm" className="mx-2 print-btn" onClick={handlePrint}>
                  <FaPrint /> Print
                </Button>

                <Button variant="" size="sm" className="download-btn" onClick={handleDownload}>
                  <FaFileExcel />Download
                </Button>
              </div>

              {/* Table Section */}
              <div className="col-md-12">
                {loading ? (
                  <div className="text-center my-4">
                    <Spinner animation="border" />
                  </div>
                ) : (
                  <table className="rwd-table">
                    <tbody>
                      <tr>
                        <th>Seva ID</th>
                        <th>Full Name</th>
                        <th>Mobile Number</th>
                        <th>Temple Name</th>
                        <th>Type of Seva</th>
                        <th>Seva Date & Time</th>
                        <th>Frequency</th>
                        <th>Instructions</th>
                        <th>Donation Amount</th>
                        
                      </tr>

                      {filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                          <tr key={index}>
                            <td data-th="Seva ID">{item.seva_id || "—"}</td>
                            <td data-th="Full Name">{item.full_name || "—"}</td>
                            <td data-th="Mobile Number">{item.mobile_number || "—"}</td>
                            <td data-th="Temple Name">{item.temple_name || "—"}</td>
                            <td data-th="Type of Seva">{item.type_of_seva || "—"}</td>
                            <td data-th="Seva Date & Time">
                              {item.seva_date_and_time
                                ? new Date(item.seva_date_and_time).toLocaleString(
                                    "en-IN",
                                    {
                                      dateStyle: "medium",
                                      timeStyle: "short",
                                    }
                                  )
                                : "—"}
                            </td>
                            <td data-th="Frequency">{item.frequency || "—"}</td>
                            
                            <td data-th="Instructions">{item.special_instructions || "—"}</td>
                            <td data-th="Donation Amount">
                              {item.seva_donation_amount
                                ? `₹${item.seva_donation_amount}`
                                : "—"}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center py-3">
                            No records found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </Row>
          </div>
        </main>
      </div>
    </>
  );
};

export default SevaDetails;
