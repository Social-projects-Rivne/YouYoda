import React from 'react';
import { Label, Input, FormGroup, CustomInput } from 'reactstrap';
import { slide as Menu } from 'react-burger-menu';

import { axiosGet } from '../api/axiosGet';


export default class FilterSideBar extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          categoriesList: [],
          rate__lte: 5,
          rate__gte: 5,
          cost__gt: 0,
          cost: 0,
          filterBy: "",
          categories_list: [],
          status_list: [],  
      };
  };

  async componentWillMount() {
        let path = '/categories/list'
        let listCategories = await axiosGet(path);
        this.setState({
                categoriesList: listCategories,
            });
    };

    renderCategories(category) {
        return (
            <li onClick={() => this.setState({ filterBy: category.id })}>
                <CustomInput type="checkbox" id={category.name} label={category.name} />
            </li>
        )
    }

  render() {
    const a = [];
    console.log(this.state.filterBy)   
      return (

          <Menu>
              <a className="menu-item" href="#">
                  Category
                  <ul>
                      {this.state.categoriesList.map( category => this.renderCategories(category) )}
                  </ul>
              </a>
              <a className="menu-item" href="#">
                  Cost
                  <ul>
                      <li>
                          <CustomInput type="radio" id="freeCustomRadio" name="customRadio" label="Free" />
                      </li> 
                      <li>
                          <CustomInput type="radio" id="paidCustomRadio" name="customRadio" label="Paid" />
                      </li> 
                  </ul>
              </a>
              <a className="menu-item" href="#">
                  Status
                  <ul>
                      <li>
                          <CustomInput type="checkbox" id="openCustomCheckbox" label="Open" />
                      </li> 
                      <li>
                          <CustomInput type="checkbox" id="closedCustomCheckbox" label="Closed" />                        
                      </li> 
                      <li>
                          <CustomInput type="checkbox" id="inProgressCustomCheckbox" label="In Progress" />
                      </li> 
                      <li>
                          <CustomInput type="checkbox" id="scheduledCustomCheckbox" label="Scheduled" />
                      </li> 
                  </ul>
              </a>
              <a className="menu-item" href="#">
                  Rate
                  <ul>
                      <li>
                          <CustomInput type="radio" id="to4CustomRadio" name="customRadioRate" label="To 4" />
                      </li> 
                      <li>
                          <CustomInput type="radio" id="from4To8CustomRadio" name="customRadioRate" label="From 4 to 8" />
                      </li>
                      <li>
                          <CustomInput type="radio" id="from8CustomRadio" name="customRadioRate" label="From 8" />                         
                      </li>  
                  </ul>
              </a>
          </Menu>
  );
}
}
