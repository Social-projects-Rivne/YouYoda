import React from 'react';

const Header = React.createClass({
  render: () {
    return (
      <div className="">
        <header className=""></header>
      </div>
      )
  }
})

export default Header;

// Note that with how CodePen works, I wasn't able to get the browserHistory to work
// as the article suggests. The demo works without it, but you'll want to be sure to
// use it in a real application
ReactDOM.render((
  <Router>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={Home} />
      <Route component={SearchLayout}>
        <Route path="users" component={UserList} />
        <Route path="widgets" component={WidgetList} />
      </Route>
    </Route>
  </Router>
), document.getElementById('root'))
