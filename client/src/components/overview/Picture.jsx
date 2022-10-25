import React from 'react';

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
        console.log("HITHITHIT: ", styles[i].style_id, this.props.selectedStyle)
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
        <h1>Main Photo</h1>
        {mainPhoto ? <img src={mainPhoto["thumbnail_url"]} alt="lll"/>
          : "Loading"
        }
        <h1>Other Photos</h1>
        {selectedStylePhotos ? (selectedStylePhotos.map((photo, index) => (
          <img key={index} src={photo["thumbnail_url"]} alt="lll" onClick = {this.clickStyle}/>
        )))
        : "Loading"
        }
      </div>
    )
  }
}

export default Picture;