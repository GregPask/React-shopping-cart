import React, { Component } from 'react';


import Logo from "../Images/logo5.png";

import { Link } from "react-router-dom";


class Navbar extends Component {
    state = {}
    render() {
        return (
            <div id="myNavbar">
                <img id="logo" src={Logo} alt="photo" />
                <div className="line1"></div>
                <Link to="/" id="navbarTitle">Products</Link>
                <div className="line2"></div>



                <i class="fas fa-shopping-cart"><Link id="navLink" to="/cart"> Cart</Link></i>

            </div>
        );
    }
}

export default Navbar;