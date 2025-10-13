import axios from "axios";

const BASE_URLL = "http://mahadevaaya.com/backend/";

export const Globaleapi = async (payload) => {
  try {
    const res = await axios.post(`${BASE_URLL}api/all-reg/`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { error: error.message };
    }
  }
};

const SendOtp = (otpPayload) => {
  return axios.post(`${BASE_URLL}api/send-otp/`, otpPayload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// API for already registered phone in User registration
export const CheckPhoneApi = (phone) => {
  const formData = new FormData();
  formData.append("phone", phone);
  return axios.get(`${BASE_URLL}api/all-reg/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export { SendOtp };
