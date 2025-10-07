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
        setCountries(res.data);
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
        <Form.Group className="mb-3" controlId="countrySelect">
          <Form.Label className="temp-label">
            Country <span className="temp-span-star">*</span>
          </Form.Label>
          <Form.Select
            className="temp-form-control-option"
            value={formData.country || ""}
            onChange={(e) => onChange("country", e.target.value)}
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </Form.Select>
          {formErrors.country && (
            <small className="text-danger">
              {formErrors.country}
            </small>
          )}
        </Form.Group>
      </Col>

      {/* State */}
      <Col md={4}>
        <Form.Group className="mb-3" controlId="stateSelect">
          <Form.Label className="temp-label">
            State <span className="temp-span-star">*</span>
          </Form.Label>
          <Form.Select
            className="temp-form-control-option"
            value={formData.state || ""}
            onChange={(e) => onChange("state", e.target.value)}
          >
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </Form.Select>
          {formErrors.state && (
            <small className="text-danger">
              {formErrors.state}
            </small>
          )}
        </Form.Group>
      </Col>

      {/* City */}
      <Col md={4}>
        <Form.Group className="mb-3" controlId="citySelect">
          <Form.Label className="temp-label">
            City <span className="temp-span-star">*</span>
          </Form.Label>
          <Form.Select
            className="temp-form-control-option"
            value={formData.city || ""}
            onChange={(e) => onChange("city", e.target.value)}
          >
            <option value="">Select City</option>
            {cities.map((ct) => (
              <option key={ct.id} value={ct.name_ascii}>
                {ct.name_ascii}
              </option>
            ))}
          </Form.Select>
          {formErrors.city && (
             <small className="text-danger">
              {formErrors.city}
            </small>
          )}
        </Form.Group>
      </Col>
    </>
  );
};

export default LocationState;
