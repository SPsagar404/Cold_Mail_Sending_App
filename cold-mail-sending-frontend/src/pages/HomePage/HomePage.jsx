import React, { useEffect, useState } from 'react'
import HrUsersList from '../../components/User/HrUsersList'
import { Link, useNavigate } from 'react-router-dom'
import { getAllUsers } from '../../api/userService';

const HomePage = () => {

    const navigate = useNavigate();

  return (
    <>
       <div className='mx-16'>
      
     
    <section className= "pt-20 pb-12">
        <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-800">Welcome to MyApp</h1>
            <p className="mt-4 text-lg text-gray-600">Your one-stop solution for managing users and sending emails.</p>
            <div className="mt-8">
                <Link to="/users" className="bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-blue-700">Get Started</Link>
            </div>
        </div>
    </section>
    
    <section className="py-16">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Features</h2>
            <div className="flex flex-wrap justify-center">
                
                <div className="w-full md:w-1/3 p-4">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-xl font-bold text-gray-800">User Management</h3>
                        <p className="mt-4 text-gray-600">Easily create, update, and manage users in your application.</p>
                    </div>
                </div>
               
                <div className="w-full md:w-1/3 p-4">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-xl font-bold text-gray-800">Email Notifications</h3>
                        <p className="mt-4 text-gray-600">Send email notifications with resume and experiance to HR with a single click.</p>
                    </div>
                </div>
                
                <div className="w-full md:w-1/3 p-4">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-xl font-bold text-gray-800">Secure Authentication</h3>
                        <p className="mt-4 text-gray-600">Ensure your users' data is protected with JWT authentication.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
      <div className="container mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Our HR Users</h2>
      
      <HrUsersList/>
      </div>
       </div>
    </>
  )
}

export default HomePage