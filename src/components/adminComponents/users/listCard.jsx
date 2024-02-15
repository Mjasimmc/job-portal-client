import { Block, CheckCircle, RemoveRedEye, Route } from '@mui/icons-material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { blockUser, unBlockUser } from '../../../service/admin/user';

const ListCard = ({ user, i }) => {
    const { isDarkMode } = useSelector(state => state.theme);
    const [userBlocked, setUserBlocked] = useState(user.block);

    const handleBlockUser = async () => {
        let confirmationText = '';
        let actionFunction = null;

        if (userBlocked) {
            confirmationText = 'Are you sure you want to unblock this user?';
            actionFunction = unBlockUser;
        } else {
            confirmationText = 'Are you sure you want to block this user?';
            actionFunction = blockUser;
        }

        const confirmed = await Swal.fire({
            title: 'Confirmation',
            text: confirmationText,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, proceed'
        });

        if (confirmed.isConfirmed) {
            const res = await actionFunction(user._id);
            console.log(res);
            setUserBlocked(!userBlocked);
        }
    };

    return (
        <>
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
                    <button onClick={() => navigate('/admin/users/view/' + user._id)}>
                        <RemoveRedEye className={`${isDarkMode ? 'text-white' : 'text-[#000000]'} `} />
                    </button>
                    <button onClick={handleBlockUser}>
                        {userBlocked && <Block className='text-[#ff0000]' />}
                        {!userBlocked && <CheckCircle className='text-[green]' />}
                    </button>
                </td>
            </tr>
        </>
    );
};

export default ListCard;
