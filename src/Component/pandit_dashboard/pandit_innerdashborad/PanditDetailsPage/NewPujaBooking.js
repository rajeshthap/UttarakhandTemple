import React, { useEffect } from "react";

import { Breadcrumb, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";

import PanditImg from "../../../../assets/images/pandit-img.png";


import"../../../../assets/CSS/Pandit_DashBoard.css";
import { Navigate } from "react-router-dom";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaOm } from "react-icons/fa";
import { GiByzantinTemple } from "react-icons/gi";
import PanditLeftNav from "../../PanditLeftNav";
import SearchFeature from "../../../temp_dashboard/temp_innerdashboard/SearchFeature";

const NewPujaBooking = () => {
  useEffect(() => {
    // Push the current page into history so user can't go back
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
  return (
    <>
      {/* Main Wrapper */}
      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <aside className="pandit-sidebar">
          <PanditLeftNav />
        </aside>

        {/* Right-hand Main Container */}
        <main className="main-container">
          <div className="content-box">
            <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3 ">
              {" "} <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
                <h1 className="fw500">
                  <Breadcrumb>
                    <Breadcrumb.Item href="/Pandit_DashBoard">
                      <span className="fw700h1">Dashboard</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>New Pooja Booking</Breadcrumb.Item>
                  </Breadcrumb>
                </h1>

               
              </div>
              
              <div>
                <div className="d-flex justify-content-center h-100">
                  <div className="search">
                    <input
                      className="search_input"
                      type="text"
                      value=""
                      placeholder="Search here..."
                    />
                    <button type="submit" className="search_icon">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* <div>
              <h1>Main Dashboard</h1>
              <p>Unique ID: {uniqueId}</p>{" "}
            </div> */}
         
            <Row className="mt-3">
             
              <div class="col-md-12">
                <table class="pandit-rwd-table">
                  <tbody>
                    <tr>
                      <th>Supplier Code</th>
                      <th>Supplier Name</th>
                      <th>Invoice Number</th>
                      <th>Invoice Date</th>
                      <th>Due Date</th>
                      <th>Net Amount</th>
                    </tr>
                    <tr>
                      <td data-th="Supplier Code">UPS5005</td>
                      <td data-th="Supplier Name">UPS</td>
                      <td data-th="Invoice Number">ASDF19218</td>
                      <td data-th="Invoice Date">06/25/2016</td>
                      <td data-th="Due Date">12/25/2016</td>
                      <td data-th="Net Amount">$8,322.12</td>
                    </tr>
                    <tr>
                      <td data-th="Supplier Code">UPS3449</td>
                      <td data-th="Supplier Name">UPS South Inc.</td>
                      <td data-th="Invoice Number">ASDF29301</td>
                      <td data-th="Invoice Date">6/24/2016</td>
                      <td data-th="Due Date">12/25/2016</td>
                      <td data-th="Net Amount">$3,255.49</td>
                    </tr>
                    <tr>
                      <td data-th="Supplier Code">BOX5599</td>
                      <td data-th="Supplier Name">BOX Pro West</td>
                      <td data-th="Invoice Number">ASDF43000</td>
                      <td data-th="Invoice Date">6/27/2016</td>
                      <td data-th="Due Date">12/25/2016</td>
                      <td data-th="Net Amount">$45,255.49</td>
                    </tr>
                    <tr>
                      <td data-th="Supplier Code">PAN9999</td>
                      <td data-th="Supplier Name">Pan Providers and Co.</td>
                      <td data-th="Invoice Number">ASDF33433</td>
                      <td data-th="Invoice Date">6/29/2016</td>
                      <td data-th="Due Date">12/25/2016</td>
                      <td data-th="Net Amount">$12,335.69</td>
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

export default NewPujaBooking;
