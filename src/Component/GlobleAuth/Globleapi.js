import axios from "axios";

export const Globaleapi = async (formDataObj, documents) => {
  const formData = new FormData();

  // Append text fields
  for (const key in formDataObj) {
    formData.append(key, formDataObj[key]);
  }

  // Append files if present
  if (documents?.temple_image) formData.append("temple_image", documents.temple_image);
  if (documents?.land_doc) formData.append("land_doc", documents.land_doc);
  if (documents?.noc_doc) formData.append("noc_doc", documents.noc_doc);
  if (documents?.trust_cert) formData.append("trust_cert", documents.trust_cert);

  // Send POST request
  return axios.post(
    "https://brjobsedu.com/Temple_portal/api/Temple_register/",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
};
