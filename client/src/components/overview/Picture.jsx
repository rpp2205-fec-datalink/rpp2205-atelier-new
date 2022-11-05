import React from 'react';
import './Overview.css'

class Picture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      photoIndex: 0,
      isOpen: false
    }
    this.updatePhotos = this.updatePhotos.bind(this)
    this.clickStyle = this.clickStyle.bind(this)
    this.clickRight = this.clickRight.bind(this)
    this.clickLeft = this.clickLeft.bind(this)
    this.handleShowDialog = this.handleShowDialog.bind(this)
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
          mainPhoto: styles[i].photos[0],
          mainPhotoCarousel: styles[i].photos,
          photoLength: styles[i].photos.length
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

  clickRight(e) {
    e.preventDefault()
    var length = this.state.photoLength
    this.setState({
      photoIndex: (this.state.photoIndex + 1) % length,
      mainPhoto: this.state.mainPhotoCarousel[this.state.photoIndex]
    })
  }

  clickLeft(e) {
    e.preventDefault()
    var length = this.state.photoLength
    this.setState({
      photoIndex: this.state.photoIndex === 0 ? length - 1 : this.state.photoIndex - 1,
      mainPhoto: this.state.mainPhotoCarousel[this.state.photoIndex]
    })
  }

  handleShowDialog() {
    this.setState({ isOpen: !this.state.isOpen });
    console.log('cliked');
  };

  render() {
    const { selectedStylePhotos, mainPhoto, mainPhotoCarousel } = this.state
    console.log("main photo carousel: ", mainPhotoCarousel)
    return(
      <div>
        <div className="thumbnailPhoto">
          {selectedStylePhotos ? (selectedStylePhotos.map((photo, index) => (
            <div  key={index}>
              <img src={photo["thumbnail_url"]} alt={photo["url"]} onClick = {this.clickStyle}/>
            </div>
          )))
          : "Loading"
          }
        </div>
        <div className = "mainPhoto">
          <div className="left-button" onClick={this.clickLeft}>‹</div>
          {mainPhoto  ? <img className="mainPhoto" src={mainPhoto["url"]} alt="lll" />
            : "Loading"
          }
          <div className="zoom-photo" onClick={this.handleShowDialog}>☐</div>
          {this.state.isOpen && (
          <dialog
            className="dialog"
            style={{ position: 'absolute' }}
            open
            onClick={this.handleShowDialog}
          >
            <img
              className="image"
              src={mainPhoto["url"]}
              onClick={this.handleShowDialog}
              alt="no image"
            />
          </dialog>
        )}
          <div className="right-button" onClick={this.clickRight}>›</div>
        </div>
      </div>
    )
  }
}

export default Picture;