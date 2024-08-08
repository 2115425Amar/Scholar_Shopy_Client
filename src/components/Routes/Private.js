import {useState,useEffect} from "react";
import {useAuth} from "../../context/auth";
import {Outlet} from "react-router-dom";
import Spinner from "../spinner";
import axios from 'axios';

export default function PrivateRoute(){
    const[ok,setOk]=useState(false);
    //,setAuth
    const[auth, setAuth]=useAuth();

    useEffect(()=>{
        const authCheck = async () =>{
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`);
            if(res.data.ok){           //ok from the backend
                setOk(true)
            }
            else{
                setOk(false)
            }
        }
        if(auth?.token) authCheck()  //agar token mile tbhi function ko execute kro
    },[auth?.token]);

    return ok ? <Outlet/> : <Spinner/>;
    
    //if already sign in then show dashboard otherwise show spinner
    //outlet is used for making nested routes

}