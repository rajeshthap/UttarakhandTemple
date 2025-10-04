import React from "react";
import "../../../assets/CSS/PanditLeftNav.css";
import TempleLeftNav from "../TempleLeftNav";
import SevaRegistration from "../../Mandir_booking/SevaRegistration/SevaRegistration";


const TempSevaRegis = () => {
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
               <SevaRegistration />
        </main>
     
      </div>
    </>
  );
};

export default TempSevaRegis;
