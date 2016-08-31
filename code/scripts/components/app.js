'use strict'
import React from 'react';
import Header from './header'
import Inventory from './inventory.js';
import Order from './order.js';
import sampleFishes from '../sample-fishes.js';
import Rebase from 're-base';
import Fish from './fish.js'

const base = Rebase.createClass('https://react-testing123.firebaseio.com/');
const App = React.createClass({
  getInitialState: function() {
    return {
      fishes: {},
      order: {}
    };
  },
  componentDidMount: function() {
    base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
  },
  componentWillUpdate: function(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
  },
  addToOrder: function(key) {
    this.state.order[key] = this.state.order[key] + 1 || 1;
    this.setState({order: this.state.order });
  },
  removeFromOrder: function(key) {
    delete this.state.order[key];
    this.setState({order: this.state.order })
  },
  addFish: function(fish) {
    const timestamp = (new Date().getTime());
    this.state.fishes[`fish-${timestamp}`] = fish;
    // set the state
    this.setState({ fishes: this.state.fishes });
  },
  removeFish: function(key){
    if (confirm("are you sure?")) {
      this.state.fishes[key] = null;
      this.setState({ fishes: this.state.fishes })
    }
  },
  loadSamples: function() {
    this.setState({
      fishes: sampleFishes
    })
  },
  renderFish: function(key){
    return <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
  },
  render: function() {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(this.renderFish)}
          </ul> 
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} 
        fishes={this.state.fishes} removeFish={this.removeFish}/>
      </div>
      );
  }
});

export default App;