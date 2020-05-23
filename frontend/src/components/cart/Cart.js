import React, { Component } from "react";
import Item from "./Item";
import OrderSummary from "../OrderSummary";
import { connect } from "react-redux";
import { clearCartContents } from "../../store/actions/cartActions";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = { newOrder: null };
  }

  checkout = () => {
    let cartItems = this.props.cart.map((item) => {
      return {
        _id: item.product.id,
        id: item.product.id,
        name: item.product.name,
        description: item.product.description,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
      };
    });
    let total = 0;
    this.props.cart.map(
      (item) => (total += item.product.price * item.quantity)
    );
    let order = {
      userId: this.props.user.id,
      products: cartItems,
      total: total,
    };
    this.createOrder(order);
  };

  createOrder = (order) => {
    fetch("/api/new-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.id) {
          alert("Order has been submitted: " + res.id);
          this.clearCart();
          this.setState({ newOrder: res });
        } else {
          console.log(res);
        }
      })
      .catch((error) => {
        alert("Error submitting order: " + error);
      });
  };

  clearCart = () => {
    this.props.clearCartContents();
  };

  exitOrderSummary = () => {
    this.setState({ newOrder: null });
  };

  render() {
    let total = 0;

    this.props.cart.map(
      (item) => (total += item.product.price * item.quantity)
    );

    const cart =
      this.props.cart.length > 0 ? (
        <div>
          <div className="panel-body">
            {this.props.cart.map((item) => {
              return (
                <div key={item.product.id}>
                  <Item item={item} />
                  <hr />
                </div>
              );
            })}
          </div>
          <div className="panel-footer">
            <div className="row text-center">
              <div className="col-xs-11">
                <h4 className="text-right">
                  Total <strong>${total.toFixed(2)}</strong>
                </h4>
                {this.props.user != null ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.checkout}
                  >
                    Checkout
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="panel-body">
          <p>Cart is empty</p>
        </div>
      );

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-xs-12">
            <div className="panel panel-info">
              <div className="panel-heading">
                <div className="panel-title">
                  <div className="row">
                    <div className="col-xs-6">
                      <h5>
                        <span className="glyphicon glyphicon-shopping-cart"></span>{" "}
                        {this.state.newOrder == null ? "Cart" : "Order Summary"}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              {this.state.newOrder == null ? (
                cart
              ) : (
                <OrderSummary
                  order={this.state.newOrder}
                  userExitOrder={this.exitOrderSummary}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCartContents: () => dispatch(clearCartContents()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
