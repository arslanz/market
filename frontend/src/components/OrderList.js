import React, { Component } from "react";
import Loader from "react-loader-spinner";
import OrderSummary from "./OrderSummary";
import { connect } from "react-redux";

import {
  fetchOrdersPending,
  fetchOrdersSuccess,
  fetchOrdersError,
} from "../store/actions/ordersActions";

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedOrder: null };
  }

  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.props.fetchOrdersPending();
    fetch("/api/orders/search/findByUserId?userId=" + this.props.user.user.id)
      .then((res) => res.json())
      .then(
        (res) => {
          this.props.fetchOrdersSuccess(res._embedded.orders);
        },
        (error) => {
          this.props.fetchOrdersError(error);
        }
      );
  }

  userClickOrder(order) {
    this.setState({ selectedOrder: order });
  }

  userExitOrder = () => {
    this.setState({ selectedOrder: null });
  };

  getItemCount(products) {
    let count = 0;
    products.map((p) => (count += p.quantity));
    return count;
  }

  render() {
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
                        <span className="glyphicon glyphicon-list-alt"></span>{" "}
                        {this.state.selectedOrder == null
                          ? "Orders"
                          : "Order Summary"}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              {this.state.selectedOrder == null ? (
                this.displayOrderList()
              ) : (
                <OrderSummary
                  order={this.state.selectedOrder}
                  userExitOrder={this.userExitOrder}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  displayOrderList() {
    if (this.props.orders.pending === true)
      return <Loader type="Puff" color="#00BFFF" height={50} width={50} />;
    else if (this.props.orders.orders != null)
      return (
        <div className="container">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Order Date</th>
                <th scope="col">Order Id</th>
                <th scope="col">Products</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {this.props.orders.orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.submissionDateTime}</td>
                  <td>
                    <a
                      href="/orders#"
                      onClick={() => this.userClickOrder(order)}
                    >
                      {order.id}
                    </a>
                  </td>
                  <td>{this.getItemCount(order.products)}</td>
                  <td>${order.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }

  displayOrderSummary(order) {
    return (
      <div>
        <div className="panel-body">
          <div className="panel-title">
            <p>
              <strong>Order Id:</strong> {order.id}
            </p>
            <p>
              <strong>Order Date:</strong> {order.submissionDateTime}
            </p>
          </div>
          <hr />
          {order.products.map((p) => {
            return (
              <div key={p.id}>
                <div className="row">
                  <div className="col-xs-1">
                    <img className="img-responsive" src={p.image} alt="" />
                  </div>
                  <div className="col-xs-4">
                    <h6 className="product-name">
                      <strong>{p.name}</strong>
                    </h6>
                  </div>
                  <div className="col-xs-6">
                    <div className="col-xs-3 text-right">
                      <h6>
                        <strong>
                          ${p.price} <span className="text-muted">x</span>{" "}
                          {p.quantity} = ${p.price * p.quantity}
                        </strong>
                      </h6>
                    </div>
                  </div>
                </div>

                <hr />
              </div>
            );
          })}
        </div>
        <div className="panel-footer">
          <div className="row text-center">
            <div className="col-xs-11">
              <h4>
                Total <strong>${order.total}</strong>
              </h4>
              <hr />
              <button
                onClick={() => this.userExitOrder()}
                className="btn btn-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    orders: state.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrdersPending: () => {
      dispatch(fetchOrdersPending());
    },
    fetchOrdersSuccess: (orders) => {
      dispatch(fetchOrdersSuccess(orders));
    },
    fetchOrdersError: (error) => {
      dispatch(fetchOrdersError(error));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
