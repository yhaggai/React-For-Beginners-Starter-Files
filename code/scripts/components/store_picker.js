'use strict'
import React from 'react';
import {History} from 'react-router';
import helpers from '../helpers';

class StorePicker extends React.Component {
 constructor() {
    super();
    this.goToStore = this.goToStore.bind(this);
  }
  goToStore() {
    event.preventDefault();
    // get the input
    // navigate to the new url
    // this is what we used to do
    // var storeId = $('input').val();
    // 'refs' is used on the input field - storeId
    // const storeId = this.refs.storeId.value;
    // // this is what we used to do
    // // window.location.hash = ....
    // // this will cause an error (without mixin)
    // this.history.pushState(null, `/store/${storeId}`)
  }

  render() {
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
}

export default StorePicker;


