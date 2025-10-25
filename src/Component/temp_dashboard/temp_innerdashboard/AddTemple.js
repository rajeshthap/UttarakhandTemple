import React from "react";
import "../../../assets/CSS/LeftNav.css";
import TempleLeftNav from "../TempleLeftNav";
import SearchFeature from "./SearchFeature";
import TempleAuthority from "../../userregistration/TempleAuthority";

const AddTemple = () => {
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
            <div>Temple List</div>
            <TempleAuthority />
          </div>
        </main>
      </div>
    </>
  );
};

export default AddTemple;
