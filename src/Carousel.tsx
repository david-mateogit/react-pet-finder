import React, { Component } from "react";
import { Photo } from "@frontendmasters/pet";
import ThemeContext from "./ThemeContext";

interface IProps {
  media: Photo[];
}

interface IState {
  active: number;
  photos: string[];
}

class Carousel extends Component<IProps, IState> {
  public constructor(props) {
    super(props);
    this.state = {
      photos: [],
      active: 0,
    };
  }

  public static getDerivedStateFromProps({ media }) {
    let photos = ["http://placeforgi.com/600/600"];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }

  public handleIndexClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }

    const { index } = e.target.dataset;
    if (index) {
      this.setState({ active: +index });
    }
  };

  public render() {
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
