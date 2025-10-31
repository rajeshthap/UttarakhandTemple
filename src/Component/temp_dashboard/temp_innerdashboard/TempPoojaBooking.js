import React from "react";
import "../../../assets/CSS/PanditLeftNav.css";
import TempleLeftNav from "../TempleLeftNav";
import PanditBooking from "../../PanditBooking";
import PoojaBooking from "../../Mandir_booking/PoojaBooking/PoojaBooking";


const TempPoojaBooking = () => {
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
               <PoojaBooking />
        </main>
     
      </div>
    </>
  );
};

export default TempPoojaBooking;
