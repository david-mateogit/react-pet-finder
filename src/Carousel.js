import React, { Component } from "react";
import ThemeContext from "./ThemeContext";

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      active: 0,
    };
  }

  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placeforgi.com/600/600"];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }

  handleIndexClick = e => {
    const { index } = e.target.dataset;
    this.setState({ active: +index });
  };

  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            <div key={photo}>
              <img
                src={photo}
                className={index === active ? "active" : ""}
                alt="animal thumbnail"
              />
              <ThemeContext.Consumer>
                {([theme]) => (
                  <button
                    style={{ backgroundColor: theme }}
                    type="button"
                    data-index={index}
                    onClick={this.handleIndexClick}
                  >
                    *
                  </button>
                )}
              </ThemeContext.Consumer>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
