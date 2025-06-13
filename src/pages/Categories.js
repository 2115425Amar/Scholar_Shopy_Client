import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title="All Categories">
      <div className="container py-5">
        <h2 className="text-center mb-4 fw-bold">Browse Categories</h2>
        <div className="row g-4">
          {categories.map((c) => (
            <div className="col-12 col-sm-6 col-md-4" key={c._id}>
              <Link
                to={`/category/${c.slug}`}
                className="text-decoration-none"
              >
                <div className="card h-100 shadow-sm border-0 hover-shadow transition">
                  <div className="card-body d-flex align-items-center justify-content-center">
                    <h5 className="card-title text-center text-dark m-0">
                      {c.name}
                    </h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;