import React,{useEffect} from 'react';
import  {useNavigate} from "react-router-dom";

const Middleware = () => {
    const history = useNavigate();
    let token = localStorage.getItem('token')
    useEffect(() => {
        if (token === null) {
            return  history('/login')
        }
    },[token])
};

export default Middleware;
