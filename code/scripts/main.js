/// <reference path="../../typings/react/react.d.ts"/>
/// <reference path="../../typings/react/react-dom.d.ts"/>
/// <reference path="../../typings/react-router/react-router.d.ts"/>

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Router, Route, browserHistory, History } from 'react-router';
import helpers from './helpers';

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
  addFish: function(fish) {
    const timestamp = (new Date().getTime());
    this.state.fishes[`fish-${timestamp}`] = fish;
    // set the state
    this.setState({ fishes: this.state.fishes });
  },
  render: function(){
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish}/>
      </div>
      );
  }
});

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
