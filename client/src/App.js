import React, {useState} from "react";
import Navbar from "./components/Navbar/Navbar.js";
import Footer from "./components/Footer/Footer.js";
import Manage from "./components/Manage/Manage";
import Planner from "./components/Planner/Planner";
// import EdtContextProvider from './contexts/edt.context';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./styles/master.scss";
import "./App.scss";
import { AuthContext } from "./contexts/AuthContext";


import PrivateRoute from "./PrivateRoute"

// Pages
import Login from "./components/Login/Login";


const App = () => {
  const existingTokens = localStorage.getItem("token");
  const [authToken, setAuthToken] = useState(existingTokens);
  
  const setToken = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuthToken(token);
  }
  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Login path="/login" />
          <PrivateRoute path="/manage" component={Manage} />
          <PrivateRoute path="/" component={Planner} />
        </Switch>
      </Router>
      <Footer />
    </div>
    </AuthContext.Provider>
  );
};

export default App;
