import React, { Component } from "react";
import pet, { AnimalResponse, Photo } from "@frontendmasters/pet";
import { navigate, RouteComponentProps } from "@reach/router";
import Modal from "./Modal";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Spinner from "./Spinner";
import ThemeContext from "./ThemeContext";
import ErrorComponent from "./ErrorComponent";


interface IState {
  name: string;
  animal: string;
  description: string;
  location: string;
  media: Photo[];
  breed: string;
  url: string;
  loading: boolean;
  showModal: boolean;
  error: boolean;

}

class Details extends Component<RouteComponentProps<{ id: string }>, IState> {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      animal: "",
      description: "",
      location: "",
      media: [],
      breed: "",
      url: "",
      loading: true,
      showModal: false,
      error: false,
    };
  }

  public componentDidMount() {
    const { id } = this.props;
    if (!id) {
      navigate("/");
      return;
    }
    pet
      .animal(+id)
      .then(({ animal }: AnimalResponse) => {
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
      .catch(() => this.setState({ error: true }));
  }

  toggleModal = () => this.setState((prevState) => ({ showModal: !prevState.showModal }));

  adopt = () => {
    const { url } = this.state;
    return navigate(url);
  }

  public render() {
    const {
      animal,
      breed,
      location,
      name,
      description,
      media,
      showModal,
      loading,
      error,
    } = this.state;

    if (error) {
      return <ErrorComponent />;
    }
    if (loading) {
      return <Spinner />;
    }

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
                Adopt
                {" "}
                {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal onModalClose={() => this.setState({ showModal: false })}>
              <div>
                <h1>
                  Would you like to adopt
                  {" "}
                  <br />
                  {name}
                </h1>
                <div className="buttons">
                  <button type="button" onClick={this.adopt}>
                    Yes
                  </button>
                  <button type="button" onClick={this.toggleModal}>
                    No, I&apos;m a monster
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

export default function DetailsWithErrorBoundary(props: RouteComponentProps<{ id: string}>) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
