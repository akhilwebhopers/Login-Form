import React, { Component } from 'react'
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';

class Pages extends Component {
    state = {  }
    render() { 
        return (<BrowserRouter>
            <Switch>
            <Route component={Login} path='/'/>
            <Route component={Home} path='/home'/>
            <Route component={SignUp} path='/signup'/> 
            </Switch>
            </BrowserRouter>

);
    }
}
 
export default Pages;

