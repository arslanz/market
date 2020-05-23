import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchUserPending,
  fetchUserSuccess,
  fetchUserError,
} from "../store/actions/userActions";

class Welcome extends Component {
  handleChange = (event) => {
    // alert("Hello " + event.target.value);
    this.setState({ user: event.target.value });
  };

  createUser = (username) => {
    let isResCreate = window.confirm(
      "Create new user '" + this.state.user + "' ?"
    );
    if (isResCreate === true) {
      fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ username: this.state.user.toLowerCase() }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("ERROR: " + res.status);
          }
          return res.json();
        })
        .then((res) => {
          alert("User created: " + res.username);
        })
        .catch((error) => {
          this.props.fetchUserError(error);
          alert("User not found: " + this.state.user);
        });
    }
  };

  login = () => {
    fetch(
      "/api/user/search/findByUsername?username=" +
        this.state.user.toLowerCase()
    )
      .then((res) => {
        if (res.status === 404) {
          this.createUser(this.state.user);
          throw new Error(404);
        } else if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((res) => {
        alert("Welcome " + res.username);
        this.props.fetchUserSuccess(res);
      })
      .catch((error) => {
        if (error.message !== "404") {
          this.props.fetchUserError(error);
          alert("Error: " + error);
        }
      });
  };

  render() {
    return (
      <div>
        <div className="col-sm-5 col-md-6">
          <img
            src={process.env.PUBLIC_URL + "/images/market.jpeg"}
            alt="Cart Market"
            width="500"
            height="400"
          />
        </div>
        <div className="col-sm-5 col-sm-offset-2 col-md-6 col-md-offset-0">
          <form>
            <div className="form-group">
              <label>Enter your name:</label>
              {this.props.user == null ? (
                <div>
                  <input
                    type="text"
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="username"
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.login}
                  >
                    Sign in
                  </button>
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder={this.props.user.username}
                    required
                    disabled
                  />
                  <button type="button" className="btn btn-primary" disabled>
                    Sign in
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserPending: () => {
      dispatch(fetchUserPending());
    },
    fetchUserSuccess: (user) => {
      dispatch(fetchUserSuccess(user));
    },
    fetchUserError: (error) => {
      dispatch(fetchUserError(error));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
