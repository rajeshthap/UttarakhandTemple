import axios from "axios";

// Temple register api function

export const Globaleapi = (payload) => {
  return axios.post("https://brjobsedu.com/Temple_portal/api/Temple_register/", payload, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};


const SendOtp = (otpPayload) => {
  return axios.post(
    "https://brjobsedu.com/Temple_portal/api/Sentotp/",
    otpPayload, 
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

// API for already registered phone in User registration
export const CheckPhoneApi = (phone) => {
  const formData = new FormData();
  formData.append("phone", phone); 
  return axios.get(
    "https://brjobsedu.com/Temple_portal/api/users-phone/",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
export { SendOtp };
