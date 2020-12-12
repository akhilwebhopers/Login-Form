import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
            <Switch>
              <Route component={Login} path='/login'/>
              <Route component={Home} path='/home'/>
              <Route component={SignUp} path='/signup'/> 
              <Route component={Login}/>
            </Switch>
     </BrowserRouter>

    </div>
  );
}

export default App;
