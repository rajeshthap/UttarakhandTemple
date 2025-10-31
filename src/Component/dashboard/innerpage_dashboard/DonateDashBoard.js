import React from "react";
import "../../../assets/CSS/LeftNav.css";
import LeftNav from "../LeftNav";
import ExtendYourDivine from "../../DonateToTemples/ExtendYourDivine";


const DonateDashBoard = () => {
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
          
               <ExtendYourDivine />
        </main>
     
      </div>
    </>
  );
};

export default DonateDashBoard;
