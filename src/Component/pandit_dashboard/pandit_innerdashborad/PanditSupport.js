import React, { useState } from "react";
import "../../../assets/CSS/PanditLeftNav.css";
import {
  Breadcrumb,
  Form,
  Button,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import PanditLeftNav from "../PanditLeftNav";
import { BASE_URLL } from "../../BaseURL"; //  Update to your backend base URL
import SupportPage from "../../temp_dashboard/support/SupportPage";

const PanditSupport = () => {
 

  return (
    <div className="dashboard-wrapper">
      <aside className="pandit-sidebar">
        <PanditLeftNav />
      </aside>

     <SupportPage />
    </div>
  );
};

export default PanditSupport;
