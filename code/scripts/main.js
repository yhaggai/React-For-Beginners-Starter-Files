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
  render: function(){
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order/>
        <Inventory/>
      </div>
      )
  }
})


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
      <p>Inventory</p>
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
