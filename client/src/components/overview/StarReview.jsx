import React from 'react';
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

// https://blog.logrocket.com/build-a-half-star-rating-component-in-react-from-scratch/

class StarReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      averageRating: 0,
      ratings: {},
      starRating: []
    }
    this.roundStars = this.roundStars.bind(this);
  }

  // update activeStars to nearest quarter, and create array of 1s and remainder. ex) 4.25 --> [1,1,1,1,0.25], 0.5 --> [0.5, 0, 0, 0, 0]
  // activeStar is expected to be 0-5, array will always be length = 5
  roundStars() {
    //calculate average rating from rating object
    let totalRating = 0;
    let count = 0;
    for (var keys in this.props.ratings) {
      totalRating += parseInt(keys * this.props.ratings[keys])
      count += parseInt(this.props.ratings[keys])
    }
    let avgRating = totalRating / count

    // round to nearest quarter
    const roundedStar = (Math.round(avgRating * 4) / 4).toFixed(2);
    const starRating = [0,0,0,0,0]
    var temp = roundedStar
    for (var i = 0; i < roundedStar-1;i++) {
      starRating[i] = 1
      temp--
    }
    if(temp !== 0) {
      starRating[i] = parseFloat(temp)
    }
    return { starRating, roundedStar }
  }

  // On initial componeneDidMount, this star rating will be calculated for dummy data
  componentDidMount() {
    const stars = this.roundStars()
    const starRating = stars.starRating
    const roundedStar = stars.roundedStar
    // update starRating state to starRating array
    this.setState({starRating: starRating})
    this.setState({averageRating: roundedStar})
  }

  // on props.ratings update (get request completion), rerun to update star rating to values from get request
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    const stars = this.roundStars()
    const starRating = stars.starRating
    const roundedStar = stars.roundedStar
    if (this.props.ratings !== prevProps.ratings) {
      this.setState({ratings: this.props.ratings})
      this.setState({starRating: starRating})
      this.setState({averageRating: roundedStar})
    }
  }

  render() {
    return (
      <div>
        <Box
          sx={{
            display: "inline-flex",
            position: "relative",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          {this.state.starRating.map((arr, index) => {
            if(arr === 1) {
              return (
                <Box key={index}>
                  <StarIcon />
                </Box>)
            }
            if(arr === 0) {
              return (
                <Box key={index}>
                  <StarBorderIcon />
                </Box>)
            }
            if(arr === 0.25) {
              return (
                <Box position="relative" key={index}>
                  <Box sx={{ width: "43%", overflow: "hidden", position: "absolute" }}>
                    <StarIcon />
                  </Box>
                  <Box>
                    <StarBorderIcon />
                  </Box>
                </Box>
              )
            }
            if(arr === 0.50) {
              return (
                <Box position="relative" key={index}>
                  <Box sx={{ width: "50%", overflow: "hidden", position: "absolute" }}>
                    <StarIcon />
                  </Box>
                  <Box>
                    <StarBorderIcon />
                  </Box>
                </Box>
              )
            }
            if(arr === 0.75) {
              return (
                <Box position="relative" key={index}>
                  <Box sx={{ width: "60%", overflow: "hidden", position: "absolute" }}>
                    <StarIcon />
                  </Box>
                  <Box>
                    <StarBorderIcon />
                  </Box>
                </Box>
              )
            }
            return (
              <Box key={index}>
                <StarBorderIcon />
              </Box>
            )
          })}
        </Box>
      </div>

    );
  }
}

export default StarReview;