import React from "react"
import "./App.css";
import Overview from "../src/components/overview/Overview.jsx";
import Related from "../src/components/related/Related.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 71697,
      tempId: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.updateMainState = this.updateMainState.bind(this)
    this.reportMetaData = this.reportMetaData.bind(this)
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

  reportMetaData(e) {
    //console.log('REF', this.newRef.current.className);
    console.log('TARGET', e.target.className);
    console.log('Component', e.currentTarget.className);
    console.log('time', new Date((Date.now())));

  }

  updateMainState(e) {
    e.preventDefault();
    this.setState({
      productId: e.target.name
    })
  }

  componentDidMount() {
    console.log("STATE PRODUCT ID: ", this.state.productId)
  }

  render() {
    return (
      <div className="App">
        <div>
          <input value={this.state.userInput} placeholder="Product ID" onChange = {this.handleChange}></input>
          <button onClick = {this.handleSubmit}>Submit</button>
        </div>
        <div className="Overview" onClick={(e) => {this.reportMetaData(e)}}>
          <Overview productId = {this.state.productId} onClick={(e) => {this.reportMetaData(e)}}/>
        </div>
        <br></br>
        <div className="Related" onClick={(e) => {this.reportMetaData(e)}}>
          <Related productId = {this.state.productId} TestID="Related" updateMainState = {(e) => {this.updateMainState(e)}} onClick={(e) => {this.reportMetaData(e)}}/>
        </div>
      </div>
    );
  }
}

export default App;
