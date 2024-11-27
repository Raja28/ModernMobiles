import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Header from "../components/Header";
import { login_background_Image } from "../datacollection";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { sendOTP, setLoading, setStatus, setUserData } from "../features/authSlice";
import toast from "react-hot-toast";
import { Loading } from "../components/Loading";
import { signup_image } from "../util/api";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: ""
    // password: "",
    // confirmPassword: "",
  });


  useEffect(() => {
    dispatch(setStatus('idle'))
  }, [])

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loading, status } = useSelector(state => state.auth)

  const { firstName, lastName, email, contact } = formData;


  function onChangeHandler(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    if (status == "success" && loading == false) {
      navigate("/verify-email/signup")
    }
  }, [status, loading])

  function onSubmitHandler(e) {
    e.preventDefault();
    
    const { firstName, lastName, email, contact } = formData

    if (!firstName || !lastName || !email || !contact) {
      toast.error("All Feilds Required")
      return
    } else {
      
      dispatch(setUserData(formData))
      dispatch(sendOTP(email))
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        contact: "",

      })

    }

  }
  // const loginImage = "https://res.cloudinary.com/dooxbo8sg/image/upload/v1728759173/ModernMobiles/Login/e-com_login_cwjsza.jpg"

  if (loading === true && status == "processing") {
    return <Loading />
  }

  return (
    <>
      <Header />
      <main className="container " style={{ marginTop: "5.5rem", minHeight: "calc(100vh - 6.5rem)" }}>
        <div className="d-flex justify-content-center  
         gap-2 h-auto flex-lg-nowrap flex-md-nowrap flex-wrap ">

          {/* left */}
          <section className=" w-100" >
            <div className="  "  >
              <img

                src={signup_image}
                alt="sign-up"
                className="img-fluid img-thumbnail w-100 border-0 object-fit-contain"
                style={{maxHeight: "30rem"}}
              />
            </div>
          </section>

          {/* right */}
          <section className="card w-100 ">
            <h4 className="my-3 text-center ">SignUp</h4>
            <div className="w-100 ">
              <form
                className="rounded p-3 "
                onSubmit={onSubmitHandler}
              >
                <div className="d-flex gap-2 flex-sm-wrap ">
                  <div>
                    <label className="form-label">First Name: </label>
                    <br />
                    <input
                      type="text"
                      name="firstName"
                      value={firstName}
                      placeholder="First Name"
                      className="form-control"
                      onChange={(e) => onChangeHandler(e)}
                    />
                  </div>
                  <br />
                  <div>
                    <label className="form-label">Last Name: </label>
                    <br />
                    <input
                      type="text"
                      name="lastName"
                      value={lastName}
                      placeholder="Last Name"
                      className="form-control"
                      onChange={(e) => onChangeHandler(e)}
                    />
                  </div>
                </div>
                {/* <br /> */}

                <label className="form-label mt-2" >Email: </label>
                {/* <br /> */}
                <input
                  type="text"
                  name="email"
                  value={email}
                  placeholder="Email"
                  className="form-control"
                  onChange={(e) => onChangeHandler(e)}
                />
                {/* <br /> */}

                <label htmlFor="contact" className="mt-2">Phone:</label>
                <br />
                <div className=" d-flex justify-content-end align-items-center position-relative ">
                  <input
                    type="text"
                    name="contact"
                    placeholder="Phone number"
                    className="form-control"
                    onChange={(e) => onChangeHandler(e)}
                  />

                </div>

                {/* <div className="d-flex justify-content-between">
                  <span className="text-danger"></span>
                  <Link to={"/login"} className="text-decoration-none text-secondary ">
                    Go to Login
                    <div className="bg-secondary opacity-50" style={{ height: "1px" }}></div>
                  </Link>
                </div> */}
                <br />

                <div className=" d-flex flex-column align-items-center">

                  <button type="submit" className="btn btn-primary w-50 ">
                    Submit
                  </button>
                  <Link to={"/login"} className="text-decoration-none text-secondary ">
                    Login
                    <div className="bg-secondary opacity-50" style={{ height: "1px" }}></div>
                  </Link>
                </div>

              </form>
            </div>
          </section>
        </div>
      </main >
      <Footer />
    </>
    // <>
    //   <Header />
    //   <main>
    //     <div className="d-flex align-items-center flex-lg-nowrap gap-2 container p-0 vh-100 mt-3" >

    //       {/*Left */}
    //       <section className="w-100  border" >
    //         <div className="h-100 w-100" style={{maxHeight: "60vh"}}>
    //           <img 
    //           src="https://res.cloudinary.com/dooxbo8sg/image/upload/v1729620475/ModernMobiles/Login/sign-up.jpg"
    //           // src="https://cdni.iconscout.com/illustration/premium/thumb/sign-up-illustration-download-in-svg-png-gif-file-formats--login-enter-log-cyber-protection-nallow-pack-people-illustrations-6983270.png?f=webp"
    //             alt="signup-image"  className=" " style={{maxHeight: ""}}/>
    //         </div>
    //       </section>


    //       {/*Right  */}
    //       <section className="  w-100">
    //         <div
    //           className="d-flex flex-column align-items-center justify-content-center border">
    //           <h2 className="mt-3" >Signup</h2>

    //           <form
    //             className="rounded p-3 "
    //             onSubmit={onSubmitHandler}
    //           >
    //             <label className="form-label">First Name: </label>
    //             <br />
    //             <input
    //               type="text"
    //               name="firstName"
    //               value={firstName}
    //               placeholder="First Name"
    //               className="form-control"
    //               onChange={(e) => onChangeHandler(e)}
    //             />
    //             <br />

    //             <label className="form-label">Last Name: </label>
    //             <br />
    //             <input
    //               type="text"
    //               name="lastName"
    //               value={lastName}
    //               placeholder="Last Name"
    //               className="form-control"
    //               onChange={(e) => onChangeHandler(e)}
    //             />
    //             <br />

    //             <label className="form-label">Email: </label>
    //             <br />
    //             <input
    //               type="text"
    //               name="email"
    //               value={email}
    //               placeholder="Email"
    //               className="form-control"
    //               onChange={(e) => onChangeHandler(e)}
    //             />
    //             <br />

    //             {/* <label className="form-label">Password: </label>
    //           <br />
    //           <div className=" d-flex justify-content-end align-items-center position-relative">
    //             <input
    //               type={showPassword ? "text" : "password"}
    //               name="password"
    //               placeholder="Password"
    //               className="form-control"
    //               onChange={(e) => onChangeHandler(e)}
    //             />
    //             <span
    //               onClick={() => setShowPassword((prev) => !prev)}
    //               style={{ transform: "translateX(-.8rem)" }}
    //               className="position-absolute "
    //             >
    //               {showPassword ? (
    //                 <AiOutlineEyeInvisible fontSize={20} />
    //               ) : (
    //                 <AiOutlineEye fontSize={20} />
    //               )}
    //             </span>
    //           </div>
    //           <br />

    //           <label className="form-label">Confirm Password: </label>
    //           <br />
    //           <div className=" d-flex justify-content-end align-items-center position-relative">
    //             <input
    //               type={showConfirmPassword ? "text" : "password"}
    //               name="confirmPassword"
    //               placeholder="Confirm Password"
    //               className="form-control"
    //               onChange={(e) => onChangeHandler(e)}
    //             />
    //             <span
    //               onClick={() => setShowConfirmPassword((prev) => !prev)}
    //               style={{ transform: "translateX(-.8rem)" }}
    //               className="position-absolute "
    //             >
    //               {showConfirmPassword ? (
    //                 <AiOutlineEyeInvisible fontSize={20} />
    //               ) : (
    //                 <AiOutlineEye fontSize={20} />
    //               )}
    //             </span>
    //           </div> */}

    //             <label htmlFor="contact">Phone:</label>
    //             <br />
    //             <div className=" d-flex justify-content-end align-items-center position-relative">
    //               <input
    //                 type="text"
    //                 name="contact"
    //                 placeholder="Phone number"
    //                 className="form-control"
    //                 onChange={(e) => onChangeHandler(e)}
    //               />
    //               {/* <span
    //               onClick={() => setShowConfirmPassword((prev) => !prev)}
    //               style={{ transform: "translateX(-.8rem)" }}
    //               className="position-absolute "
    //             >
    //               {showConfirmPassword ? (
    //                 <AiOutlineEyeInvisible fontSize={20} />
    //               ) : (
    //                 <AiOutlineEye fontSize={20} />
    //               )}
    //             </span> */}
    //             </div>

    //             <div className="d-flex justify-content-between">
    //               <span className="text-danger"></span>
    //               <Link to={"/login-form"} className="text-decoration-none">
    //                 Go to Login
    //               </Link>
    //             </div>
    //             <br />

    //             <button type="submit" className="btn btn-primary">
    //               Submit
    //             </button>
    //           </form>
    //         </div>
    //       </section>

    //     </div>
    //   </main>
    //   <Footer />
    // </>
  );
};
