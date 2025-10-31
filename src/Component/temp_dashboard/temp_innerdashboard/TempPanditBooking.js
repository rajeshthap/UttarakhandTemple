import React from "react";
import "../../../assets/CSS/PanditLeftNav.css";
import TempleLeftNav from "../TempleLeftNav";
import PanditBooking from "../../PanditBooking";
import OnlineHirePandit from "../../Mandir_booking/OnlineHirePandit";


const TempPanditBooking = () => {
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
               <OnlineHirePandit />
        </main>
     
      </div>
    </>
  );
};

export default TempPanditBooking;
