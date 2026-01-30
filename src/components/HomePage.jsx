import { Link } from "react-router-dom";
import { category, tripleCards } from "../datacollection";
import { Slider } from "../components/Slider";
import ServiceHighlight from "./ServiceHighlight";
import Footer from "./Footer";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../features/productSlice";
import { useEffect } from "react";
import { resetAuth } from "../features/authSlice";
import useOnlineStatus from "../hooks/useConnectionStatus";
import No_Internet_and_Wifi from "../assets/Logo/No_Internet_and_Wifi.png";
import '../App.css';

export default function HomePage() {
  const { status } = useSelector(state => state.products);
  const userConnection = useOnlineStatus();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStatus("idle"));
    if (status === "error") {
      dispatch(resetAuth());
    }
  }, [status, dispatch]);

  // Offline State Component
  if (userConnection === false) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center p-5 shadow-sm rounded-4 bg-white" style={{ maxWidth: "400px" }}>
          <img src={No_Internet_and_Wifi} alt="Offline" className="mb-4 opacity-75" width="120" />
          <h4 className="fw-bold">No Internet Connection</h4>
          <p className="text-muted">Please check your network cables, modem, and router.</p>
          <button className="btn btn-primary rounded-pill px-4 mt-2" onClick={() => window.location.reload()}>
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-light min-vh-100">
      <Header />

      <div style={{ paddingTop: "80px" }}> {/* Better than fixed margin-top */}

        <section className="container-fluid container-lg mt-2">
          {/* Category Wrapper */}
          <div className="py-3 category-scroll-container d-flex justify-content-between gap-3 gap-lg-5 overflow-x-auto  pb-3 no-scrollbar">
            {category.map((data) => (
              <Link
                key={data.id}
                to={`productlist/${data.title}`}
                className="category-item text-decoration-none text-center"
              >
                <div className="category-icon-wrapper position-relative">
                  <div
                    className="category-circle shadow-sm border border-2 border-white d-flex align-items-center justify-content-center overflow-hidden"
                    style={{
                      backgroundColor: data.backgroundColor || '#f8f9fa',
                    }}
                  >
                    <img
                      src={data.thumbnail}
                      className="category-img img-fluid"
                      alt={data.title}
                    />
                  </div>
                  {/* Subtle Indicator for modern feel */}
                  <div className="active-dot"></div>
                </div>
                <span className="category-label text-dark fw-medium mt-2 d-block">
                  {data.title}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* --- Hero Slider --- */}
        <section className="mb-5">
          <Slider />
        </section>

        {/* --- Triple Promo Cards --- */}
        <section className="container mb-5">
          <div className="row g-3">
            {tripleCards.map((card, index) => (
              <div key={index} className="col-12 col-md-4">
                <div className="card-hover-zoom rounded-4 overflow-hidden shadow-sm h-100">
                  <img src={card} alt="Promo" className="w-100 h-100 object-fit-cover" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Bank/Offer Banner --- */}
        {/* <section className="container mb-5">
          <div className="rounded-4 overflow-hidden shadow-sm border">
            <img
              src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1728455421/Croma%20Assets/CMS/LP%20Page%20Banners/2024/More%20For%20Your%20Money/October/Spike%20days%2011%20and%2012/HP_Singlesplit_ICICI_4Sep2024_eznjcf.png?tr=w-1024"
              className="img-fluid w-100"
              alt="Special Offer"
            />
          </div>
        </section> */}

        {/* --- Two-Column Featured Section --- */}
        <section className="container mb-5">
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <div className="rounded-4 overflow-hidden shadow hover-lift h-100">
                <img
                  src="https://img.global.news.samsung.com/in/wp-content/uploads/2024/07/Samsung-Neeraj-Chopra.jpg"
                  className="w-100 h-100 object-fit-cover"
                  style={{ minHeight: "300px" }}
                  alt="Featured Brand"
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="rounded-4 overflow-hidden shadow hover-lift h-100">
                <img
                  src="https://i.shgcdn.com/3c5d9cda-0043-4e6b-b877-579f8e5e538c/-/format/auto/-/preview/600x684/-/quality/lighter/"
                  className="w-100 h-100 object-fit-cover"
                  style={{ minHeight: "300px" }}
                  alt="Special Deals"
                />
              </div>
            </div>
          </div>
        </section>

        <ServiceHighlight />
        <Footer />
      </div>
    </main>
  );
}






// import { Link } from "react-router-dom";
// import { category, tripleCards } from "../datacollection";
// import { Slider } from "../components/Slider";
// import ServiceHighlight from "./ServiceHighlight";
// import Footer from "./Footer";
// import Header from "./Header";
// import { useDispatch, useSelector } from "react-redux";
// import { setStatus } from "../features/productSlice";
// import { useEffect } from "react";
// import { resetAuth } from "../features/authSlice";
// import useOnlineStatus from "../hooks/useConnectionStatus";
// import No_Internet_and_Wifi from "../assets/Logo/No_Internet_and_Wifi.png"
// import '../App.css'


// export default function HomePage() {
//   const { status } = useSelector(state => state.products)
//   let userConnection = useOnlineStatus()

//   const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(setStatus("idle"))
//     if (status == "error") {
//       dispatch(resetAuth())
//     }
//   }, [status == "error"])

//   return (
//     <main className="">
//       <Header />
//       {
//         userConnection === false ? (
//           <div className="vh-100">
//             <div className="d-flex flex-column align-items-center justify-content-center h-100">
//               <div className=" text-center">
//                 <img src={No_Internet_and_Wifi} alt="No_Internet_and_Wifi" />
//                 <h5>Connect to the Internet</h5>
//                 <p className="text-secondary">You're offline. Check your connection.</p>
//               </div>

//             </div>
//           </div>
//         )
//           : (
//             <>
//               <section className="container " style={{ marginTop: "5.5rem" }}>
//                 <div
//                   className="d-flex justify-content-lg-between justify-content-evenly
//                            flex-wrap align-items-center gap-2 "
//                 >
//                   {category.map((data) => (
//                     <div
//                       key={data.id}
//                       className=" rounded d-flex flex-column align-items-center"
//                     >
//                       <Link to={`productlist/${data.title}`} className="text-decoration-none  img-hover-zoom ">
//                         <div className="px-1 rounded-circle border d-flex align-items-center brand-logo " style={{
//                           // height: "5.5rem", width: "5.5rem",
//                           backgroundColor: `${data.backgroundColor}`
//                         }}>
//                           <img
//                             src={data.thumbnail}
//                             className="img-fluid object-fit-contain rounded-pill "
//                             style={{ height: "100%", width: "100%" }}
//                             alt={data.title}
//                           />
//                         </div>
//                       </Link>
//                       <div className="my-0 text-center fw-semibold text-secondary ">
//                         <span className=" brand-logo-text">{data.title}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </section>

//               <section>
//                 <Slider />
//               </section>

//               <section>
//                 <div className="container d-flex justify-content-between gap-3 my-4 ">
//                   {
//                     tripleCards.map((card) => (
//                       <div key={card}
//                         style={{ maxWidth: '25rem', maxHeight: "10rem" }}
//                       >
//                         <img src={card} alt="Phone Card" className="w-100 h-100 object-fit-contain " />
//                       </div>
//                     ))
//                   }
//                 </div>
//               </section>

//               <section>
//                 <div className="container mt-2">
//                   <img
//                     src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1728455421/Croma%20Assets/CMS/LP%20Page%20Banners/2024/More%20For%20Your%20Money/October/Spike%20days%2011%20and%2012/HP_Singlesplit_ICICI_4Sep2024_eznjcf.png?tr=w-1024"
//                     width={"100%"}
//                     alt="offerForYou"
//                     className=" border border-1 rounded"
//                   />
//                 </div>
//               </section>

//               <section>

//                 <div className="container d-flex flex-wrap flex-md-nowrap gap-2 my-4">
//                   <div className="w-100  border-4 rounded  p-4">
//                     <img

//                       src="https://img.global.news.samsung.com/in/wp-content/uploads/2024/07/Samsung-Neeraj-Chopra.jpg"
//                       width="100%"
//                       height="100%"
//                       className="rounded"
//                       style={{ objectFit: "cover" }}
//                     />
//                   </div>
//                   <div className="w-100 p-4">
//                     <img
//                       src="https://i.shgcdn.com/3c5d9cda-0043-4e6b-b877-579f8e5e538c/-/format/auto/-/preview/600x684/-/quality/lighter/"
//                       width="100%"
//                       height="100%"
//                       className="rounded"
//                       style={{ objectFit: "cover" }}
//                     />
//                   </div>
//                 </div>
//               </section>

//               <section>
//                 <ServiceHighlight />
//               </section>

//               <Footer />
//             </>
//           )
//       }
//     </main>
//   );
// }
