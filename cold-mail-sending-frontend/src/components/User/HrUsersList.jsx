import React, { useEffect, useState } from "react";
import { getAllUsers, sendEmailToHr } from "../../api/userService";
import { useNavigate } from "react-router-dom";



const HrUsersList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const loadAllUsers = async () => {
    try {
      const usersList = await getAllUsers();
      console.log(usersList);
      setUsers(usersList);
    } catch (error) {
      console.error("Error loading users!", error);
    }
  };

  useEffect(() => {
    loadAllUsers();
  }, []);

  const handleSendEmail = async(id) =>{
    try {
      await sendEmailToHr(id);
      loadAllUsers();
      console.log("called");
    } catch (error) {
      console.error("Error sending email to HR", error);
    }
  }

  return (
    <>
      
      <div>
        <table className="w-full">
          <thead>
            <tr className="bg-black text-white text-justify">
              <th className="py-4 px-3">SR NO</th>
              <th>Name</th>
              <th>Email</th>
              <th>Organisation</th>
              <th>Mail Status</th>
             {window.location.pathname === "/users" &&  <th></th>}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-slate-100"
                } text-justify hover:cursor-pointer`}
              >
                <td className="py-4 px-8">{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.organisation}</td>
                <td className="ps-5">{user.isMailSent == true ? <i className="ri-mail-check-fill" style={{fontSize:'30px',color:'green'}}></i> : <i className="ri-mail-close-fill" style={{fontSize:'30px',color:'red'}}></i> }</td>
                {window.location.pathname === "/users" && <td>{user.isMailSent === false ? <button className="p-2 bg-black text-white rounded-xl hover:bg-rose-600 " onClick={()=>handleSendEmail(user.id)}>Send Email</button>: <button className="p-2 bg-gray-700 text-white rounded-xl cursor-not-allowed" disabled>Send Email</button>}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HrUsersList;
