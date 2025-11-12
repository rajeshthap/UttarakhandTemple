import React, { useState, useEffect, useMemo } from "react";
import "../../../assets/CSS/LeftNav.css";
import LeftNav from "../LeftNav";
import { Breadcrumb, Row , Button} from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../GlobleAuth/AuthContext";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaPrint } from "react-icons/fa6";
import { FaFileExcel } from "react-icons/fa";

const DonationsDetails = () => {
  const { uniqueId } = useAuth();
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!uniqueId) return;

    const fetchDonations = async () => {
      try {
        const res = await axios.get(
          `https://mahadevaaya.com/backend/api/donation/?creator_id=${uniqueId}`
        );

        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.results || [];

        setDonations(data);
        setFilteredDonations(data);
      } catch (error) {
        console.error("Error fetching donation data:", error);
        setDonations([]);
        setFilteredDonations([]);
      }
    };

    fetchDonations();
  }, [uniqueId]);

  useEffect(() => {
    const filtered = donations.filter((item) => {
      const id = item.donatiom_id?.toString().toLowerCase() || "";
      const name = item.pilgrim_name?.toLowerCase() || "";
      const mobile = item.mobile_number?.toString() || "";
      const amount = item.amount?.toString() || "";
      return (
        id.includes(searchTerm.toLowerCase()) ||
        name.includes(searchTerm.toLowerCase()) ||
        mobile.includes(searchTerm) ||
        amount.includes(searchTerm)
      );
    });
    setFilteredDonations(filtered);
  }, [searchTerm, donations]);

  const totalDonation = useMemo(() => {
    return filteredDonations.reduce(
      (sum, item) => sum + (parseFloat(item.amount) || 0),
      0
    );
  }, [filteredDonations]);

  const handlePrint = () => {
    const table = document.querySelector(".rwd-table").cloneNode(true);

    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
      <head>
        <title>Donation Details</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          h2 {
            text-align: center;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
            font-size: 13px;
          }
          th {
            background-color: #f4f4f4;
            font-weight: bold;
          }
          tr:nth-child(even) {
            background-color: #fafafa;
          }
        </style>
      </head>
      <body>
        <h2>Donation Details</h2>
        ${table.outerHTML}
      </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };

  //  EXCEL DOWNLOAD (Styled and Bold Header)
  const handleDownload = () => {
    if (filteredDonations.length === 0) {
      window.alert("No donation records to download!");
      return;
    }

    const data = filteredDonations.map((item, index) => ({
      "S.No": index + 1,
      "Donation ID": item.donatiom_id,
      "Pilgrim Name": item.pilgrim_name,
      "Mobile Number": item.mobile_number,
      "Amount (₹)": item.amount,
    }));

    const ws = XLSX.utils.json_to_sheet(data);

    // Style header
    const range = XLSX.utils.decode_range(ws["!ref"]);
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
      { wch: 25 },
      { wch: 20 },
      { wch: 15 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Donations");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "Donation_Details.xlsx"
    );
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
              <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
                <h1 className="fw500">
                  <Breadcrumb>
                    <Breadcrumb.Item href="/MainDashBoard">
                      <span className="fw700h1">DashBoard </span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                      Donation Details
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </h1>

                <div>
                  <div className="d-flex justify-content-center h-100">
                    <div className="search">
                      <input
                        className="search_input"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search here..."
                      />
                      <button type="button" className="search_icon">
                        <i className="fa fa-search"></i>
                      </button>
                    </div>
                  </div>

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

              <div className="col-md-12">
                <table className="rwd-table">
                  <tbody>
                    <tr>
                      <th>Donation ID</th>
                      <th>Pilgrim Name</th>
                      <th>Mobile Number</th>
                      <th>Amount (₹)</th>
                    </tr>

                    {filteredDonations.length > 0 ? (
                      filteredDonations.map((item, index) => (
                        <tr key={index}>
                          <td data-th="Donation ID">{item.donatiom_id}</td>
                          <td data-th="Pilgrim Name">{item.pilgrim_name}</td>
                          <td data-th="Mobile Number">{item.mobile_number}</td>
                          <td data-th="Amount">{item.amount}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="text-center text-muted fw-bold"
                        >
                          No donation records found.
                        </td>
                      </tr>
                    )}

                    <tr>
                      <td colSpan="3" className="text-end ">
                        <div className="total-text-bold">
                        Total Donation:
                        </div>
                      </td>
                      <td className="fw-bold"> <div className="total-text-bold text-end">₹{totalDonation.toFixed(2)}</div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </>
  );
};

export default DonationsDetails;
