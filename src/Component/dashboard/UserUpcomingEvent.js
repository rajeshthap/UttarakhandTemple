import React from "react";
import "../../assets/CSS/LeftNav.css";
import Events from "../UpcomingEvent/Events";
import LeftNav from "./LeftNav";
const UserUpcomingEvent = () => {
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
               <Events />
        </main>
     
      </div>
    </>
  );
};

export default UserUpcomingEvent;
