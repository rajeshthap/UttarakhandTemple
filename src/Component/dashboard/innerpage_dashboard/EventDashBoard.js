import React from "react";
import "../../../assets/CSS/LeftNav.css";
import LeftNav from "../LeftNav";
import EventParticipation from "../../Mandir_booking/EventParticipation/EventParticipation";


const EventDashBoard = () => {
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
               <EventParticipation />
        </main>
     
      </div>
    </>
  );
};

export default EventDashBoard;
