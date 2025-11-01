import React, { useState } from "react";
import "../../../../assets/CSS/PanditLeftNav.css";
import { Breadcrumb, Row, Spinner } from "react-bootstrap";
import SearchFeature from "../../../temp_dashboard/temp_innerdashboard/SearchFeature";
import PanditLeftNav from "../../PanditLeftNav";

const CompletedPuja = () => {
  const [loading] = useState(false);

  const filteredPoojas = [
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

  // Calculate total amount
  const totalAmount = filteredPoojas.reduce(
    (sum, pooja) => sum + pooja.pooja_price,
    0
  );

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
                <SearchFeature />
              </div>
            </div>

            {/* Table */}
            <Row className="mt-3">
              <div className="col-md-12">
                <table className="pandit-rwd-table">
                  <tbody>
                    <tr>
                      <th>S.No</th>
                      <th>Pandit Name</th>
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
                          <td colSpan="3" className="text-end">
                            Total Amount:
                          </td>
                          <td>₹{totalAmount}</td>
                          <td></td>
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
