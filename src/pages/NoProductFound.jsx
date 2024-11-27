import { useDispatch, useSelector } from "react-redux"
import { setProducts, setStatus } from "../features/productSlice"
import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const image = "https://res.cloudinary.com/dooxbo8sg/image/upload/v1728919914/ModernMobiles/No_Product_Found/nproduct_ikdqud.png"

export const NoProductFound = () => {
    // console.log("in NoProduct");
    const { products } = useSelector(state => state.products)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setProducts())
        // dispatch(setStatus("idle"))
    }, [])

    function handlerGoBack() {

        console.log(products?.length);

        if (products?.length > 0) {
            navigate(-1)
        } else {
            navigate("/")
        }
    }

    return (
        <>
            <Header />
            <div className="container border d-flex flex-column justify-content-center align-items-center min-vh-100" style={{ height: "100vh", }}>
                <div className="" style={{ maxWidth: "50%", minWidth: "25rem", }} >
                    <img src={image} alt="noProduct-image" className="w-100 img-fluid " style={{ width: "", }} />
                </div>
                <button className="btn btn-primary"
                    onClick={() => handlerGoBack()}
                >
                    Go back
                </button>
            </div>
            <Footer />
        </>

    )

}