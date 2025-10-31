import React, { useState } from "react";
import "../../../assets/CSS/TempleLeftNav.css";
import TempleLeftNav from "../TempleLeftNav";

import SupportPage from "./SupportPage";

const TempleSupport = () => {


  return (
    <div className="dashboard-wrapper">
      <aside className="pandit-sidebar">
        <TempleLeftNav />
      </aside>

     <SupportPage />
    </div>
  );
};

export default TempleSupport;
