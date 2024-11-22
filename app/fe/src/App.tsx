import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { LandingPage } from './components/LandingPage/LandingPage.tsx';
import { CreateInterviewForm } from './components/Interview/CreateInterviewForm/CreateInterviewForm.tsx';
import { UpdateInterviewForm } from './components/Interview/UpdateInterviewForm/UpdateInterviewForm.tsx';
import { JobList } from './components/Job/JobList/JobList.tsx';
import { JobDetail } from './components/Job/JobDetail/JobDetail.tsx';
import { CreateJobForm } from './components/Job/CreateJobForm/CreateJobForm.tsx';
import { UpdateJobForm } from './components/Job/UpdateJobForm/UpdateJobForm.tsx';
import { Login } from './components/Auth/Login/Login.tsx';
import { Register } from './components/Auth/Register/Register.tsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';
import { Header } from './components/Header/Header.tsx';

export function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Header />
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
