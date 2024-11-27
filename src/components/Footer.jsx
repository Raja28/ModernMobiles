export default function Footer() {
  return (
    <div className="bg-dark mt-3">
      {/*  */}
      <div className="container text-light d-flex justify-content-between py-5">
        {/* left-part */}
        <div className="d-flex flex-wrap gap-5">
          <div className="d-flex flex-column gap-3">
            <span>Help Center</span>
            <span>Contact us</span>
            <span>Device recycling</span>
          </div>
          {/*  */}
          <div className="d-flex flex-column gap-3">
            <span>Privacy</span>
            <span>Sales Terms</span>
            <span>Terms of Service</span>
          </div>
        </div>

        <div className="">
          {/* heading */}
          <div className="" style={{ fontSize: "1rem" }}>
            Follow Us On:
          </div>

          <div className="d-flex gap-4 flex-wrap">
            <div>
              <i className="bi bi-twitter-x" style={{ fontSize: "1.5rem" }}></i>
            </div>
            <div>
              <i className="bi bi-instagram" style={{ fontSize: "1.5rem" }}></i>
            </div>
            <div>
              <i className="bi bi-whatsapp" style={{ fontSize: "1.5rem" }}></i>
            </div>
            <div>
              <i className="bi bi-telegram" style={{ fontSize: "1.5rem" }}></i>
            </div>
          </div>
        </div>
      </div>

      <div className="text-light text-center  border-top border-light py-2">
        Copyright 2024 © Modern Mobiles. All Rights Reserved.
      </div>
    </div>
  );
}
