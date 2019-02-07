import React, { Component } from 'react';
import { connect } from "react-redux";


import { addQuantity, lowerQuantity, removeItem, resetState } from "./Actions/rootActions";

import { Link , Redirect} from "react-router-dom";

class Cart extends Component {
    state = {
        items: [],
        cartItems: [],
        purchased: false
    }


    componentDidMount() {
        let cartItems = this.props.cart;
        let items = this.props.items;


        this.setState({
            cartItems,
            items,
        })
    }


    lowerQuantity = (item) => {


        let index = item[0];
        let cartItemPosition = item[1];
        let cartItems = this.state.cartItems.slice();




        let filt = cartItems.filter((item) => item.id === index);

        if (filt[0].count === 1) {
            return;
        }

        filt[0].count--;
        filt[0].total = filt[0].count * filt[0].price;
        cartItems.splice(cartItemPosition, 1, filt[0]);


        this.setState({
            cartItems,
        })

        this.props.lowerQuantity(filt[0]);
    }

    higherQuantity = (item) => {

        let index = item[0];
        let cartItemPosition = item[1];

        let cartItems = this.state.cartItems.slice();
        let filt = cartItems.filter((item) => item.id === index);

        filt[0].count++;
        filt[0].total = filt[0].count * filt[0].price;

        cartItems.splice(cartItemPosition, 1, filt[0]);

        console.log(filt[0]);

        this.setState({
            cartItems,

        })

        this.props.addQuantity(filt[0]);
    }

    removeItem = (e) => {
        let cartItems = this.state.cartItems.slice();
        cartItems[e].inCart = false;
        cartItems[e].count = 0;


        let removedItem = cartItems.splice(e, 1);
        removedItem.inCart = false;

        this.setState({
            cartItems,
        });

        console.log(removedItem[0]);
        this.props.removeItem(removedItem);
    }


purchased = () => {
    this.setState({
        purchased: true
    })

  
}
 
    render() {

        if(this.state.purchased){
            alert("Thank you for your purchase!");
           
            window.location.reload();
       

         
        }

        return (
            <div id="cart">
                <div className="container">
                    <h1>Your Cart</h1><br />
                    <Link className="btn btn-dark" to="/">Back</Link>

                    {this.state.cartItems.length < 1 ? (<p>No Items in your cart</p>) : (
                        <div className="row">
                            <div className="col-lg-8">
                                <table id="table1" style={{ border: "1px solid red", minWidth: "500px" }} className="table table-striped table-bordered">
                                    <thead id="table-head">
                                        <tr>
                                            <th colSpan="2">Products</th>
                                            <th>Price</th>

                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.cartItems.map((item, index) => {

                                            return (
                                                <tr>
                                                    <td colSpan="2" >
                                                        <p>{item.title}</p>
                                                        <img className="img-fluid" id="cart-img" src={item.img} alt="photo123" /></td>
                                                    <td>£ {item.price}</td>

                                                    <td>
                                                        <div id="quantityGrid">
                                                            <i onClick={this.lowerQuantity.bind(this, [item.id, index])} class="fas fa-minus"></i>
                                                            <p>{item.count}</p>
                                                            <i onClick={this.higherQuantity.bind(this, [item.id, index])} class="fas fa-plus"></i>
                                                        </div>
                                                    </td>
                                                    <td>Item total: ${item.total}  <i onClick={this.removeItem.bind(this, index)} class="float-right fas fa-dumpster"></i></td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div id="totalPrice" className=" col-lg-4">
                            <div className="card">
                                        <div id="total-header" className="card-header">
                                        <h2>Total</h2>
                                        </div>

                            <div id="total-body">
                                <ul>
                                    
                                {this.state.cartItems.map((item) => {
                                    return(
                                        <li className=""><strong>{item.title} - £{item.price}</strong></li>
                                    );
                                })}
                                </ul>
                                <hr/><br/>
                                <h3>Total Price - <strong>£{this.props.total}</strong></h3><hr/>

                                <button onClick={this.purchased} className="btn btn-block" id="purchase">Purchase</button>
                            </div>

                              
                            </div> {/* End of Card */}
                            </div>  {/* End of Total Price*/}

                        </div>
                    )}
                </div>
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        cart: state.item.cart,
        items: state.item.products,
        total: state.item.totalPrice
    }
}

export default connect(mapStateToProps, { addQuantity, lowerQuantity, removeItem, resetState })(Cart);