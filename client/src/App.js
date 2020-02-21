import React from 'react';
import Navbar from './components/Navbar/Navbar.js';
import Footer from './components/Footer/Footer.js';
import Status from './components/Visitor/Status/Status.js';
import Dashboard from './components/Visitor/Dashboard/Dashboard.js';
import Planner from './components/Visitor/Dashboard/Planner/Planner.js';
import EdtContextProvider from './contexts/edt.context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/master.scss';
import './App.scss';

// Pages
import Login from './pages/Login'
import HotelsManagement from './pages/Managers/Hotels/Hotels'
import HotelsFormula from './pages/Managers/Hotels/Formula'
import ManagersManagement from './pages/Managers/Managers/Managers'
import VisitorsManagement from './pages/Managers/Visitors/Visitors'
import ManagerStatus from './pages/Managers/Status/Status'
import VisitorsFormula from './pages/Managers/Visitors/Formula'

const App = () => {
  return (
    <div className="App">
      <EdtContextProvider>
          <Router>
          <header className="App-header">
            <Navbar />
          </header>
          <Switch>
            <Route exact path="/" component={Status} />
            <Route path="/login" component={Login} />
            <Route path="/managers" component={ManagerStatus} />
            <Route path="/hotels-management" component={HotelsManagement} />
            <Route path="/hotels-formula" component={HotelsFormula} />
            <Route path="/managers-management" component={ManagersManagement} />
            <Route path="/visitors-management" component={VisitorsManagement} />    
            <Route path="/visitors-formula" component={VisitorsFormula} />    
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/planner" component={Planner} />
          </Switch>
        </Router>
        <Footer />
      </EdtContextProvider>
    </div>
  );
}

export default App;
