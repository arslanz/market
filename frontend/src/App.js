import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import OrderList from "./components/OrderList";
import Welcome from "./components/Welcome";
import Cart from "./components/cart/Cart";
import Navbar from "./components/Navbar";

function App(props) {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/products" component={ProductList} />
          <Route path="/cart" component={Cart} />
          <Route path="/orders" component={OrderList} />
          <Route path="/order-detail" component={Cart} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
