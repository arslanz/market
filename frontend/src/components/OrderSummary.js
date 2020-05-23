import React from "react";

class OrderSummary extends React.Component {
  render() {
    const { order } = this.props;
    return (
      <div>
        <div className="panel-body">
          <p>
            <strong>Order Id:</strong> {order.id}
          </p>
          <p>
            <strong>Order Date:</strong> {order.submissionDateTime}
          </p>
          <hr />
          {order.products.map((p) => {
            return (
              <div key={p.id}>
                <div className="row">
                  <div className="col-xs-2">
                    <img className="img-responsive" src={p.image} alt="" />
                  </div>
                  <div className="col-xs-4">
                    <h6 className="product-name">
                      <strong>{p.name}</strong>
                    </h6>
                    <p>{p.description}</p>
                  </div>
                  <div className="col-xs-6">
                    <div className="col-xs-6 text-right">
                      <h5>
                        ${p.price} <span className="text-muted">x</span>{" "}
                        {p.quantity} = ${p.price * p.quantity}
                      </h5>
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
                Total <strong>${order.total.toFixed(2)}</strong>
              </h4>
              <hr />
              <button
                onClick={this.props.userExitOrder}
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

export default OrderSummary;
