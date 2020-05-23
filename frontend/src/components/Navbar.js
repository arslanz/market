import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { doUserSignOut } from "../store/actions/userActions";

class Navbar extends Component {
  logout = () => {
    this.props.doUserSignOut();
  };

  render() {
    this.props.cartUpdated();

    let total = 0;

    this.props.cart.map(
      (item) => (total += item.product.price * item.quantity)
    );

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <NavLink className="navbar-brand" to="/">
              <i className="glyphicon glyphicon-home"></i> Market
            </NavLink>
          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav">
              <li>
                <NavLink to="/products" disabled>
                  <i className="glyphicon glyphicon-th-list"></i> Products
                </NavLink>
              </li>
            </ul>
            {this.props.user != null ? (
              <div>
                <ul className="nav navbar-nav">
                  <li>
                    <NavLink to="/orders" disabled>
                      <i className="glyphicon glyphicon-list-alt"></i> Orders
                    </NavLink>
                  </li>
                </ul>
                <ul className="nav navbar-nav">
                  <li>
                    <NavLink to="/" disabled>
                      <i className="glyphicon glyphicon-user"></i> Welcome{" "}
                      {this.props.user.username}
                    </NavLink>
                  </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <a href="/" onClick={this.logout}>
                    <i className="glyphicon glyphicon-log-out">Sign out</i>
                  </a>
                </ul>
              </div>
            ) : null}
            <ul className="nav navbar-nav navbar-right">
              <li>
                <NavLink to="/cart" disabled>
                  {this.props.cart.length > 0 ? (
                    <span className="label label-info">
                      {this.props.cart.length} items: (${total.toFixed(2)})
                    </span>
                  ) : null}
                  <i className="glyphicon glyphicon-shopping-cart"></i> My Cart
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    user: state.user.user,
    cartUpdated: () => {
      return true;
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doUserSignOut: () => {
      dispatch(doUserSignOut());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
