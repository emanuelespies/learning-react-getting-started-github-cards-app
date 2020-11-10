import React from "react";
import "reset-css";
import "./styles.css";

const dataSource = [
  {
    avatar_url: "https://avatars1.githubusercontent.com/u/2243930?v=4",
    name: "Emanuele",
    company: "Genius Solutions"
  },
  {
    avatar_url: "https://avatars0.githubusercontent.com/u/23460879?v=4",
    name: "Luísa Verza",
    company: "@petalmd "
  }
];

const ErrorMsgs = (props) => {
  return (
    <div className="errorMessages">
      {props.errorMessages.map((errorMessage, index) => {
        if (errorMessage.length) {
          return (
            <div key={index}>
              The api call returned with error: {errorMessage}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

const CardList = (props) => (
  <ul className="profileCards">
    {props.profiles.map((profile) => {
      return !profile.message ? <Card key={profile.id} {...profile} /> : null;
    })}
  </ul>
);

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <li className="github-profile">
        <figure>
          <img src={profile.avatar_url} alt={profile.name} />
          <figcaption>
            <h2 className="name">{profile.name}</h2>
            <h3 className="company">{profile.company}</h3>
          </figcaption>
        </figure>
      </li>
    );
  }
}

const Copyright = () => (
  <footer>
    <h6>
      @emanuelespies -
      <small>
        content based on Pluralsight course{" "}
        <a href="https://app.pluralsight.com/course-player?clipId=846d24be-6429-47d9-9a66-88a55d3b2ff9">
          React: Getting Started
        </a>
      </small>
    </h6>
  </footer>
);

class Form extends React.Component {
  state = { username: "" };
  handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `https://api.github.com/users/${this.state.username}`
    );
    // then of then
    const jsonResp = await response.json();
    if (response.status === 200) {
      this.props.onSubmit(jsonResp, "");
      this.setState({ username: "" });
    } else {
      this.props.onSubmit(jsonResp, jsonResp.message);
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          value={this.state.username}
          onChange={(event) => this.setState({ username: event.target.value })}
          type="text"
          placeholder="GitHub username"
        />
        <button>Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
  // opt 1:
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     profiles: dataSource
  //   };
  // }

  state = {
    errorMessages: [],
    profiles: dataSource
  };

  addNewProfile = (responseData, error) => {
    this.setState((prevState) => ({
      profiles: [...prevState.profiles, responseData],
      errorMessages: [error]
    }));
  };

  render() {
    return (
      <>
        <h1 className="header">{this.props.title}</h1>
        <ErrorMsgs errorMessages={this.state.errorMessages} />
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
        <Copyright />
      </>
    );
  }
}

export default App;
