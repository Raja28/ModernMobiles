import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import {  sendOTP, setLoading, setStatus, setUserData } from "../features/authSlice";
import { Loading } from "../components/Loading";

const loginImage = "https://res.cloudinary.com/dooxbo8sg/image/upload/v1728759173/ModernMobiles/Login/e-com_login_cwjsza.jpg"

export const LoginForm = () => {

  const [email, setEmail] = useState("");
  const { loading, status,  } = useSelector(state => state.auth)


  const navigate = useNavigate()
  
  
  useEffect(() => {
    // dispatch(setLoading(false));
    
    dispatch(setStatus("idle"))
  }, [])

  useEffect(() => {
    if (status == "success" && loading == false) {
      navigate("/verify-email/login")
      // navigate("/verify-email/signup")
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
    dispatch(setUserData(email))
    dispatch(sendOTP(email));
    setEmail("")
  }

  if (loading === true && status == "processing") {
    return <Loading />
  }

  // return (
  //   <>
  //     <Header />
  //     <main>
  //       <div
  //         style={{
  //           backgroundImage: `url(${login_background_Image})`,
  //           height: "100vh",
  //           backgroundAttachment: "fixed",
  //         }}
  //         className="d-flex flex-column align-items-center "
  //       >
  //         <h2 className="mt-4">LOGIN</h2>

  //         <form
  //           onSubmit={(e) => onSubmitHandler(e)}
  //           className="mt-4 border border-2 rounded p-3 form-css bg-light"
  //         >
  //           <label htmlFor="email" className="form-label">
  //             Email:
  //           </label>
  //           <br />
  //           <input
  //             type="text"
  //             name="email"
  //             placeholder="@gmail.com"
  //             className="form-control"
  //             onChange={(e) => onChangeHandler(e)}
  //           />
  //           <br />
  //           {/* <br /> */}
  //           <label htmlFor="password" className="form-label">
  //             Password:
  //           </label>
  //           <br />
  //           <input
  //             type="text"
  //             name="password"
  //             placeholder="Password"
  //             className="form-control"
  //             onChange={(e) => onChangeHandler(e)}
  //           />
  //           <div className="d-flex justify-content-between">
  //             <span>msg</span>
  //             <Link to={"/signup-form"} className="text-decoration-none fs-7">
  //               Go to Signup
  //             </Link>
  //           </div>

  //           <br />
  //           <div className="d-flex justify-content-center">
  //             <button type="submit" className="btn btn-primary ">
  //               Submit
  //             </button>
  //           </div>
  //         </form>
  //       </div>
  //     </main>
  //   </>
  // );

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
