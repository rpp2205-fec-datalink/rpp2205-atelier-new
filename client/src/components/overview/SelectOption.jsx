import React from 'react';
import Dropdown from 'react-dropdown';
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import './Overview.css'

class SelectOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeOptions: ['Extra Small', 'Small', 'Medium', 'Large', 'Extra Large'],
      defaultSizeOption: "Extra Small",
      quantityOptions: [1,2,3,4,5,6,7,8,9,10],
      defaultQuantityOption: "1"
    }
  }

  componentDidMount() {
    // update starRating state to starRating array
  }

  render() {
    console.log("00000: ", this.state.options)
    console.log("11111: ", this.state.defaultOption)
    return(
      <div >
        <div className="dropdown-layout">
          <Dropdown className="dropdown-size" options={this.state.sizeOptions} value={this.state.defaultSizeOption} placeholder="Select Size" />
          <Dropdown className="dropdown-quantity" options={this.state.quantityOptions} value={this.state.defaultQuantityOption} placeholder="Select Quantity" />
        </div>
        <div className="dropdown-layout">
          <p className="add-to-bag">Add To Bag +</p>
          <StarIcon className = "add-to-bag" />
        </div>
      </div>
    )
  }
}

export default SelectOption;