import React from "react";
import "../../../assets/CSS/LeftNav.css";
import "../../../assets/CSS/DashBoard.css";

import LeftNav from "../LeftNav";


const MainDashBoard = () => {
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
            <h2>Dashboard Content</h2>
            <p>This is the right-hand side container box.</p>
          </div>
        </main>
      </div>
    </>
  );
};

export default MainDashBoard;
