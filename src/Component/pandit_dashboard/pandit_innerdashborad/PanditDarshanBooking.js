import React from "react";
import "../../../assets/CSS/PanditLeftNav.css";
import PanditLeftNav from "../PanditLeftNav";
import PoojaBooking from "../../Mandir_booking/PoojaBooking/PoojaBooking";


const PanditDarshanBooking = () => {
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
               <PoojaBooking />
        </main>
     
      </div>
    </>
  );
};

export default PanditDarshanBooking;
