import { useDispatch, useSelector } from "react-redux"
import Header from "./Header"
import Footer from "./Footer"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { setStatus } from "../features/productSlice"

export const Error = () => {
    const { error } = useSelector(state => state.products)
    console.log(error);
    const dispatch = useDispatch()

    // useEffect(()=>{
    //     dispatch(setStatus("idle"))
    // },[])
    
    return (
        <>
        <Header />
            <div className="border min-vh-100 d-flex flex-column align-items-center justify-content-center" style={{marginTop: ""}}>
                <i className="bi bi-emoji-frown" style={{fontSize: "4rem"}}></i>
                <div className="d-flex  align-items-center ">
                    {error ? <p className="fw-semibold fs-4">{error?.split(" ")[0]} - {error.split(" ").slice(1).join(" ")} </p>: <p>Try Again</p>}
                </div>
                <Link to={"/"} className="btn btn-danger">Home</Link>
            </div>
            <Footer />
        </>
    )
}