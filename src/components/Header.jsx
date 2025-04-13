import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import { avatarAPI, brandLogo } from "../util/api";
import { useState } from "react";
import logo2 from '../assets/logo2.png'
import toast from "react-hot-toast";

const brands = ["Apple", "Pixel", "Samsung", "Nothing", "OnePlus", "Motorola"]

export default function Header() {

  const { cartItems } = useSelector(state => state.cart)
  const { wishlist } = useSelector((state) => state.user);

  const { userSelectedBrand } = useParams();
  const [searchInput, setSearchInput] = useState("")


  const { width, height } = useWindowDimensions();
  const navigate = useNavigate()

  function searchHandler(e) {

    if (!brands.includes(searchInput)) {

      let brand = brands.filter(brand => brand.toLocaleLowerCase() === searchInput.toLocaleLowerCase())

      if (!brands.includes(brand[0])) {
        setSearchInput("")
        toast.error("Search Valid Brand")
        return

      } else {
        const userSelectedBrand = brand[0]
        setSearchInput("")
        navigate(`/productlist/${userSelectedBrand}`)
      }
    }
  }

  return (
    <header className="border" >
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top border-bottom " style={{ height: "60px" }}>
        <div className="container-lg">

          <Link
            to={"/"}
            className="navbar-brand text-secondary p-0 fw-semibold"
          >
            {/* MyShoppingSite brand logo*/}
            <img
              // src={brandLogo}
              src={logo2}
              width={"130rem"}
              style={{ scale: "1.2" }}
              className="img-fluid"
            />
          </Link>

          <div className="input-group input-group search-box" style={{ maxWidth: "30%" }}>
            <span className="input-group-text" id="inputGroup-sizing-sm">
              <span className="bi bi-search"></span>
            </span>
            <input type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              name="searchInput"
              value={searchInput}
              placeholder="Search Brand"
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => (
                e.key === "Enter" ? searchHandler(e) : null
              )}
            />
          </div>


          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <Link
                to={"/"}
                className="navbar-brand text-secondary p-0 fw-semibold"
              >
                {/* MyShoppingSite */}
                <img
                  src={logo2}
                  width={"110rem"}
                  alt="brand-Logo"
                />
              </Link>
              <button
                type="button"
                className="btn-close btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body  d-lg-flex justify-content-lg-end ">
              <div className="d-flex gap-5 align-items-center ">
                {localStorage.getItem("token") ?
                  (<div role="button"
                    onClick={() => navigate("/dashboard/my-profile")}
                    className=" rounded" style={{ maxHeight: "2.5rem", maxWidth: "2.5rem" }}>
                    <img src={avatarAPI} className=" img-fluid w-100 h-100" alt="user-avatar" />
                  </div>
                  ) :
                  (<Link
                    to={"/login"}
                    className="d-flex gap-2 align-items-center login-btn  text-decoration-none"
                    style={{ maxHeight: "3rem" }}
                  >
                    <i className="bi bi-person-circle "></i>
                    Login
                  </Link>)
                }

                {/* WistList */}
                <Link
                  to={"/dashboard/wishlist"}
                  className=" d-flex flex-column justify-content-center p- position-relative text-decoration-none"
                  role="button">
                  <span
                    className="bi bi-emoji-heart-eyes-fill mx-auto"

                    style={{ fontSize: "1.2rem", color: "black" }}
                  ></span>
                  <div className="bounce2">
                    <span
                      className="position-absolute top-0 mt-1 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "x-small" }}
                      id="whistlist-count"
                    >
                      {wishlist?.length}

                    </span>
                  </div>

                  <p className="m-0 text-dark fw-semibold" style={{ fontSize: "0.9rem" }}>
                    Wistlist
                  </p>
                </Link>

                {/* Cart */}
                <Link
                  to={"/dashboard/cart/checkout"}
                  className=" d-flex flex-column justify-content-center position-relative text-decoration-none"
                  role="button"
                >
                  <span
                    className="bi bi-cart4 mx-auto "
                    style={{ fontSize: "1.3rem", color: "black", }}
                  ></span>

                  <div className="bounce2">
                    <span
                      className="position-absolute top-0 mt-1 translate-middle 
                  badge rounded-pill bg-success "
                      style={{ fontSize: "x-small" }}
                      id="cart-count"
                    >
                      {cartItems ? cartItems.length : 0}
                    </span>
                  </div>
                  {/* </div> */}
                  <div className="px-2 text-dark fw-semibold" style={{ fontSize: "0.9rem" }}>
                    Cart
                  </div>
                </Link>

              </div>

              <div className="sidebar_nav">
                {width <= 625 && userSelectedBrand && <Sidebar />}

              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </nav>
    </header >
  );
}
