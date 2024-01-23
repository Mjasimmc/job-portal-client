import React, { Suspense, lazy } from 'react';

import Loading from '../../ui/LoadingPages/Loading';
const SearchComp = lazy(() => import('../../components/userComponents/jobs/searchComp'))
const ListJobs = lazy(() => import('../../components/userComponents/jobs/listJobs'))
const Home = () => {
    return (
        <>
            <div className="w-full p-3 flex-1 flex flex-col items-center">
                <Suspense fallback={<Loading />} >
                    <SearchComp />
                </Suspense>
                <Suspense fallback={<Loading />} >
                    <ListJobs />
                </Suspense>
            </div>
        </>
    );
}

export default Home;
