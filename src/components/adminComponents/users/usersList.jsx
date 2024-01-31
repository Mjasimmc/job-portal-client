import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsersData } from '../../../service/admin/admin';
import MyButton from '../../../ui/elements/myButton';
import { toast } from 'react-toastify';
import { toast_config } from '../../../config/constants';
import { Block, Edit, RemoveRedEye } from '@mui/icons-material';
import Loading from '../../../ui/LoadingPages/Loading';

const UsersList = () => {
    const navigate = useNavigate()
    const [userList, setUserList] = useState([])
    const [load, setLoad] = useState(false)
    const getAllUsers = async () => {
        try {
            setLoad(true)
            const res = await getAllUsersData()
            setUserList(res)
        } catch (error) {
            toast.error('error occured on fetching data', toast_config)
        } finally {
            setLoad(false)
        }
    }
    useEffect(() => {
        getAllUsers()
    }, [])
    return (<>
        <div className="p-2 grid gap-4 ">
            <div className="w-full flex justify-end">
                <MyButton className='p-2  m-2 rounded-md px-4' onClick={() => navigate('create')}>CREATE NEW USER</MyButton>
            </div>
            <div className="overflow-auto ">
                {load && <Loading />}
                {!load && <div className='w-full text-center grid min-w-[34rem]  animate-cards  '>
                    <table>
                        <thead>

                            <tr className='border '>
                                <th>No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {userList.map((user, i) => (<Fragment key={user._id}>
                                <tr className='border'>
                                    <td>
                                        {i + 1}
                                    </td>
                                    <td>
                                        {user.name}
                                    </td>
                                    <td>
                                        {user.email.mail_id}
                                    </td>
                                    <td>
                                        {user.phone.number}
                                    </td>
                                    <td className='flex flex-wrap gap-4 justify-center p-2'>
                                        <RemoveRedEye className='text-[#4aff6b]' />
                                        <Edit className='text-[#000000]' />
                                        <Block className='text-[#ff0000]' />
                                    </td>
                                </tr>
                            </Fragment>))}
                        </tbody>
                    </table>
                    <hr />

                </div>}
            </div>
        </div>
    </>
    );
}

export default UsersList;
