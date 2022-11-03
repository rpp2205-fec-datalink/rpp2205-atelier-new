import React from 'react';
import './Overview.css'

class Picture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.updatePhotos = this.updatePhotos.bind(this)
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.stylePhoto !== prevProps.stylePhoto ||
      this.props.selectedStyle !== prevProps.selectedStyle) {
        this.updatePhotos()
    }
  }

  updatePhotos() {
    var styles = this.props.styles
    for (var i = 0; i < styles.length; i++) {
      if(styles[i].style_id == this.props.selectedStyle) {
        this.setState( {
          selectedStylePhotos: [...styles[i].photos],
          mainPhoto: styles[i].photos[0]
        })
        break;
      }
    }
  }
  render() {
    const { selectedStylePhotos, mainPhoto } = this.state
    return(
      <div>
        <div className="thumbnailPhoto">
          {selectedStylePhotos ? (selectedStylePhotos.map((photo, index) => (
            <div>
              <img key={index} src={photo["thumbnail_url"]} alt="lll" onClick = {this.clickStyle}/>
            </div>
          )))
          : "Loading"
          }
        </div>
        <div className = "mainPhoto">
          {mainPhoto  ? <img className="mainPhoto" src={mainPhoto["url"]} alt="lll"/>
            : "Loading"
          }
        </div>
      </div>
    )
  }
}

export default Picture;