import React from "react";
import "../../../assets/CSS/PanditLeftNav.css";
import PanditLeftNav from "../PanditLeftNav";
import SevaRegistration from "../../Mandir_booking/SevaRegistration/SevaRegistration";


const PanditSevaRegis = () => {
  return (
    <>
      {/* Main Wrapper */}
      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <aside className="pandit-sidebar">
          <PanditLeftNav />
        </aside>
        {/* Right-hand Main Container */}
        
        <main className="main-container-box">
               <SevaRegistration />
        </main>
     
      </div>
    </>
  );
};

export default PanditSevaRegis;
