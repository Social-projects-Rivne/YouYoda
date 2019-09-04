import React from 'react';
import { slide as Menu } from 'react-burger-menu';

import { axiosGet } from '../api/axiosGet';


export default class FilterSideBar extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          categoriesList: [],
      };
  };

  async componentWillMount() {
        let path = 'categories/list'
        let listCategories = await axiosGet(path);
        this.setState({
                categoriesList: listCategories,
            });
    };

    renderCategories(category) {
        return (
            <li>{category}</li>
        )
    }


  render(category) {
      return (
          <Menu>
              <a className="menu-item" href="/">
                Category
                  <ul >
                      {this.state.categoriesList.map( category => this.renderCategories(category) )}
                  </ul>
              </a>
              <a className="menu-item" href="/burgers">
                Cost
              </a>
              <a className="menu-item" href="/pizzas">
                Status
              </a>
              <a className="menu-item" href="/desserts">
                Rate
              </a>
          </Menu>
  );
}
}
