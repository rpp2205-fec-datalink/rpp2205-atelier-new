import React, { useState, useEffect} from "react";
import "./Slider.css";
import noPhoto from "./noPhoto.js";
import { MdChevronLeft, MdChevronRight} from "react-icons/md";

const Slider = function(props) {
  const [right, rightCount] = useState(0);
  const [left, leftCount] = useState(0);
  const [currentClick, afterClick] = useState(0);
  const [sliderLeft, toggleLeft] = useState("slider-icon left");
  const [sliderRight, toggleRight] = useState("slider-icon right");
  const [currentLength, updateLength] = useState(props.realData.length)


    if (props.realData.length < currentLength) {
    var fewerCards = currentLength - props.realData.length;
    var amountLeft = currentLength - fewerCards;
    afterClick(currentClick - amountLeft + 1);
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
            return (
              <div className="slider-card" key={slide.id} >
                <button type='submit' name={slide.id} onClick={props.updateMainState} className="slider-card-img" style={{backgroundImage: `url(${slide.image})`, backgroundSize: 'cover'}} >
               </button>
                <div className="slider-card-cat">{slide.category}</div>
                <div className="slider-card-title">{slide.name}</div>
                <div className="slider-card-price">{slide.price}</div>
              </div>
            )
        })}
      </div>

      <MdChevronRight className={sliderRight} onClick={() => {props.slideRight(props.id) ; countingLeft()}}/>

    </div>
  )
}

export default Slider;