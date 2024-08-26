import React from 'react'
import HrUsersList from '../HrUsersList'
import { useNavigate } from 'react-router-dom'

const UsersList = () => {

    const navigate = useNavigate();

    console.log(window.location)
  return (
    <>
    <div className='mt-10 mb-24 mx-10'>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">HR Users List</h2>
        <div className='float-right my-3 mx-10'>
            <button className='p-4 bg-black text-white rounded-lg hover:bg-rose-600 font-semibold' onClick={()=>navigate("/hr")}>Add HR Details</button>
        </div>
        <HrUsersList/>
    </div>
    </>
  )
}

export default UsersList