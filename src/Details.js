/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import pet from "@frontendmasters/pet";
import { navigate } from "@reach/router";
import Modal from "./Modal";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Spinner from "./Spinner";
import ThemeContext from "./ThemeContext";
import ErrorComponent from "./ErrorComponent";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      animal: "",
      description: "",
      media: [],
      breed: "",
      url: "",
      loading: true,
      showModal: false,
      error: false,
    };
  }

  componentDidMount() {
    pet
      .animal(this.props.id)
      .then(({ animal }) => {
        this.setState({
          name: animal.name,
          animal: animal.type,
          url: animal.url,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false,
        });
      })
      .catch(e => this.setState({ error: true }));
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  adopt = () => navigate(this.state.url);

  render() {
    if (this.state.error) {
      return <ErrorComponent />;
    }
    if (this.state.loading) {
      return <Spinner />;
    }
    const {
      animal,
      url,
      breed,
      location,
      name,
      description,
      media,
      showModal,
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                style={{ backgroundColor: theme }}
                type="button"
                onClick={this.toggleModal}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal onModalClose={() => this.setState({ showModal: false })}>
              <div>
                <h1>
                  Would you like to adopt <br />
                  {name}
                </h1>
                <div className="buttons">
                  <button type="button" onClick={this.adopt}>
                    Yes
                  </button>
                  <button type="button" onClick={this.toggleModal}>
                    No, I'm a monster
                  </button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
