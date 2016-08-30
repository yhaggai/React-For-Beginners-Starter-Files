/// <reference path="../../typings/react/react.d.ts"/>
/// <reference path="../../typings/react/react-dom.d.ts"/>
/// <reference path="../../typings/react-router/react-router.d.ts"/>

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Router, Route, browserHistory, History } from 'react-router';
import helpers from './helpers';
import sampleFishes from './sample-fishes.js'

/* 
  App
*/
const App = React.createClass({
  getInitialState: function() {
    return {
      fishes: {},
      order: {}
    };
  },
  addToOrder: function(key) {
    this.state.order[key] = this.state.order[key] + 1 || 1;
    this.setState({order: this.state.order });
  },
  addFish: function(fish) {
    const timestamp = (new Date().getTime());
    this.state.fishes[`fish-${timestamp}`] = fish;
    // set the state
    this.setState({ fishes: this.state.fishes });
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
        <Order />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
      </div>
      );
  }
});

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
    const buttonText = isAvailable ? 'Add to Order' : 'Sold Out!'
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
/*
  Add fish form
 */

const AddFishForm = React.createClass({
  createFish: function (event) {
    event.preventDefault();
    // take the data from the form
    const fish = {
      name: this.refs.name.value,
      price: this.refs.price.value,
      status: this.refs.status.value,
      desc: this.refs.desc.value,
      image: this.refs.image.value
    }
    // Add the fish to App state
    //  this what we expect
    // App.addFish(fish)
    // but we need propagate it through inventory -> app
    this.props.addFish(fish);
    
  },
  render : function() {
    return (
      <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
        <input type="text" ref="name" placeholder="Fish Name"/>
        <input type="text" ref="price" placeholder="Fish Price" />
        <select ref="status">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" ref="desc" placeholder="Desc"></textarea>
        <input type="text" ref="image" placeholder="URL to Image" />
        <button type="submit">+ Add Item </button>
      </form>
    )
  }
});

/*
  Header  
*/

const Header = React.createClass({
  render: function() {
    // this is the ctor of header function
    return (
      <header className="top">
        <h1>Catch 
        <span className="ofThe"> 
          <span className="of">of</span>
          <span className="the">the</span>
        </span>
        Day</h1>
        <h3 className="tagline"><span>{this.props.tagline}</span></h3>
        {/*<h3 className="tagline">Fill me in</h3>*/}
      </header>
    )
  }
})

/*
  Order  
*/

const Order = React.createClass({
  render: function() {
    return (
      <p>Order</p>
    )
  }
})

/*
  Inventory  
*/

const Inventory = React.createClass({
  render: function() {
    return (
      <div>
        <p>Inventory</p>
        {/* this is how we propgate}*/}
        <AddFishForm {...this.props} />
        <button onClick={this.props.loadSamples}> Load Sample Fishes</button>
      </div>
    )
  }
})


const StorePicker = React.createClass({
  mixins: [History],
  goToStore: function() {
    event.preventDefault();
    // get the input
    // navigate to the new url
    // this is what we used to do
    // var storeId = $('input').val();
    // 'refs' is used on the input field - storeId
    const storeId = this.refs.storeId.value;
    // this is what we used to do
    // window.location.hash = ....
    // this will cause an error (without mixin)
    this.history.pushState(null, `/store/${storeId}`)
    
  },
  render: function() {
    // alternative way
    // return React.createElement('p', {className: 'testing'}, 'content');
    // alway return a single element (unlike jade)
    // you can't use class
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        {/* this how you comment */}
        <h2>Please Enter A Store</h2>
        <input type="text" ref="storeId" defaultValue={helpers.getFunName()} required />
        <input type="Submit" />
      </form>
    );
  }
});

/* 
  Not found
*/ 
const NotFound = React.createClass({
  render: function() {
    return <h1>Not Found</h1>
  }
});

/* 
  Routes
*/
// similar to express
// note we'll have the annoying hash this due browser compatibility with 'push state'
const routes = (
  <Router history={browserHistory} >
    <Route path="/" component={StorePicker}/>
    <Route path="/store/:storeId" component={App}/>
    <Route path="*" component={NotFound}/>
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));
