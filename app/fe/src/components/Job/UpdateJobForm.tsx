import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { client } from "../../api/client";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateJobDto, Job } from "../../types";
import { JobFormFields } from "./JobFormFields";
import {
  Container,
  Header,
  Form,
  ButtonGroup,
  SaveButton,
  CancelButton,
  ErrorMessage,
  LoadingIndicator,
} from "./UpdateJobForm.styles";

export default function UpdateJobForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<UpdateJobDto>({
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      client
        .get<Job>(`/job/${id}`)
        .then((response: Job) => {
          setFormData({
            hiringCompany: response.hiringCompany,
            recruitingCompany: response.recruitingCompany,
            position: response.position,
            recruiterName: response.recruiterName,
            recruitmentChannel: response.recruitmentChannel,
            monthlySalary: response.monthlySalary,
            vacationDays: response.vacationDays,
            holidayDays: response.holidayDays,
            jobDescription: response.jobDescription,
            directHire: response.directHire,
            timeZone: response.timeZone,
          });
        })
        .catch((err: Error) => {
          console.error("Error fetching job details:", err);
          setError("Failed to load job details.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "number" ? +value : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      if (id) {
        await client.patch<UpdateJobDto>(`/job/${id}`, formData);
        navigate(`/job/${id}`);
      } else {
        setError("Invalid job ID.");
      }
    } catch (err) {
      console.error("Error submitting the form:", err);
      setError("Failed to submit the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingIndicator>Loading job details...</LoadingIndicator>;
  }

  return (
    <Container>
      <Header>Edit Job Application</Header>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <JobFormFields formData={formData} handleChange={handleChange} />
        <ButtonGroup>
          <SaveButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update"}
          </SaveButton>
          <CancelButton
            type="button"
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
          >
            Cancel
          </CancelButton>
        </ButtonGroup>
      </Form>
    </Container>
  );
}
