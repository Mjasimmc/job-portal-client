import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserDataForAdmin } from '../../../service/admin/user';
import { DoNotDisturb, Done } from '@mui/icons-material';
import profileImage from '../../../assets/images/profileImage-1.png'
import Loading from '../../../ui/LoadingPages/Loading';
import UserEmployee from './userEmployee';
const ViewUser = () => {

    const [userData, setUserData] = useState(null)


    const [load, setLoad] = useState(false)
    const { userId } = useParams()

    const getuserData = async () => {
        if (!userId) return
        setLoad(true)
        try {
            const user = await getUserDataForAdmin(userId)

            setUserData(user)
        } catch (error) {

        } finally {
            setLoad(false)
        }
    }
    useEffect(() => {
        console.log(userId)
        getuserData()
    }, [])
    if (load) {
        return <Loading />
    }
    return (
        <div className='w-full flex items-center flex-col justify-center gap-6 py-8'>
            <div className="max-md:w-full md:w-8/12 shadows">
                <div className="flex max-md:flex-col-reverse justify-evenly gap-8 items-center p-3  ">
                    <div className=" p-1 flex-1  flex items-start justify-between">
                        <div className="flex flex-col justify-end gap-2 md:min-h-[6rem] md:px-6 max-md:text-center">
                            <p>{userData?.name} </p>
                            <p> {userData?.email.mail_id} {userData?.email.validated ? <Done className='!text-[green]' /> : <DoNotDisturb className='!text-[red]' />}</p>
                            <p>{userData?.phone.number}</p>
                        </div>
                        {/* <div className="h-full md:min-h-[6rem]">
                            <Button>
                                <Edit />
                            </Button>
                        </div> */}
                    </div>
                    <img src={profileImage} className='w-[8rem] aspect-square rounded-full' alt="" />
                </div>
            </div>

            <div className="max-md:w-full md:w-8/12 shadows py-4 px-8">
                <UserEmployee />
            </div>
        </div>
    );
}

export default ViewUser;
