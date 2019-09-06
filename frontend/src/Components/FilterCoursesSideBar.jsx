import React from 'react';
import { CustomInput } from 'reactstrap';
import { slide as Menu } from 'react-burger-menu';

import { axiosGet } from '../api/axiosGet';


export default class FilterCoursesSideBar extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          categoriesList: [],
          rate__lte: "",
          rate__gte: "",
          cost__gt: "",
          cost: "",
          categories_list: [],
          status_list: [],  
      };
  };

  handleChangeCostFree = () => {
      this.setState({
                cost__gt: "",
                cost: "0"
            });
      this.props.sendCostPaidData("");
      this.props.sendCostFreeData("0");  
  }

  handleChangeCostPaid = () => {
      this.setState({
                cost__gt: "0",
                cost: ""
            });
      this.props.sendCostPaidData("0");
      this.props.sendCostFreeData("");  
  }

  handleChangeRateTo = () => {
      this.setState({
                rate__lte: "4",
                rate__gte: "0",
            });
      this.props.sendRateGteData("0");
      this.props.sendRateLteData("4");
  }

  handleChangeRate = () => {
      this.setState({
                rate__lte: "8",
                rate__gte: "4",
            });
      this.props.sendRateGteData("4");
      this.props.sendRateLteData("8");
  }

  handleChangeRateUp = () => {
      this.setState({
                rate__lte: "10",
                rate__gte: "8",
            });
      this.props.sendRateGteData("8");
      this.props.sendRateLteData("10"); 
  }

  handleClickStatus = (event) => {
      let value = event.target.value;
      let status_list = this.state.status_list;
      if (status_list.includes(value)) {
          status_list.pop(value);
      }
      else {
      status_list.push(value)
      };
      this.setState({
         status_list: status_list
      });
      let status = this.state.status_list.join(",");
      this.props.sendStatusData(status); 
  }

  handleClickCategories = (event) => {
      let value = event.target.value;
      let categories_list = this.state.categories_list;
      if (categories_list.includes(value)) {
          categories_list.pop(value);
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

  async componentWillMount() {
        let path = '/categories/list'
        let listCategories = await axiosGet(path);
        this.setState({
                categoriesList: listCategories,
            });
    };

  renderCategories(category) {
      return (
          <li >
              <CustomInput type="checkbox" id={category.name} label={category.name} value={category.id}
                           onClick={(event) => this.handleClickCategories(event)}
              />
          </li>
        )
    }

  render() {
      return (
          <Menu >
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
                          <CustomInput type="radio" id="freeCustomRadio" name="customRadio" label="Free" 
                                       onChange={() => this.handleChangeCostFree()} 
                          />
                      </li> 
                      <li>
                          <CustomInput type="radio" id="paidCustomRadio" name="customRadio" label="Paid" 
                                       onChange={() => this.handleChangeCostPaid()}
                          />
                      </li> 
                  </ul>
              </a>
              <a className="menu-item" href="#">
                  Status
                  <ul>
                      <li>
                          <CustomInput type="checkbox" id="openCustomCheckbox" label="Open" value="Open"
                                       onClick={(event) => this.handleClickStatus(event)}
                          />
                      </li> 
                      <li>
                          <CustomInput type="checkbox" id="closedCustomCheckbox" label="Closed" value="Closed" 
                                       onClick={(event) => this.handleClickStatus(event)}
                          />                        
                      </li> 
                      <li>
                          <CustomInput type="checkbox" id="inProgressCustomCheckbox" label="In Progress" value="In Progress" 
                                       onClick={(event) => this.handleClickStatus(event)}
                          />
                      </li> 
                      <li>
                          <CustomInput type="checkbox" id="scheduledCustomCheckbox" label="Scheduled" value="Scheduled" 
                                       onClick={(event) => this.handleClickStatus(event)}
                          />
                      </li> 
                  </ul>
              </a>
              <a className="menu-item" href="#">
                  Rate
                  <ul>
                      <li>
                          <CustomInput type="radio" id="to4CustomRadio" name="customRadioRate" label="To 4" 
                                       onChange={() => this.handleChangeRateTo()}
                          />
                      </li> 
                      <li>
                          <CustomInput type="radio" id="from4To8CustomRadio" name="customRadioRate" label="From 4 to 8" 
                                       onChange={() => this.handleChangeRate()}
                          />
                      </li>
                      <li>
                          <CustomInput type="radio" id="from8CustomRadio" name="customRadioRate" label="From 8" 
                                       onChange={() => this.handleChangeRateUp()}
                          />                         
                      </li>  
                  </ul>
              </a>
          </Menu>
  );
}
}
