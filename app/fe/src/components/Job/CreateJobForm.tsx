import React, { useState } from "react";
import client from "../../api/client";
import { useNavigate } from "react-router-dom";
import { CreateJobDto } from "../../types";
import JobFormFields from "./JobFormFields";

const CreateJobForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateJobDto>({
    hiringCompany: "",
    recruitingCompany: "",
    position: "",
    recruiterName: "",
    recruitmentChannel: "",
    monthlySalary: 0,
    vacationDays: 0,
    holidayDays: 0,
    jobDescription: "",
    directHire: false,
    timeZone: "",
  });

  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "number" ? +value : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      await client.post<CreateJobDto>("/job", formData);
      navigate("/job");
    } catch (err) {
      console.error("Error submitting the form:", err);
      setError("Failed to submit the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Add Job Application</h2>
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <JobFormFields formData={formData} handleChange={handleChange} />
        <div style={styles.buttonGroup}>
          <button
            type="submit"
            style={styles.saveButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={styles.cancelButton}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#333333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1.5rem",
  },
  saveButton: {
    padding: "0.75rem 1.5rem",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#1a73e8",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    transition: "background-color 0.3s",
  },
  cancelButton: {
    padding: "0.75rem 1.5rem",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#d93025",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    transition: "background-color 0.3s",
  },
  error: {
    textAlign: "center",
    padding: "1rem",
    color: "red",
    fontSize: "1rem",
    marginBottom: "1rem",
  },
};

export default CreateJobForm;
