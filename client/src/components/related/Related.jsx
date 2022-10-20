/**
 * @jest-environment jsdom
 */

import React from 'react';
import Slider from "./Slider.jsx";
import SliderOutfit from "./SliderOutfit.jsx";
import axios from "axios";



class Related extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfitIds: [],
      outfit: [{id: 1, image: 'https://picsum.photos/307/307', category: 'Add to Your Outfit', name: 'Add this item to your outfit collection'}],
      productId: this.props.productId,
      products: [],
    }
    this.slideLeft = this.slideLeft.bind(this);
    this.slideRight = this.slideRight.bind(this);
    this.addToOutfit = this.addToOutfit.bind(this);
    this.removeFromOutfit = this.removeFromOutfit.bind(this);
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
    slider.scrollLeft = slider.scrollLeft - 210;

  }

  slideRight = (id) => {
    var slider = document.getElementById(id);
    // console.log(slider);
    slider.scrollLeft = slider.scrollLeft + 210;
  }


  findRelated = () => {
    return axios.get('/related', {
      params: {
        ID: this.props.productId
      }
    })
    .then((results) => {
      console.log(results.data)
      this.setState({products: results.data})
    })
  }




  render() {
    return(
      <form>
          <div>Related Items</div>
        <div id="body">
          <Slider id={'slider'} realData={this.state.products} slideLeft={this.slideLeft} slideRight={this.slideRight} updateMainState={this.props.updateMainState}/>
        </div>
        <div>Build Your Outfit</div>
        <div id="body">
          <SliderOutfit realData={this.state.outfit} id={'outfit'} click={(e) => {this.addToOutfit(e)}} remove={(e) => {this.removeFromOutfit(e)}} slideLeft={this.slideLeft} slideRight={this.slideRight}/>
        </div>
      </form>
    )
  }
}


export default Related;