import React from "react";
import { UpdateJobDto, CreateJobDto } from "../../types";

interface JobFormFieldsProps {
  formData: CreateJobDto | UpdateJobDto;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const JobFormFields: React.FC<JobFormFieldsProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <>
      <div style={styles.formGroup}>
        <label style={styles.label}>Hiring Company:</label>
        <input
          type="text"
          name="hiringCompany"
          value={formData.hiringCompany || ""}
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
          value={formData.recruitingCompany || ""}
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
          value={formData.position || ""}
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
          value={formData.recruiterName || ""}
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
          value={formData.recruitmentChannel || ""}
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
          name="vacationDays"
          value={formData.vacationDays}
          onChange={handleChange}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Holiday Days:</label>
        <input
          type="number"
          name="holidayDays"
          value={formData.holidayDays}
          onChange={handleChange}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Job Description:</label>
        <textarea
          name="jobDescription"
          value={formData.jobDescription || ""}
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
          value={formData.timeZone || ""}
          onChange={handleChange}
          style={styles.input}
        />
      </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
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
};

export default JobFormFields;
