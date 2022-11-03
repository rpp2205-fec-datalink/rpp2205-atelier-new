import React from 'react';
import './Overview.css'

class Picture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.updatePhotos = this.updatePhotos.bind(this)
    this.clickStyle = this.clickStyle.bind(this)
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

  clickStyle(e) {
    this.setState({
      mainPhoto: {
        url: e.target.alt
      }
    })
  }

  render() {
    const { selectedStylePhotos, mainPhoto } = this.state
    console.log(this.state.mainPhoto)
    return(
      <div>
        <div className="thumbnailPhoto">
          {selectedStylePhotos ? (selectedStylePhotos.map((photo, index) => (
            <div>
              <img key={index} src={photo["thumbnail_url"]} alt={photo["url"]} onClick = {this.clickStyle}/>
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