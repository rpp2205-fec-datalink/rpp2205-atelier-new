import React from 'react';

class Styles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stylePhoto: [],
      selectedStylePhotos: []
    }
    this.firstThumbnail = this.firstThumbnail.bind(this)
  }

  // componentDiddMount() {
  //   this.firstThumbnail()
  // }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.stylePhoto !== prevProps.stylePhoto ||
      this.props.selectedStyle !== prevProps.selectedStyle) {
      this.firstThumbnail()
    }
  }

  firstThumbnail() {
    var photos = this.props.stylePhoto
    this.setState({
      stylePhoto: photos
      // selectedStyle: Object.keys(this.props.stylePhoto[0])[0]
    })
    var selectedStyle = this.props.selectedStyle.toString()
    for (var i = 0; i < photos.length; i++){
      if(Object.keys(photos[i]).includes(selectedStyle)) {
        var temp = photos[i][this.props.selectedStyle]
        this.setState({selectedStylePhotos: [...temp]})
        break;
      }
    }
  }

  render() {
    const { selectedStylePhotos } = this.state
    return (
      <div>
        <h1>Style Photos</h1>
        {selectedStylePhotos ? (selectedStylePhotos.map((photo, index) => (
          <img key={index} src={photo["thumbnail_url"]} alt="lalala" />
        )))
        : "Loading"
        }
      </div>
    )
  }
}

export default Styles;