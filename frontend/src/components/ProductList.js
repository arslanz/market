import React, { Component } from "react";
import Loader from "react-loader-spinner";
import Product from "./Product";
import { connect } from "react-redux";
import { addToCart } from "../store/actions/cartActions";
import {
  fetchProductsPending,
  fetchProductsSuccess,
  fetchProductsError,
} from "../store/actions/productsActions";

class ProductList extends Component {
  addToCart = (product) => {
    this.props.addToCart(product);
  };

  fetchProducts() {
    this.props.fetchProductsPending();
    fetch("/api/products")
      .then((res) => res.json())
      .then(
        (res) => {
          this.props.fetchProductsSuccess(res._embedded.products);
        },
        (error) => {
          this.props.fetchProductsError(error);
        }
      );
  }

  componentDidMount() {
    this.fetchProducts();
  }

  render() {
    let innerHtml;
    if (this.props.products.pending === true)
      innerHtml = <Loader type="Puff" color="#00BFFF" height={50} width={50} />;
    else if (this.props.products.error != null)
      innerHtml = "Error: " + this.props.products.error;
    else if (this.props.products.products.length > 0)
      innerHtml = (
        <div className="row">
          {this.props.products.products.map((product) => (
            <Product
              product={product}
              addToCart={this.addToCart}
              inCart={
                this.props.cart.length > 0 &&
                this.props.cart.filter((e) => e.product.id === product.id)
                  .length > 0
              }
              key={product.id}
            />
          ))}
        </div>
      );

    return (
      <div className="container">
        <h2>Product List</h2>
        {innerHtml}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    productList: state.productList,
    cart: state.cart.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => {
      dispatch(addToCart(product));
    },
    fetchProductsPending: () => {
      dispatch(fetchProductsPending());
    },
    fetchProductsSuccess: (products) => {
      dispatch(fetchProductsSuccess(products));
    },
    fetchProductsError: (error) => {
      dispatch(fetchProductsError(error));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
