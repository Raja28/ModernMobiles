import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import { useState, useEffect } from "react";
import { FcLikePlaceholder } from "react-icons/fc";
import { GoHeartFill } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaStar, FaIndianRupeeSign } from "react-icons/fa6";
import { TiTickOutline } from "react-icons/ti";
import { iphone } from "../datacollection";
import { Sidebar } from "./Sidebar";
import { Link } from "react-router-dom";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, fetchProductById, setProductDetail, setProducts, setStatus } from "../features/productSlice";
import { NoProductFound } from "../pages/NoProductFound";
import { Loading } from "./Loading";
import Footer from "./Footer";
import { Error } from "./Error";
import { addProductToWhistlist, removeProductFromWishlist } from "../features/userSlice";
import toast from "react-hot-toast";
import { IoMdHeart } from "react-icons/io";
import { handlerWishlist, handlerCart } from "../util/operations";
import { setCart } from "../features/cartSlice";

let brands = ["Apple", "Pixel", "Samsung", "Nothing", "OnePlus", "Motorola"]

const sideBarEnableWith = 625
export default function ProductListPage() {

  let { userSelectedBrand } = useParams();

  const { status, products } = useSelector(state => state.products)
  const { wishlist, user } = useSelector(state => state.user)

  const { width, height } = useWindowDimensions();

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      dispatch(setCart())
    }
  }, [user?.cart])

  useEffect(() => {

    if (products.length === 0 || (products?.length > 0 && userSelectedBrand !== products[0]?.brand)) {


      dispatch(fetchData(userSelectedBrand))
    } else {
      dispatch(setProducts())
    }


  }, [userSelectedBrand])

  useEffect(() => {

    if (products?.length == 0 && status === "success") {
      navigate("/no_product_found")
    } else if (status === "error") {
      navigate("/error")
    }

  }, [products, status])

  if (status === "loading") {
    return <Loading />
  }

  return (
    <>
      <Header />
      {products.length > 0 && <main style={{ marginTop: "5.5rem" }} className="">
        <div className="d-flex  gap-2 mt-2 mx-2 ">
          {/* filter-section (Left)*/}
          <div className="sidebar_productlist_page">
            {/* <Sidebar /> */}
            {width > sideBarEnableWith && <Sidebar />}
          </div>

          {/* productList-section (Right) bg-light-grey*/}
          <div className="col rounded overflow-auto " style={{ height: "85vh", '&::WebkitScrollbar': "none" }}>
            {/* Image-section */}
            <div className="container ">
              <div className="mt-2 d-flex gap-2">
                <p className="fw-bold" style={{ fontSize: "1rem" }}>
                  Showing All Products
                </p>
                <p> ({`showing ${products?.length} products`})</p>
              </div>
              <hr className="m-0 " />
              <div>
                <div className="mt-3">

                  {products && products?.map((phone) => (
                    <div

                      className="card border-0 my-3 box-shadow border"
                      key={phone._id}

                    >
                      <div className="row g-0 gap-2 ">
                        {/* Product-img (left)*/}
                        <div className=" col-md-3 position-relative d-flex justify-content-center ">

                          {/* wishlistIcon */}
                          <button
                            onClick={(e) => handlerWishlist(e, phone._id, wishlist, dispatch)}
                            className="z-3 position-absolute like-icon p-1 border-0  end-0 mt-2 bg-white ">
                            {wishlist?.some(product => product._id === phone._id) ? <GoHeartFill className="text-danger" /> : <FcLikePlaceholder className="" />}
                          </button>
                          <Link
                            to={`/product-details/${phone?.brand}/${phone?._id}`}
                            className="text-decoration-none"
                          >
                            {/* <div> */}
                            <img
                              src={phone["imageGallery"][0]?.original}
                              className="img-fluid img-thumbnail border-0"

                            />
                          </Link>

                        </div>
                        {/* Right */}
                        <div className="col-md-6 container ">
                          <div>
                            <Link
                              to={`/product-details/${phone?.brand}/${phone?._id}`}


                              className="text-decoration-none "

                            >
                              <h5 className="fw-semibold mt-2 link-hover"

                              >
                                {phone.title}
                              </h5>
                            </Link>
                            <div className="d-flex gap-2 ">
                              <div
                                className="bg-success text-white d-flex align-items-center justify-content-center gap-1 ml-0 rounded px-1 "
                                style={{ width: "3rem" }}
                              >
                                <span className="" >
                                  {phone?.rating}
                                </span>
                                <FaStar className="" />
                              </div>
                              <div className="text-secondary fw-semibold">
                                6,671 Ratings & 581 Reviews
                              </div>
                            </div>
                            <div>
                              <ul className="list-group mt-3">
                                {phone.spec.map((info) => (
                                  <li key={info} className="list-group">
                                    <div className="d-flex align-items-center gap-2">
                                      <div className=" spec-list"></div>
                                      <div className="">{info}</div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div
                          className="col container d-flex flex-column align-items-center
                          justify-content-between"
                        >
                          <div className="my-2 d-flex flex-column">
                            <h4 className="fw-semibold">
                              <FaIndianRupeeSign /> {phone.price}
                            </h4>
                            <div>
                              <TiTickOutline style={{ fontSize: "1.4rem" }} />
                              <span className="fw-semibold">100% Original</span>
                            </div>
                            <div className="d-flex gap-1">
                              <span className="text-secondary">
                                Delivery Charge:
                              </span>
                              {phone.deliveryCost}
                            </div>
                          </div>

                          <div className="add-whislist-btn">
                            <button
                              onClick={(e) => handlerCart(e, phone._id, user?.cart, dispatch)}
                              className="btn btn-success d-flex align-items-center gap-2 mt-3 w-100 fw-semibold">
                              <FaShoppingBag />
                              <span>{user?.cart?.some(product => product?.product?._id === phone._id) ? "REMOVE FROM CART" : "ADD TO CART"}</span>
                            </button>

                            <button
                              onClick={(e) => handlerWishlist(e, phone._id, wishlist, dispatch)}
                              className="btn btn-danger d-flex align-items-center justify-content-center gap-2 mt-3 w-100 fw-semibold ">
                              <FaRegHeart className="fs-5" />
                              <span className="">{wishlist?.some(product => product._id === phone._id) ? "REMOVE" : "WISHLIST"}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                  ))}
                </div>
              </div>
            </div>

          </div>
          {/*  */}
        </div>
      </main>}
      <Footer />
    </>
  );
}
