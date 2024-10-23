import React, { useState, useEffect } from "react";
import client from "../../api/client";
import { useNavigate, useParams } from "react-router-dom";
import { CreateInterviewDto, UpdateInterviewDto } from "../../types";

interface InterviewFormProps {
  isEditMode?: boolean;
}

const InterviewForm: React.FC<InterviewFormProps> = ({
  isEditMode = false,
}) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const interviewId = isEditMode ? id : undefined;
  const jobProcessId = isEditMode ? undefined : id;

  const [formData, setFormData] = useState<CreateInterviewDto>({
    interviewerName: "",
    interviewerRole: "",
    interviewDate: new Date().toISOString(),
    notes: "",
    jobProcessId: Number(jobProcessId),
  });

  const [error, setError] = useState<string>("");
  const [fetchedJobProcessId, setFetchedJobProcessId] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (isEditMode && interviewId) {
      client
        .get<CreateInterviewDto>(`/interviews/${interviewId}`)
        .then((interview) => {
          setFormData({
            interviewerName: interview.interviewerName,
            interviewerRole: interview.interviewerRole,
            interviewDate: interview.interviewDate,
            notes: interview.notes ?? "",
            jobProcessId: interview.jobProcessId,
          });
          setFetchedJobProcessId(interview.jobProcessId);
        })
        .catch((err) => {
          console.error("Error fetching interview:", err);
          setError("Failed to load interview details.");
        });
    }
  }, [isEditMode, interviewId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreate = async (formData: CreateInterviewDto) => {
    try {
      const payload = {
        ...formData,
        interviewDate: formData.interviewDate,
      };

      if (jobProcessId) {
        await client.post<CreateInterviewDto>("/interviews", {
          ...payload,
          jobProcessId: Number(jobProcessId),
        });
        navigate(`/job-processes/${jobProcessId}`);
      } else {
        throw new Error("Invalid job process ID.");
      }
    } catch (err) {
      console.error("Error submitting interview form:", err);
      setError("Failed to submit the form.");
    }
  };

  const handleEdit = async (formData: UpdateInterviewDto) => {
    try {
      const payload = {
        ...formData,
        interviewDate: formData.interviewDate,
      };

      if (interviewId) {
        await client.patch<UpdateInterviewDto>(
          `/interviews/${interviewId}`,
          payload
        );
        if (fetchedJobProcessId !== null) {
          navigate(`/job-processes/${fetchedJobProcessId}`);
        } else {
          throw new Error("Failed to retrieve Job Process ID.");
        }
      } else {
        throw new Error("Invalid interview ID.");
      }
    } catch (err) {
      console.error("Error submitting interview form:", err);
      setError("Failed to submit the form.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      await handleEdit(formData);
    } else {
      await handleCreate(formData);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>
        {isEditMode ? "Edit Interview" : "Add Interview"}
      </h2>
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Interviewer Name:</label>
          <input
            type="text"
            name="interviewerName"
            value={formData.interviewerName}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Interviewer Role:</label>
          <input
            type="text"
            name="interviewerRole"
            value={formData.interviewerRole}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Interview Date:</label>
          <input
            type="date"
            name="interviewDate"
            value={formData.interviewDate}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Notes:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            style={styles.textarea}
          />
        </div>
        <div style={styles.buttonGroup}>
          <button
            type="submit"
            style={{ ...styles.button, ...styles.saveButton }}
          >
            {isEditMode ? "Update Interview" : "Add Interview"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{ ...styles.button, ...styles.cancelButton }}
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

export default InterviewForm;
