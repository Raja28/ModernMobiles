import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Header from "../components/Header"
import { IoIosAdd } from "react-icons/io";
import { MdAddCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { emptyCart } from "../util/api";
import { addQuantity, checkout, reduceQuantity, setCart, setTotal } from "../features/cartSlice";
import { Link } from "react-router-dom";
import { FiPlus, FiMinus } from "react-icons/fi";
import { cartToWishlist, removeFromCart, setUserCart } from "../features/userSlice";
import { handlerCart } from "../util/operations";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { PiShieldCheckFill } from "react-icons/pi";
import toast from "react-hot-toast";
import Footer from "../components/Footer";


const increase = 1
const decrease = -1

function Cart() {
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : null
    const { user, status:userSliceStatus } = useSelector(state => state.user)
    const { cartItems, total, status } = useSelector(state => state.cart)
    
    let address
    if (user?.address) {
        address = user?.address
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTotal())
        // dispatch(setUserCart())
    }, [cartItems])

    useEffect(() => {
        dispatch(setCart())

    }, [user?.cart])


    useEffect(() => {
        if (!cartItems?.length && !total && status === "success") {
            navigate("/dashboard/my-orders")
        }

    }, [status, total, cartItems])

    const [deliveryAddressId, setDeliveryAddessId] = useState()
    // const [deliveryAddress, setDeliveryAddess] = useState("")


    function handlerProductQuantity(operationId, cartId) {
        let quantityDetails = {
            cartId: cartId,
            operation: ""
        }

        if (operationId === increase) {
            quantityDetails.operation = increase

            dispatch(addQuantity(quantityDetails))

        } else {
            quantityDetails.operation = decrease

            dispatch(reduceQuantity(quantityDetails))

        }
    }

    function cartToWishlistHandler(productId, cartId) {
        dispatch(cartToWishlist({ productId, cartId }))
    }

    function handlerCheckout() {

        if (cartItems.length === 0) {
            toast.error("Add Item To Cart")
            return
        }

        if (!deliveryAddressId) {
            toast.error("Select Delivery Address")
            return
        }

        dispatch(checkout({ total, user, deliveryAddressId, dispatch }))
    }


    return (
        <>
            <Header />
            {
                token === null ? (
                    <>
                        <main className="vh-100">
                            <div className="d-flex flex-column align-items-center justify-content-center h-100">
                                <div className=" text-center">
                                    <p className="fw-semibold">PLEASE LOGIN</p>
                                    <p className="text-secondary">Login to view items in your cart.</p>
                                </div>
                                <div className="mt-3">
                                    <Link to={"/login"}>
                                        <p className="btn btn-outline-primary btn-lg">Login</p>
                                    </Link>
                                </div>
                            </div>
                        </main>
                        <Footer />
                    </>
                ) :
                    (<div className="container  p-0" style={{ marginTop: "5.5rem", minHeight: "calc(100vh - 5.7rem)" }}>

                        <div className="d-flex flex-wrap flex-lg-nowrap gap-2">
                            {/* left */}
                            <div className="" style={{ minWidth: "60vw" }}>
                                {/* address drop down */}
                                <div className=" p-1">
                                    {
                                        address?.length === 0 ?
                                            (
                                                <div className=" d-flex justify-content-center
                                    align-items-center gap-2 p-2 ">
                                                    <p className="m-0">No Address Found - </p>
                                                    <div
                                                        disabled={status === "loading" ? true : false}
                                                        onClick={() => navigate("/dashboard/address-management")}
                                                        className="btn btn-outline-info border gap-1  d-flex align-items-center ">
                                                        Add<MdAddCircleOutline className="" />
                                                    </div>
                                                </div>

                                            )

                                            : (
                                                // <select class="form-select form-select-lg " aria-label="Large select example">
                                                //     {/* <option selected>Open this select menu</option> */}
                                                //     {/* <option value="1">One</option>
                                                //     <option value="2">Two</option>
                                                //     <option value="3">Three</option> */}
                                                //     {
                                                //         address?.map((add, index) => (
                                                //             <option value="">
                                                //                 <div className="row">
                                                //                     <div className="col">
                                                //                         <p><strong>Deliver to: </strong>{add?.firstName} {add?.lastName} ({add?.contact})</p>
                                                //                         <p>Phone: {add?.contact}</p>
                                                //                     </div>

                                                //                 </div>
                                                //             </option>
                                                //         ))
                                                //     }

                                                // </select>

                                                cartItems?.length > 0 &&
                                                <div className="accordion" id="accordionPanelsStayOpenExample" >
                                                    <div className="accordion-item" >
                                                        <h2 className="accordion-header">
                                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                                                <div className="d-flex">
                                                                    <p className="fw-semibold"> Select a delivery address </p>
                                                                    {/* <p>X</p> */}
                                                                </div>
                                                            </button>
                                                        </h2>
                                                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                                                            <div className="accordion-body">
                                                                {
                                                                    address?.map((add, index) => (
                                                                        <div key={index} className="d-flex gap-2 my-3 shadow-sm p-2 card-body">
                                                                            <input
                                                                                id={index}
                                                                                type="radio"
                                                                                value={add?._id}
                                                                                name="address"
                                                                                // disabled={status === "loading" ? true: false}
                                                                                onClick={() => setDeliveryAddessId(add?._id)}
                                                                                className="align-self-start mt-2 "
                                                                            />
                                                                            <label htmlFor={index}>

                                                                                <p className="m-0 ">{add?.firstName} {add?.lastName} ({add.contact})</p>

                                                                                <p className="m-0">{add?.address} {add?.city}  {add?.state}</p>
                                                                            </label>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>


                                            )
                                    }

                                </div>

                                {/* Product-brief */}
                                <div >
                                    {
                                        cartItems == undefined || cartItems?.length == 0 ? (
                                            <div className="">
                                                <div className="h-50 w-50 mx-auto">
                                                    <img src={emptyCart}
                                                        alt="empty-cart"
                                                        className="w-100"
                                                    />
                                                </div>
                                                <p></p>
                                            </div>
                                        ) :
                                            (cartItems?.map((product, index) => (
                                                <div key={product?._id} className="rounded  mx-1 my-4 py-0" >
                                                    <div className="row shadow rounded m-0">
                                                        <div className="col-md-4 p-0">
                                                            <Link to={`/product-details/${product?.product?.brand}/${product?.product?._id}`} className="">
                                                                <img src={product?.product?.imageGallery[0]?.original} className="img-fluid rounded-start  " alt="product-image" />
                                                            </Link>
                                                        </div>
                                                        <div className="col-md-8 ">
                                                            <div className="my-3 ">
                                                                <Link
                                                                    to={`/product-details/${product?.product?.brand}/${product?.product?._id}`}
                                                                    className="text-decoration-none text-dark"
                                                                    disabled={status === "loading" ? true : false}
                                                                >
                                                                    <h5 className="">{product?.product?.title}</h5>
                                                                </Link>
                                                                <p className="">{product?.product?.spec[product?.product?.spec.length - 1]}.</p>
                                                                <div className="">

                                                                    <div className="d-flex justify-content-between ">
                                                                        {/*Cost  */}
                                                                        <div className="fw-semibold fs-5">
                                                                            <FaRupeeSign />
                                                                            {product?.product?.price} -/
                                                                        </div>
                                                                        {/* product quantity */}
                                                                        <div>
                                                                            <div>
                                                                                {/* reduce btn */}
                                                                                <button

                                                                                    onClick={() => handlerProductQuantity(decrease, product?._id)}
                                                                                    disabled={product?.quantity === 1 ? true : false}
                                                                                    className="py-0 mx-2 border btn btn-outline-info btn-sm">
                                                                                    <FiMinus className="text-dark" />
                                                                                </button>
                                                                                {
                                                                                    product?.quantity
                                                                                }
                                                                                {/* increase btn */}
                                                                                <button
                                                                                    onClick={() => handlerProductQuantity(increase, product?._id)}
                                                                                    className="mx-2 py-0 border btn btn-outline-info btn-sm">
                                                                                    <FiPlus className="text-dark" />
                                                                                </button>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>

                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div className="d-flex gap-3 mb-3 justify-content-center justify-content-lg-end">
                                                                <button
                                                                    disabled={userSliceStatus === "loading" ? true : false}
                                                                    onClick={() => cartToWishlistHandler(product?.product?._id, product?._id)}
                                                                    className="btn btn-warning" >
                                                                    MOVE WISHLIST
                                                                </button>
                                                                <button
                                                                    disabled={userSliceStatus === "loading" ? true : false}
                                                                    onClick={(e) => handlerCart(e, product?.product._id, cartItems, dispatch)}
                                                                    className="btn btn-danger">
                                                                    REMOVE FROM CART
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                            )
                                    }
                                </div>

                            </div>
                            {/* right */}
                            <div className="container p-0 px-2 " style={{ minWidth: "25vw" }}>
                                <div>
                                    <h3 className="">Order Summery:</h3>
                                    <hr />
                                    <div className="d-flex justify-content-between">
                                        <p> <strong>Price ({cartItems?.length} {cartItems?.length <= 1 ? "item" : "items"})</strong></p>
                                        <p> <FaIndianRupeeSign /> {total}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p> <strong>Discount</strong> </p>
                                        <p>---</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p> <strong>Delivery</strong> </p>
                                        <p>---</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <p className=" m-0"> <strong>Total Amount</strong> </p>
                                    <p className=" m-0"> <FaIndianRupeeSign /> {total} </p>
                                </div>
                                <hr />
                                <div
                                    onClick={() => handlerCheckout()}

                                    className=" text-center my-3" >
                                    <p className="btn btn-success w-75 my-auto">
                                        Checkout
                                    </p>
                                </div>

                                <div className=" text-center" >
                                    <p className="fw-semibold">
                                        <PiShieldCheckFill className="mx-2" />
                                        Safe and Secure Payment. 100% Authentic Product
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div >)
            }
        </>
    )
}

export default Cart