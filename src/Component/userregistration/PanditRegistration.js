import React, { useState } from "react";
import { Button, Col, Container, Row, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../assets/CSS/TempleAuthority.css";
import { FaCheckCircle } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import UploadFile from "../../assets/images/upload-icon.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function PanditRegistration() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    father_name: "",
    email: "",
    password: "",
    //confirmPassword: "",
    phone: "",
    aadhar_number: "",
    permanent_address: "",
    country: "",
    state: "",
    city: "",
    zipcode: "",
    temple_association: "",
    pandit_image: "",
    aadhar_document: "",
  });

  const [preview, setPreview] = useState({
  pandit_image: null,
  aadhar_document: null,
});


  const [errorReason_querys, setErrorReason_querys] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

const handleInputChange = (e) => {
  const { name, value, type, files } = e.target;

  if (type === "file" && files.length > 0) {
    const file = files[0];

    setFormData({ ...formData, [name]: file });

    // create preview safely
    setPreview({
      ...preview,
      [name]: URL.createObjectURL(file),
    });
  } else {
    // for text/number/email/etc.
    setFormData({ ...formData, [name]: value });
  }
};


  const validateForm = () => {
    let errors = {};

    if (!formData.first_name) errors.first_name = "First name is required";
    if (!formData.last_name) errors.last_name = "Last name is required";
    if (!formData.father_name) errors.father_name = "Father's name is required";

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password) errors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!formData.phone) errors.phone = "Mobile number is required";
    if (!formData.aadhar_number) errors.aadhar_number = "Aadhar number is required";
    if (!formData.permanent_address) errors.permanent_address = "Address is required";
    if (!formData.country) errors.country = "Country is required";
    if (!formData.state) errors.state = "State is required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.zipcode) errors.zipcode = "Zip code is required";
    if (!formData.temple_association) errors.temple_association = "Temple association is required";

    if (!formData.pandit_image) errors.pandit_image = "Pandit image is required";
    if (!formData.aadhar_document) errors.aadhar_document = "Aadhar document is required";

    setErrorReason_querys(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {


      

   const formDataToSend = new FormData();
formDataToSend.append("first_name", formData.first_name);
formDataToSend.append("last_name", formData.last_name);
formDataToSend.append("father_name", formData.father_name);
formDataToSend.append("email", formData.email);
formDataToSend.append("password", formData.password);
formDataToSend.append("phone", formData.phone);
formDataToSend.append("aadhar_number", formData.aadhar_number);
formDataToSend.append("permanent_address", formData.permanent_address);
formDataToSend.append("country", formData.country);
formDataToSend.append("state", formData.state);
formDataToSend.append("city", formData.city);
formDataToSend.append("zipcode", formData.zipcode);
formDataToSend.append("temple_association", formData.temple_association);
formDataToSend.append("pandit_image", formData.pandit_image);
formDataToSend.append("aadhar_document", formData.aadhar_document);


  for (let [key, value] of formDataToSend.entries()) {
  console.log(`${key}:`, value);
}

      // Axios POST request
      const response = await axios.post(
        "https://brjobsedu.com/Temple_portal/api/pandit/",
        formDataToSend,
         {
           headers: {
            "Content-Type": "multipart/form-data",
          },
        }
        
      );

      console.log(" API response:", response.data);

    

       //  Send OTP
      const res=await axios.post(
      "https://brjobsedu.com/Temple_portal/api/Sentotp/",
      { phone: formData.phone }
     );
       console.log("Api response:",res);
       
     localStorage.setItem('phone',formData.phone)
     //localStorage.setItem('otp',res.data.otp)

       alert(" Registered successfully! OTP sent to your phone.");

       //   Navigate to OTP Verification page
     navigate("/UserVerifyOtp", {
      state: { phone: formData.phone},
      });
      

      if (response.status === 200) {
        alert("Registration successful!");
        setFormData({
          first_name: "",
          last_name: "",
          father_name: "",
          email: "",
          password: "",
          //confirmPassword: "",
          phone: "",
          aadhar_number: "",
          permanent_address: "",
          country: "",
          state: "",
          city: "",
          zipcode: "",
          temple_association: "",
          pandit_image: "",
          aadhar_document: "",
        });
      }
    } catch (error) {
        console.log(error.response.data)
      if (error.response.data) {
        // server responded with error
        alert("Error: " + (error.response.data.message || "Something went wrong"));
      } else {
        // network or unexpected error
        alert("Error: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };




  return (
    <div>
      <Container className="temp-container">
        <div>
          <div className=" temple-registration-heading  ">
            <h1>Pandit Registration</h1>
            <div>
              <Form onSubmit={handleSubmit}>
                <Row className="mt-4">
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        First Name <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder=""
                        className="temp-form-control"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Last Name <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder=""
                        className="temp-form-control"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Father's Name <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder=""
                        className="temp-form-control"
                        name="father_name"
                        value={formData.father_name}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Email ID <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder=""
                        className="temp-form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Mobile Number <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder=""
                        className="temp-form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>



                  <Col md={4} lg={4} sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Password<span className="text-danger">*</span></Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                        <InputGroup.Text onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </InputGroup.Text>
                      </InputGroup>
                      {errorReason_querys.password && <div className="text-danger">{errorReason_querys.password}</div>}
                    </Form.Group>
                  </Col>


                  <Col md={4} lg={4} sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirm Password<span className="text-danger">*</span></Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                        />
                        <InputGroup.Text onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ cursor: "pointer" }}>
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </InputGroup.Text>
                      </InputGroup>
                      {errorReason_querys.confirmPassword && <div className="text-danger">{errorReason_querys.confirmPassword}</div>}
                    </Form.Group>
                  </Col>


                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Aadhar Number (for ID verification) <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder=""
                        className="temp-form-control"
                        name="aadhar_number"
                        value={formData.aadhar_number}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Permanent Address <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder=""
                        className="temp-form-control"
                        name="permanent_address"
                        value={formData.permanent_address}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Country <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Select className="temp-form-control-option"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="">

                        <option value="Select an option">
                          Select an Country
                        </option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        State <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Select className="temp-form-control-option"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder=""
                      >
                        <option value="Select an option">
                          Select an State
                        </option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        City <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Select className="temp-form-control-option"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder=""
                      >
                        <option value="Select an option">Select an City</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        ZipCode <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder=""
                        className="temp-form-control"
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>


                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Temple Association <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Select className="temp-form-control-option"
                        placeholder=""
                        name="temple_association"
                        value={formData.temple_association}
                        onChange={handleInputChange}
                      >
                        <option value="Select a option">Select a Temple Association</option>
                        <option value="option1">Local Temple Association</option>
                        <option value="option2">State Temple Association</option>
                        <option value="option3">National Temple Association</option>
                        <option value="option3">Independent</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                </Row>


                <div className="temple-registration-heading">
                  <h1>Supporting Documents</h1>
                </div>

                <Row>
                  {/* Pandit Image Upload */}
                  <Col lg={6} md={12} sm={12}>
                    <Row className="temp-stepform-box">
                      <Col lg={5} md={5} sm={5}>
                        <fieldset className="upload_dropZone text-center">
                          <legend className="visually-hidden">Pandit Image Upload</legend>

                          <img src={UploadFile} alt="upload-file" />

                          <p className="temp-drop-txt my-2">
                            Drag &amp; drop files
                            <br />
                            <i>or</i>
                          </p>

                          <input
                            id="pandit_image"
                            name="pandit_image"
                            type="file"
                            accept="image/jpeg, image/png"
                            className="invisible"
                            onChange={handleInputChange}
                          />

                          <label
                            className="btn temp-primary-btn mb-1"
                            htmlFor="pandit_image"
                          >
                            Choose file
                          </label>
                          <p className="temp-upload-file">
                            Upload size up to 100KB (jpg, png)
                          </p>
                        </fieldset>
                      </Col>

                      <Col lg={7} md={7} sm={7} className="temp-doc-subinfo mt-2">
                        <h3>
                          Pandit Image Upload <span className="temp-span-star">*</span>
                        </h3>
                        {formData.pandit_image && (
                          <>
                            <div className="d-flex temp-doc-info">
                              <Col lg={3} md={3} sm={3}>
                                {new Date().toLocaleDateString()}
                              </Col>
                              <Col lg={9} md={9} sm={9} className="px-4 temp-success-doc">
                                <FaCheckCircle /> Uploaded Successfully
                              </Col>
                            </div>
                            <div
                              className="col temp-delete-icon"
                              onClick={() =>
                                setFormData({ ...formData, pandit_image: "" })
                              }
                            >
                              <h3>
                                <RiDeleteBin6Line className="mx-1" />
                                Click here to Remove
                              </h3>
                            </div>
                          </>
                        )}
                      </Col>
                    </Row>
                  </Col>

                  {/* Aadhaar Card Upload */}
                  <Col lg={6} md={12} sm={12}>
                    <Row className="temp-stepform-box">
                      <Col lg={5} md={5} sm={5}>
                        <fieldset className="upload_dropZone text-center">
                          <legend className="visually-hidden">Aadhar Card Upload</legend>

                          <img src={UploadFile} alt="upload-file" />

                          <p className="temp-drop-txt my-2">
                            Drag &amp; drop files
                            <br />
                            <i>or</i>
                          </p>

                          <input
                            id="aadhar_document"
                            name="aadhar_document"
                            type="file"
                            accept="image/jpeg, image/png, application/pdf"
                            className="invisible"
                            onChange={handleInputChange}
                          />

                          <label
                            className="btn temp-primary-btn mb-1"
                            htmlFor="aadhar_document"
                          >
                            Choose file
                          </label>
                          <p className="temp-upload-file">
                            Upload size up to 200KB (jpg, png, pdf)
                          </p>
                        </fieldset>
                      </Col>

                      <Col lg={7} md={7} sm={7} className="temp-doc-subinfo mt-2">
                        <h3>
                          Aadhar Card Documents <span className="temp-span-star">*</span>
                        </h3>
                        {formData.aadhar_document && (
                          <>
                            <div className="d-flex temp-doc-info">
                              <Col lg={3} md={3} sm={3}>
                                {new Date().toLocaleDateString()}
                              </Col>
                              <Col lg={9} md={9} sm={9} className="px-4 temp-success-doc">
                                <FaCheckCircle /> Uploaded Successfully
                              </Col>
                            </div>
                            <div
                              className="col temp-delete-icon"
                              onClick={() =>
                                setFormData({ ...formData, aadhar_document: "" })
                              }
                            >
                              <h3>
                                <RiDeleteBin6Line className="mx-1" />
                                Click here to Remove
                              </h3>
                            </div>
                          </>
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>


                <div className="gap-3 mt-3 Temp-btn-submit">
                  <Button
                    variant="temp-submit-btn"
                    className="temp-submit-btn mx-3"
                    type="submit"
                     disabled={loading}
                  >
                    {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Registering...
                </>
              ) : (
                "Register Now"
                  )}

                    
                  </Button>
                  <Button
                    variant="secondary"
                    className="temp-cancle-btn"
                    type="button"
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default PanditRegistration;
