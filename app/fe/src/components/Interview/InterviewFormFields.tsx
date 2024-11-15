import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  handleDateChange: (date: Date | null) => void;
}

export function InterviewFormFields({
  formData,
  handleChange,
  handleDateChange,
}: InterviewFormFieldsProps) {
  const selectedDate = formData.interviewDate
    ? new Date(formData.interviewDate)
    : null;

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
        <DatePicker
          selected={selectedDate}
          onChange={(date) => handleDateChange(date)}
          dateFormat="dd/MM/yyyy"
          required
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
}
