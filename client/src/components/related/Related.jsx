/**
 * @jest-environment jsdom
 */

import React from 'react';
import Slider from "./Slider.jsx";
import SliderOutfit from "./SliderOutfit.jsx";
import Compare from "./Compare.jsx";
import axios from "axios";
import "./Related.css";



class Related extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfitIds: [],
      outfit: [{id: 1, image: 'https://picsum.photos/307/307', category: 'Add to Your Outfit', name: 'Add this item to your outfit collection'}],
      productId: this.props.productId,
      products: [],
      comparing: false,
      comparingInfo: 0,
    }
    this.slideLeft = this.slideLeft.bind(this);
    this.slideRight = this.slideRight.bind(this);
    this.addToOutfit = this.addToOutfit.bind(this);
    this.removeFromOutfit = this.removeFromOutfit.bind(this);
    this.toggleCompare = this.toggleCompare.bind(this);
  }

  componentDidMount() {
    this.startLocal();
    this.findRelated();
    this.checkLocal();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.productId !== prevProps.productId) {
      this.findRelated();
      this.checkLocal();
    }
  }

  startLocal = function() {
    if (typeof window !== 'undefined') {
      if (localStorage.length === 0) {
        var data = JSON.stringify(this.state.outfit)
        localStorage.setItem('outfit', data)
      }
    }
  }

  checkLocal = function(){
    var check = localStorage.getItem('outfit');
    var converted = JSON.parse(check)
     this.setState({outfit: converted})
     //localStorage.removeItem('outfit');
  }

  addToOutfit = function(e) {
    e.preventDefault();
    var newAddition = Number(this.props.productId);
    var isNotInOutfit = true;
    for (var i = 0; i < this.state.outfit.length; i++) {
      if (this.state.outfit[i].id === newAddition) {
        isNotInOutfit = false;
      }
    }

    if (isNotInOutfit) {
      return axios.get('/outfit', {
        params: {
          ID: newAddition
        }
      })
        .then((results) => {
          var newData = results.data;
          var updatingArray = this.state.outfit;
          for (var i = 0; i < newData.length; i++) {
            updatingArray.push(newData[i])
          }
           this.setState({outfit: updatingArray})
           return updatingArray;
        })
        .then((results) => {
          var outfitStorage = JSON.stringify(results);
          // console.log('RESULTS', outfitStorage)
          localStorage.setItem('outfit', outfitStorage)
          console.log('Success!')
        })
    } else {
      return alert('This Item is Already in Your Outfit.')
    }
  }

  removeFromOutfit = function(e) {
    e.preventDefault();
    var currentId = e.currentTarget.name;
    var previous = this.state.outfit;
    var newOutfit = [];
    for (var i = 0; i < previous.length; i++) {
      if (previous[i].id !== Number(currentId)) {
        newOutfit.push(previous[i])
      }
    }
    var results = JSON.stringify(newOutfit)
    localStorage.removeItem('outfit')
    localStorage.setItem('outfit', results);
    this.checkLocal()
  }


  slideLeft = (id) => {
    var slider = document.getElementById(id);
    slider.scrollLeft = slider.scrollLeft - 215;

  }

  slideRight = (id) => {
    var slider = document.getElementById(id);
    // console.log(slider);
    slider.scrollLeft = slider.scrollLeft + 215;
  }


  findRelated = () => {
    return axios.get('/related', {
      params: {
        ID: this.props.productId
      }
    })
    .then((results) => {
      this.setState({products: results.data})
    })
  }

  toggleCompare = function(e) {
    e.preventDefault();
    if (this.state.comparing) {
      this.setState({comparing: false})
    } else {
      this.setState({comparingInfo: e.target.name})
      this.setState({comparing: true})
    }
  }



  render() {
    return(
      <>
      <form>
        <br></br>
        <div id="title">Related Items</div>
          <div data="Related Items" id="body">
              <br data="Related Items"></br>
              <Slider id={'slider'} realData={this.state.products} slideLeft={this.slideLeft} slideRight={this.slideRight} updateMainState={this.props.updateMainState} compare={(e) => {this.toggleCompare(e)}}/>
          </div>
          <br></br>
            <div id="title">Build Your Outfit</div>
          <br data="Your Outfit"></br>
          <div data="Your Outfit" id="body">
              <SliderOutfit realData={this.state.outfit} id={'outfit'} click={(e) => {this.addToOutfit(e)}} remove={(e) => {this.removeFromOutfit(e)}} slideLeft={this.slideLeft} slideRight={this.slideRight}/>
          </div>
      </form>
         <Compare trigger={this.state.comparing} mainP={this.props.productId} related={this.state.comparingInfo} relatedInfo={this.state.products} click={(e) => {this.toggleCompare(e)}}><h3>This Product Compared to Main Product</h3></Compare>
      </>
    )
  }
}

export default Related;