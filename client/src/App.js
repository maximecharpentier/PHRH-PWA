import React from 'react';
import Navbar from './components/Navbar/Navbar.js';
import Footer from './components/Footer/Footer.js';
import Status from './components/Visitor/Status/Status.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/master.scss';

// Pages
import Login from './pages/Login'
import HotelsManagement from './pages/Managers/Hotels/Hotels'
import ManagersManagement from './pages/Managers/Managers/Managers'
// import VisitorsManagement from './pages/Managers/Visitors'

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Navbar />
        </header>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/hotels-management" component={HotelsManagement} />
          <Route path="/managers-management" component={ManagersManagement} />
          {/* <Route path="/visitors-management" component={VisitorsManagement} /> */}
          <Route path="/" component={Status} />
          {/* <Route path="/planning" component={Planning} />
          <Route path="/plannification" component={plannification} /> */}
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
