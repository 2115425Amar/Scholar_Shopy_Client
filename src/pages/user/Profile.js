import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user || {};
    setName(name || "");
    setEmail(email || "");
    setPhone(phone || "");
    setAddress(address || "");
  }, [auth?.user]);

  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, phone, address }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
          //parse isliye kiye hain kyoki isme do object hai
        //auth and user
        let ls = JSON.parse(localStorage.getItem("auth"));
       
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <UserMenu />
          </div>

          {/* Editable Profile Card */}
          <div className="col-lg-8">
            <form onSubmit={handleSubmit}>
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h4 className="mb-4">Edit Your Profile</h4>

                  {/* Name */}
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <label className="mb-0 fw-bold">Full Name</label>
                    </div>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <label className="mb-0 fw-bold">Email</label>
                    </div>
                    <div className="col-sm-9">
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        disabled
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <label className="mb-0 fw-bold">Password</label>
                    </div>
                    <div className="col-sm-9">
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <label className="mb-0 fw-bold">Phone</label>
                    </div>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="row mb-4">
                    <div className="col-sm-3">
                      <label className="mb-0 fw-bold">Address</label>
                    </div>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter address"
                      />
                    </div>
                  </div>

                  <div className="text-end">
                    <button type="submit" className="btn btn-primary">
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
