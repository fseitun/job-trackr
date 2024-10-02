

import { Routes, Route, Navigate } from "react-router-dom";
import JobProcessList from "./components/JobProcesses/JobProcessList";
import JobProcessDetail from "./components/JobProcesses/JobProcessDetail";
import JobProcessForm from "./components/JobProcesses/JobProcessForm";
import InterviewForm from "./components/Interview/InterviewForm";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/job-processes" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/job-processes"
        element={
          <ProtectedRoute>
            <JobProcessList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/job-processes/add"
        element={
          <ProtectedRoute>
            <JobProcessForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/job-processes/:id"
        element={
          <ProtectedRoute>
            <JobProcessDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/job-processes/:id/edit"
        element={
          <ProtectedRoute>
            <JobProcessForm isEditMode />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-interview/:id"
        element={
          <ProtectedRoute>
            <InterviewForm isEditMode />
          </ProtectedRoute>
        }
      />
      <Route
        path="/job-processes/:id/add-interview"
        element={
          <ProtectedRoute>
            <InterviewForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
