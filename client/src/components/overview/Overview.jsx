import React from 'react';
import StarReview from './StarReview.jsx'
import BasicInfo from './BasicInfo.jsx'
import Description from './Description.jsx'
import Picture from './Picture.jsx'
import Styles from './Styles.jsx'
import SelectOption from './SelectOption.jsx'
import axios from 'axios'
import './Overview.css'

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "Test Category",
      name: "Test Name",
      price: "$Test Price",
      slogan: "Slogan",
      description: "Test Description Sub",
      totalStars: 5,
      activeStars: 0.25,
      ratings: {},
      starRating: [],
      photoURL: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      stylePhoto: [],
      selectedStyle: 123456
    }
    this.findProduct = this.findProduct.bind(this)
    this.findProductMeta = this.findProductMeta.bind(this)
    this.findProductStyles = this.findProductStyles.bind(this)
    this.updateSelectedStyle = this.updateSelectedStyle.bind(this)
    this.findDefaultStyle = this.findDefaultStyle.bind(this)
  }

  componentDidMount() {
    this.findProduct()
    this.findProductMeta()
    this.findProductStyles()
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.productId !== prevProps.productId) {
      this.findProduct();
      this.findProductMeta();
      this.findProductStyles();
    }
  }

  findProduct() {
    axios.get('/products', {
      params: {
        ID: this.props.productId
      }
    })
    .then((response) => {
      this.setState({
        name: response.data.name,
        price: "$"+response.data.default_price,
        category: response.data.category,
        slogan: response.data.slogan,
        description: response.data.description
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  findProductMeta() {
    axios.get('/productsMeta', {
      params: {
        ID: this.props.productId
      }
    })
    .then((response) => {
      this.setState({
        ratings: response.data.ratings
      })
    })
  }

  findProductStyles() {
    axios.get('/productsStyle', {
      params: {
        ID: this.props.productId
      }
    })
    .then((response) => {
      var results = response.data.results
      var photos = []
      for (var i = 0; i < results.length; i++) {
        var tempArray = []
        for (var j = 0; j < results[i].photos.length; j++) {
          tempArray.push(results[i].photos[j])
        }
        var tempObj = {
          [results[i].style_id]: [...tempArray]
        }
        photos.push(tempObj)
      }
      this.setState({
        styles: response.data.results,
        stylePhoto: photos,
      })
      this.findDefaultStyle(response.data.results)
    })
  }

  findDefaultStyle(styles) {
    console.log("STYLES: ", styles)
    for (var i = 0; i < styles.length; i++) {
      if(styles[i]["default?"] === true) {
        this.setState({
          selectedStyle: styles[i].style_id,
          selectedSkus: styles[i].skus
        })
      } else {
        this.setState({
          selectedStyle: styles[0].style_id,
          selectedSkus: styles[i].skus

        })
      }
    }
  }

  updateSelectedStyle(e) {
    e.preventDefault();
    this.setState({
      selectedStyle: e.target.alt
    })
  }

  render() {
    return(
      <form className = "overview">
        <div className = "topHalf">
          <article className="photo-container">
            <Picture styles = {this.state.styles} selectedStyle = {this.state.selectedStyle}/>
          </article>
          <article className = "description-container">
            <StarReview totalStars = {this.state.totalStars} activeStars = {this.state.activeStars} ratings = {this.state.ratings}/>
            <a href="dummylink.com">Read all reviews</a>
            <BasicInfo category = {this.state.category} name = {this.state.name} price = {this.state.price}/>
            <Styles styles = {this.state.styles} stylePhoto = {this.state.stylePhoto} selectedStyle = {this.state.selectedStyle}  updateSelectedStyle = {(e) => this.updateSelectedStyle(e)}/>
            <SelectOption styles = {this.state.styles} selectedStyle = {this.state.selectedStyle}/>
          </article>
        </div>
        <div className = "bottomHalf">
          <Description slogan = {this.state.slogan} description = {this.state.description} />
        </div>
      </form>
    )
  }
}


export default Overview;