import React, { useEffect } from "react";
import "../../../assets/CSS/LeftNav.css";
import LeftNav from "../LeftNav";
import OnlineHirePandit from "../../Mandir_booking/OnlineHirePandit";

const PanditDashBoard = () => {
  useEffect(() => {
    // Push the current page into history so user can't go back
    window.history.pushState(null, "", window.location.href);
  
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
  
    window.addEventListener("popstate", handlePopState);
  
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
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
               <OnlineHirePandit />
        </main>
     
      </div>
    </>
  );
};

export default PanditDashBoard;
