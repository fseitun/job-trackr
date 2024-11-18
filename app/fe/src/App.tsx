import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage/LandingPage.tsx';
import { CreateInterviewForm } from './components/Interview/CreateInterviewForm/CreateInterviewForm.tsx';
import { UpdateInterviewForm } from './components/Interview/UpdateInterviewForm/UpdateInterviewForm.tsx';

const JobList = lazy(() => import('./components/Job/JobList/JobList.tsx'));
const JobDetail = lazy(
    () => import('./components/Job/JobDetail/JobDetail.tsx'),
);
const CreateJobForm = lazy(
    () => import('./components/Job/CreateJobForm/CreateJobForm.tsx'),
);
const UpdateJobForm = lazy(
    () => import('./components/Job/UpdateJobForm/UpdateJobForm.tsx'),
);
const Login = lazy(() => import('./components/Auth/Login/Login.tsx'));
const Register = lazy(() => import('./components/Auth/Register/Register.tsx'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute.tsx'));

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
