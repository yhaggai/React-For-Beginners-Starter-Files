'use strict'
import React from 'react';
import helpers from '../helpers';

/*
  Fish
 */
const Fish = React.createClass({
  onButtonClick: function() {
    const key = this.props.index;
    this.props.addToOrder(key);
  },
  render: function() {
    // TODO add props validation
    const { name, image, price, desc, status } = this.props.details;
    const isAvailable = status === 'available' ? true : false;
    const buttonText = isAvailable ? 'Add to Order' : 'Sold Out!';
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name"> 
          {name}
          <span className="price">{helpers.formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable} onClick={this.onButtonClick}>{buttonText}</button>
      </li>
    )
  }
})

export default Fish;