import React, { useState, useEffect } from "react";
import client from "../../api/client";
import { useNavigate, useParams } from "react-router-dom";
import { CreateJobProcess } from "../../types";

interface JobProcessFormProps {
  isEditMode?: boolean;
}

const JobProcessForm: React.FC<JobProcessFormProps> = ({
  isEditMode = false,
}) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<CreateJobProcess>({
    hiringCompany: "",
    recruitingCompany: "",
    position: "",
    recruiterName: "",
    recruitmentChannel: "",
    monthlySalary: 0,
    vacationsDays: 0,
    holidaysDays: 0,
    jobDescription: "",
    directHire: false,
    timeZone: "",
  });

  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isEditMode && id) {
      client
        .get(`/job-processes/${id}`)
        .then((response) => setFormData(response))
        .catch((err) => {
          console.error("Error fetching job process details:", err);
          setError("Failed to load job process details.");
        });
    }
  }, [isEditMode, id]);

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
    try {
      if (isEditMode && id) {
        await client.patch(`/job-processes/${id}`, formData);
        navigate(`/job-processes/${id}`);
      } else {
        await client.post("/job-processes", formData);
        navigate("/");
      }
    } catch (err) {
      console.error("Error submitting the form:", err);
      setError("Failed to submit the form.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>
        {isEditMode ? "Edit Job Application" : "Add Job Application"}
      </h2>
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Hiring Company:</label>
          <input
            type="text"
            name="hiringCompany"
            value={formData.hiringCompany}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Recruiting Company:</label>
          <input
            type="text"
            name="recruitingCompany"
            value={formData.recruitingCompany}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Position:</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Recruiter Name:</label>
          <input
            type="text"
            name="recruiterName"
            value={formData.recruiterName}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Recruitment Channel:</label>
          <input
            type="text"
            name="recruitmentChannel"
            value={formData.recruitmentChannel}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Monthly Salary:</label>
          <input
            type="number"
            name="monthlySalary"
            value={formData.monthlySalary}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Vacation Days:</label>
          <input
            type="number"
            name="vacationsDays"
            value={formData.vacationsDays}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Holiday Days:</label>
          <input
            type="number"
            name="holidaysDays"
            value={formData.holidaysDays}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Job Description:</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            style={styles.textarea}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Direct Hire:
            <input
              type="checkbox"
              name="directHire"
              checked={formData.directHire}
              onChange={handleChange}
              style={styles.checkbox}
            />
          </label>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Time Zone:</label>
          <input
            type="text"
            name="timeZone"
            value={formData.timeZone}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.saveButton}>
            {isEditMode ? "Update" : "Add"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={styles.cancelButton}
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
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    marginBottom: "0.5rem",
    display: "block",
    fontWeight: "600",
    color: "#555555",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "4px",
    border: "1px solid #cccccc",
    fontSize: "1rem",
  },
  textarea: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "4px",
    border: "1px solid #cccccc",
    minHeight: "100px",
    fontSize: "1rem",
    resize: "vertical",
  },
  checkbox: {
    transform: "scale(1.5)",
    marginLeft: "0.5rem",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1.5rem",
  },
  button: {
    padding: "0.75rem 1.5rem",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    transition: "background-color 0.3s",
  },
  saveButton: {
    backgroundColor: "#1a73e8",
    color: "#ffffff",
  },
  cancelButton: {
    backgroundColor: "#d93025",
    color: "#ffffff",
  },
  error: {
    textAlign: "center",
    padding: "1rem",
    color: "red",
    fontSize: "1rem",
    marginBottom: "1rem",
  },
};

export default JobProcessForm;
