import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer
      className="text-white pt-5 pb-4"
      style={{
        backgroundColor: "#141E3C", // Darker royal blue
        borderTop: "4px solid #FFD700", // Gold accent line
      }}
    >
      <div className="container text-center">
        {/* Brand with Logo + Name Side by Side */}
        <div className="d-flex align-items-center justify-content-center mb-3">
          <img
            src="/Hotel Building Property by spayro.png" // 👈 yaha apna naya logo save karo (public folder me)
            alt="Hotel Logo"
            style={{ width: "70px", height: "70px", marginRight: "12px" }}
          />
          <h2
            style={{
              fontWeight: "bold",
              letterSpacing: "1px",
              margin: 0,
              color: "#FFD700", // Gold text
            }}
          >
            LuxuryStay Hospitality
          </h2>
        </div>

        {/* Quick Links */}
        <div className="mb-3">
          <a href="/" className="text-white mx-3 text-decoration-none footer-link">
            Home
          </a>
          <a href="" className="text-white mx-3 text-decoration-none footer-link">
            Reservation
          </a>
          <a href="" className="text-white mx-3 text-decoration-none footer-link">
            Billing
          </a>
          <a href="" className="text-white mx-3 text-decoration-none footer-link">
            Contact
          </a>
        </div>

        {/* Social Icons */}
        <div className="mb-4">
          <a href="#" className="social-icon me-3">
            <FaFacebookF />
          </a>
          <a href="#" className="social-icon me-3">
            <FaTwitter />
          </a>
          <a href="#" className="social-icon me-3">
            <FaInstagram />
          </a>
          <a href="#" className="social-icon">
            <FaLinkedinIn />
          </a>
        </div>

        {/* Divider */}
        <hr style={{ borderColor: "rgba(255,255,255,0.2)" }} />

        {/* Copyright */}
        <p
          className="mb-0"
          style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}
        >
          &copy; {new Date().getFullYear()} LuxuryStay Hospitality. All rights reserved.
        </p>
      </div>

      {/* Extra CSS for hover effects */}
      <style>
        {`
          .footer-link:hover {
            color: #FFD700;
            transition: 0.3s;
          }
          .social-icon {
            color: white;
            font-size: 1.4rem;
            transition: transform 0.3s, color 0.3s;
          }
          .social-icon:hover {
            color: #FFD700;
            transform: scale(1.2);
          }
        `}
      </style>
    </footer>
  );
}

export default Footer;
