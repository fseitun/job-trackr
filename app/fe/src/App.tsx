import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { LandingPage } from '@components/LandingPage/LandingPage.tsx';
import { CreateInterviewForm } from '@components/Interview/CreateInterviewForm/CreateInterviewForm.tsx';
import { UpdateInterviewForm } from '@components/Interview/UpdateInterviewForm/UpdateInterviewForm.tsx';
import { JobList } from '@components/Job/JobList/JobList.tsx';
import { JobDetail } from '@components/Job/JobDetail/JobDetail.tsx';
import { CreateJobForm } from '@components/Job/CreateJobForm/CreateJobForm.tsx';
import { UpdateJobForm } from '@components/Job/UpdateJobForm/UpdateJobForm.tsx';
import { Login } from '@components/Auth/Login/Login.tsx';
import { Register } from '@components/Auth/Register/Register.tsx';
import { ProtectedRoutes } from '@components/ProtectedRoutes';
import { Header } from '@components/Header/Header.tsx';
import route from './route';

//ProtectedRoutes needs to be before other routes for the current route system to work
//ProtectedRoutes contains logic, controlling which page to display, if the user is
//authenticated or not authenticated

export function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <Routes>
                <Route element={<ProtectedRoutes />}>
                    <Route path={route.jobList} element={<JobList />} />
                    <Route path={route.createJob} element={<CreateJobForm />} />
                    <Route path={route.job} element={<JobDetail />} />
                    <Route path={route.updateJob} element={<UpdateJobForm />} />
                    <Route
                        path={route.addInterview}
                        element={<CreateInterviewForm />}
                    />
                    <Route
                        path={route.editInterview}
                        element={<UpdateInterviewForm />}
                    />
                </Route>
                <Route path={route.landing} element={<LandingPage />} />
                <Route path={route.login} element={<Login />} />
                <Route path={route.register} element={<Register />} />
            </Routes>
        </Suspense>
    );
}
