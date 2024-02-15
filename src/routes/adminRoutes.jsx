import React, { Suspense, lazy } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Loading from '../ui/LoadingPages/Loading';
// import SubscriptionPlan from '../pages/admin/subscriptionPlan';
const CreateSubscriptionPlanPage  = lazy(()=> import('../pages/admin/createSubscriptionPlan' ))
const SubscriptionPlan  = lazy(()=> import('../pages/admin/subscriptionPlan' ))
const EditPlan  = lazy(()=> import('../components/adminComponents/Subscriptions/editPlan' ))
const JobsPage  = lazy(()=> import('../pages/admin/jobsPage' ))
const ViewJobData  = lazy(()=> import('../components/adminComponents/jobs/viewJobData' ))
const PurchasesList  = lazy(()=> import('../components/adminComponents/Subscriptions/purchasesList' ))
const ViewUser  = lazy(()=> import('../components/adminComponents/users/viewUser' ))







const AdminBody = lazy(() => import('../ui/admin/body'))
const HomePageAdmin = lazy(() => import('../pages/admin/home'))
const AdminLoginPage = lazy(() => import('../pages/authentication/adminLoginPage'))
const UsersPage = lazy(() => import('../pages/admin/usersPage'))
const CreateUserPage = lazy(() => import('../pages/admin/createUser'))
const PATHS = {
    ADMIN: 'admin',
    HOME: '',
    USERS: 'users',
    JOBS: 'jobs',
    SUBSCRIPTION: 'subscription',
    CREATE: 'create',
    LOGIN: 'login',
    EDIT: 'edit',
    VIEW: 'view',
    PURCHASES: 'purchase'
};

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path={PATHS.ADMIN} element={<Outlet />}>
                <Route path={PATHS.HOME} element={<Suspense fallback={<Loading />}><AdminBody /></Suspense>} >
                    <Route path={PATHS.HOME} element={<Suspense fallback={<Loading />}><HomePageAdmin /></Suspense>} />

                    <Route path={PATHS.JOBS} element={<Outlet />}>
                        <Route path={PATHS.HOME} element={<JobsPage />} />
                        <Route path={`${PATHS.VIEW}/:jobId`} element={<ViewJobData />} />

                    </Route>
                    <Route path={PATHS.SUBSCRIPTION} element={<Outlet />}>
                        <Route path={PATHS.HOME} element={<SubscriptionPlan />} />
                        <Route path={PATHS.CREATE} element={<CreateSubscriptionPlanPage />} />
                        <Route path={`${PATHS.EDIT}/:plan_id`} element={<EditPlan />} />
                        <Route path={`${PATHS.PURCHASES}/:plan_id`} element={<PurchasesList />} />
                    </Route>
                    <Route path={PATHS.USERS} element={<Outlet />}>
                        <Route path={PATHS.HOME} element={<Suspense fallback={<Loading />}><UsersPage /></Suspense>} />
                        <Route path={PATHS.CREATE} element={<Suspense fallback={<Loading />}><CreateUserPage /></Suspense>} />
                        <Route path={`${PATHS.VIEW}/:userId`} element={<Suspense fallback={<Loading />}><ViewUser /></Suspense>} />
                    </Route>
                </Route>
                <Route path={PATHS.LOGIN} element={<Suspense fallback={<Loading />}><AdminLoginPage /></Suspense>} />
            </Route>
        </Routes>
    );
}

export default AdminRoutes;
