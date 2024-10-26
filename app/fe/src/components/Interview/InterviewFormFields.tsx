import React from "react";
import { CreateInterviewDto, UpdateInterviewDto } from "../../types";
import {
  formGroupStyle,
  labelStyle,
  inputStyle,
  textareaStyle,
} from "./InterviewFormFields.styles";

interface InterviewFormFieldsProps {
  formData: CreateInterviewDto | UpdateInterviewDto;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const InterviewFormFields: React.FC<InterviewFormFieldsProps> = ({
  formData,
  handleChange,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Interviewer Name:</label>
        <input
          type="text"
          name="interviewerName"
          value={formData.interviewerName || ""}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Interviewer Role:</label>
        <input
          type="text"
          name="interviewerRole"
          value={formData.interviewerRole || ""}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Interview Date:</label>
        <input
          type="date"
          name="interviewDate"
          value={formatDate(formData.interviewDate || "")}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Notes:</label>
        <textarea
          name="notes"
          value={formData.notes || ""}
          onChange={handleChange}
          style={textareaStyle}
        />
      </div>
    </>
  );
};

export default InterviewFormFields;
