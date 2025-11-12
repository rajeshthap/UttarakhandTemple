import React, { useState } from "react";
import "../../../../assets/CSS/PanditLeftNav.css";
import { Breadcrumb, Row, Spinner, Button } from "react-bootstrap";
import SearchFeature from "../../../temp_dashboard/temp_innerdashboard/SearchFeature";
import PanditLeftNav from "../../PanditLeftNav";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaPrint } from "react-icons/fa6";
import { FaFileExcel } from "react-icons/fa";

const EarnAndTrans = () => {
  const [loading] = useState(false);

// Static Data
  const poojas = [
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

  // Filtered data for display
  const [filteredPoojas, setFilteredPoojas] = useState(poojas);

  // Search handler
  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();

    if (!query.trim()) {
      setFilteredPoojas(poojas);
    } else {
      const filtered = poojas.filter(
        (p) =>
          p.pooja_name?.toLowerCase().includes(lowerQuery) ||
          p.pandit_name?.toLowerCase().includes(lowerQuery) ||
          p.pooja_price?.toString().includes(lowerQuery)
      );
      setFilteredPoojas(filtered);
    }
  };

  // Calculate total amount
  const totalAmount = filteredPoojas.reduce(
    (sum, pooja) => sum + pooja.pooja_price,
    0
  );

  const handlePrint = () => {
    const table = document.querySelector(".pandit-rwd-table").cloneNode(true);

    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Earnings & Transactions</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h2 { text-align: center; margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ccc; padding: 8px; font-size: 13px; text-align: left; }
            th { background-color: #f4f4f4; font-weight: bold; }
            tr:nth-child(even) { background-color: #fafafa; }
            .total-amount { font-weight: bold; background-color: #f4f4f4; }
          </style>
        </head>
        <body>
          <h2>Earnings & Transactions</h2>
          ${table.outerHTML}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };

  //  EXCEL DOWNLOAD FUNCTION (Styled)
  const handleDownload = () => {
    if (filteredPoojas.length === 0) {
      window.alert("No data to download!");
      return;
    }

    const data = filteredPoojas.map((pooja, index) => ({
      "S.No": index + 1,
      "Pandit Name": pooja.pandit_name,
      "Pooja Name": pooja.pooja_name,
      "Pooja Price (₹)": pooja.pooja_price,
      Status: pooja.status,
    }));

    // Add total row
    data.push({
      "S.No": "",
      "Pandit Name": "",
      "Pooja Name": "Total Amount",
      "Pooja Price (₹)": totalAmount,
      Status: "",
    });

    const ws = XLSX.utils.json_to_sheet(data);

    // Header styling (bold, colored)
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

    ws["!cols"] = [
      { wch: 6 },
      { wch: 25 },
      { wch: 25 },
      { wch: 20 },
      { wch: 15 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Earnings & Transactions");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "Earnings_Transactions.xlsx"
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
                  <Breadcrumb.Item active>
                    Earnings & Transactions
                  </Breadcrumb.Item>
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

                    {filteredPoojas.length > 0 ? (
                      <>
                        {filteredPoojas.map((pooja, index) => (
                          <tr key={pooja.id}>
                            <td data-th="S.No">{index + 1}</td>
                            <td data-th="Pandit Name">{pooja.pandit_name}</td>
                            <td data-th="Pooja Name">{pooja.pooja_name}</td>
                            <td data-th="Pooja Price">{pooja.pooja_price}</td>
                            <td data-th="Status">{pooja.status}</td>
                          </tr>
                        ))}

                        <tr className="fw-bold ">
                          <td colSpan="3" className="text-end fw-bold">
                            Total Amount:
                          </td>
                          <td className="total-amount" colSpan="2">₹{totalAmount}</td>
                        
                        </tr>
                      </>
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          {loading ? (
                            <Spinner animation="border" />
                          ) : (
                            "No completed poojas found."
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

export default EarnAndTrans;
