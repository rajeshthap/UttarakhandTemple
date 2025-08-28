import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../assets/CSS/TempleAuthority.css";
import { FaCheckCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import UploadFile from "../../assets/images/upload-icon.png";

function TempleAuthority() {
  return (
    <div>
      <Container className="temp-container">
        <div>
          <div className="mt-3 temple-registration-heading p-3">
            <h1>Temple Registration</h1>
            <div>
              <Form>
                <Row className="mt-4">
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Temple Name <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder=""
                        className="temp-form-control"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Temple Type <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Select className="temp-form-control-option">
                        <option value="Select an option">
                          Select an Temple
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
                        Temple Facility{" "}
                        <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Select className="temp-form-control-option">
                        <option value="Select an option">
                          Select an Facility
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
                        Temple Address <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder=""
                        className="temp-form-control"
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
                      <Form.Select className="temp-form-control-option">
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
                      <Form.Select className="temp-form-control-option">
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
                      <Form.Select className="temp-form-control-option">
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
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Year of Establishment{" "}
                        <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Select className="temp-form-control-option">
                        <option value="Select an option">
                          Select an Establishment
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
                        Temple Events <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder=""
                        className="temp-form-control"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Temple Ownership Type{" "}
                        <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Select className="temp-form-control-option">
                        <option value="Select an option">
                          Select an Temple Ownership
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
                        Mobile Number <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder=""
                        className="temp-form-control"
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
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Trust/Managing Committee Details{" "}
                        <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder=""
                        className="temp-form-control"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="mt-3 temple-registration-heading p-3">
                  <h1>Temple Account No</h1>
                </div>
                <Row>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Bank Name <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Select className="temp-form-control-option">
                        <option value="Select an option">
                          Select an Bank Name
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
                        Account Number <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder=""
                        className="temp-form-control"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Confirm Account Number{" "}
                        <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder=""
                        className="temp-form-control"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        Account Type <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Select className="temp-form-control-option">
                        <option value="Select an option">
                          Select an Account Type
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
                        Account Name <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder=""
                        className="temp-form-control"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="temp-label">
                        IFSC Code <span className="temp-span-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder=""
                        className="temp-form-control"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="mt-3 temple-registration-heading p-3">
                  <h1>Supporting Documents</h1>
                </div>

                <Row>
                  <Col lg={6} md={12} sm={12}>
                    <Row className="temp-stepform-box">
                      <Col lg={5} md={5} sm={5}>
                        <form>
                          <fieldset class="upload_dropZone text-center ">
                            <legend class="visually-hidden">
                              Image uploader
                            </legend>

                            <img src={UploadFile} alt="upload-file" />

                            <p class="temp-drop-txt my-2">
                              Drag &amp; drop files
                              <br />
                              <i>or</i>
                            </p>

                            <input
                              id="upload_image_logo"
                              data-post-name="image_logo"
                              data-post-url="https://someplace.com/image/uploads/logos/"
                              class=" invisible"
                              type="file"
                              multiple
                              accept="image/jpeg, image/png, image/svg+xml"
                            />

                            <label
                              class="btn temp-primary-btn mb-1"
                              for="upload_image_logo"
                            >
                              Choose file(s)
                            </label>
                            <p className="temp-upload-file">
                              Upload size up to 10KB to 100KB (File Format: jpg,
                              png)
                            </p>

                            <div class="upload_gallery d-flex flex-wrap justify-content-center gap-3 mb-0"></div>
                          </fieldset>
                        </form>
                      </Col>
                      <Col
                        lg={7}
                        md={7}
                        sm={7}
                        className="temp-doc-subinfo mt-2"
                      >
                        <h3>
                          Temple Image Upload{" "}
                          <span className="temp-span-star">*</span>
                        </h3>
                        <div className="d-flex temp-doc-info">
                          <Col lg={3} md={3} sm={3}>
                            03.01.2025
                          </Col>
                          <Col
                            lg={9}
                            md={9}
                            sm={9}
                            className="px-4 temp-success-doc"
                          >
                            <FaCheckCircle /> Uploaded Successfully{" "}
                          </Col>
                        </div>
                        <div className="col temp-delete-icon">
                          <h3>
                            <RiDeleteBin6Line className="mx-1" />
                            Click here to Remove
                          </h3>{" "}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={6} md={12} sm={12}>
                    <Row className="temp-stepform-box">
                      <Col lg={5} md={5} sm={5}>
                        <form>
                          <fieldset class="upload_dropZone text-center ">
                            <legend class="visually-hidden">
                              Image uploader
                            </legend>

                            <img src={UploadFile} alt="upload-file" />

                            <p class="temp-drop-txt my-2">
                              Drag &amp; drop files
                              <br />
                              <i>or</i>
                            </p>

                            <input
                              id="upload_image_logo"
                              data-post-name="image_logo"
                              data-post-url="https://someplace.com/image/uploads/logos/"
                              class=" invisible"
                              type="file"
                              multiple
                              accept="image/jpeg, image/png, image/svg+xml"
                            />

                            <label
                              class="btn temp-primary-btn mb-1"
                              for="upload_image_logo"
                            >
                              Choose file(s)
                            </label>
                            <p className="temp-upload-file">
                              Upload size up to 10KB to 100KB (File Format: jpg,
                              png)
                            </p>

                            <div class="upload_gallery d-flex flex-wrap justify-content-center gap-3 mb-0"></div>
                          </fieldset>
                        </form>
                      </Col>
                      <Col
                        lg={7}
                        md={7}
                        sm={7}
                        className="temp-doc-subinfo mt-2"
                      >
                        <h3>
                          Land Ownership Documents{" "}
                          <span className="temp-span-star">*</span>
                        </h3>
                        <div className="d-flex temp-doc-info">
                          <Col lg={3} md={3} sm={3}>
                            03.01.2025
                          </Col>
                          <Col
                            lg={9}
                            md={9}
                            sm={9}
                            className="px-4 temp-success-doc"
                          >
                            <FaCheckCircle /> Uploaded Successfully{" "}
                          </Col>
                        </div>
                        <div className="col temp-delete-icon">
                          <h3>
                            <RiDeleteBin6Line className="mx-1" />
                            Click here to Remove
                          </h3>{" "}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={6} md={12} sm={12}>
                    <Row className="temp-stepform-box">
                      <Col lg={5} md={5} sm={5}>
                        <form>
                          <fieldset class="upload_dropZone text-center ">
                            <legend class="visually-hidden">
                              Image uploader
                            </legend>

                            <img src={UploadFile} alt="upload-file" />

                            <p class="temp-drop-txt my-2">
                              Drag &amp; drop files
                              <br />
                              <i>or</i>
                            </p>

                            <input
                              id="upload_image_logo"
                              data-post-name="image_logo"
                              data-post-url="https://someplace.com/image/uploads/logos/"
                              class="invisible"
                              type="file"
                              multiple
                              accept="image/jpeg, image/png, image/svg+xml"
                            />

                            <label
                              class="btn temp-primary-btn mb-1"
                              for="upload_image_logo"
                            >
                              Choose file(s)
                            </label>
                            <p className="temp-upload-file">
                              Upload size up to 10KB to 100KB (File Format: jpg,
                              png)
                            </p>

                            <div class="upload_gallery d-flex flex-wrap justify-content-center gap-3 mb-0"></div>
                          </fieldset>
                        </form>
                      </Col>
                      <Col
                        lg={7}
                        md={7}
                        sm={7}
                        className="temp-doc-subinfo mt-2"
                      >
                        <h3>
                          NOC Certificate{" "}
                          <span className="temp-span-star">*</span>
                        </h3>
                        <div className="d-flex temp-doc-info">
                          <Col lg={3} md={3} sm={3}>
                            03.01.2025
                          </Col>
                          <Col
                            lg={9}
                            md={9}
                            sm={9}
                            className="px-4 temp-success-doc"
                          >
                            <FaCheckCircle /> Uploaded Successfully{" "}
                          </Col>
                        </div>
                        <div className="col temp-delete-icon">
                          <h3>
                            <RiDeleteBin6Line className="mx-1" />
                            Click here to Remove
                          </h3>{" "}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={6} md={12} sm={12}>
                    <Row className="temp-stepform-box">
                      <Col lg={5} md={5} sm={5}>
                        <form>
                          <fieldset class="upload_dropZone text-center ">
                            <legend class="visually-hidden">
                              Image uploader
                            </legend>

                            <img src={UploadFile} alt="upload-file" />

                            <p class="temp-drop-txt my-2">
                              Drag &amp; drop files
                              <br />
                              <i>or</i>
                            </p>

                            <input
                              id="upload_image_logo"
                              data-post-name="image_logo"
                              data-post-url="https://someplace.com/image/uploads/logos/"
                              class=" invisible"
                              type="file"
                              multiple
                              accept="image/jpeg, image/png, image/svg+xml"
                            />

                            <label
                              class="btn temp-primary-btn mb-1"
                              for="upload_image_logo"
                            >
                              Choose file(s)
                            </label>
                            <p className="temp-upload-file">
                              Upload size up to 10KB to 100KB (File Format: jpg,
                              png)
                            </p>

                            <div class="upload_gallery d-flex flex-wrap justify-content-center gap-3 mb-0"></div>
                          </fieldset>
                        </form>
                      </Col>
                      <Col
                        lg={7}
                        md={7}
                        sm={7}
                        className="temp-doc-subinfo mt-2"
                      >
                        <h3>
                          Trust Registration Certificate{" "}
                          <span className="temp-span-star">*</span>
                        </h3>
                        <div className="d-flex temp-doc-info">
                          <Col lg={3} md={3} sm={3}>
                            03.01.2025
                          </Col>
                          <Col
                            lg={9}
                            md={9}
                            sm={9}
                            className="px-4 temp-success-doc"
                          >
                            <FaCheckCircle /> Uploaded Successfully{" "}
                          </Col>
                        </div>
                        <div className="col temp-delete-icon">
                          <h3>
                            <RiDeleteBin6Line className="mx-1" />
                            Click here to Remove
                          </h3>{" "}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <div className="gap-3 Temp-btn-submit">
                  <Button
                    variant="primary"
                    className="temp-submit-btn"
                    type="submit"
                  >
                    Registration Now
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

export default TempleAuthority;
