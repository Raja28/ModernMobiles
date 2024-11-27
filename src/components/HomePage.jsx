import { Link } from "react-router-dom";
import { category } from "../datacollection";
import { Slider } from "../components/Slider";
import ServiceHighlight from "./ServiceHighlight";
import Footer from "./Footer";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../features/productSlice";
import { useEffect } from "react";
import { resetAuth } from "../features/authSlice";
import useOnlineStatus from "../hooks/useConnectionStatus";
// import { No_Internet_and_Wifi } from "../util/api";
import No_Internet_and_Wifi from "../assets/Logo/No_Internet_and_Wifi.png"


export default function HomePage() {
  const { error, status } = useSelector(state => state.products)
  let userConnection = useOnlineStatus()

  // console.log(error);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setStatus("idle"))
    if (status == "error") {
      dispatch(resetAuth())
    }
  }, [status == "error"])

  return (
    <main className="">
      <Header />
      {
        userConnection === false ? (
          <div className="vh-100">
            <div className="d-flex flex-column align-items-center justify-content-center h-100">
              <div className=" text-center">
                <img src={No_Internet_and_Wifi} alt="No_Internet_and_Wifi" />
                <h5>Connect to the Internet</h5>
                <p className="text-secondary">You're offline. Check your connection.</p>
              </div>
              {/* <div className="mt-3">
                {
                  userConnection ? (
                    <p className="btn btn-outline-primary btn-lg">Home</p>
                  ):(<p className="btn btn-outline-danger btn-lg">Refresh</p>)
                }
              </div> */}
            </div>
          </div>
        )
          : (
            <>
              <section className="container " style={{ marginTop: "5.3rem" }}>
                {/* <div className="row">
          { category.map((category) => (
            <Link
              key={category.id}
              to={category.title}
              className=" text-decoration-none my-1 m-2 p-0 img-hover-zoom"
            >
              <div className="col card border border-2">
                <img
                  src={category.thumbnail}
                  className="img-fluid rounded img-responsive"
                  style={{ maxHeight: "6rem", backgroundSize: "cover" }}
                />
              </div>
              <div className="text-center fw-semibold text-secondary" id="demo">
                {category.title}
              </div>
            </Link>
          ))}
        </div> */}

                <div
                  className="d-flex justify-content-lg-between justify-content-evenly 
                           flex-wrap align-items-center gap-2 "
                >
                  {category.map((data) => (
                    <div
                      key={data.id}
                      className=" rounded d-flex flex-column img-hover-zoom"
                    >
                      <Link to={`productlist/${data.title}`} className="text-decoration-none">
                        <div className="" style={{ height: "5rem", width: "5.5rem" }}>
                          <img
                            src={data.thumbnail}
                            className="img img-fluid object-fit-cover border rounded"
                            style={{ height: "100%", width: "100%" }}
                            alt={data.title}
                          />
                        </div>
                        <div className="my-0 text-center fw-semibold text-secondary ">
                          <span className="">{data.title}</span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <Slider />
              </section>

              <section>
                <div className="container mt-2">
                  <img
                    src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1728455421/Croma%20Assets/CMS/LP%20Page%20Banners/2024/More%20For%20Your%20Money/October/Spike%20days%2011%20and%2012/HP_Singlesplit_ICICI_4Sep2024_eznjcf.png?tr=w-1024"
                    width={"100%"}
                    alt="offerForYou"
                    className=" border border-1 rounded"
                  />
                </div>
              </section>

              <section>
                {/* src="https://images.samsung.com/is/image/samsung/assets/in/p6_gro2/olympic-update/im0106_home-explore-banner_pc_684x684_Q6B6.jpg?$684_684_PNG$" */}
                {/* src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-50-compare-202309?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=1710800194983" */}
                {/* src="https://i.shgcdn.com/3c5d9cda-0043-4e6b-b877-579f8e5e538c/-/format/auto/-/preview/3000x3000/-/quality/lighter/" */}

                <div className="container d-flex flex-wrap flex-md-nowrap gap-2 my-4">
                  <div className="w-100  border-4 rounded">
                    <img
                      // src="https://images.samsung.com/is/image/samsung/assets/in/p6_gro2/olympic-update/im0106_home-explore-banner_pc_684x684_Q6B6.jpg?$784_600_PNG$"
                      src="https://img.global.news.samsung.com/in/wp-content/uploads/2024/07/Samsung-Neeraj-Chopra.jpg"
                      width="100%"
                      height="100%"
                      className="rounded"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="w-100">
                    <img
                      src="https://i.shgcdn.com/3c5d9cda-0043-4e6b-b877-579f8e5e538c/-/format/auto/-/preview/600x684/-/quality/lighter/"
                      width="100%"
                      height="100%"
                      className="rounded"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              </section>

              <section>
                <ServiceHighlight />
              </section>

              <Footer />
            </>
          )
      }
    </main>
  );
}
