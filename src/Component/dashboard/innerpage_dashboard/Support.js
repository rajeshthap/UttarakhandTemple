import React, { useState } from "react";
import "../../../assets/CSS/TempleLeftNav.css";
import TempleLeftNav from "../TempleLeftNav";

import SupportPage from "./SupportPage";

const Support = () => {


  return (
    <div className="dashboard-wrapper">
      <aside className="pandit-sidebar">
        <TempleLeftNav />
      </aside>

     <SupportPage />
    </div>
  );
};

export default Support;
