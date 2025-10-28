import React from "react";
import "../../../assets/CSS/LeftNav.css";
import LeftNav from "../LeftNav";
import AboutUs from "../../Home/AboutUs";
import { Breadcrumb, Row } from "react-bootstrap";

const DarshanDetails = () => {
  return (
    <>
      {/* Main Wrapper */}
      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <LeftNav />
        </aside>

        {/* Right-hand Main Container */}

        <main className="main-container-box">
          <div className="content-box">
            <Row className="">
              <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3 ">
                {" "}
                <h1 className=" fw500">
                  <Breadcrumb>
                    <Breadcrumb.Item href="/MainDashBoard">
                      {" "}
                      <span class="fw700h1">DashBoard </span>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item active>Darshan Details</Breadcrumb.Item>
                  </Breadcrumb>
                </h1>{" "}
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

              <div class="col-md-12">
                <table class="rwd-table">
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

export default DarshanDetails;
