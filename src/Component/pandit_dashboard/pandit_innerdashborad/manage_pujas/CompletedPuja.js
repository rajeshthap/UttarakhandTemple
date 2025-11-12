import React, { useState } from "react";
import "../../../../assets/CSS/PanditLeftNav.css";
import { Breadcrumb, Row, Spinner,Button } from "react-bootstrap";
import SearchFeature from "../../../temp_dashboard/temp_innerdashboard/SearchFeature";
import PanditLeftNav from "../../PanditLeftNav";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaPrint } from "react-icons/fa6";
import { FaFileExcel } from "react-icons/fa";

const CompletedPuja = () => {
  const [loading] = useState(false);

  // Original full pooja list
  const poojas = [
    // {
    //   id: 1,
    //   pandit_name: "Ramesh Sharma",
    //   pooja_name: "Rudrabhishek Puja",
    //   pooja_price: 1500,
    //   status: "Completed",
    // },
    // {
    //   id: 2,
    //   pandit_name: "Suresh Gupta",
    //   pooja_name: "Maha Mrityunjaya Jaap",
    //   pooja_price: 2500,
    //   status: "Completed",
    // },
    // {
    //   id: 3,
    //   pandit_name: "Amit Verma",
    //   pooja_name: "Satyanarayan Katha",
    //   pooja_price: 1800,
    //   status: "Completed",
    // },
  ];

  // Filtered list (for search results)
  const [filteredPoojas, setFilteredPoojas] = useState(poojas);

  // Calculate total amount
  const totalAmount = filteredPoojas.reduce(
    (sum, pooja) => sum + pooja.pooja_price,
    0
  );

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

  const handlePrint = () => {
    const table = document.querySelector(".pandit-rwd-table").cloneNode(true);

    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
      <head>
        <title>Completed Puja List</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h2 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; font-size: 13px; }
          th { background-color: #f4f4f4; font-weight: bold; }
          tr:nth-child(even) { background-color: #fafafa; }
          tfoot td { font-weight: bold; }
        </style>
      </head>
      <body>
        <h2>Completed Puja List</h2>
        ${table.outerHTML}
      </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };

  //  Styled Excel Download
  const handleDownload = () => {
    if (filteredPoojas.length === 0) {
      window.alert("No completed pujas to download!");
      return;
    }

    const data = filteredPoojas.map((pooja, index) => ({
      "S.No": index + 1,
      "Pandit Name": pooja.pandit_name,
      "Puja Name": pooja.pooja_name,
      "Puja Price (₹)": pooja.pooja_price,
      Status: pooja.status,
    }));

    // Add Total row at bottom
    data.push({
      "S.No": "",
      "Pandit Name": "",
      "Puja Name": "Total Amount:",
      "Puja Price (₹)": totalAmount,
      Status: "",
    });

    const ws = XLSX.utils.json_to_sheet(data);

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
      { wch: 30 },
      { wch: 20 },
      { wch: 15 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Completed Pujas");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "Completed_Puja_List.xlsx"
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
                  <Breadcrumb.Item active>Manage Puja</Breadcrumb.Item>
                  <Breadcrumb.Item active>Completed Puja</Breadcrumb.Item>
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

                        <tr className="fw-bold">
                          <td colSpan="3" className="text-end text-end text-md-end">
                            Total Amount:
                          </td>
                          <td className="text-end text-md-start">₹{totalAmount}</td>

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

export default CompletedPuja;
