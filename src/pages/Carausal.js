import React from "react";
import banner from './banner.png'

const Carousel = () => {
  return (
    <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" >
      <div className="carousel-inner">
        <div className="carousel-item active">
          
          <img className="d-block w-100 " src={banner} alt="First slide" style={{ height: '290px', objectFit: 'cover' }}   />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={banner} alt="Second slide"  style={{ height: '290px', objectFit: 'cover' }} />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={banner} alt="Third slide"  style={{ height: '290px', objectFit: 'cover' }} />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;

