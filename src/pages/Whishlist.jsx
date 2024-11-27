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

const bannerImage = "https://st3.depositphotos.com/16203680/32613/v/450/depositphotos_326132448-stock-illustration-group-hand-drawn-cartoon-people.jpg"
// const bannerImage = "https://res.cloudinary.com/dooxbo8sg/image/upload/v1730485689/ModernMobiles/Others/rc5grkntschh5lo5d5l0.jpg"

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
        // console.log("handlerWishlist");

        let token = JSON.parse(localStorage.getItem("token"))
        dispatch(removeProductFromWishlist({ productId, token }))
    }

    function handlerFetchProductDetail(product) {
        navigate(`/product-details/${product?.brand}/${product._id}`)
        return
        // console.log("Rendering handlerFetchProductDetail");
        // console.log(product._id);
        // console.log(products);

        const productIndex = products.findIndex(prod => prod?._id == product._id)
        // console.log(productIndex);


        // if (productIndex >= 0) {
        //     dispatch(setProductDetail(products[productIndex]))
        //     navigate(`/product-details/${product?.brand}/${product._id}`)
        //     // return
        // } else {

        //     dispatch(setProducts([]))
        //     dispatch(fetchData(product.brand))
        //     navigate(`/product-details/${product._id}`)
        // }
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
                (<main className="container  p-0 min-vh-100" style={{ marginTop: "5.3rem", }}>

                    <Link to={"/"} className=" text-decoration-none text-dark m-3">
                        <BsArrowLeft className="" />
                        <span> Continue Shopping</span>
                    </Link>

                    <div className="text-center ">
                        <h2 className="m-0">Wistlist</h2>
                        {/* <span>{whistList?.length} items</span> */}
                        <span className="">{wishlist?.length ? wishlist?.length : 0} items</span>
                    </div>

                    {/* products */}
                    <div className="">
                        <div className="row row-cols-1 row-cols-md-3 gap-2 mt-2 m-0">
                            {
                                wishlist?.map(product => (
                                    <div
                                        onClick={() => handlerFetchProductDetail(product)}
                                        key={product?._id} className="col-md-4 col-lg-3 my-3 mx-auto text-decoration-none p-0 card"
                                        style={{ maxWidth: "18rem", cursor: "pointer" }}>

                                        <div  className=" p-0 " >
                                            <img src={product?.imageGallery[0].original} alt=""
                                                className="w-100 rounded img-fluid img-thumbnail border-0"
                                            />

                                            <div className="card-body p-2 text-center">
                                                <h6 className="card-title">{product.title}</h6>
                                            </div>
                                            <div className="d-flex justify-content-center gap-2 mb-3 ">
                                                <button
                                                    onClick={(e) => handlerWishlist(e, product._id)}
                                                    disabled={ status === "loading" ? true : false}
                                                    role="button" className="btn btn-danger ">
                                                    Remove
                                                </button>
                                                <button
                                                    onClick={(e) => wishlistToCartHandler(e, product?._id)}
                                                    disabled={ status === "loading" ? true : false}
                                                    role="button" className="btn btn-warning ">
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