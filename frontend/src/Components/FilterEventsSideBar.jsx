import React from 'react';
import { CustomInput } from 'reactstrap';
import { slide as Menu } from 'react-burger-menu';

import { axiosGet } from '../api/axiosGet';


export default class FilterEventsSideBar extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          categoriesList: [],
          categories_list: [],
      };
  };

  handleClickCategories = (event) => {
      let value = event.target.value;
      let categories_list = this.state.categories_list;
      if (categories_list.includes(value)) {
          let index = categories_list.indexOf(value);
          categories_list.splice(index, 1); 
      }
      else {
          categories_list.push(value)
      };
      this.setState({
         categories_list: categories_list
      }); 
      let categories = this.state.categories_list.join(",");
      this.props.sendCategoriesData(categories); 
  }

  async componentDidMount() {
        let path = '/categories/list'
        let listCategories = await axiosGet(path);
        this.setState({
                categoriesList: listCategories,
            });
    };

  renderCategories(category) {
      return (
          <li key={category.id}>
              <CustomInput type="checkbox" id={category.name} label={category.name} value={category.id}
                           onClick={(event) => this.handleClickCategories(event)}
              />
          </li>
        )
    }

  render() {
      return (
          <Menu >
              <span className="menu-item">
                  Category
                  <ul>
                      {this.state.categoriesList.map( category => this.renderCategories(category) )}
                  </ul>
              </span>
          </Menu>
  );
}
}
