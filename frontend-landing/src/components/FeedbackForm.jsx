import React, { useState } from "react";
import axios from "axios";

function FeedbackForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5,
  });

  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/feedback", form);
      setAlert({ type: "success", message: "✅ Feedback submitted successfully!" });
      setForm({ name: "", email: "", message: "", rating: 5 }); // reset form
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setAlert({
        type: "danger",
        message: error.response?.data?.error || "❌ Failed to submit feedback",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {alert && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Name *</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email *</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Message *</label>
        <textarea
          className="form-control"
          name="message"
          rows="4"
          value={form.message}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Rating</label>
        <select
          className="form-select"
          name="rating"
          value={form.rating}
          onChange={handleChange}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} ⭐
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Submit Feedback
      </button>
    </form>
  );
}

export default FeedbackForm;
