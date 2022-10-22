import React, { useState, useEffect} from "react";
import './Slider.css';
import StarReview from '../overview/StarReview.jsx'
import noPhoto from "./noPhoto.js";
import { MdChevronLeft, MdChevronRight, MdStars} from 'react-icons/md';

const SliderOutfit = function(props) {
  const [right, rightCount] = useState(0);
  const [left, leftCount] = useState(0);
  const [currentClick, afterClick] = useState(0);
  const [sliderLeft, toggleLeft] = useState("slider-icon left");
  const [sliderRight, toggleRight] = useState("slider-icon right");
  const [currentLength, updateLength] = useState(props.realData.length)


  if (props.realData.length < currentLength) {
    afterClick(currentClick - 1);
    updateLength(props.realData.length);
  }


  var countingRight = function() {
    afterClick(currentClick - 1)
    //console.log('CLICK', currentClick)
    trackCount()
  }

  var countingLeft = function() {
    afterClick(currentClick + 1)
    //console.log('CLICK', currentClick)
    trackCount()
  }

  var trackCount = function() {
    if (right <= 3) {
      toggleRight("empty");
      toggleLeft("empty");
    }
    if (right >= 4) {
      toggleRight("slider-icon right")
    }
    if (left <= 0) {
      toggleLeft("empty");
    }
    if (left >= 1) {
      toggleLeft("slider-icon left")
    }
  }

  useEffect(() => {
    afterClick(currentClick)
  }, [currentClick])

  useEffect(() => {
    updateLength(props.realData.length)
  }, [props.realData.length])

  useEffect(() => {
   rightCount(props.realData.length - currentClick);
  }, [props.realData.length, currentClick])

  useEffect(() => {
    leftCount(currentClick);
   }, [currentClick])

  useEffect(() => {
    trackCount()
  })



  return (
    <div id="slider-container">

     <MdChevronLeft className={sliderLeft} onClick={() => {props.slideLeft(props.id) ; countingRight()}}/>

      <div className="slider-content" id={props.id}>
        {props.realData.map((slide) => {
          if (!slide.image) {
            slide.image = noPhoto;
          }
          if (slide.id === 1) {
            return (
                <div className="outfit-card" key={slide.id} >
                  <div className="outfit-card-cat">ADD THIS ITEM</div>
                  <MdStars className="outfit-add" onClick={props.click}/>
                  <div className="outfit-card-price">Click the Star to add this item to your Outfit</div>
                </div>
            )
          }
            return (
              <div className="slider-card" key={slide.id} >
                <button type='submit' name={slide.id} className="slider-card-img" style={{backgroundImage: `url(${slide.image})`, backgroundSize: 'cover'}} onClick={(e) => { e.preventDefault();}}>
               </button>
                <div className="slider-card-cat">{slide.category}</div>
                <div className="slider-card-title">{slide.name}</div>
                <div className="slider-card-price">{slide.price}</div>
                <div className="slider-card-star"><StarReview ratings={slide.ratings} /></div>
                <button className="remove" name={slide.id} onClick={props.remove} >X</button>
              </div>
            )
        })}
      </div>

      <MdChevronRight className={sliderRight} onClick={() => {props.slideRight(props.id) ; countingLeft()}}/>

    </div>
  )
}

export default SliderOutfit;