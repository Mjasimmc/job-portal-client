import React from 'react';
import ListJobs from '../../components/adminComponents/jobs/listJobs';
import AdminSearchJobs from '../../components/adminComponents/jobs/adminSearchJob';

const JobsPage = () => {
    return (
        <>
            <AdminSearchJobs />
            <ListJobs />
        </>
    );
}

export default JobsPage;
