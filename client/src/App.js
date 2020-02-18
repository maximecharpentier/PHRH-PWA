import React from 'react';
import Navbar from './components/Navbar/Navbar.js';
import Footer from './components/Footer/Footer.js';
import Status from './components/Visitor/Status/Status.js';
import Planner from './components/Visitor/Planner/Planner.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Pages
import Login from './pages/Login'

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Navbar />
        </header>
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Status} />
          <Route path="/planner" component={Planner} />
          {/* <Route path="/plannification" component={plannification} /> */}
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
