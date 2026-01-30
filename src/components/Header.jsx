
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { avatarAPI } from "../util/api";
import logo2 from '../assets/logo2.png'

export default function Header() {
  const { cartItems = [] } = useSelector(state => state.cart);
  const { wishlist = [] } = useSelector((state) => state.user);
  const { userSelectedBrand } = useParams();
  const navigate = useNavigate();


  return (
    <header className="fixed-top px-lg-4 py-lg-3">
      <nav className="navbar navbar-expand-lg rounded-4 shadow-sm border bg-white bg-opacity-75 backdrop-blur"
        style={{ backdropFilter: "blur(10px)", transition: "all 0.3s ease" }}>
        <div className="container-fluid px-3">

          {/* Brand Logo */}
          <Link to="/" className="navbar-brand me-4">
            <img src={logo2} alt="Logo" style={{ height: "32px" }} />
          </Link>

          {/* Action Icons */}
          <div className="d-flex align-items-center gap-2 gap-lg-4 ms-auto">

            {/* Wishlist Icon */}
            <Link to="/dashboard/wishlist" className="nav-link position-relative p-2 hover-bg-light rounded-circle">
              <i className="bi bi-heart fs-5"></i>
              {wishlist.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link to="/dashboard/cart/checkout" className="nav-link position-relative p-2 hover-bg-light rounded-circle">
              <i className="bi bi-bag-handle fs-5"></i>
              {cartItems.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark border border-white">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Profile / Login */}
            {/* <div className="vr d-none d-lg-block mx-2 text-muted" style={{ height: "20px" }}></div> */}

            {localStorage.getItem("token") ? (
              <img
                role="button"
                onClick={() => navigate("/dashboard/my-profile")}
                src={avatarAPI}
                className="rounded-circle border"
                style={{ width: "38px", height: "38px", objectFit: "cover" }}
                alt="Profile"
              />
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="btn btn-dark btn-sm rounded-pill px-4 fw-medium"
              >
                Login
              </button>
            )}

            {/* Mobile Toggler */}
            <button className="navbar-toggler border-0 ms-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#navCanvas">
              <i className="bi bi-list fs-3"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Simplified Mobile Offcanvas */}
      <div className="offcanvas offcanvas-end rounded-start-4" tabIndex="-1" id="navCanvas">
        <div className="offcanvas-header border-bottom">
          <img src={logo2} alt="Logo" style={{ height: "24px" }} />
          <button type="button" className="btn-close shadow-none" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          {/* Sidebar Component for Filtering inside the Menu */}
          {userSelectedBrand && <Sidebar />}
          {!userSelectedBrand && <p className="text-muted small">Select a category to see filters</p>}
        </div>
      </div>
    </header>
  );
}

// import { useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { Sidebar } from "../components/Sidebar";
// import { useWindowDimensions } from "../hooks/useWindowDimensions";
// import { avatarAPI } from "../util/api";
// import { useState } from "react";
// import logo2 from '../assets/logo2.png'
// import toast from "react-hot-toast";

// const brands = ["Apple", "Pixel", "Samsung", "Nothing", "OnePlus", "Motorola"]

// export default function Header() {

//   const { cartItems } = useSelector(state => state.cart)
//   const { wishlist } = useSelector((state) => state.user);

//   const { userSelectedBrand } = useParams();
//   const [searchInput, setSearchInput] = useState("")


//   const { width } = useWindowDimensions();
//   const navigate = useNavigate()

//   function searchHandler() {

//     if (!brands.includes(searchInput)) {

//       let brand = brands.filter(brand => brand.toLocaleLowerCase() === searchInput.toLocaleLowerCase())

//       if (!brands.includes(brand[0])) {
//         setSearchInput("")
//         toast.error("Search Valid Brand")
//         return

//       } else {
//         const userSelectedBrand = brand[0]
//         setSearchInput("")
//         navigate(`/productlist/${userSelectedBrand}`)
//       }
//     }
//   }

//   return (
//     <header className="border" >
//       <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top border-bottom " style={{ height: "60px" }}>
//         <div className="container-lg">

//           <Link
//             to={"/"}
//             className="navbar-brand text-secondary p-0 fw-semibold"
//           >
//             {/* MyShoppingSite brand logo*/}
//             <img
//               // src={brandLogo}
//               src={logo2}
//               width={"130rem"}
//               style={{ scale: "1.2" }}
//               className="img-fluid"
//             />
//           </Link>

//           <div className="input-group input-group search-box" style={{ maxWidth: "30%" }}>
//             <span className="input-group-text" id="inputGroup-sizing-sm">
//               <span className="bi bi-search"></span>
//             </span>
//             <input type="text"
//               className="form-control"
//               aria-label="Sizing example input"
//               aria-describedby="inputGroup-sizing-sm"
//               name="searchInput"
//               value={searchInput}
//               placeholder="Search Brand"
//               onChange={(e) => setSearchInput(e.target.value)}
//               onKeyDown={(e) => (
//                 e.key === "Enter" ? searchHandler(e) : null
//               )}
//             />
//           </div>


//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="offcanvas"
//             data-bs-target="#offcanvasNavbar"
//             aria-controls="offcanvasNavbar"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div
//             className="offcanvas offcanvas-start"
//             tabIndex="-1"
//             id="offcanvasNavbar"
//             aria-labelledby="offcanvasNavbarLabel"
//           >
//             <div className="offcanvas-header">
//               <Link
//                 to={"/"}
//                 className="navbar-brand text-secondary p-0 fw-semibold"
//               >
//                 {/* MyShoppingSite */}
//                 <img
//                   src={logo2}
//                   width={"110rem"}
//                   alt="brand-Logo"
//                 />
//               </Link>
//               <button
//                 type="button"
//                 className="btn-close btn-close"
//                 data-bs-dismiss="offcanvas"
//                 aria-label="Close"
//               ></button>
//             </div>

//             <div className="offcanvas-body  d-lg-flex justify-content-lg-end ">
//               <div className="d-flex gap-5 align-items-center ">
//                 {localStorage.getItem("token") ?
//                   (<div role="button"
//                     onClick={() => navigate("/dashboard/my-profile")}
//                     className=" rounded" style={{ maxHeight: "2.5rem", maxWidth: "2.5rem" }}>
//                     <img src={avatarAPI} className=" img-fluid w-100 h-100" alt="user-avatar" />
//                   </div>
//                   ) :
//                   (<Link
//                     to={"/login"}
//                     className="d-flex gap-2 align-items-center login-btn  text-decoration-none"
//                     style={{ maxHeight: "3rem" }}
//                   >
//                     <i className="bi bi-person-circle "></i>
//                     Login
//                   </Link>)
//                 }

//                 {/* WistList */}
//                 <Link
//                   to={"/dashboard/wishlist"}
//                   className=" d-flex flex-column justify-content-center p- position-relative text-decoration-none"
//                   role="button">
//                   <span
//                     className="bi bi-emoji-heart-eyes-fill mx-auto"

//                     style={{ fontSize: "1.2rem", color: "black" }}
//                   ></span>
//                   <div className="bounce2">
//                     <span
//                       className="position-absolute top-0 mt-1 translate-middle badge rounded-pill bg-danger"
//                       style={{ fontSize: "x-small" }}
//                       id="whistlist-count"
//                     >
//                       {wishlist?.length}

//                     </span>
//                   </div>

//                   <p className="m-0 text-dark fw-semibold" style={{ fontSize: "0.9rem" }}>
//                     Wistlist
//                   </p>
//                 </Link>

//                 {/* Cart */}
//                 <Link
//                   to={"/dashboard/cart/checkout"}
//                   className=" d-flex flex-column justify-content-center position-relative text-decoration-none"
//                   role="button"
//                 >
//                   <span
//                     className="bi bi-cart4 mx-auto "
//                     style={{ fontSize: "1.3rem", color: "black", }}
//                   ></span>

//                   <div className="bounce2">
//                     <span
//                       className="position-absolute top-0 mt-1 translate-middle
//                   badge rounded-pill bg-success "
//                       style={{ fontSize: "x-small" }}
//                       id="cart-count"
//                     >
//                       {cartItems ? cartItems.length : 0}
//                     </span>
//                   </div>
//                   {/* </div> */}
//                   <div className="px-2 text-dark fw-semibold" style={{ fontSize: "0.9rem" }}>
//                     Cart
//                   </div>
//                 </Link>

//               </div>

//               <div className="sidebar_nav">
//                 {width <= 625 && userSelectedBrand && <Sidebar />}

//               </div>
//             </div>
//           </div>
//         </div>
//         {/* </div> */}
//       </nav>
//     </header >
//   );
// }

// GEMINI

// import { useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { Sidebar } from "../components/Sidebar";
// import { useWindowDimensions } from "../hooks/useWindowDimensions";
// import { avatarAPI } from "../util/api";
// import logo2 from '../assets/logo2.png'


// export default function Header() {
//   const { cartItems = [] } = useSelector(state => state.cart);
//   const { wishlist = [] } = useSelector((state) => state.user);
//   const { userSelectedBrand } = useParams();
//   const { width } = useWindowDimensions();
//   const navigate = useNavigate();

//   // const handleSearch = (e) => {
//   //   if (e) e.preventDefault();

//   //   const foundBrand = BRANDS.find(
//   //     (b) => b.toLowerCase() === searchInput.toLowerCase().trim()
//   //   );

//   //   if (foundBrand) {
//   //     setSearchInput("");
//   //     navigate(`/productlist/${foundBrand}`);
//   //   } else {
//   //     toast.error("Brand not found. Please try Apple, Samsung, etc.");
//   //   }
//   // };

//   const isLoggedIn = !!localStorage.getItem("token");

//   return (
//     <header>
//       <nav className="navbar navbar-expand-lg bg-white fixed-top border-bottom py-2 shadow-sm">
//         <div className="container-lg">
//           {/* Logo */}
//           <Link to="/" className="navbar-brand d-flex align-items-center">
//             <img
//               src={logo2}
//               alt="MyShoppingSite Logo"
//               style={{ height: "40px", width: "auto" }}
//               className="img-fluid"
//             />
//           </Link>

//           {/* Mobile Toggler */}
//           <button
//             className="navbar-toggler border-0 shadow-none"
//             type="button"
//             data-bs-toggle="offcanvas"
//             data-bs-target="#offcanvasNavbar"
//             aria-controls="offcanvasNavbar"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           {/* Nav Items & Offcanvas */}
//           <div
//             className="offcanvas offcanvas-start"
//             tabIndex="-1"
//             id="offcanvasNavbar"
//             aria-labelledby="offcanvasNavbarLabel"
//           >
//             <div className="offcanvas-header border-bottom">
//               <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
//               <button
//                 type="button"
//                 className="btn-close shadow-none"
//                 data-bs-dismiss="offcanvas"
//                 aria-label="Close"
//               ></button>
//             </div>

//             <div className="offcanvas-body">
//               {/* Mobile Search - Only visible in Offcanvas */}
//               {/* <div className="d-lg-none mb-4">
//                 <div className="input-group">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Search Brand"
//                     value={searchInput}
//                     onChange={(e) => setSearchInput(e.target.value)}
//                   />
//                   <button className="btn btn-primary" onClick={handleSearch}>Go</button>
//                 </div>
//               </div> */}

//               <div className="d-flex flex-column flex-lg-row gap-4 align-items-lg-center ms-auto">
//                 {/* User Profile / Login */}
//                 {isLoggedIn ? (
//                   <div
//                     role="button"
//                     onClick={() => navigate("/dashboard/my-profile")}
//                     className="overflow-hidden border border-2 border-primary"
//                     style={{ height: "40px", width: "40px", borderRadius: "50%" }}
//                   >
//                     <img src={avatarAPI} className="w-100 h-100 object-fit-cover" alt="Profile" />
//                   </div>
//                 ) : (
//                   <Link to="/login" className="btn btn-outline-primary px-4 rounded-pill fw-bold">
//                     Login
//                   </Link>
//                 )}

//                 {/* Wishlist */}
//                 <Link
//                   to="/dashboard/wishlist"
//                   className="nav-link position-relative text-center d-flex flex-column align-items-center"
//                 >
//                   <i className="bi bi-heart text-dark fs-5"></i>
//                   {wishlist.length > 0 && (
//                     <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.65rem" }}>
//                       {wishlist.length}
//                     </span>
//                   )}
//                   <span className="small fw-semibold mt-1">Wishlist</span>
//                 </Link>

//                 {/* Cart */}
//                 <Link
//                   to="/dashboard/cart/checkout"
//                   className="nav-link position-relative text-center d-flex flex-column align-items-center"
//                 >
//                   <i className="bi bi-bag text-dark fs-5"></i>
//                   {cartItems.length > 0 && (
//                     <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success" style={{ fontSize: "0.65rem" }}>
//                       {cartItems.length}
//                     </span>
//                   )}
//                   <span className="small fw-semibold mt-1">Cart</span>
//                 </Link>
//               </div>

//               {/* Sidebar for Mobile Product View */}
//               {width <= 991 && userSelectedBrand && (
//                 <div className="mt-4 pt-4 border-top">
//                   <Sidebar />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }