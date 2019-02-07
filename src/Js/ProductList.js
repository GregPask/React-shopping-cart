import React, { Component } from 'react';
import { storeProducts } from "./data";
import { Link } from "react-router-dom";


import { Modal, ModalBody } from 'reactstrap';
// Redux
import { addItem } from "./Actions/rootActions";
import { connect } from "react-redux";

class ProductList extends Component {
    state = {

        items: [],
        addModal: false,
        item: {}
    }

    componentDidMount() {
        let items = this.props.items;

        this.setState({
            items,
        })



    }

    toggleModal = () => {
        this.setState({
            addModal: !this.state.addModal
        })
    }


    addToCart = (e) => {

        let itemsCopy = this.state.items.slice();
        itemsCopy[e].inCart = true;
        itemsCopy[e].count++;
        itemsCopy[e].total = itemsCopy[e].count * itemsCopy[e].price;

        let item = itemsCopy[e];


        this.setState({
            items: itemsCopy,
            addModal: true,
            item,

        })

        // console.log(itemsCopy);
        this.props.addItem(item);

    }

    render() {


        let { title, price, img } = this.state.item;


        let items = this.state.items.map((item, index) => {
            return (
                <div onClick={() => console.log("You clicked on me!!!")} className="phone-item">
                    <p style={{ fontSize: "1.4rem", fontWeight: "bolder" }} className="float-right">${item.price}</p>


                    <Link to={`details/${item.id}`}><br />
                        <img className="phone-image img-fluid" alt="phogeageto" src={item.img} />
                        <br />

                    </Link>

                    <button onClick={this.addToCart.bind(this, index)} className="cart-btn" disabled={item.inCart ? true : false} >
                        {item.inCart ? (
                            <p disabled className="text-capitalize mb-0">In cart</p>

                        ) : (
                                <i className="fas fa-cart-plus"></i>
                            )}
                    </button><br /><br />

                    <div id="wrapper" style={{ textAlign: "center" }}>
                        <p style={{ textAlign: "center" }} className="phone-text">{item.title} </p>
                    </div>
                </div>
            );
        })

        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <h1 id="product-title" style={{ textAlign: "center" }}>Our Products</h1><br /><br />
                        <div id="grid1">

                            {items}


                        </div>
                    </div>
                </div>

                <Modal className="addModal" isOpen={this.state.addModal} toggle={this.toggleModal}>

                    <ModalBody>
                        <h3>Item Added To Cart</h3>
                        <img id="item-added-img" src={img} alt="photo123" />
                        <p>{title}</p>
                        <p>Price: ${price}</p>
                        <div id="add-items-btn">
                            <Link to="/" className="add-item-btn back" onClick={this.toggleModal}>Continue Shopping</Link><br />
                        </div>

                        <div id="add-items-btn">
                            <Link to="/cart" className="add-item-btn add" onClick={this.toggleModal}>Go To Cart</Link>
                        </div>

                    </ModalBody>

                </Modal>
            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        items: state.item.products
    }
}


export default connect(mapStateToProps, { addItem })(ProductList);