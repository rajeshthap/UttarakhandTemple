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
            <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3 ">
              {" "}
              <h1 className=" fw500">
                <span class="fw700h1">Add </span> Temple
              </h1>{" "}
              <SearchFeature />
            </div>
            <div>Temple List</div>
            <TempleAuthority />
          </div>
        </main>
      </div>
    </>
  );
};

export default AddTemple;
