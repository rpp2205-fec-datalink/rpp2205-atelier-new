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
    this.currentStyle = this.currentStyle.bind(this)
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
      this.currentStyle()
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

  currentStyle() {
    var styles = this.props.styles
    for (var i=0; i < styles.length; i++) {
      if(styles[i]["style_id"] == this.props.selectedStyle) {
        this.setState({
          styleName: styles[i]["name"]
        })
        break;
      }
    }
  }

  render() {
    const { selectedStylePhotos, stylePhotos, styleName } = this.state
    console.log(this.props.styles)
    if(this.props.styles) {
      return (
        <div>
          <div>
            <h1>STYLE > {styleName}</h1>
            <br></br>
          </div>
          <div className="stylePhoto">
            {stylePhotos ? (stylePhotos.map((photo, index) => (
              <img className="circular--square" key={index} src={photo} alt={this.props.styles[index].style_id} onClick = {this.props.updateSelectedStyle}/>
            )))
            : "Loading"
            }
          </div>

        </div>
      )
    }
  }
}

export default Styles;