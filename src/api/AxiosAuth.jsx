import axios from 'axios';
import React from 'react'
const token =localStorage.getItem('token');
const AxiosAuth = axios.create({
    baseURL:'https://mytshop.runasp.net/api/',
    headers : {
        Authorization : `Bearer ${token}`,
    }
});


export default AxiosAuth;