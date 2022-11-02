import React from "react"
import "./App.css";
import Overview from "../src/components/overview/Overview.jsx";
import Related from "../src/components/related/Related.jsx";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productId: 71701,
      tempId: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.updateMainState = this.updateMainState.bind(this)
  }

  // Updates tempId on user input, which is then used to update productId on click
  handleChange(e) {
    this.setState({
      tempId: e.target.value
    })
  };

  // Takes the final form of tempId and updates productId
  handleSubmit(e) {
    this.setState({
      productId: this.state.tempId
    })
  }

  updateMainState(e) {
    e.preventDefault();
    this.setState({
      productId: e.target.name
    })
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <div >
          <input value={this.state.userInput} placeholder="Product ID" onChange = {this.handleChange}></input>
          <button onClick = {this.handleSubmit}>Submit</button>
          <h2>App.jsx Product ID: {this.state.productId}</h2>
        </div>
        <div className="overview-container">
          <Overview productId = {this.state.productId} />
        </div>
        <br></br>
        <div>
          <Related productId = {this.state.productId} TestID="Related" updateMainState = {(e) => {this.updateMainState(e)}}/>
        </div>
      </div>
    );
  }
}

export default App;
