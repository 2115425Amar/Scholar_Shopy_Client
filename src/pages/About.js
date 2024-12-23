import React from 'react';
import Layout from '../components/Layout/Layout'; // Import your Layout component
import Lottie from 'lottie-react';
import ContactAnimation from '../assets/JSON/about.json';
import Money from '../assets/JSON/money.json';
import RRR from '../assets/JSON/rrr.json';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <Layout>
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row gy-4 align-items-center">
            <div className="col-12 col-lg-6">
              <Lottie animationData={ContactAnimation} aria-label="Contact animation" />
            </div>
            <div className="col-12 col-lg-6">
              <h1 className="mb-4 text-primary font-serif">What is Schola₹Shopy?</h1>
              <p className="lead fs-10 text-secondary mb-4">
                The platform features a user-friendly interface, allowing students to easily browse, list, and purchase second-hand items.
              </p>
              <p className="mb-5 text-muted" style={{ fontSize: '1.1rem' }}>
                I created a second-hand buy & sell online platform specifically for college students, helping them effectively utilize their resources while saving costs and time. This platform fosters trust and security among students, as it is exclusively available for college students, enabling buyers and sellers to connect and fulfill their needs.
              </p>
              <div className="row gy-4">
                <div className="col-6 col-md-6">
                  <div className="d-flex align-items-start">
                    <div className="me-4 text-primary">
                      <Lottie animationData={RRR} aria-label="Circular economy animation" />
                    </div>
                    <div>
                      <h3 className="h5 mt-4">Supporting a Circular Economy</h3>
                      {/* <p className="text-secondary mb-0">Reduces waste, benefiting both the environment and student budgets.</p> */}
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-6">
                  <div className="d-flex align-items-start">
                    <div className="me-4 text-primary">
                      <Lottie animationData={Money} aria-label="Money-saving animation" />
                    </div>
                    <div>
                      <h3 className="h5 mt-2">Saving Money for Students</h3>
                      {/* <p className="text-secondary mb-0">Students can save money by providing a cost-effective alternative to buying new items.</p> */}
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/home" aria-label="Go to home page">
                <button className="btn btn-success mt-4" type="button">Go To Home Page</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
