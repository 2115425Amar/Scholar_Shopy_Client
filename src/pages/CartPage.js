import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * (item.quantity || 1);
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Update item quantity
  const updateQuantity = (pid, delta) => {
    const updatedCart = cart.map((item) => {
      if (item._id === pid) {
        const newQty = (item.quantity || 1) + delta;
        return newQty <= 0 ? null : { ...item, quantity: newQty };
      }
      return item;
    }).filter(Boolean); // remove items with 0 qty
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

    //handle payments
  // const handlePayment = async () => {
  //   try {
  //     setLoading(true);
  //     const { nonce } = await instance.requestPaymentMethod();
  //     const { data } = await axios.post("/api/v1/product/braintree/payment", {
  //       nonce,
  //       cart,
  //     });
  //     setLoading(false);
  //     localStorage.removeItem("cart");
  //     setCart([]);
  //     navigate("/dashboard/user/orders");
  //     toast.success("Payment Completed Successfully ");
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

  const handleStripeCheckout = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:8080/api/v1/product/payment", {
        cart,
      }, {
        headers: {
          Authorization: auth?.token,
        }
      });

      const stripe = await loadStripe("pk_test_51RaE2W4NTa7mzuyraDxT3w3sPcvrd2OepQQIkwELHJHanAIQu1gliogdUCsLz1qH65HZtJzZGWfKN1at1r1fyXUV00sdhXei6j"); // Stripe Publishable Key 
      await stripe.redirectToCheckout({ sessionId: data.id });
      setLoading(false);
    } catch (error) {
      console.error("Stripe checkout error:", error);
      toast.error("Payment failed");
      setLoading(false);
    }
  };


  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Namaste ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} item(s) in your cart ${
                    auth?.token ? "" : " - please login to checkout"
                  }`
                : "Your Cart Is Empty"}
            </h4>
          </div>
        </div>

        {/* Cart Items and Summary */}
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div key={p._id} className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100%"
                    height="150px"
                  />
                </div>
                <div className="col-md-8">
                  <p><strong>{p.name}</strong></p>
                  <p>{p.description.substring(0, 30)}...</p>
                  <p>Price: ₹{p.price}</p>

                  <p>
                    Quantity:{" "}
                    <button
                      className="btn btn-sm btn-secondary mx-1"
                      onClick={() => updateQuantity(p._id, -1)}
                    >
                      −
                    </button>
                    {p.quantity || 1}
                    <button
                      className="btn btn-sm btn-secondary mx-1"
                      onClick={() => updateQuantity(p._id, 1)}
                    >
                      +
                    </button>
                  </p>

                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()} </h4>

            {auth?.user?.address ? (
              <div className="mb-3">
                <h4>Current Address</h4>
                <h5>{auth?.user?.address}</h5>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Add Address to Proceed
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", { state: "/cart" })
                    }
                  >
                    Please Login to Checkout
                  </button>
                )}

              </div>
              
            )}
             <div className="mt-2">
              {!cart?.length ? (
                ""
              ) : (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={handleStripeCheckout}
                    disabled={loading || !auth?.user?.address}
                  >
                    {loading ? "Processing..." : "Proceed to Payment"}
                  </button>

                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;