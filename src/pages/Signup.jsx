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
     

                <label className="form-label mt-2" >Email: </label>

                <input
                  type="text"
                  name="email"
                  value={email}
                  placeholder="Email"
                  className="form-control"
                  onChange={(e) => onChangeHandler(e)}
                />

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
  );
};
