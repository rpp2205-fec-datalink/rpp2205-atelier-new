import React from 'react';
// import Dropdown from 'react-dropdown';
import Select from "react-dropdown-select";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import './Overview.css'

class SelectOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeOptions: [
        {label: "XS", value: "Extra Small"}
      ],
      quantityOptions: [
        {label: "1", value: "1"}
      ]
    }
    this.setValues = this.setValues.bind(this)
  }

  setValues(values){
    this.setState({ selectValues })
  }

  componentDidMount() {
    // update starRating state to starRating array
  }

  render() {
    return(
      <div >
        <div className="dropdown-layout">
          <Select className="dropdown-size" placeholder="Select Size" options={this.state.sizeOptions} onChange={() => null} />
          <Select className="dropdown-quantity" placeholder="Select Quantity" options={this.state.quantityOptions} onChange={() => null} />
{/*
          <Dropdown className="dropdown-size" options={this.state.sizeOptions} value={this.state.defaultSizeOption} placeholder="Select Size" />
          <Dropdown className="dropdown-quantity" options={this.state.quantityOptions} value={this.state.defaultQuantityOption} placeholder="Select Quantity" /> */}
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