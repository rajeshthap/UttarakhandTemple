import React from "react";
import "../../../assets/CSS/LeftNav.css";
import {  Breadcrumb } from "react-bootstrap";
import TempleLeftNav from "../TempleLeftNav";
import TempleAuthority from "../../userregistration/TempleAuthority";

const AddTemple = () => {
  return (
    <>
      {/* Main Wrapper */}
      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <aside className="temp-sidebar">
          <TempleLeftNav />
        </aside>

        {/* Right-hand Main Container */}

        <main className="main-container-box">
          <div className="content-box add-temp-style">
            <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap ">
                                       <h1 className="fw500">
                                         <Breadcrumb>
                                           <Breadcrumb.Item href="/TempleDashBoard">
                                             <span className="fw700h1">DashBoard</span>
                                           </Breadcrumb.Item>
                                           <Breadcrumb.Item active>Add Temple</Breadcrumb.Item>
                                         </Breadcrumb>
                                       </h1>
                       
                                       
                                     </div>
                                     <p>Please use a different phone number</p>

            <TempleAuthority />
          </div>
        </main>
      </div>
    </>
  );
};

export default AddTemple;
