
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import { loginUser, sendOTP, setStatus, setUserData } from "../features/authSlice";
import { Loading } from "../components/Loading";

const loginImage = "https://res.cloudinary.com/dooxbo8sg/image/upload/v1728759173/ModernMobiles/Login/e-com_login_cwjsza.jpg"
const verifyEmailDomainArr = ['yahoo.com', 'gmail.com']

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const { loading, status, userData } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isTokenAvailable = localStorage.getItem("token");
  console.log(userData?._id, status, loading);
  useEffect(() => {
    dispatch(setStatus("idle"));
  }, [dispatch]);

  useEffect(() => {
    if (userData?._id && status === "success" && !loading) {
      navigate("/verify-email/login");
    }
  }, [status, loading, navigate]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email Required");

    const splitEmail = email.split('@');
    if (!verifyEmailDomainArr.includes(splitEmail[1])) {
      return toast.error("Please use Gmail or Yahoo");
    }

    dispatch(setUserData(email));
    dispatch(sendOTP(email));
  };

  const guestLoginHandler = (e) => {
    e.preventDefault();
    const guestEmail = 'email@guest.com';
    dispatch(loginUser({ email: guestEmail }));
  };

  if (loading && status === "processing") return <Loading />;

  if(isTokenAvailable)  navigate("/");

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Header />

      <main className="container flex-grow-1 d-flex align-items-center justify-content-center py-5" style={{ marginTop: "4rem" }}>
        <div className="row g-0 shadow-lg rounded-4 overflow-hidden bg-white" style={{ maxWidth: "900px", width: "100%" }}>
          
          {/* Left Side: Visual Image */}
          <div className="col-lg-6 d-none d-lg-block">
            <div className="h-100 position-relative">
              <img src={loginImage} alt="Login Visual" className="w-100 h-100 object-fit-cover" />
              {/* <div className="position-absolute bottom-0 start-0 p-4 text-white bg-dark bg-opacity-25 backdrop-blur w-100">
                <h5 className="fw-bold">Modern Mobiles</h5>
                <p className="small mb-0">Join thousands of tech enthusiasts today.</p>
              </div> */}
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-center">
            <div className="text-center mb-4">
              <h2 className="fw-bold text-dark">Welcome Back</h2>
              <p className="text-secondary">Please enter your details to sign in</p>
            </div>

            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-muted">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    placeholder="name@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control border-start-0 py-2 shadow-none"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2 fw-bold rounded-pill mb-3 shadow-sm">
                Get OTP
              </button>

              <button 
                type="button"
                onClick={guestLoginHandler} 
                className="btn btn-outline-secondary w-100 py-2 fw-bold rounded-pill mb-4"
              >
                Continue as Guest
              </button>
            </form>

            <div className="text-center mt-2">
              <span className="text-muted small">New here? </span>
              <Link to="/signup" className="text-primary text-decoration-none small fw-bold">
                Create an Account
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};




// import { useEffect, useState } from "react";
// import Header from "../components/Header";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import Footer from "../components/Footer";
// import toast from "react-hot-toast";
// import { loginUser, sendOTP, setStatus, setUserData } from "../features/authSlice";
// import { Loading } from "../components/Loading";

// const loginImage = "https://res.cloudinary.com/dooxbo8sg/image/upload/v1728759173/ModernMobiles/Login/e-com_login_cwjsza.jpg"
// const verifyEmailDomainArr = ['yahoo.com', 'gmail.com']

// export const LoginForm = () => {

//   const [email, setEmail] = useState("");
//   const { loading, status, } = useSelector(state => state.auth)


//   const navigate = useNavigate()


//   useEffect(() => {

//     dispatch(setStatus("idle"))
//   }, [])

//   useEffect(() => {
//     if (status == "success" && loading == false) {
//       navigate("/verify-email/login")
//     }
//   }, [status, loading])

//   const dispatch = useDispatch();

//   function onChangeHandler(e) {
//     const { name, value } = e.target;
//     setEmail((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   function onSubmitHandler(e) {
//     console.log("User login");
    
//     e.preventDefault();

//     if (!email) {
//       toast.error("Email Required")
//       return
//     }

//     const splitedEmail = email.split('@')

//     if (!verifyEmailDomainArr.includes(splitedEmail[1])) {
//       toast.error("Invalid Email")
//       return
//     }

//     dispatch(setUserData(email))
//     dispatch(sendOTP(email));
//     setEmail("")
//   }

//   function guestLoginHandler(e) {
//     e.preventDefault();
//     console.log("Guest lohin");
    
//     const email = 'email@guest.com'

//     dispatch(loginUser({ email }));

//   }

//   if (loading === true && status == "processing") {
//     return <Loading />
//   }

//   return (
//     <>

//       <Header />

//       <main className="container w-75 p-0"
//         style={{ marginTop: "5.5rem", minHeight: "calc(100vh - 5.7rem)" }}>

//         <div className="d-flex flex-lg-nowrap flex-md-nowrap flex-wrap ">
//           {/* left */}
//           <div className="w-100">
//             <img src={loginImage} alt="login-image" className="object-fit-cover w-100" />

//           </div>

//           {/* right */}
//           <div className="d-flex flex-column justify-content-center align-items-center w-100 card">
//             <h2>Login</h2>
//             <h4>Welcome Back</h4>
//             <form onSubmit={onSubmitHandler}
//               className=" w-75 d-flex flex-column justify-content-center align-items-center"
//             >
//               <input
//                 type="text"
//                 name="email"
//                 placeholder="Enter Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="form-control"
//               />
//               <button className="btn  mt-4 w-75 bg-warning fw-semibold shadow">Login</button>
//               <button
//                 className="btn  mt-4 w-75 bg-warning fw-semibold shadow"
//                 onClick={(e) => guestLoginHandler(e)}
//               >
//                 Guest Login
//               </button>
//               <div className="my-1 text-secondary">
//                 <Link to={"/signup"} className="text-decoration-none text-secondary">Signup</Link>
//                 <div className="bg-dark" style={{ width: "3rem", height: "0.01rem" }}></div>
//               </div>
//             </form>
//           </div>

//         </div>
//       </main>
//       <Footer />
//     </>
//   )
// };
