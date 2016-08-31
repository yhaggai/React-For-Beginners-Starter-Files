'use strict'

import React from 'react';

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
  },
  propTypes: {
    tagline: React.PropTypes.string.isRequired
  }
});


export default Header;
