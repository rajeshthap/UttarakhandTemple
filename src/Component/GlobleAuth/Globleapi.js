import axios from "axios";

// Temole register api function

export const Globaleapi = (payload) => {
  return axios.post("https://brjobsedu.com/Temple_portal/api/Temple_register/", payload, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

// api.js


const SendOtp = (otpPayload) => {
  return axios.post(
    "https://brjobsedu.com/Temple_portal/api/Sentotp/",
    otpPayload, // ✅ send FormData directly
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

