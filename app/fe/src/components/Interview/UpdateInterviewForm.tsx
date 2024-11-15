import { useState, useEffect } from "react";
import { client } from "../../api/client";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateInterviewDto, CreateInterviewDto } from "../../types";
import { InterviewFormFields } from "./InterviewFormFields";
import {
  containerStyle,
  headerStyle,
  formStyle,
  buttonGroupStyle,
  buttonStyle,
  saveButtonStyle,
  cancelButtonStyle,
  errorStyle,
  loadingStyle,
} from "./UpdateInterviewForm.styles";

export function UpdateInterviewForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<UpdateInterviewDto>({
    jobId: "",
    interviewerName: "",
    interviewerRole: "",
    interviewDate: new Date().toISOString(),
    notes: "",
  });

  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      client
        .get<CreateInterviewDto>(`/interviews/${id}`)
        .then((interview) => {
          setFormData({
            jobId: interview.jobId,
            interviewerName: interview.interviewerName,
            interviewerRole: interview.interviewerRole,
            interviewDate: interview.interviewDate,
            notes: interview.notes ?? "",
          });
        })
        .catch((err) => {
          console.error("Error fetching interview details:", err);
          setError("Failed to load interview details.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id]);

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
        await client.patch<UpdateInterviewDto>(
          `/interviews/${id}`,
          formData,
          Number(id)
        );
        navigate(`/job/${formData.jobId}`);
      } else {
        setError("Invalid interview ID.");
      }
    } catch (err) {
      console.error("Error submitting interview form:", err);
      setError("Failed to submit the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div style={loadingStyle}>Loading interview details...</div>;
  }

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Edit Interview</h2>
      {error && <div style={errorStyle}>{error}</div>}
      <form onSubmit={handleSubmit} style={formStyle}>
        <InterviewFormFields formData={formData} handleChange={handleChange} />
        <div style={buttonGroupStyle}>
          <button
            type="submit"
            style={{ ...buttonStyle, ...saveButtonStyle }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Interview"}
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
