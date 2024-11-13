import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { CreateInterviewForm } from "./components/Interview/CreateInterviewForm";
import { UpdateInterviewForm } from "./components/Interview/UpdateInterviewForm";

const JobList = lazy(
  () => import("./components/Job/JobList")
);
const JobDetail = lazy(
  () => import("./components/Job/JobDetail")
);
const CreateJobForm = lazy(
  () => import("./components/Job/CreateJobForm")
);
const UpdateJobForm = lazy(
  () => import("./components/Job/UpdateJobForm")
);
const Login = lazy(() => import("./components/Auth/Login"));
const Register = lazy(() => import("./components/Auth/Register"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/job"
          element={
            <ProtectedRoute>
              <JobList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job/add"
          element={
            <ProtectedRoute>
              <CreateJobForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job/:id"
          element={
            <ProtectedRoute>
              <JobDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job/:id/edit"
          element={
            <ProtectedRoute>
              <UpdateJobForm />
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
          path="/job/:id/add-interview"
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

