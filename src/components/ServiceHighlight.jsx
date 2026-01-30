
export default function ServiceHighlight() {
  const services = [
    {
      icon: "bi-truck",
      title: "Free Shipping",
      desc: "On all products",
      color: "#e7f3ff"
    },
    {
      icon: "bi-shield-check",
      title: "Safe Delivery",
      desc: "Safe & contactless",
      color: "#f0fff4"
    },
    {
      icon: "bi-credit-card",
      title: "Easy EMI",
      desc: "Low interest plans",
      color: "#fff9db"
    },
    {
      icon: "bi-headset",
      title: "24/7 Support",
      desc: "Call us anytime",
      color: "#fff0f0"
    }
  ];

  return (
    <section className="bg-white py-5 my-4 border-top border-bottom">
      <div className="container">
        <div className="row g-4 justify-content-center">
          {services.map((service, index) => (
            <div key={index} className="col-6 col-lg-3">
              <div className="d-flex flex-column align-items-center text-center p-3 h-100 service-card">
                <div 
                  className="icon-box mb-3 d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: service.color }}
                >
                  <i className={`bi ${service.icon} fs-3`}></i>
                </div>
                <h6 className="fw-bold mb-1">{service.title}</h6>
                <p className="text-muted small mb-0 px-xl-4">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



// export default function ServiceHighlight() {
//   return (
//     <div className="container d-flex justify-content-between mt-2 flex-wrap ">
//       {/*  */}
//       <div
//         className="d-flex flex-column border border-danger align-items-center free-shipping-container"
//         style={{ width: "25%" }}
//       >
//         <i className="bi bi-truck fs-3 icon-font-size"></i>
//         <span className="fw-semibold">Free Shipping</span>
//         <span className="text-secondary text-center px-1">
//           Available on all products
//         </span>
//       </div>
//       {/* // */}
//       <div
//         className="d-flex flex-column border-top border-end border-bottom border-danger align-items-center free-shipping-container"
//         style={{ width: "25%" }}
//       >
//         <i className="bi bi-gift-fill fs-3 icon-font-size"></i>
//         <span className="fw-semibold">Safe Delivery</span>
//         <span className="text-secondary text-center  px-1">
//           Safe delivery at your doorstep
//         </span>
//       </div>
//       {/* // */}
//       <div
//         className="d-flex flex-column border-top border-end border-bottom border-danger align-items-center free-shipping-container"
//         style={{ width: "25%" }}
//       >
//         <i className="bi bi-credit-card-2-back fs-3 icon-font-size"></i>
//         <span className="fw-semibold">Esay Installment</span>
//         <span className="text-secondary text-center px-1">
//           Pay for your purchase in easy EMIs
//         </span>
//       </div>
//       {/* // */}
//       <div
//         className="d-flex flex-column border-top border-end border-bottom border-danger align-items-center free-shipping-container"
//         style={{ width: "25%" }}
//       >
//         <i className="bi bi-headset fs-3 icon-font-size"></i>
//         <span className="fw-semibold">Support</span>
//         <span className="text-secondary text-center px-1">
//           Got a question ? just Call Us
//         </span>
//       </div>
//     </div>
//   );
// }
