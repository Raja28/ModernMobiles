
import { Link } from 'react-router-dom'
import '../App.css'

const links ={
  linkedIn: "https://linkedin.com/in/raja28",
  gitHub: "https://github.com/Raja28",
  portfolio: "https://raja-ten.vercel.app/"
}

export default function Footer() {
  return (
    <div className=" mt-3 font-monospace text-light" style={{ backgroundImage: 'linear-gradient(60deg, #141E30 0%, #243B55 100%)' }}>

       <div className="container text-light d-flex justify-content-between py-5">
        {/* left-part */}
      <div className="d-flex flex-wrap gap-5">
        <div className="d-flex flex-column gap-3">
          <span>Help Center</span>
          <span>Contact us</span>
          <span>Device recycling</span>
        </div>

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

        <div className="d-flex justify-content-between flex-wrap">
          <a href={links.linkedIn} target='_blank'
          className='footer-icon text-decoration-none text-light'>
            <i className="bi bi-linkedin footer-icon" style={{ fontSize: "1rem",}}></i>
          </a>
          <a href={links.gitHub} target='_blank'
          className='footer-icon text-decoration-none text-light'>
            <i class="bi bi-github footer-icon" style={{ fontSize: "1rem" }}></i>
          </a>
          <a href={links.portfolio} target='_blank'
          className='footer-icon text-decoration-none text-light'>
            <i className='bi bi-globe ' style={{ fontSize: "1rem" }}></i>
          </a>
          {/* <div>
            <i className="bi bi-telegram" style={{ fontSize: "1rem" }}></i>
          </div> */}
        </div>
      </div>
      </div>

      

      <div className="text-light text-center  border-top border-light py-2">
        Copyright 2024 © Modern Mobiles. All Rights Reserved.
      </div>
    </div>
  );
}
