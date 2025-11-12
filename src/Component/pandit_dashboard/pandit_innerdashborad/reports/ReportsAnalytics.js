import React, { useState } from "react";
import "../../../../assets/CSS/PanditLeftNav.css";
import { Breadcrumb, Row, Spinner,Button } from "react-bootstrap";
import SearchFeature from "../../../temp_dashboard/temp_innerdashboard/SearchFeature";
import PanditLeftNav from "../../PanditLeftNav";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaPrint } from "react-icons/fa6";
import { FaFileExcel } from "react-icons/fa";

const ReportAnalytics = () => {
  const [loading] = useState(false);

  //  Static analytics data
  const reports = [
    {
      id: 1,
      pandit_name: "Ramesh Sharma",
      pooja_name: "Rudrabhishek Puja",
      pooja_price: 1500,
      status: "Completed",
    },
    {
      id: 2,
      pandit_name: "Suresh Gupta",
      pooja_name: "Maha Mrityunjaya Jaap",
      pooja_price: 2500,
      status: "Completed",
    },
    {
      id: 3,
      pandit_name: "Amit Verma",
      pooja_name: "Satyanarayan Katha",
      pooja_price: 1800,
      status: "Completed",
    },
  ];

  // Calculate total revenue
  const totalRevenue = reports.reduce(
    (sum, item) => sum + item.pooja_price,
    0
  );

   const handlePrint = () => {
    const table = document.querySelector(".pandit-rwd-table").cloneNode(true);

    // Add Total Revenue row if not in table clone
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `
      <td colspan="3" style="text-align:right; font-weight:bold;">Total Revenue:</td>
      <td colspan="2" style="font-weight:bold;">₹${totalRevenue.toLocaleString("en-IN")}</td>
    `;
    table.querySelector("tbody").appendChild(totalRow);

    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Reports & Analytics</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h2 { text-align: center; margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ccc; padding: 8px; font-size: 13px; text-align: left; }
            th { background-color: #f4f4f4; font-weight: bold; }
            tr:nth-child(even) { background-color: #fafafa; }
            .total-row { font-weight: bold; background-color: #f4f4f4; }
          </style>
        </head>
        <body>
          <h2>Reports & Analytics</h2>
          ${table.outerHTML}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };

  //  STYLED EXCEL DOWNLOAD FUNCTION
  const handleDownload = () => {
    if (reports.length === 0) {
      window.alert("No analytics records to download!");
      return;
    }

    const data = reports.map((pooja, index) => ({
      "S.No": index + 1,
      "Pandit Name": pooja.pandit_name,
      "Pooja Name": pooja.pooja_name,
      "Pooja Price (₹)": pooja.pooja_price,
      Status: pooja.status,
    }));

    // Add Total Row
    data.push({
      "S.No": "",
      "Pandit Name": "",
      "Pooja Name": "Total Revenue",
      "Pooja Price (₹)": totalRevenue,
      Status: "",
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const range = XLSX.utils.decode_range(ws["!ref"]);

    // Header Styling (same as original)
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

    // Set Column Widths
    ws["!cols"] = [
      { wch: 6 },
      { wch: 25 },
      { wch: 30 },
      { wch: 20 },
      { wch: 15 },
    ];

    // Create workbook and export
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reports & Analytics");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "Reports_Analytics.xlsx"
    );
  };

  return (
    <>
      <div className="dashboard-wrapper">
        <aside className="pandit-sidebar">
          <PanditLeftNav />
        </aside>

        <main className="main-container-box">
          <div className="content-box">
            {/* Breadcrumb + Search */}
            <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
              <h1 className="fw500">
                <Breadcrumb>
                  <Breadcrumb.Item href="/Pandit_DashBoard">
                    <span className="fw700h1">Dashboard</span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>Reports & Analytics</Breadcrumb.Item>
                </Breadcrumb>
              </h1>
              <div>
                <SearchFeature />
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

            {/* Table */}
            <Row className="mt-3">
              <div className="col-md-12">
                <table className="pandit-rwd-table">
                  <tbody>
                    <tr>
                      <th>S.No</th>
                      <th>Full Name</th>
                      <th>Pooja Name</th>
                      <th>Pooja Price (₹)</th>
                      <th>Status</th>
                    </tr>

                    {reports.length > 0 ? (
                      <>
                        {reports.map((pooja, index) => (
                          <tr key={pooja.id}>
                            <td data-th="S.No">{index + 1}</td>
                            <td data-th="Pandit Name">{pooja.pandit_name}</td>
                            <td data-th="Pooja Name">{pooja.pooja_name}</td>
                            <td data-th="Pooja Price">{pooja.pooja_price}</td>
                            <td data-th="Status">{pooja.status}</td>
                          </tr>
                        ))}

                        {/* Total row */}
                        <tr className="table-total-row">
                          <td colSpan="3" className="text-end fw-bold">
                            Total Revenue:
                          </td>
                          <td colSpan="2" className="fw-bold text-end text-md-start">
                            ₹{totalRevenue.toLocaleString("en-IN")}
                          </td>
                        </tr>
                      </>
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          {loading ? (
                            <Spinner animation="border" />
                          ) : (
                            "No analytics data found."
                          )}
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
    </>
  );
};

export default ReportAnalytics;
