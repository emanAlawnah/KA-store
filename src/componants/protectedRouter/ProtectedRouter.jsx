import React from 'react'
import { Navigate } from 'react-router';

export default function ProtectedRouter({ children }) {
    const token =localStorage.getItem('token');
    if(!token){
     return <Navigate to={'/auth/login'}></Navigate>
    }
  return children;
  
}
