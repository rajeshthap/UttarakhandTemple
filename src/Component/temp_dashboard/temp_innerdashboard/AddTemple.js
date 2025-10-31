import React from "react";
import "../../../assets/CSS/LeftNav.css";
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
          <div className="content-box">
            <div className="add-temp-style flex-xxl-nowrap flex-wrap mb-3 ">
              {" "}
              <h1 className="fw500">
                <span class="fw700h1">Add </span> Temple
              </h1>{" "}
 <p>Please enter a different mobile number</p>
            </div>
            <TempleAuthority />
          </div>
        </main>
      </div>
    </>
  );
};

export default AddTemple;
