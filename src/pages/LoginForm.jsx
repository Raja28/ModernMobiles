import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import {  sendOTP, setLoading, setStatus, setUserData } from "../features/authSlice";
import { Loading } from "../components/Loading";

const loginImage = "https://res.cloudinary.com/dooxbo8sg/image/upload/v1728759173/ModernMobiles/Login/e-com_login_cwjsza.jpg"
const verifyEmailDomainArr = ['yahoo.com', 'gmail.com']

export const LoginForm = () => {

  const [email, setEmail] = useState("");
  const { loading, status,  } = useSelector(state => state.auth)


  const navigate = useNavigate()
  
  
  useEffect(() => {
    
    dispatch(setStatus("idle"))
  }, [])

  useEffect(() => {
    if (status == "success" && loading == false) {
      navigate("/verify-email/login")
    }
  }, [status, loading])

  const dispatch = useDispatch();

  function onChangeHandler(e) {
    const { name, value } = e.target;
    setEmail((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function onSubmitHandler(e) {
    e.preventDefault();
 
    if (!email) {
      toast.error("Email Required")
      return
    }

    const splitedEmail = email.split('@')

    if(!verifyEmailDomainArr.includes(splitedEmail[1])){
      toast.error("Invalid Email")
      return
    }

    dispatch(setUserData(email))
    dispatch(sendOTP(email));
    setEmail("")
  }

  if (loading === true && status == "processing") {
    return <Loading />
  }

  return (
    <>

      <Header />

      <main className="container w-75 p-0"
        style={{ marginTop: "5.5rem", minHeight: "calc(100vh - 5.7rem)" }}>

        <div className="d-flex flex-lg-nowrap flex-md-nowrap flex-wrap ">
          {/* left */}
          <div className="w-100">
            <img src={loginImage} alt="login-image" className="object-fit-cover w-100" />

          </div>

          {/* right */}
          <div className="d-flex flex-column justify-content-center align-items-center w-100 card">
            <h2>Login</h2>
            <h4>Welcome Back</h4>
            <form onSubmit={onSubmitHandler}
              className=" w-75 d-flex flex-column justify-content-center align-items-center"
            >
              <input
                type="text"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
              <button className="btn  mt-4 w-75 bg-warning fw-semibold shadow">Login</button>
              <div className="my-1 text-secondary">
                <Link to={"/signup"} className="text-decoration-none text-secondary">Signup</Link>
                <div className="bg-dark" style={{ width: "3rem", height: "0.01rem" }}></div>
              </div>
            </form>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
};
