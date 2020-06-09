import React from "react";
import Navbar from "./components/Navbar/Navbar.js";
import Footer from "./components/Footer/Footer.js";
import Manage from "./components/Manage/Manage";
import Dashboard from "./components/Dashboard/Dashboard";
// import EdtContextProvider from './contexts/edt.context';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./styles/master.scss";
import "./App.scss";

// Pages
import Login from "./pages/Login";

const App = () => {
  return (
    <div className="App">
      {/* <EdtContextProvider> */}
      <Router>
        <header className="App-header">
          <Navbar />
        </header>
        <Switch>
          <Dashboard exact path="/" />
          <Login path="/login" />
          <Manage path="/manage" />
        </Switch>
      </Router>
      <Footer />
      {/* </EdtContextProvider> */}
    </div>
  );
};

export default App;
