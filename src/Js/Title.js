import React, { Component } from 'react';

class Title extends Component {
    state = {}
    render() {
        return (
            <div className="row">
                <div className="col-10 mx-auto my-2 text-center text-title">
                    <h1 className="text-capitalize font-weight-bold">Our Products</h1>
                </div>

            </div>
        );
    }
}

export default Title;