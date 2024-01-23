import React, { Suspense, lazy } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import UserHeader from '../ui/user/header';
import ContentBody from '../ui/body/content-body';
import Error404 from '../pages/errorPages/error404';
import Loading from '../ui/LoadingPages/Loading';

import UserNotLogged from '../config/userNotLogged';
import FullBody from '../ui/body/full-body';
import SuccessPageJobPost from '../components/userComponents/createJob/successPage';




const ViewApplicantProfile = lazy(() => import('../components/userComponents/manageJobs/viewApplicantProfile'))
const ListNotification = lazy(() => import('../components/userComponents/manage-notfication/listNotification'))
const AboutPage = lazy(() => import('../pages/user/aboutPage'))
const ApplicantionForm = lazy(() => import('../components/userComponents/appliedJobs/applicantionForm'))
const ApplicantPage = lazy(() => import('../pages/user/applicantPage'))
const ManageJob = lazy(() => import('../pages/user/manageJob'))
const SubstribtionPlan = lazy(() => import('../pages/user/substribtionPlan'));
const EditEmployerProfile = lazy(() => import('../components/userComponents/userProfile/editEmployerProfile'));
const FgtEmail = lazy(() => import('../components/authComponents/fgtEmail'));
const CreateJob = lazy(() => import('../pages/user/createJob'));
const ViewJobPost = lazy(() => import('../components/userComponents/jobs/ViewJobPost'));
const EducationForm = lazy(() => import('../components/userComponents/userProfile/educationForm'));
const ExperienceForm = lazy(() => import('../components/userComponents/userProfile/employmentForm'));
const CreatedJobs = lazy(() => import('../pages/user/createdJobs'));
const AppliedJobs = lazy(() => import('../components/userComponents/jobs/appliedJobs'));
const ApplyJob = lazy(() => import('../pages/user/applyJob'));
const JobStatus = lazy(() => import('../pages/user/jobStatus'));
const SubscriptionCheckout = lazy(() => import('../pages/user/subscriptionCheckout'))
const Home = lazy(() => import('../pages/user/home'));
const ProfilePage = lazy(() => import('../pages/user/profile'));
const UserLoginPage = lazy(() => import('../pages/authentication/userLoginPage'));
const UserRegisterPage = lazy(() => import('../pages/authentication/userRegisterPage'));
const OtpPage = lazy(() => import('../pages/authentication/otpPage'));
const EditEmployeeProfile = lazy(() => import('../components/userComponents/userProfile/EditEmployeeProfile'));
const ResumeList = lazy(() => import('../components/userComponents/userProfile/resumeList'));
const PATHS = {
    HOME: '',
    PROFILE: 'profile',
    EDIT_COMPANY_DATA: 'edit-company-data',
    EDIT_PROFILE_DATA: 'edit-profile-data',
    EDIT_EDUCATION_DATA: 'edit-education-data',
    EDIT_EXPERIENCE_DATA: 'edit-experience-data',
    RESUME_LIST: 'resume-list',
    JOB_STATUS: 'job-status',
    APPLIED: 'applied',
    SUBSCRIPTION: 'subscribtion',
    JOB: 'job',
    APPLY: 'apply',
    CREATE: 'create',
    CONTROL: 'control',
    VIEW: 'view',
    AUTH: 'auth',
    LOGIN: 'login',
    SIGN_UP: 'sign-up',
    OTP: 'otp',
    FORGOT_PASSWORD: 'forgotpassword',
    PAYMENT: 'payment',
    MANAGE: 'manage',
    APPLICANT: 'applicant',
    ABOUT: 'about',
    NOTIFICATION: 'notification',
    SUCCESS: 'success'
};

const UserRoutes = () => {
    return (
        <Routes>
            <Route path={PATHS.HOME} element={<FullBody><Outlet /></FullBody>}>
                <Route path={PATHS.HOME} element={<>
                    <UserHeader />

                    <ContentBody><Outlet /></ContentBody>
                </>} >
                    <Route path={PATHS.HOME} element={<Suspense fallback={<Loading />}><Home /></Suspense>} />

                    <Route path={PATHS.HOME} element={<> <UserNotLogged /><Outlet />  </>} >

                        <Route path={PATHS.NOTIFICATION} element={<Suspense fallback={<Loading />}><ListNotification /></Suspense>} />
                        <Route path={PATHS.ABOUT} element={<Suspense fallback={<Loading />}><AboutPage /></Suspense>} />
                        <Route path={PATHS.PROFILE} element={<><Outlet /></>} >
                            <Route path={PATHS.HOME} element={<Suspense fallback={<Loading />}><ProfilePage /></Suspense>} />
                            <Route path={PATHS.EDIT_COMPANY_DATA} element={<Suspense fallback={<Loading />}><EditEmployerProfile /></Suspense>} />
                            <Route path={PATHS.EDIT_PROFILE_DATA} element={<Suspense fallback={<Loading />}><EditEmployeeProfile /></Suspense>} />
                            <Route path={PATHS.EDIT_EDUCATION_DATA} element={<Suspense fallback={<Loading />}><EducationForm /></Suspense>} />
                            <Route path={PATHS.EDIT_EXPERIENCE_DATA} element={<Suspense fallback={<Loading />}><ExperienceForm /></Suspense>} />
                            <Route path={PATHS.RESUME_LIST} element={<Suspense fallback={<Loading />}><ResumeList /></Suspense>} />
                        </Route>



                        <Route path={PATHS.JOB_STATUS} element={<Suspense fallback={<Loading />}><JobStatus /></Suspense>} >
                            <Route path={PATHS.APPLIED} element={<Suspense fallback={<Loading />}><AppliedJobs /></Suspense>} />
                        </Route>



                        <Route path={`${PATHS.APPLIED}/:applicantId`} element={<Suspense fallback={<Loading />}><ApplicantionForm /></Suspense>} />
                        <Route path={PATHS.SUBSCRIPTION} element={<Outlet />} >
                            <Route path={PATHS.HOME} element={<Suspense fallback={<Loading />}><SubstribtionPlan /></Suspense>} />
                            <Route path={`${PATHS.PAYMENT}/:planId`} element={<Suspense fallback={<Loading />}><SubscriptionCheckout /></Suspense>} />
                        </Route>
                        <Route path={PATHS.JOB} element={<Outlet />} >
                            <Route index element={<Suspense fallback={<Loading />}><Home /></Suspense>} />
                            <Route path={`${PATHS.APPLY}/:jobId`} element={<Suspense fallback={<Loading />}><ApplyJob /></Suspense>} />
                            <Route path={PATHS.CREATE} element={<Suspense fallback={<Loading />}><CreateJob /></Suspense>} />
                            <Route path={`${PATHS.SUCCESS}/:jobId`} element={<Suspense fallback={<Loading />}><SuccessPageJobPost /></Suspense>} />
                            <Route path={PATHS.CONTROL} element={<Suspense fallback={<Loading />}><CreatedJobs /></Suspense>} />
                            <Route path={`${PATHS.MANAGE}/:jobId`} element={<Suspense fallback={<Loading />}><ManageJob /></Suspense>} />

                            <Route path={`${PATHS.VIEW}/:jobId`} element={<Suspense fallback={<Loading />}><ViewJobPost /></Suspense>} />
                            <Route path={`${PATHS.APPLICANT}/:applicantId`} element={<Suspense fallback={<Loading />}><ApplicantPage /></Suspense>} />
                            <Route path={`${PATHS.PROFILE}/:applicantId`} element={<Suspense fallback={<Loading />}><ViewApplicantProfile /></Suspense>} />
                        </Route>
                    </Route>
                </Route>
            </Route>
            <Route path={PATHS.AUTH} element={<Outlet />} >
                <Route path={PATHS.LOGIN} element={<Suspense fallback={<Loading />}><UserLoginPage /></Suspense>} />
                <Route path={PATHS.SIGN_UP} element={<Suspense fallback={<Loading />}><UserRegisterPage /></Suspense>} />
                <Route path={`${PATHS.OTP}/:otpId`} element={<Suspense fallback={<Loading />}><OtpPage /></Suspense>} />
                <Route path={PATHS.FORGOT_PASSWORD} element={<Suspense fallback={<Loading />}><FgtEmail /></Suspense>} />
            </Route>
        </Routes>
    );
};

export default UserRoutes;