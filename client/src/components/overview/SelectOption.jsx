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
        {label: "XS", value: "Extra Small"},
        {label: "S", value: "Small"}
      ],
      quantityOptions: [
        {label: "1", value: "1"}
      ]
    }
    this.setValues = this.setValues.bind(this)
    this.updateSkus = this.updateSkus.bind(this)
    this.updateQuantity = this.updateQuantity.bind(this)
  }

  setValues(values){
    this.setState({ selectValues })
  }

  componentDidMount() {
    // update starRating state to starRating array
  }

  componentDidUpdate(prevProps) {
    if(this.props.selectedStyle !== prevProps.selectedStyle) {
      this.updateSkus()
    }
  }

  updateSkus() {
    for (var i = 0; i < this.props.styles.length; i++) {
      console.log("style id: ", this.props.styles[i].style_id)
      if(this.props.styles[i].style_id == this.props.selectedStyle) {
        console.log("111111111  ", this.props.styles[i].skus)
        var tempSize = []
        for (const key in this.props.styles[i].skus) {
          var temp = this.props.styles[i].skus[key]["size"]
          tempSize.push({
            label: temp,
            value: temp
          })
        }
        console.log("Temp Size: ", tempSize)
        this.setState({
          sizeOption: [...tempSize],
          currentSku: this.props.styles[i].skus
        })
      }
    }
  }

  updateQuantity(e) {
    console.log(e[0].value)
    console.log("222222: ", this.state.currentSku)
    for (const key in this.state.currentSku) {
      if (this.state.currentSku[key]["size"] == e[0].value) {
        const temp = this.state.currentSku[key]["quantity"]
        const tempQuantity = []
        for (var i = 0; i < temp; i++) {
          tempQuantity.push({
            label: i+1,
            value: i+1
          })
        }
        this.setState({
          quantityOptions: [...tempQuantity]
        })
        break;
      }
    }
  }
  render() {
    return(
      <div >
        <div className="dropdown-layout">
          <Select className="dropdown-size" placeholder="Select Size" options={this.state.sizeOption} onChange={this.updateQuantity} />
          <Select className="dropdown-quantity" placeholder="Select Quantity" options={this.state.quantityOptions} onChange={() => console.log("change")} />
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