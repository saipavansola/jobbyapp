import {Switch, Redirect, Route} from 'react-router-dom'

import Home from './components/HomeRoute'
import Job from './components/JobsRoute'
import Login from './components/LoginRoute'
import JobItemDetails from './components/JobItemDetailsRoute'
import NotFound from './components/notFoundRoute'

import './App.css'

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/jobs" component={Job} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/jobs/:id" component={JobItemDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </div>
)

export default App
