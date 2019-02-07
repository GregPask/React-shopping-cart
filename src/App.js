import React from 'react';

import { Switch, Route } from "react-router-dom";

//Bootstrap
import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.css";


//Css files
import "./Css/app.scss";

//Js Files
import Navbar from "./Js/Navbar";
import ProductList from "./Js/ProductList";
import Details from "./Js/Details";
import Cart from "./Js/Cart";
import Default from "./Js/Default";





class App extends React.Component {


  render() {

    return (
      <div>
        <Navbar />

        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route exact path="/details/:id" component={Details} />
          <Route exact path="/cart" component={Cart} />
          <Route component={Default} />
        </Switch>

      </div>
    );
  }
}

export default App;