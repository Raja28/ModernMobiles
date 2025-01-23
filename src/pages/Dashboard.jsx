import { useDispatch, useSelector } from "react-redux"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { avatarAPI, logoutIcon } from "../util/api"
import { useEffect, useState } from "react"
import { MdOutlineEditNote } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";

import { FaCartShopping } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa6";
import { BsEmojiHeartEyesFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom"
import { resetUser, updateUserData } from "../features/userSlice"
import toast from "react-hot-toast"
import { resetCart, setCart } from "../features/cartSlice"

const navCards = [
    {
        title: "Wishlist",
        icon: < BsEmojiHeartEyesFill />,
        link: "/dashboard/wishlist"
    },
    {
        title: "Cart",
        icon: < FaCartShopping />,
        link: "/dashboard/cart/checkout"
    },
    {
        title: "Orders",
        icon: < FaBoxOpen />,
        link: "/dashboard/my-orders"
    },
]


export const Dashboard = () => {

    const { user, status } = useSelector(state => state.user)
    const { firstName, lastName, email, contact, address } = user

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("cart")) {
            dispatch(setCart())
        }
    }, [])

    const [editUserData, setEditUserData] = useState(false)
    const [formData, setFormData] = useState({ firstName, lastName, email, contact })

    function handlerFormData(e) {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    function handlerOnSubmit() {

        if (firstName === formData.firstName && lastName === formData.lastName && contact === formData.contact
            && email === formData.email
        ) {
            toast.error("No changes so far")
            return
        }
        dispatch(updateUserData(formData))
        setEditUserData(prev => !prev)
    }

    function handlerCancelEdit() {
        setFormData({ firstName, lastName, email, contact, address })
        setEditUserData(prev => !prev)
    }

    function handlerAddAddress(e) {
        e.preventDefault()
        console.log("naviahting to add address");
    }

    function handlerLogout() {
        dispatch(resetCart())
        dispatch(resetUser())
        toast.success("Logout Successfully")
        navigate("/")

    }

    return (
        <>
            <Header />
            <div className="container " style={{ marginTop: "5.5rem", minHeight: "calc(100vh - 5.7rem)" }}>
                <div className=" row gap-3 ">

                    {/* Left */}
                    <div className="col-md-4 d-flex flex-column justify-content-between">
                        <div className="card ">

                            <img src={avatarAPI} alt="user-avatar" className="card-img-top img-fluid w-50 h-50" />
                           
                            <div className="card-body text-center">
                                <h6 className="">{firstName + " " + lastName}</h6>
                                <p>{email}</p>
                            </div>
                        </div>

                        {/* <!-- Modal --> */}
                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" >
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header border-0">
                                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Logout Confirmation</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body ">
                                        Are you sure you want to logout ?
                                    </div>
                                    <div className="modal-footer border-0">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            data-bs-dismiss="modal"
                                            onClick={()=> handlerLogout()}
                                            >
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <button
                            type="button"
                            data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                            className="my-3 w-100 btn btn-outline-danger fw-semibold"
                            style={{ height: "3rem", }} >
                            Logout
                            <MdOutlineLogout className="mx-2" />
                        </button>
                    </div>


                    {/* Right */}
                    <div className="col ">
                        <div className="card">
                            <form className="card-body p-0 m-0">
                                <div className="">

                                    {/* first & last name */}
                                    <div className="d-flex">
                                        <div className="d-flex flex-wrap flex-lg-nowrap ">
                                            <label htmlFor="firstName" className="m-2 input-group-text min-vw-50">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                id="firstName"
                                                value={formData?.firstName}
                                                disabled={editUserData ? false : true}
                                                onChange={(e) => handlerFormData(e)}
                                                className="form-control m-2"
                                            />
                                        </div>

                                        <div className="d-flex flex-wrap flex-lg-nowrap">
                                            <label htmlFor="lastName" className="m-2 input-group-text min-vw-50">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                id="lastName"
                                                value={formData?.lastName}
                                                disabled={editUserData ? false : true}
                                                onChange={(e) => handlerFormData(e)}
                                                className="form-control m-2"
                                            />
                                        </div>
                                    </div>
                                    {/* email & contact */}
                                    <div className="d-flex my-3 justify-content-between">
                                        <div className="d-flex flex-wrap flex-lg-nowrap">

                                            <label htmlFor="email" className="m-2 input-group-text min-vw-50">Email-ID</label>
                                            <input
                                                type="text"
                                                name="email"
                                                id="email"
                                                value={formData?.email}
                                                disabled={editUserData ? false : true}
                                                onChange={(e) => handlerFormData(e)}
                                                className="form-control m-2"
                                            />
                                        </div>
                                        <div className="d-flex flex-wrap flex-lg-nowrap">
                                            <label htmlFor="contact" className="m-2 input-group-text ">Contact No </label>
                                            <input
                                                type="text"
                                                name="contact"
                                                id="contact"
                                                value={formData?.contact}
                                                disabled={editUserData ? false : true}
                                                onChange={(e) => handlerFormData(e)}
                                                className="form-control m-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <div className=" w-100 align-self-end position-relative">


                                {
                                    !editUserData && <button
                                        onClick={() => navigate("/dashboard/address-management")}
                                        className="position-absolute bottom-0 btn btn-info">
                                        Manage Address
                                    </button>
                                }


                                <div className="d-flex gap-2 justify-content-end ">
                                    {/*SAVE & CANCEL BUTTON*/}
                                    {
                                        editUserData ? (
                                            <button
                                                onClick={() => handlerOnSubmit()}
                                                disabled={status === "loading" ? true : false}
                                                className="btn btn-warning">
                                                Save
                                            </button>
                                        ) :
                                            (<button
                                                type="button"
                                                onClick={() => setEditUserData(prev => !prev)}
                                                disabled={status === "loading" ? true : false}
                                                className="btn btn-warning">
                                                Edit Details
                                            </button>)
                                    }

                                    {
                                        editUserData && (
                                            <button
                                                disabled={status === "loading" ? true : false}
                                                onClick={() => handlerCancelEdit()}
                                                className="btn btn-danger">
                                                Cancel Edit
                                            </button>
                                        )
                                    }

                                </div>
                            </div>
                        </div>

                        {/* cards */}
                        <div className=" mt-4 " style={{}}>
                            <div className=" row" style={{ height: "7.5rem" }}>
                                {
                                    navCards.map((data, index) => (
                                        <div key={index} className="col-4 mx-auto " >
                                            <Link
                                                to={data.link}
                                                className="border h-100 shadow-lg  card-group text-dark text-decoration-none" >
                                                <div className="border-top border-bottom border-secondary card-body my-auto" style={{}}>
                                                    <div className="fs-5 fw-bold m-2 d-flex justify-content-center gap-2">
                                                        <p className="p-0 m-0">{data.title}</p>
                                                        <p className="p-0 m-0">{data.icon}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                    </div>

                </div>


            </div >
            <Footer />
        </>
    )
}