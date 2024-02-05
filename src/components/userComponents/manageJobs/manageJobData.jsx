import React from 'react';
import MyButton from '../../../ui/elements/myButton';

const ManageJobData = ({ job }) => {
    console.log(job)

    const ViewDate = (date) => {
        const dateConvert = new Date(date);
        return dateConvert.toLocaleDateString();
    };

    return (
        <div className="w-full min-h-20 border mt-10 flex flex-wrap justify-between items-center my-10 p-4 rounded-lg">
            <p>{job?.role}</p>
            <p> deadline : {ViewDate(job?.deadline)}</p>
            {job?.status && <MyButton className="px-4"> stop recruiting </MyButton>}
            {!job?.status && <MyButton className="px-4"> resume recruiting </MyButton>}
        </div> 
    );
}

export default ManageJobData;
