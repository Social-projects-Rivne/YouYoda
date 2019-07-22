import React from 'react';

const Main = React.createClass({
  render: () {
    return (
      <div className="">
        <main>
          {this.props.children}
        </main>
      </div>
      )
  }
})

export default Main;
