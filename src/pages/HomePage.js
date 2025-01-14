import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {  Checkbox, Radio } from "antd";
import Carousel from "./Carausal";
import { Prices } from "../components/Prices";
// import { CartProvider, useCart } from "../context/cart";
import {  useCart } from "../context/cart";
import toast from "react-hot-toast";
import Spinner2 from "../components/spinner2";
// import "../styles/HomePage.css"

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  const [loading2, setLoading2] =useState(false);
  const citrus = categories.slice(1, 6);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading2(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setProducts(data.products);
      setLoading2(false);
    } catch (error) {
       setLoading2(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
    // eslint-disable-next-line
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    // eslint-disable-next-line
  }, [checked.length, radio.length]);


  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    // eslint-disable-next-line
  }, [checked, radio]);


  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, {checked,radio,});
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"ALl Products - Best offers "}>

      <div className="container-fluid row mt-3">

        <div className="col-md-2">
          <h5 className="text-center">Filter By Category</h5>
          <div className="d-flex flex-column">
            {
            citrus?.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}> {c.name} </Checkbox>
            ))
            }
          </div>

          {/* price filter */}
          <h5 className="text-center mt-2">Filter By Price</h5>
          <div className="d-flex flex-column">
          {/* Radio fron ant design */}
            <Radio.Group onChange={(e) => setRadio(e.target.value)}> 
              {
              Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))
              }
            </Radio.Group>

          </div>
          {/* reset button */}
          <div className="d-flex flex-column col-md-8 col-sm-4 mt-2">
            <button className="btn btn-secondary btn-sm" onClick={() => window.location.reload()}> RESET FILTERS </button>
          </div>
        </div>

        {/* -----------------------------------------------------Products------------------------------------------------------------- */}
        <div className="col-md-10">
          <div>
            <Carousel/>
          </div>
         
          {/* <h1 className="text-center">All Products</h1> */}
{/* ---------------------------------------------------------------------------------------- */}
         <div>
          {
            loading2 ? 
            <Spinner2/> : 
            products.length > 0 ?
            (
              <div className="d-flex flex-wrap">
              {
              products?.map((p) => (
                <div className="card m-2" key={p._id} style={{ width: "18rem" }}>
                  <div>
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top "
                    alt={p.name}
                    width="200" height="250"
                  />
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                    <p className="card-text">  ₹ {p.price}</p>
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>

                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem("cart", JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>

                  </div>
                </div>
              ))
              }
            </div>
            ) : <div className="flex justify-center items-center">
            <p>No Data Found...</p>
            </div>
          }
         </div>
{/* {/* -------------------------------------------------------- */}


          <div className="m-2 p-3">
            {products && products.length < total && (
              <button className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default HomePage;