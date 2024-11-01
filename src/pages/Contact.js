import React from 'react';
import Layout from '../components/Layout/Layout';
import Lottie from "lottie-react";
import Animation from "../assets/JSON/cont.json";

const Contact = () => {
  return (
    <Layout>
      <section className="py-4 bg-light">
        <div className="container">
        {/* <h1 className="display-5 fw-bold">Get in Touch</h1> */}
          {/* <div className="text-center mb-5">
            <h1 className="display-5 fw-bold">Get in Touch</h1>
            <p className="text-secondary fs-5">
              I’d love to hear from you! Whether you have a question, want to connect, or need admin access, feel free to reach out.
            </p>
          </div> */}

          <div className="row align-items-center gy-5">
            {/* Lottie Animation */}
            <div className="col-lg-6">
              <Lottie animationData={Animation} className="img-fluid" />
            </div>

            {/* Contact Info & Forms */}
            <div className="col-lg-6">
              <div className="row gy-4">

                {/* Admin Access Form */}
                <div className="mt-5">
                  {/* <h4 className="fw-bold">Request Admin Access</h4> */}
                  <p className="text-secondary">If you need admin privileges, please fill out the form below with the necessary details.</p>
                  <form action="/request-admin-access" method="POST">
                    <div className="mb-4">
                      {/* <label htmlFor="adminName" className="form-label">Name</label> */}
                      <input type="text" id="adminName" className="form-control" placeholder="Your Name" required />
                    </div>
                    <div className="mb-4">
                      {/* <label htmlFor="adminEmail" className="form-label">Email</label> */}
                      <input type="email" id="adminEmail" className="form-control" placeholder="Your Email" required />
                    </div>
                    <div className="mb-4">
                      {/* <label htmlFor="role" className="form-label">Role</label> */}
                      <input type="text" id="role" className="form-control" placeholder="Your Role or Affiliation" required />
                    </div>
                    <div className="mb-4">
                      {/* <label htmlFor="reason" className="form-label">Reason for Access</label> */}
                      <textarea id="reason" className="form-control" rows="4" placeholder="Describe why you need admin access" required></textarea>
                    </div>
                    <button type="submit" className="btn btn-success btn-md">Request Admin Access</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
