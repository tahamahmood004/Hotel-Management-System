import React from "react";
import FeedbackForm from "../components/FeedbackForm";
function Feedback() {
  return (
    <div className="container my-5" style={{ marginTop: "80px" }}>
      {/* 🔹 Heading with extra space from top */}
      <h2
        className="mb-5 fw-bold text-center"
        style={{ color: "#000080", marginTop: "65px" }}
      >
        Give Your Feedback
      </h2>

      <div className="row align-items-center">
        {/* 🔹 Left Side Image */}
        <div className="col-md-6 mb-4 mb-md-0 text-center">
          <img
            src="https://www.travelandleisure.com/thmb/Fjp3GTsy6RiDm0uUbi9MPd3I0UE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-the-dominick-NYCHOTELVIEWS0924-0ed67dc53ec84372b51c7d5055751453.jpg"
            alt="Feedback"
            className="img-fluid rounded shadow"
            style={{ maxHeight: "420px", width: "100%", objectFit: "cover" }}
          />
        </div>

        {/* 🔹 Right Side Form */}
        <div className="col-md-6">
          <div
            className="card p-4 shadow border-0"
            style={{ borderRadius: "12px", minHeight: "100%" }}
          >
            <FeedbackForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
