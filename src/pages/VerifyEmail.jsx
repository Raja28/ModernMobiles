import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeftLong } from "react-icons/fa6";
import { loginUser, resetAuth, sendOTP, setLoading, setStatus, signupNewUser } from '../features/authSlice';
import { Loading } from '../components/Loading';
import { setUser } from '../features/userSlice';
import { PageNotFound } from './PageNotFound';


export const VerifyEmail = () => {


    const isSignup = "signup";
    const isLogin = "login";


    const [otp, setOtp] = useState('');
    const { userData, loading, status,  } = useSelector(state => state.auth)

    

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { actionParam } = useParams()
    console.log("actionParam", actionParam);


    useEffect(() => {
        // dispatch(setLoading(false));
        dispatch(setStatus("idle"))
    }, [])

    useEffect(() => {
        if (loading == false && status === "success") {
            // dispatch(resetAuth())
            if (actionParam === isSignup && !userData) {
                // dispatch(resetAuth())
                navigate("/login")
            } else {
                if (localStorage.getItem("token")) {
                    console.log(userData);
                    
                    dispatch(setUser(userData))
                    navigate("/dashboard")
                    dispatch(resetAuth())
                }
            }
        } else {
            if (loading == false && status === "error") {
                dispatch(resetAuth())
                navigate(-1)
            }
        }

    }, [status, loading])



    if(!userData) {
        return <PageNotFound/>
    }

    if (status == "processing") {
        return <Loading />
    }

    function handlerVerifyEmail(e) {

        e.preventDefault();
        if (isSignup === actionParam) {
            const { firstName, lastName, email, contact } = userData
            console.log(otp);

            let clonedObj = Object.assign({}, userData)
            clonedObj.otp = otp
            console.log(clonedObj);
            dispatch(signupNewUser(clonedObj))
        } else {
            const email = userData
            dispatch(loginUser({ email, otp }))
        }

    }

    function handleResendOTP(e) {
        e.preventDefault()
        if (isSignup === actionParam) {
            dispatch(sendOTP(userData.email))

        } else {
            dispatch(sendOTP(userData))
        }
    }

    function handlerPageDirector(){
        dispatch(resetAuth()) 
        navigate(-1)
    }



    return (
        <>
            <Header />

            {<div className='border d-flex justify-content-center align-items-center' style={{ marginTop: "5rem", minHeight: "calc(100vh - 5rem)" }}>
                <div className='d-flex text-center flex-column align-items-center justify-content-center border p-1' style={{ maxWidth: "20.5rem", height: "fit-content" }} >
                    {/* <div> */}
                    <h2>Verify Email</h2>
                    <p className=''>A verification code has been sent to you on  
                        <span className='text-primary'>{ actionParam === isLogin ? " "+userData:" "+userData.email}</span>. Enter the code below.</p>
                    {/* </div> */}
                    <form onSubmit={handlerVerifyEmail} className=''>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props}
                                style={{ width: "48px" }}
                                className='border border-dark rounded text-center'
                            />}
                        />
                        <div className='w-100 mt-3'>

                            <button className='btn bg-warning w-100'>
                                Verify
                            </button>
                        </div>
                    </form>
                    <div className='d-flex w-100 justify-content-evenly' >
                        <p onClick={() => handlerPageDirector()} className='' role='button'>
                            {actionParam === isSignup ? "Back to signup" : `Login`}
                        </p>
                        <p onClick={handleResendOTP} role='button'>Resend OTP</p>
                    </div>
                </div>

            </div>
            }
            <Footer />
        </>

    );
}