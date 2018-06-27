import React, { Component } from 'react';
import './App.css';
// import Header from "./components/headerFooter/Header";
// import Footer from "./components/headerFooter/Footer";
import routes from "./routes";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Header/> */}
        {routes}
        {/* <Footer props={routes}/> */}
      </div>
    );
  }
}

export default App;
