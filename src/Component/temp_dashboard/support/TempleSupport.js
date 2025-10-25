import React from "react";
import "../../../assets/CSS/LeftNav.css";
import TempleLeftNav from "../TempleLeftNav";
import SearchFeature from "../temp_innerdashboard/SearchFeature";

const TempleSupport = () => {
  return (
    <>
      {/* Main Wrapper */}
      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <TempleLeftNav />
        </aside>

        {/* Right-hand Main Container */}

        <main className="main-container-box">
          <div className="content-box">
            <SearchFeature />
            <div>Temple Support</div>
          </div>
        </main>
      </div>
    </>
  );
};

export default TempleSupport;
