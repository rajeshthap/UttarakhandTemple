import React from "react";
import "../../../assets/CSS/PanditLeftNav.css";
import TempleLeftNav from "../TempleLeftNav";
import PanditBooking from "../../PanditBooking";
import DarshanBooking from "../../Mandir_booking/DarshanBooking";


const TempDarshnBooking = () => {
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
               <DarshanBooking />
        </main>
     
      </div>
    </>
  );
};

export default TempDarshnBooking;
