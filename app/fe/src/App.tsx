import { Routes, Route, Navigate } from "react-router-dom";
import JobProcessList from "./components/JobProcesses/JobProcessList";
import JobProcessDetail from "./components/JobProcesses/JobProcessDetail";
import JobProcessForm from "./components/JobProcesses/JobProcessForm";
import InterviewForm from "./components/Interview/InterviewForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/job-processes" />} />
      <Route path="/job-processes" element={<JobProcessList />} />
      <Route path="/job-processes/add" element={<JobProcessForm />} />
      <Route path="/job-processes/:id" element={<JobProcessDetail />} />
      <Route
        path="/job-processes/:id/edit"
        element={<JobProcessForm isEditMode />}
      />
      <Route
        path="/edit-interview/:id"
        element={<InterviewForm isEditMode />}
      />
      <Route
        path="/job-processes/:id/add-interview"
        element={<InterviewForm />}
      />
    </Routes>
  );
}

export default App;
