import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Loading } from "../components/Loading"
import { Error } from "../components/Error"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { BsArrowLeft } from "react-icons/bs";
import { removeProductFromWishlist, wishlistToCart } from "../features/userSlice"
import { fetchData, fetchProductById, setProductDetail, setProducts } from "../features/productSlice"
import { useEffect } from "react"
import { setCart } from "../features/cartSlice"

function WhistList() {

    const { wishlist, status } = useSelector(state => state.user)
    const { products, } = useSelector(state => state.products)
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : null


    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setCart())
    }, [wishlist])

    //Wishlist function
    function handlerWishlist(e, productId) {
        e.stopPropagation()

        let token = JSON.parse(localStorage.getItem("token"))
        dispatch(removeProductFromWishlist({ productId, token }))
    }

    function handlerFetchProductDetail(product) {
        navigate(`/product-details/${product?.brand}/${product._id}`)
        return
    }

    function wishlistToCartHandler(e, productId) {
        e.stopPropagation()
        dispatch(wishlistToCart(productId))
    }

    return (
        <>
            <Header />
            {token === null ? (
                <main className="vh-100">
                    <div className="d-flex flex-column align-items-center justify-content-center h-100">
                        <div className=" text-center">
                            <p className="fw-semibold">PLEASE LOGIN</p>
                            <p className="text-secondary">Login to view items in your wishlist.</p>
                        </div>
                        <div className="mt-3">
                            <Link to={"/login"}>
                                <p className="btn btn-outline-primary btn-lg">Login</p>
                            </Link>
                        </div>
                    </div>
                </main>
            ) :
                (<main className="container p-0 min-vh-100" style={{ marginTop: "5.3rem", }}>

                    <Link to={"/"} className=" text-decoration-none text-dark m-3">
                        <BsArrowLeft className="" />
                        <span> Continue Shopping</span>
                    </Link>

                    <div className="text-center ">
                        <h2 className="m-0">Wistlist</h2>
                    
                        <span className="">{wishlist?.length ? wishlist?.length : 0} items</span>
                    </div>

                    {/* products */}
                    <div className="">

                        <div className="d-flex gap-4 flex-wrap justify-content-lg-start justify-content-center">
                            {
                                wishlist?.map(product => (
                                    <div key={product?._id} className=" my-4" >
                                        <div key={product?._id}
                                            onClick={() => handlerFetchProductDetail(product)}
                                            className=" card p-2" style={{ maxWidth: "16.5rem", cursor: "pointer" }}>
                                            <img src={product?.imageGallery[0].original} alt=""
                                                className="w-100 rounded img-fluid img-thumbnail border-0 p-0 "
                                            />
                                            <div className="card-body p-2 text-center">
                                                <h6 className="card-title">{product.title}</h6>

                                            </div>
                                            <div className="d-flex justify-content-center gap-2 mb-3 ">
                                                <button
                                                    onClick={(e) => handlerWishlist(e, product._id)}
                                                    disabled={status === "loading" ? true : false}
                                                    role="button" className="btn btn-sm btn-danger ">
                                                    Remove
                                                </button>
                                                <button
                                                    onClick={(e) => wishlistToCartHandler(e, product?._id)}
                                                    disabled={status === "loading" ? true : false}
                                                    role="button" className="btn btn-sm btn-warning ">
                                                    Add to Cart
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                </main>)
            }
            <Footer />
        </>
    )
}

export default WhistList