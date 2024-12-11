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

  const calculateRisk = () => {
    const {
      age,
      diabetes,
      sex,
      smoker,
      totalCholesterol,
      hdlCholesterol,
      systolicBloodPressure,
      treatmentForHypertension,
      race,
    } = formData;

    // Validate required fields
    if (!age || !sex || !totalCholesterol || !hdlCholesterol || !systolicBloodPressure || !race) {
      setResult("Please fill out required fields.");
      return;
    }

    // Convert necessary fields to numbers
    const ageNum = parseInt(age);
    const totalCholesterolNum = parseInt(totalCholesterol);
    const hdlCholesterolNum = parseInt(hdlCholesterol);
    const systolicBPNum = parseInt(systolicBloodPressure);

    // Placeholder coefficients for ASCVD calculation (simplified version)
    let riskScore = 0;
    
    if (sex === "Male") {
      riskScore =
        12.344 * Math.log(ageNum) +
        11.853 * Math.log(totalCholesterolNum) -
        7.99 * Math.log(hdlCholesterolNum) +
        (smoker === "Yes" ? 1.764 : 0) +
        (diabetes === "Yes" ? 0.661 : 0) +
        (treatmentForHypertension === "Yes" ? 2.019 * Math.log(systolicBPNum) : 1.809 * Math.log(systolicBPNum));
    } else {
      riskScore =
        17.114 * Math.log(ageNum) +
        0.94 * Math.log(totalCholesterolNum) -
        18.92 * Math.log(hdlCholesterolNum) +
        (smoker === "Yes" ? 2.721 : 0) +
        (diabetes === "Yes" ? 0.879 : 0) +
        (treatmentForHypertension === "Yes" ? 1.797 * Math.log(systolicBPNum) : 1.764 * Math.log(systolicBPNum));
    }

    // Adjust for race
    if (race === "African American") {
      riskScore *= 1.2; // Example adjustment for race
    }

    // Convert risk score to percentage
    const riskPercentage = Math.exp(riskScore) / (1 + Math.exp(riskScore)) * 100;

    setResult(`Your 10-year ASCVD Risk is approximately ${riskPercentage.toFixed(2)}%.`);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto", backgroundColor: "#f8f9fa", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#343a40" }}>ASCVD Risk Calculator</h2>
      <form style={{ display: "grid", gap: "15px" }}>
        {[
          { label: "Age (40-75):", name: "age", type: "number", placeholder: "Enter age", min: 40, max: 75 },
          { label: "Total Cholesterol (mg/dL):", name: "totalCholesterol", type: "number", placeholder: "e.g., 150" },
          { label: "HDL Cholesterol (mg/dL):", name: "hdlCholesterol", type: "number", placeholder: "e.g., 50" },
          { label: "Systolic Blood Pressure (mm Hg):", name: "systolicBloodPressure", type: "number", placeholder: "e.g., 120" },
        ].map((input) => (
          <div key={input.name} style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", fontWeight: "bold", color: "#495057" }}>{input.label}</label>
            <input
              type={input.type}
              name={input.name}
              value={formData[input.name as keyof FormData]}
              onChange={handleChange}
              placeholder={input.placeholder}
              min={input.min}
              max={input.max}
              style={{ padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ced4da", backgroundColor: "#fff" }}
            />
          </div>
        ))}

        {[
          { label: "Diabetes:", name: "diabetes", options: ["No", "Yes"] },
          { label: "Sex:", name: "sex", options: ["", "Female", "Male"] },
          { label: "Smoker:", name: "smoker", options: ["No", "Yes"] },
          { label: "Treatment for Hypertension:", name: "treatmentForHypertension", options: ["No", "Yes"] },
          { label: "Race:", name: "race", options: ["", "White", "African American", "Other"] },
        ].map((select) => (
          <div key={select.name} style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", fontWeight: "bold", color: "#495057" }}>{select.label}</label>
            <select
              name={select.name}
              value={formData[select.name as keyof FormData]}
              onChange={handleChange}
              style={{ padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ced4da", backgroundColor: "#fff" }}
            >
              {select.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </form>

      <button
        onClick={calculateRisk}
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
      >
        Calculate
      </button>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <h3 style={{ color: "#343a40" }}>Result:</h3>
        <p style={{ color: "#495057", fontSize: "18px" }}>{result}</p>
      </div>
    </div>
  );
};

export default HealthRiskCalculator;
