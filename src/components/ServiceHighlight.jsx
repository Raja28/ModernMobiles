export default function ServiceHighlight() {
  return (
    <div className="container d-flex justify-content-between mt-2 flex-wrap ">
      {/*  */}
      <div
        className="d-flex flex-column border border-danger align-items-center free-shipping-container"
        style={{ width: "25%" }}
      >
        <i className="bi bi-truck fs-3 icon-font-size"></i>
        <span className="fw-semibold">Free Shipping</span>
        <span className="text-secondary text-center px-1">
          Available on all products
        </span>
      </div>
      {/* // */}
      <div
        className="d-flex flex-column border-top border-end border-bottom border-danger align-items-center free-shipping-container"
        style={{ width: "25%" }}
      >
        <i className="bi bi-gift-fill fs-3 icon-font-size"></i>
        <span className="fw-semibold">Safe Delivery</span>
        <span className="text-secondary text-center  px-1">
          Safe delivery at your doorstep
        </span>
      </div>
      {/* // */}
      <div
        className="d-flex flex-column border-top border-end border-bottom border-danger align-items-center free-shipping-container"
        style={{ width: "25%" }}
      >
        <i className="bi bi-credit-card-2-back fs-3 icon-font-size"></i>
        <span className="fw-semibold">Esay Installment</span>
        <span className="text-secondary text-center px-1">
          Pay for your purchase in easy EMIs
        </span>
      </div>
      {/* // */}
      <div
        className="d-flex flex-column border-top border-end border-bottom border-danger align-items-center free-shipping-container"
        style={{ width: "25%" }}
      >
        <i className="bi bi-headset fs-3 icon-font-size"></i>
        <span className="fw-semibold">Support</span>
        <span className="text-secondary text-center px-1">
          Got a question ? just Call Us
        </span>
      </div>
    </div>
  );
}
