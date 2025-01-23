import { useNavigate, useParams, useResolvedPath } from "react-router-dom";

import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchData, fetchProductById, setProductDetail } from "../features/productSlice";
import { VscCircleSmallFilled } from "react-icons/vsc";
import { RiExchangeFill } from "react-icons/ri";

import { MyGallery } from "../components/ImageGallery"
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { setStatus, setProducts } from "../features/productSlice";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import { removeProductFromWishlist } from "../features/userSlice";
import { handlerWishlist, handlerCart } from "../util/operations";
import { setCart } from "../features/cartSlice";

const imageLink = {
  battery: "https://res.cloudinary.com/dooxbo8sg/image/upload/v1729101488/ModernMobiles/Others/Battery.jpg",
  camera: "https://res.cloudinary.com/dooxbo8sg/image/upload/v1729101417/ModernMobiles/Others/Camera.jpg",
  internalStorage: "https://res.cloudinary.com/dooxbo8sg/image/upload/v1729101525/ModernMobiles/Others/Storage.jpg"
}
const bestOffer = "https://res.cloudinary.com/dooxbo8sg/image/upload/v1729189074/ModernMobiles/Others/offer.gif"

const highLights = [
  'https://res.cloudinary.com/dooxbo8sg/image/upload/v1729964173/ModernMobiles/Others/replacement.png',
  'https://res.cloudinary.com/dooxbo8sg/image/upload/v1729964153/ModernMobiles/Others/warranty.png',
  "https://res.cloudinary.com/dooxbo8sg/image/upload/v1729964431/ModernMobiles/Others/topBrand.png",
  'https://res.cloudinary.com/dooxbo8sg/image/upload/v1729964337/ModernMobiles/Others/payment.png'
]

export const ProductDetails = () => {

  const { brand, productId } = useParams();

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { status, products, productDetails } = useSelector(state => state.products)
  const { wishlist, user } = useSelector(state => state.user)

  // when user's cart get updated dispatch SETCART to update cartSlice
  useEffect(() => {
    if (user) {
      dispatch(setCart())
    }
  }, [user?.cart])


  useEffect(() => {

    // finding index of the product in available product list
    const productIndex = products?.findIndex(product => product?._id == productId)

    // if available, dispatch productDetails using SETPRODUCTDETAILS
    if (productIndex >= 0) {
      dispatch(setProductDetail(products[productIndex]))

    } else {
      dispatch(fetchData(brand))
    }


  }, [productId, products])


  if (status === "loading") {
    return <Loading />
  }

  if (status === "error") {
    navigate("/error")
    return
  }

  return (
    <div >
      <Header />
      {Object.keys(productDetails).length &&
        <div className="container min-vh-100" style={{ marginTop: "6rem" }}>
          <div className="d-flex flex-wrap-css gap-3">

            {/* left */}
            <div className="" >
              <MyGallery images={productDetails?.imageGallery} />
            </div>

            {/* right */}
            <div className="text-dark fw-semibold  p-1 " >


              <div className="text-secondary">{productDetails?.brand?.split("").join(" ").toUpperCase()}</div>
              <p className="fs-4">{productDetails?.title}</p>
              <p className="fs-5 ">
                <i className="bi bi-currency-rupee"></i>
                <span>{productDetails.price}/-</span>
                <span style={{ fontSize: "0.8rem" }}>(Price including GST)</span>
                <img src={bestOffer} alt="" className=" " style={{ width: "2.2rem", marginLeft: "5px" }} />
              </p>

              {/* BATTERY, CAMERA, STORAGE - Card */}
              <div className="d-flex gap-2 flex-wrap flex-lg-nowrap" >
                {productDetails &&
                  Object?.keys(imageLink).map(key => (
                    <div key={key} className="d-flex border rounded shadow "
                      style={{ maxHeight: "3.8rem", width: "10rem" }}>
                      <div className="d-flex  w-100">
                        <img src={imageLink[key]} alt={key} className="object-fit-contain w-50 " />
                        <div className="" style={{ fontSize: ".8rem" }}>
                          <p className="m-0">{key === "internalStorage" ? "storage" : key}</p>
                          <p className="m-0">{productDetails?.additionalInformation[key]}</p>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>

              {/* SPECIFICATIONS */}
              <div>
                <p className="text-secondary mt-4 mb-3">Highlights</p>
                {
                  productDetails?.spec?.map((detail, index) => (
                    index !== productDetails?.spec?.length - 1 &&
                    <div key={detail} className="">
                      <VscCircleSmallFilled />
                      <span className="m-0 p-0" style={{ fontSize: ".9rem" }}>{detail}</span>
                    </div>
                  ))
                }
              </div>

              {/* WARRANTY */}
              <div>
                <p className="text-secondary mt-4 mb-3">Warranty</p>
                {
                  productDetails?.spec[productDetails?.spec.length - 1]?.split("And").map((detail, index) => (
                    <div key={detail} className="m-0 p-0">
                      <VscCircleSmallFilled />
                      <span>{detail}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between gap-3 mt-3 flex-wrap flex-lg-nowrap " >

            {/* BUY & WHISHLIST BUTTON */}
            <div className="d-flex justify-content-center gap-1 w-100" >
              <button
                onClick={(e) => handlerWishlist(e, productDetails?._id, wishlist, dispatch)}
                className="w-100 bg-dark text-light fw-bold py-2"
              >{wishlist.some(list => list._id === productDetails?._id) ? "REMOVE FROM WISHLIST" : "WISHLIST"}
              </button>
              <button
                onClick={(e) => handlerCart(e, productDetails?._id, user?.cart, dispatch)}
                className="w-100 fw-bold py-2">
                {user?.cart?.some(product => product?.product?._id === productDetails?._id) ? "REMOVE FROM CART" : "ADD TO CART"}
              </button>
            </div>


            <div className="border-top border-bottom  w-100">
              {/* EXCHAGE */}
              <div className="  h-100">
                <div className=" d-flex flex-column align-items-center justify-content-center w-100   mt-3">
                  <RiExchangeFill className="fs-4" />
                  <span className="fw-bold">7 Day Returns</span>
                </div>

              </div>
            </div>
          </div>

          {/* Accordion */}
          <div className="accordion my-4" id="accordionPanelsStayOpenExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button fs-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                  Specifictions
                </button>
              </h2>
              <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                <div className="accordion-body">

                  <div className="list-group list-group-flush">

                    <div className="list-group-items border-bottom pb-3">
                      <h5>PRODUCT CATEGORY</h5>
                      <div className="row gap-1">
                        <div className="col-lg-3 col-5 m-2">
                          <div className="fw-semibold">Type</div>
                          <div>Smartphone</div>
                        </div>
                        <div className="col-lg-3 col-5 m-2">
                          <div className="fw-semibold">Condition</div>
                          <div>New</div>
                        </div>


                      </div>
                    </div>

                    <div className="list-group-items py-3">
                      <h5>MANUFACTURER DETAILS</h5>
                      <div className="row">

                        <div className="col-lg-3  col-5 m-2 ">
                          <div className="fw-semibold">Model number</div>
                          <div>{productDetails?.modelNumber}</div>
                        </div>

                        <div className="col-lg-3  col-5 m-2 ">
                          <div className="fw-semibold">Model Name</div>
                          <div>{productDetails?.model}</div>
                        </div>

                        <div className="col-lg-3  col-5 m-2">
                          <div className="fw-semibold">Brand</div>
                          <div>{productDetails?.brand}</div>
                        </div>

                        <div className="col-lg-3 col-5 m-2">
                          <div className="fw-semibold">Model Series</div>
                          <div>{productDetails?.series}</div>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* REVIEW */}

          <div className="my-3">

            <h5 className="mb-3 fs-4 ">Review</h5>

            <div className="embed-responsive embed-responsive-16by9 ratio ratio-16x9" >
              <iframe src={productDetails?.reviewVideoLink}
                title="YouTube video player" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-100 h-100" allowFullScreen></iframe>
            </div>
          </div>

          {/* Carousel */}
          <Carousel products={JSON.parse(localStorage.getItem('products'))} />

        </div>
      }
      <Footer />
    </div>
  )
};
