'use strict'
import React from 'react';
import AddFishForm from './add_fish_form.js';

/*
  Inventory  
*/

const Inventory = React.createClass({
  renderInventory: function(key) {
    return (
      <div className="fish-edit" key={key}>
        <input type="text" value={this.props.fishes[key].name}/>
        <input type="text" ref="price" value={this.props.fishes[key].price}/>
        <select value={this.props.fishes[key].status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" value={this.props.fishes[key].desc}></textarea>
        <input type="text" ref="image" value={this.props.fishes[key].image} />
        <button onClick={this.props.removeFish.bind(null, key)}>Remove Fish</button>
      </div>
    );
  },
  render: function() {
    return (
      <div>

        <h2>Inventory</h2>
        {/*Object.keys(this.props.fishes).map(this.renderInventory)*/}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        {/* this is how we propagate */}
        <AddFishForm {...this.props} />
        <button onClick={this.props.loadSamples}> Load Sample Fishes</button>
      </div>
    )
  },
  propTypes : {
    addFish : React.PropTypes.func.isRequired,
    loadSamples : React.PropTypes.func.isRequired,
    fishes : React.PropTypes.object.isRequired,
    removeFish : React.PropTypes.func.isRequired
  }
})

export default Inventory;
