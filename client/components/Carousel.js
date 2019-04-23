import React from 'react'

const Carousel = props => {
  return (
    <div>
      <div className="pagination-container">
        <button type="button" className="pagination-button">
          ◀
        </button>
        <img className="carousel-img" src="/images/EdwinBanner.jpg" />
        <img src="/images/amazon-black-icon.jpg" />
        <img className="carousel-img" src="/images/5StarCodingClasses.jpg" />
        <button type="button" className="pagination-button">
          ▶
        </button>
      </div>
    </div>
  )
}

export default Carousel
