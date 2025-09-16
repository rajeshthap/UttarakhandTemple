import React from "react";
import "../../../assets/CSS/LeftNav.css";
import LeftNav from "../LeftNav";
import SevaRegistration from "../../Mandir_booking/SevaRegistration/SevaRegistration";



const SevaRegistrationDashBoard = () => {
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
               <SevaRegistration />
        </main>
     
      </div>
    </>
  );
};

export default SevaRegistrationDashBoard;
