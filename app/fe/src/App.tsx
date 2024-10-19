import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";

const JobProcessList = lazy(
  () => import("./components/JobProcesses/JobProcessList")
);
const JobProcessDetail = lazy(
  () => import("./components/JobProcesses/JobProcessDetail")
);
const JobProcessForm = lazy(
  () => import("./components/JobProcesses/JobProcessForm")
);
const InterviewForm = lazy(
  () => import("./components/Interview/InterviewForm")
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
            <ProtectedRoute isAuthenticated={true}>
              <JobProcessList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job-processes/add"
          element={
            <ProtectedRoute isAuthenticated={true}>
              <JobProcessForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job-processes/:id"
          element={
            <ProtectedRoute isAuthenticated={true}>
              <JobProcessDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job-processes/:id/edit"
          element={
            <ProtectedRoute isAuthenticated={true}>
              <JobProcessForm isEditMode />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-interview/:id"
          element={
            <ProtectedRoute isAuthenticated={true}>
              <InterviewForm isEditMode />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job-processes/:id/add-interview"
          element={
            <ProtectedRoute isAuthenticated={true}>
              <InterviewForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
