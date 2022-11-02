import React from 'react';
import './Overview.css'


class Styles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stylePhotos: [],
      selectedStylePhotos: []
    }
    this.firstThumbnail = this.firstThumbnail.bind(this)
    this.firstThumbnailPhotos = this.firstThumbnailPhotos.bind(this)
  }

  // componentDiddMount() {
  //   this.firstThumbnail()
  // }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.stylePhoto !== prevProps.stylePhoto ||
      this.props.selectedStyle !== prevProps.selectedStyle) {
      this.firstThumbnail()
      this.firstThumbnailPhotos()
    }
  }


  firstThumbnail() {
    var styles = this.props.styles
    for (var i = 0; i < styles.length; i++) {
      if(styles[i].style_id == this.props.selectedStyle) {
        this.setState( {
          selectedStylePhotos: [...styles[i].photos]
        })
        break;
      }
    }

    // var photos = this.props.stylePhoto
    // this.setState({
    //   stylePhoto: photos
    //   // selectedStyle: Object.keys(this.props.stylePhoto[0])[0]
    // })
    // var selectedStyle = this.props.selectedStyle.toString()
    // for (var i = 0; i < photos.length; i++){
    //   if(Object.keys(photos[i]).includes(selectedStyle)) {
    //     var temp = photos[i][this.props.selectedStyle]
    //     this.setState({selectedStylePhotos: [...temp]})
    //     break;
    //   }
    // }
  }

  firstThumbnailPhotos() {
    var styles = this.props.styles
    var tempFirstThumbnails = []
    var tempStyleId = ''
    for (var i = 0; i < styles.length; i++) {
      tempFirstThumbnails.push(styles[i].photos[0]["thumbnail_url"])
    }
    this.setState( {
      stylePhotos: tempFirstThumbnails
    })
  }

  render() {
    const { selectedStylePhotos, stylePhotos } = this.state
    if(this.props.styles) {
      return (
        <div className="stylePhoto">
          {stylePhotos ? (stylePhotos.map((photo, index) => (
            <img className="circular--square" key={index} src={photo} alt={this.props.styles[index].style_id} onClick = {this.props.updateSelectedStyle}/>
          )))
          : "Loading"
          }
        </div>
      )
    }
  }
}

export default Styles;