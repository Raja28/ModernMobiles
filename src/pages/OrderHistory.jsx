import { useDispatch, useSelector } from "react-redux"
import { Loading } from "../components/Loading"
import { useEffect } from "react"
import { fetchOrders } from "../features/userSlice"
import { setCartStatus } from "../features/cartSlice"
import { BsArrowLeft } from "react-icons/bs";
import Header from "../components/Header"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { LiaRupeeSignSolid } from "react-icons/lia";

export function OrderHistory() {
    const { status, orders, user } = useSelector(state => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const userId = user?._id
        dispatch(fetchOrders(userId))
    }, [])


    useEffect(() => {
        dispatch(setCartStatus())
    }, [])


    if (status === "loading") {
        return <Loading />
    }

    function handlerFetchProductDetail(product) {
        navigate(`/product-details/${product?.brand}/${product._id}`)
    }


    return (
        <>
            <Header />
            <main className="container  p-0 min-vh-100" style={{ marginTop: "5.3rem", }}>
                <Link to={"/"} className=" text-decoration-none text-dark m-3">
                    <BsArrowLeft className="" />
                    <span> Continue Shopping</span>
                </Link>

                <div className="text-center ">
                    <h2 className="m-0">Orders History</h2>
                    <span className="">{orders?.length ? orders?.length : 0} items</span>
                </div>
                <div>
                 
                    <div >
                        {
                            orders && orders.map((order, index) => (

                                order.cartId.map((cart, index) => (

                                    <div
                                        key={cart?._id}
                                        className="card mb-3 mt-5">
                                        <div className=" row g-0">
                                            <div className="col-md-3">
                                                <img src={`${cart?.product?.imageGallery[0]?.original}`}

                                                    className="rounded img-fluid img-thumbnail border-0" alt="product-image"
                                                />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body p-2">
                                                    <h5 className="card-title">{cart?.product?.title}</h5>
                                                    <div className="d-flex gap-2 mt-4">
                                                        <strong>Series:</strong>
                                                        <p className="m-0 "> {cart?.product?.series}</p>
                                                    </div>

                                                    <div className="d-flex gap-2 my-2">
                                                        <strong>Quantity:</strong>
                                                        <p className="m-0 "> {cart?.quantity}</p>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-2 my-2">
                                                        <strong>Price:</strong>
                                                        <p className="m-0 ">Rs {cart?.product?.price} /-</p>
                                                    </div>
                                                    <div className="d-flex gap-2 my-2">
                                                        <strong>Date:</strong>
                                                        <p className="m-0">{order?.createdAt.split("T")[0].split("-").reverse().join("-")}</p>
                                                    </div>
                                                    <div className="d-flex gap-2 my-2">
                                                        <strong>Delivery cost:</strong>
                                                        <p className="m-0 "> {cart?.product?.deliveryCost}</p>
                                                    </div>
                                                    <div className="my-4">
                                                        <Link
                                                            to={`/product-details/${cart?.product?.brand}/${cart?.product?._id}`}
                                                            className="text-decoration-none btn btn-sm btn-warning">

                                                            View Details
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                ))

                            ))
                        }
                    </div>
                </div>

            </main>
        </>
    )
}