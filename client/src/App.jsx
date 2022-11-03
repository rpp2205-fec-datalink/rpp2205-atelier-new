import React from "react"
import "./App.css";
import Overview from "../src/components/overview/Overview.jsx";
import Related from "../src/components/related/Related.jsx";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 71701,
      tempId: 0,
      theme: "light",
      themeName: "Dark Mode",
      buttonTheme: "dark"
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.updateMainState = this.updateMainState.bind(this)
    this.reportMetaData = this.reportMetaData.bind(this)
    this.toggleTheme = this.toggleTheme.bind(this)
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
    // console.log('TARGET', e.target.className);
    // console.log('Component', e.currentTarget.className);
    // console.log('time', new Date((Date.now())));
    var element;
    if (e.target.className.length) {
      element = e.target.className;
    } else {
      element = 'outside of data area'
    }
    var widget = e.currentTarget.className;
    var time = new Date((Date.now()))

    axios.get('/clickTracker', {
      params: {
        element: element,
        widget: widget,
        time: time
      }
    })
    .then(function (res) {
      console.log("element: ", element);
      console.log("widget: ", widget);
      console.log("time: ", time);
      console.log(res.data);
    })
    .catch(function (err) {
      console.log(err.data);
    });
  }

  updateMainState(e) {
    e.preventDefault();
    this.setState({
      productId: e.target.name
    })
  }

  componentDidMount() {
  }

  toggleTheme() {
    if (this.state.theme === 'light') {
      this.setState({theme: 'dark'});
      this.setState({themeName: "Light Mode"});
      this.setState({buttonTheme: 'light'});
    } else {
      this.setState({theme: 'light'});
      this.setState({themeName: "Dark Mode"});
      this.setState({buttonTheme: 'dark'});
    }
  };

  render() {
    return (
      <div className={`App ${this.state.theme}`}>
        <div >
          <input value={this.state.userInput} placeholder="Product ID" onChange = {this.handleChange}></input>
          <button onClick = {this.handleSubmit}>Submit</button>
        </div>
        <div className="Overview" id="overview-container" onClick={(e) => {this.reportMetaData(e)}}>
          <Overview productId = {this.state.productId} onClick={(e) => {this.reportMetaData(e)}}/>
        </div>
        <br></br>
        <div className="Related" onClick={(e) => {this.reportMetaData(e)}}>
          <Related productId = {this.state.productId} TestID="Related" updateMainState = {(e) => {this.updateMainState(e)}} onClick={(e) => {this.reportMetaData(e)}}/>
        </div>
        <button className={`toggle ${this.state.buttonTheme}`}onClick={this.toggleTheme}>{this.state.themeName}</button>
      </div>
    );
  }
}

export default App;
