import React, { useEffect, useState, useCallback } from "react";
import { Form, Col } from "react-bootstrap";
import axios from "axios";
import { BASE_URLL } from "../BaseURL";

const LocationState = ({
  formData = {},
  handleInputChange,
  formErrors = {},
}) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Fetch countries once
 useEffect(() => {
  const fetchCountries = async () => {
    try {
      const res = await axios.get(`${BASE_URLL}api5/countries/`);
      // Ensure it's an array
      setCountries(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching countries:", err);
    }
  };
  fetchCountries();
}, []);

  // Fetch states when country changes
  useEffect(() => {
    if (!formData.country) return;
    const selectedCountry = countries.find((c) => c.name === formData.country);
    if (!selectedCountry) return;

    const fetchStates = async () => {
      try {
        const res = await axios.get(
          `${BASE_URLL}api5/regions/?country=${selectedCountry.id}`
        );
        setStates(res.data);
      } catch (err) {
        console.error("Error fetching states:", err);
      }
    };
    fetchStates();
  }, [formData.country, countries]);
  // Fetch cities when state changes
  useEffect(() => {
    if (!formData.state) return;
    const selectedState = states.find((s) => s.name === formData.state);
    if (!selectedState) return;

    const fetchCities = async () => {
      try {
        const res = await axios.get(
          `${BASE_URLL}api5/cities/?region=${selectedState.id}`
        );
        setCities(res.data);
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    };
    fetchCities();
  }, [formData.state, states]);

  // Stable handler
  const onChange = useCallback(
    (field, value) => {
      handleInputChange(field, value);
        if (value && value.trim() !== "") {
      handleInputChange("clearError", field); // custom signal to clear error
    }
    },
    [handleInputChange]
  );

  return (
    <>
      {/* Country */}
      
    <Col md={4}>
  <Form.Group className="mb-3" controlId="countryInput">
    <Form.Label className="temp-label">
      Country <span className="temp-span-star">*</span>
    </Form.Label>
    <Form.Control
      type="text"
      placeholder="Enter Country"
      className="temp-form-control-option"
      value={formData.country || ""}
      onChange={(e) => onChange("country", e.target.value)}
    />
    {formErrors.country && (
      <small className="text-danger">{formErrors.country}</small>
    )}
  </Form.Group>
</Col>

<Col md={4}>
  <Form.Group className="mb-3" controlId="stateInput">
    <Form.Label className="temp-label">
      State <span className="temp-span-star">*</span>
    </Form.Label>
    <Form.Control
      type="text"
      placeholder="Enter State"
      className="temp-form-control-option"
      value={formData.state || ""}
      onChange={(e) => onChange("state", e.target.value)}
    />
    {formErrors.state && (
      <small className="text-danger">{formErrors.state}</small>
    )}
  </Form.Group>
</Col>

<Col md={4}>
  <Form.Group className="mb-3" controlId="cityInput">
    <Form.Label className="temp-label">
      City <span className="temp-span-star">*</span>
    </Form.Label>
    <Form.Control
      type="text"
      placeholder="Enter City"
      className="temp-form-control-option"
      value={formData.city || ""}
      onChange={(e) => onChange("city", e.target.value)}
    />
    {formErrors.city && (
      <small className="text-danger">{formErrors.city}</small>
    )}
  </Form.Group>
</Col>

    </>
  );
};

export default LocationState;
