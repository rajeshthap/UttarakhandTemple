import React, { useEffect, useRef, useState } from "react";
import "../../assets/CSS/TempleLeftNav.css";
import "../../assets/CSS/DashBoard.css";
import "../../assets/CSS/Temple_DashBoard.css";


import TempleLeftNav from "./TempleLeftNav";

import { useAuth } from "../GlobleAuth/AuthContext";
import axios from "axios";

const TempleProfile = () => {
  const { uniqueId } = useAuth();

  

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <TempleLeftNav />
      </aside>
      <main className="main-container">
        <div className="content-box">
         Temple Profile
        </div>
      </main>
    </div>
  );
};

export default TempleProfile;
