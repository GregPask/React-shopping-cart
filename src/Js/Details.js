import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { Link } from "react-router-dom";


//Redux

import { connect } from "react-redux";
import { addItem } from "./Actions/rootActions";

class Details extends Component {
    state = {
        item: {},
        addModal: false
    }


    componentDidMount() {

        let itemsId = this.props.match.params;
        let items = this.props.details;
        let item = items[itemsId.id - 1];

        this.setState({
            item,
        });
    }


    toggleModal = (e) => {
        this.setState({
            addModal: !this.state.addModal
        })
    }


    addItem = (e) => {

        let item = Object.assign({}, this.state.item);
        item.inCart = true;
        item.count++;
        item.total =  item.count * item.price;




        if (item.inCart) {
            console.log("Item in cart");
            this.setState({
                item,
                addModal: true
            })


            this.props.addItem(item);
        } else {
            return;
        }


    }

    render() {

        let { id, title, img, price, company, info, inCart } = this.state.item;

        console.log(this.props);

        return (
            <div id="details" className="my-5 container">
                <h1>{title}</h1><br /><br /><br />

                <div className="row">
                    <div style={{ textAlign: "center" }} className=" mb-4 col-lg-4">
                        <img src={img} alt="photo123" />
                    </div>
                    <div className="col-lg-1"></div>

                    <div className="col-lg-7">
                        <h4><strong>Model: {title}</strong></h4>
                        <h4>Created by: {company}</h4>
                        <p>Price: ${price}</p><br />
                        <p><strong>Details:</strong></p>
                        <p>{info}</p>
                        <br />
                        <div>
                            <button className="back detail-btn"><Link className="detail-link1" to="/">Back To Products</Link></button>
                            <div id="line3"></div>
                            <button style={{ marginTop: "1em" }} onClick={this.addItem.bind(this, { id })} disabled={inCart ? true : false} className="detail-link2 add detail-btn">{inCart ? "Already Added" : "Add to Cart"}</button>
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


            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        details: state.item.products
    }
}

export default connect(mapStateToProps, { addItem })(Details);