import React from "react";
import "../../../assets/CSS/LeftNav.css";
import "../../../assets/CSS/DashBoard.css";
import { Button, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import LeftNav from "../LeftNav";
import { FaHandsPraying, FaOm } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdOutlineSwipeUp } from "react-icons/md";
import { BsNewspaper } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { FaHandHoldingWater } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { RiFilePaper2Line } from "react-icons/ri";
import PanditImg from "../../../assets/images/pandit_icon.png";
import { BiSolidDonateBlood } from "react-icons/bi";
import { GiByzantinTemple } from "react-icons/gi";
import { useAuth } from "../../GlobleAuth/AuthContext";


const BookingHistory = () => {
  const { uniqueId } = useAuth();
  return (
    <>
      {/* Main Wrapper */}
      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <LeftNav />
        </aside>

        {/* Right-hand Main Container */}
        <main className="main-container">
          <div className="content-box">
            <h1 className=" fw500">
              <span class="fw700h1">Booking </span> History
            </h1>
          <div>
              <h1>Main Dashboard</h1>
              <p>Unique ID: {uniqueId}</p>{" "}
            </div>

            <Row>
              <h2>Transaction History</h2>
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

export default BookingHistory;
