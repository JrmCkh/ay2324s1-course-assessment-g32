import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from '../../components/Header';
import EditUser from '../../components/User/EditUser';
import UserList from '../../components/User/UserList/UserList';
import './UserManagement.css';

function UserManagement() {
  return (
    <div className='user-management'>
      <Header />
      <div className='body'>
        <Routes>
          <Route path='/' element={<UserList />} />
          <Route path='/edit/' element={<EditUser />} />
        </Routes>
        <ToastContainer />
      </div>
    </div>
  );
}

export default UserManagement;
