'use strict'
import React from 'react';
import helpers from '../helpers';
import CSSTranstionGroup from 'react-addons-css-transition-group';

/*
  Order  
*/

const Order = React.createClass({
  renderOrder: function(key) {
    const fish = this.props.fishes[key];
    const count = this.props.order[key]
    const removeButton = <button onClick={this.props.removeFromOrder.bind(null, key)}>
      &times;</button>
    if (!fish) {
      return <li key={key}>Sorry, fish no longer available!</li>
    }
    return (
      <li key={key}>
        <CSSTranstionGroup transitionName="count" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
          <span key={count}>{count}lbs</span>
        </CSSTranstionGroup>
        <span>{fish.name}</span>
        <span className="price">{helpers.formatPrice(count * fish.price)}</span>
        {removeButton}
      </li>)
  },
  render: function() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if (fish && isAvailable) {
        return prevTotal + (count * parseInt(fish.price, 10) || 0);
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2 className="order-title">Your Order</h2>
        <CSSTranstionGroup
          className="order"
          component="ul"
          transitionName="order"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {helpers.formatPrice(total)}
          </li>
        </CSSTranstionGroup>
      </div>
    );
  },
  propTypes : {
    fishes : React.PropTypes.object.isRequired,
    order : React.PropTypes.object.isRequired,
    removeFromOrder : React.PropTypes.func.isRequired
  }
});

export default Order;