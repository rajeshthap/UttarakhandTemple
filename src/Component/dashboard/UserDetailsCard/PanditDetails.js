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

const PanditDetails = () => {
  const [panditData, setPanditData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { uniqueId } = useAuth();

  const fetchPanditDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://mahadevaaya.com/backend/api/hire-pandit/?creator_id=${uniqueId}`
      );

      if (Array.isArray(res.data)) {
        setPanditData(res.data);
        setFilteredData(res.data);
      } else {
        console.warn("Unexpected API response format:", res.data);
      }
    } catch (error) {
      console.error("Error fetching Pandit details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPanditDetails();
  }, []);

  const handleSearch = (term) => {
    const searchTerm = term.toLowerCase().trim();

    if (!searchTerm) {
      setFilteredData(panditData);
      return;
    }

    const filtered = panditData.filter((item) => {
      const phone = item.mobile_number?.toLowerCase() || "";
      const name = item.full_name?.toLowerCase() || "";
      const pooja = item.pooja_type?.toLowerCase() || "";
      const location = item.location?.toLowerCase() || "";

      // Match from start
      return (
        phone.startsWith(searchTerm) ||
        name.startsWith(searchTerm) ||
        pooja.startsWith(searchTerm) ||
        location.startsWith(searchTerm)
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
          <title>Pandit Booking List</title>
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
          <h2>Pandit Booking List</h2>
          ${table.outerHTML}
        </body>
      </html>
    `);

    newWindow.document.close();
    newWindow.print();
  };

  //  Styled Excel Download
  const handleDownload = () => {
    if (filteredData.length === 0) {
      window.alert("No booking records to download!");
      return;
    }

    const data = filteredData.map((item, index) => ({
      "S.No": index + 1,
      "Full Name": item.full_name,
      "Mobile Number": item.mobile_number,
      "Address": item.address,
      "Pooja Type": item.pooja_type,
      "Language Preference": item.language_preference,
      "Date & Time": item.date_and_time
        ? new Date(item.date_and_time).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        })
        : "—",
      "Location": item.location,
      "Special Requirements": item.special_requirements,
      "Payment Mode": item.payment_mode,
      "Grand Total": item.grand_total ? `₹${item.grand_total}` : "—",
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const range = XLSX.utils.decode_range(ws["!ref"]);

    //  Bold header styling
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

    ws["!cols"] = [
      { wch: 6 },
      { wch: 25 },
      { wch: 18 },
      { wch: 30 },
      { wch: 25 },
      { wch: 20 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 20 },
      { wch: 15 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pandit Bookings");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "Pandit_Booking_List.xlsx"
    );
  };


  return (
    <>
      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <LeftNav />
        </aside>

        {/* Main Section */}
        <main className="main-container-box">
          <div className="content-box">
            <Row>
              {/* Header */}
              <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
                <h1 className="fw500">
                  <Breadcrumb>
                    <Breadcrumb.Item href="/MainDashBoard">
                      <span className="fw700h1">Dashboard</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Pandit Details</Breadcrumb.Item>
                  </Breadcrumb>
                </h1>

                <div>
                  <SearchFeature onSearch={handleSearch} />
                </div>
              </div>
              <div className="mt-2 vmb-2  mb-2 text-end">
                <Button variant="" size="sm" className="mx-2 print-btn" onClick={handlePrint}>
                  <FaPrint /> Print
                </Button>

                <Button variant="" size="sm" className="download-btn" onClick={handleDownload}>
                  <FaFileExcel />Download
                </Button>
              </div>

              {/* Table */}
              <div className="col-md-12">
                {loading ? (
                  <div className="text-center my-4">
                    <Spinner animation="border" />
                  </div>
                ) : (
                  <table className="rwd-table">
                    <tbody>
                      <tr>
                        <th>Full Name</th>
                        <th>Mobile Number</th>
                        <th>Address</th>
                        <th>Pooja Type</th>
                        <th>Pandit Details</th>
                        <th>Language Preference</th>
                        <th>Date & Time</th>
                        <th>Location</th>
                        <th>Special Requirements</th>
                        <th>Payment Mode</th>
                        <th>Grand Total</th>
                      </tr>

                      {filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                          <tr key={index}>
                            <td data-th="Full Name">{item.full_name || "—"}</td>
                            <td data-th="Mobile Number">
                              {item.mobile_number || "—"}
                            </td>
                            <td data-th="Address">{item.address || "—"}</td>
                            <td data-th="Pooja Type">
                              {item.pooja_type || "—"}
                            </td>

                            <td data-th="Pandit Details">
                              {item.number_of_pandits?.length > 0 ? (
                                <ul className="mb-0">
                                  {item.number_of_pandits.map((p, i) => (
                                    <li key={i}>
                                      {p.name} ({p.pandit_id}) - ₹{p.price}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                "—"
                              )}
                            </td>

                            <td data-th="Language Preference">
                              {item.language_preference || "—"}
                            </td>

                            <td data-th="Date & Time">
                              {item.date_and_time
                                ? new Date(item.date_and_time).toLocaleString(
                                  "en-IN",
                                  {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                  }
                                )
                                : "—"}
                            </td>

                            <td data-th="Location">{item.location || "—"}</td>
                            <td data-th="Special Requirements">
                              {item.special_requirements || "—"}
                            </td>
                            <td data-th="Payment Mode">
                              {item.payment_mode || "—"}
                            </td>
                            <td data-th="Grand Total">
                              {item.grand_total ? `₹${item.grand_total}` : "—"}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="11" className="text-center py-3">
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

export default PanditDetails;
