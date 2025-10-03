import axios from "axios";

// Temple register api function

export const Globaleapi = (payload) => {
  return axios.post("https://brjobsedu.com/Temple_portal/api/all-reg/", payload, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};


const SendOtp = (otpPayload) => {
  return axios.post(
    "https://brjobsedu.com/Temple_portal/api/send-otp/",
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
    "https://brjobsedu.com/Temple_portal/api/all-reg/",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
export { SendOtp };