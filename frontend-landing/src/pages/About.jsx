import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function About() {
  const cardData = [
    {
      title: "Travel With Us →",
      img: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600",
      text: "No matter who you are or where you are going, our hotel services help every guest not only find the perfect stay but also enjoy the best value every single time.",
    },
    {
      title: "Partner With Us →",
      img: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600",
      text: "We connect partners big and small with opportunities, providing access to tools, data, and technology that empowers growth, maximizes potential, and builds lasting success in hospitality.",
    },
  ];

  return (
    <div>
      {/* ✅ Top Header */}
      <div
        style={{
          background: `url("https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1600") center/cover`,
          height: "300px",
        }}
        className="d-flex align-items-center justify-content-center text-white"
      >
        <h1 className="fw-bold bg-dark bg-opacity-50 px-4 py-2 rounded">
          About Us
        </h1>
      </div>

      {/* ✅ Content Section */}
      <Container className="my-5">
        <Row className="text-center">
          {cardData.map((card, index) => (
            <Col md={6} key={index} className="mb-5">
              <div
                className="rounded-circle mx-auto mb-3 overflow-hidden"
                style={{ width: 220, height: 220 }}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h4 className="text-primary fw-bold">{card.title}</h4>
              <p className="text-muted mt-3">{card.text}</p>
            </Col>
          ))}
        </Row>

        {/* ✅ New Section Heading */}
        <h2 className="fw-bold text-center text-primary mb-4">Who We Are</h2>

        {/* ✅ Long Paragraph with Image */}
        <Row className="align-items-center my-5">
          <Col md={7}>
            <p style={{ textAlign: "justify", lineHeight: "1.8" }}>
              Welcome to our Hotel Management System – a platform designed to
              bring you comfort, luxury, and convenience all in one place. We
              believe in creating an experience where every guest feels valued
              and every stay becomes memorable. Our mission is to deliver more
              than just a room – we aim to provide a lifestyle of hospitality,
              trust, and comfort. <br />
              <br />
              From the moment you step into our world, you are greeted with
              warmth, elegance, and a commitment to excellence. Whether you are
              traveling for business, leisure, or family vacations, our services
              are tailored to meet your unique needs. <br />
              <br />
              With a combination of modern technology and traditional values, we
              ensure smooth reservations, secure payments, and exceptional
              customer support.
            </p>
          </Col>

          <Col md={5} className="text-center">
            <img
              src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Hotel"
              className="img-fluid rounded shadow"
            />
          </Col>
        </Row>

        {/* ✅ Our Mission Section */}
        <Row className="align-items-center my-5">
          <Col md={5} className="text-center mb-4 mb-md-0">
            <img
              src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Mission"
              className="img-fluid rounded shadow"
            />
          </Col>

          <Col md={7}>
            <h2 className="fw-bold text-primary mb-3">Our Mission</h2>
            <p style={{ textAlign: "justify", lineHeight: "1.8" }}>
              Our mission is to redefine hospitality by combining comfort,
              affordability, and premium services under one roof. We are
              committed to ensuring that every guest feels at home while enjoying
              world-class amenities. <br />
              <br />
              We strive to empower travelers with seamless booking experiences,
              transparent pricing, and personalized care. By blending innovative
              technology with human touch, we create an ecosystem that
              prioritizes guest satisfaction and partner growth alike. <br />
              <br />
              At the heart of our mission lies a promise – to make every stay not
              just comfortable but truly unforgettable.
            </p>
          </Col>
        </Row>
      </Container>

      {/* ✅ Our Vision Section with Background */}
      <div
        style={{
          background: `url("https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1600") center/cover`,
          height: "350px",
        }}
        className="d-flex flex-column align-items-center justify-content-center text-white text-center"
      >
        <h2 className="fw-bold bg-dark bg-opacity-50 px-4 py-2 rounded">
          Our Vision
        </h2>
        <p
          className="mt-3 px-4"
          style={{
            maxWidth: "800px",
            lineHeight: "1.8",
            background: "rgba(0,0,0,0.5)",
            borderRadius: "10px",
            padding: "15px",
          }}
        >
          Our vision is to be the most trusted and innovative hospitality
          platform, setting new standards of excellence in the hotel industry. We
          aim to create unforgettable experiences for every traveler by blending
          luxury, technology, and personalized services. Through continuous
          improvement and dedication, we see ourselves as a global leader in
          delivering comfort, elegance, and reliability for all.
        </p>
      </div>
    </div>
  );
}
