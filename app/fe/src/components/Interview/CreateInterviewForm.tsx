import { useState } from "react";
import { client } from "../../api/client";
import { useNavigate, useParams } from "react-router-dom";
import { CreateInterviewDto } from "../../types";
import { InterviewFormFields } from "./InterviewFormFields";
import { useHandleDateChange } from "../hooks/useHandleDateChange";
import {
  containerStyle,
  headerStyle,
  formStyle,
  buttonGroupStyle,
  buttonStyle,
  saveButtonStyle,
  cancelButtonStyle,
  errorStyle,
} from "./CreateInterviewForm.styles";

export function CreateInterviewForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { formData, setFormData, handleDateChange } = useHandleDateChange<CreateInterviewDto>({
    jobId: id ?? "",
    interviewerName: "",
    interviewerRole: "",
    interviewDate: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      if (id) {
        await client.post<CreateInterviewDto>("/interviews", formData);
        navigate(`/job/${id}`);
      } else {
        throw new Error("Invalid job ID.");
      }
    } catch (err) {
      console.error("Error submitting interview form:", err);
      setError("Failed to submit the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Add Interview</h2>
      {error && <div style={errorStyle}>{error}</div>}
      <form onSubmit={handleSubmit} style={formStyle}>
        <InterviewFormFields
          formData={formData}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
        />
        <div style={buttonGroupStyle}>
          <button
            type="submit"
            style={{ ...buttonStyle, ...saveButtonStyle }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Interview"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{ ...buttonStyle, ...cancelButtonStyle }}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
