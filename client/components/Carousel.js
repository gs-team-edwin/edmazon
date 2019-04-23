import React, {Component} from 'react'

const images = [
  '/images/amazon-black-icon.jpg',
  '/images/EdwinChange.jpg',
  '/images/5StarCodingClasses.jpg'
]

class Carousel extends Component {
  constructor() {
    super()
    this.state = {
      image: '',
      curIdx: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    let nextIdx = this.state.curIdx + 1
    if (images[nextIdx] == null) {
      this.setState(state => ({
        image: images[0],
        curIdx: 0
      }))
    } else {
      this.setState(state => ({
        image: images[nextIdx],
        curIdx: nextIdx
      }))
    }
  }
  render() {
    return (
      <div>
        <div className="pagination-container">
          <button
            onClick={this.handleClick}
            type="button"
            className="pagination-button"
          >
            ◀
          </button>
          {!this.state.image ? (
            <img className="carousel-img" src="/images/amazon-black-icon.jpg" />
          ) : (
            <img className="carousel-img" src={this.state.image} />
          )}
          <button
            onClick={this.handleClick}
            type="button"
            className="pagination-button"
          >
            ▶
          </button>
        </div>
      </div>
    )
  }
}

export default Carousel
