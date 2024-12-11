import React, { useState } from "react";

interface FormData {
  age: string;
  diabetes: string;
  sex: string;
  smoker: string;
  totalCholesterol: string;
  hdlCholesterol: string;
  systolicBloodPressure: string;
  treatmentForHypertension: string;
  race: string;
}

const HealthRiskCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    age: "",
    diabetes: "No",
    sex: "",
    smoker: "No",
    totalCholesterol: "",
    hdlCholesterol: "",
    systolicBloodPressure: "",
    treatmentForHypertension: "No",
    race: "",
  });

  const [result, setResult] = useState<string>("Please fill out required fields.");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const calculateResult = () => {
    const { age, sex, totalCholesterol, hdlCholesterol, systolicBloodPressure, race } = formData;

    if (!age || !sex || !totalCholesterol || !hdlCholesterol || !systolicBloodPressure || !race) {
      setResult("Please fill out required fields.");
      return;
    }

    // Placeholder logic for calculation
    setResult("Calculation complete. Display your risk here.");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "500px", margin: "20px auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Health Risk Calculator</h2>
      <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ display: "grid", gap: "15px" }}>
          {[
            { label: "Age (40-75):", name: "age", type: "number", placeholder: "Enter age", min: 40, max: 75 },
            { label: "Total Cholesterol (mg/dL):", name: "totalCholesterol", type: "number", placeholder: "e.g., 150" },
            { label: "HDL Cholesterol (mg/dL):", name: "hdlCholesterol", type: "number", placeholder: "e.g., 50" },
            { label: "Systolic Blood Pressure (mm Hg):", name: "systolicBloodPressure", type: "number", placeholder: "e.g., 120" },
          ].map((input) => (
            <label key={input.name} style={{ display: "flex", flexDirection: "column" }}>
              <span>{input.label}</span>
              <input
                type={input.type}
                name={input.name}
                value={formData[input.name as keyof FormData]}
                onChange={handleChange}
                placeholder={input.placeholder}
                min={input.min}
                max={input.max}
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  marginTop: "5px",
                }}
              />
            </label>
          ))}
          {[
            { label: "Diabetes:", name: "diabetes", options: ["No", "Yes"] },
            { label: "Sex:", name: "sex", options: ["", "Female", "Male"] },
            { label: "Smoker:", name: "smoker", options: ["No", "Yes"] },
            { label: "Treatment for Hypertension:", name: "treatmentForHypertension", options: ["No", "Yes"] },
            { label: "Race:", name: "race", options: ["", "White", "African American", "Other"] },
          ].map((select) => (
            <label key={select.name} style={{ display: "flex", flexDirection: "column" }}>
              <span>{select.label}</span>
              <select
                name={select.name}
                value={formData[select.name as keyof FormData]}
                onChange={handleChange}
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  marginTop: "5px",
                }}
              >
                {select.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
        <button
          onClick={calculateResult}
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            fontSize: "16px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007BFF")}
        >
          Calculate
        </button>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h3>Result:</h3>
          <p>{result}</p>
        </div>
      </div>
    </div>
  );
};

export default HealthRiskCalculator;
