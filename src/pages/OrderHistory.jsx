import { useDispatch, useSelector } from "react-redux"
import { Loading } from "../components/Loading"
import { useEffect } from "react"
import { fetchOrders } from "../features/userSlice"
import { setCartStatus } from "../features/cartSlice"
import { BsArrowLeft } from "react-icons/bs";
import Header from "../components/Header"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

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
                    {/* <span>{whistList?.length} items</span> */}
                    <span className="">{orders?.length ? orders?.length : 0} items</span>
                </div>
                <div>


                    {/* row row-cols-1 row-cols-md-3 row-cols-sm-1 g-4 */}
                    <div  className="row row-cols-1 row-cols-md-3 gap-2 mt-2 m-0">
                        {
                            orders && orders.map((order, index) => (
                                // {
                                    order.cartId.map((cart, index) => (
                                        <div key={cart?._id}
                                            className="col-md-4 col-lg-3 my-3 mx-auto text-decoration-none p-0 card"
                                            style={{ maxWidth: "18rem", cursor: "pointer" }}
                                            onClick={() => handlerFetchProductDetail(cart?.product)}
                                        >
                                            {/* <div className="col-md-4 col-lg-3 my-3 mx-auto text-decoration-none p-0 card"> */}
                                            <div className=" p-0">

                                                <img src={`${cart?.product?.imageGallery[0]?.original}`}
                                                    className="w-100 rounded img-fluid img-thumbnail border-0" alt="product-image"
                                                />
                                            </div>
                                            <div className="card-body p-2 text-center">
                                                <h6 className="card-title">{cart?.product?.title}</h6>
                                                <div className="d-flex justify-content-between px-2">
                                                    <strong>Quantity</strong>
                                                    <p className="m-0 ">{cart?.quantity}</p>
                                                </div>
                                                <div className="d-flex justify-content-between px-2">
                                                    <strong>Price</strong>
                                                    <p className="m-0">{cart?.product?.price}</p>
                                                </div>
                                                <div className="d-flex justify-content-between px-2">
                                                    <strong>Date</strong>
                                                    <p className="m-0">{order?.createdAt.split("T")[0].split("-").reverse().join("-")}</p>
                                                </div>
                                            </div>
                                            {/* </div> */}
                                        </div>
                                    ))
                                // }
                            ))
                        }
                    </div>
                </div>
                {/* <div class="col">
                        <div class="card h-100">
                            <img src="..." class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">This is a short card.</p>
                                </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-100">
                            <img src="..." class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-100">
                            <img src="..." class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                        </div>
                    </div> */}

            </main>
        </>
    )
}