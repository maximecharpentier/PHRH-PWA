import React from "react";
import Navbar from "./components/Navbar/Navbar.js";
import Footer from "./components/Footer/Footer.js";
import Manage from "./components/Manage/Manage";
import Dashboard from "./components/Dashboard/Dashboard";
// import EdtContextProvider from './contexts/edt.context';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/master.scss";
import "./App.scss";
import axios from "axios";

// Pages
import Login from "./pages/Login";

const App = () => {
  axios
    .get("http://35.180.35.120:8081/hotels")
    .then(res => console.log(res))
    .catch(err => console.log(err));
  return (
    <div className="App">
      {/* <EdtContextProvider> */}
      <Router>
        <header className="App-header">
          <Navbar />
        </header>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/manage" component={Manage} />
        </Switch>
      </Router>
      <Footer />
      {/* </EdtContextProvider> */}
    </div>
  );
};

export default App;
