import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaRegCaretSquareLeft } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight, MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

import Slider from "react-slick";
import { Link } from "react-router-dom";
import "../App.css"

// function SampleNextArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//         <div
//             className={className}
//             style={{
//                 ...style, display: "block", background: "grey", borderRadius: "50%",
//                 transform: "translateX(-200%)", zIndex: "10", transform: "scale(1.5)",
//                 position: 'absolute', right: ".5rem"
//             }}
//             onClick={onClick}
//         />

//     );
// }

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className={`arrow ${className}`}  style={{ transform: "translateX(-2rem)", zIndex: "100" }}>
            <MdKeyboardDoubleArrowRight className="arrows" style={{ color: "white" }} />
        </div>
    )
}
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className={`arrow ${className}`} style={{ transform: "translateX(2rem)", zIndex: "100" }}>
            <MdOutlineKeyboardDoubleArrowLeft className="arrows" style={{ color: "white", }} />
        </div>
    )
}

// function SamplePrevArrow(props) {
//     const { className, style, onClick } = props;
//     return (

//         <div
//             className={className}
//             style={{
//                 ...style, display: "block", background: "grey", borderRadius: "50%",
//                 transform: "translateX(25px)", zIndex: "10", transform: "scale(1.5)",
//                 position: 'absolute', left: ".5rem"

//             }}
//             onClick={onClick}
//         // <FaRegCaretSquareLeft className="fs-3 " width={"20rem"} />
//         />


//     );
// }

function Carousel({ products }) {
    // console.log(data);
    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     nextArrow: <SampleNextArrow />,
    //     prevArrow: <SamplePrevArrow />
    // };

    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow to={"next"} />,
        prevArrow: <SamplePrevArrow to={"prev"} />,
        // nextArrow: true,
        // prevArrow: true,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (

        <Slider {...settings} >

            {
                products.map(data => (
                    <Link to={`/product-details/${data?._id}`} key={data._id}
                        className="card p-0 mb-4  text-decoration-none">
                        <img src={data?.imageGallery[0]?.original} className="card-img-top" alt="..." />
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title" style={{ fontSize: "1rem" }}>{data?.title}</h5>

                            <button href="#" className="btn btn-primary ">Buy</button>
                        </div>
                    </Link>
                ))
            }
        </Slider>
    )

}

export default Carousel