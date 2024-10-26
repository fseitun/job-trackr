import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import CreateInterviewForm from "./components/Interview/CreateInterviewForm";
import UpdateInterviewForm from "./components/Interview/UpdateInterviewForm";

const JobProcessList = lazy(
  () => import("./components/JobProcesses/JobProcessList")
);
const JobProcessDetail = lazy(
  () => import("./components/JobProcesses/JobProcessDetail")
);
const CreateJobProcessForm = lazy(
  () => import("./components/JobProcesses/CreateJobProcessForm")
);
const UpdateJobProcessForm = lazy(
  () => import("./components/JobProcesses/UpdateJobProcessForm")
);
const Login = lazy(() => import("./components/Auth/Login"));
const Register = lazy(() => import("./components/Auth/Register"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
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
              <CreateJobProcessForm />
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
              <UpdateJobProcessForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-interview/:id"
          element={
            <ProtectedRoute>
              <UpdateInterviewForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job-processes/:id/add-interview"
          element={
            <ProtectedRoute>
              <CreateInterviewForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
