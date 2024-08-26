import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HrUsersList from './components/User/HrUsersList'
import Layout from './components/Layout'
import HomePage from './pages/HomePage/HomePage'
import CreateUserForm from './components/User/CreateUserForm'
import UsersList from './components/User/UsersList'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<HomePage/>}/>
            <Route path='hr' element={<CreateUserForm/>}/>
            <Route path="users" element={<UsersList/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App