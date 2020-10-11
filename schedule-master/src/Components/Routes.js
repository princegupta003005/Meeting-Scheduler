import React  from 'react';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import Home from './Home';
import newmeeting from './newmeeting';




const Routes=()=>{
    return(
        <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/newmeeting' component={newmeeting}/>
        </Switch>
        </BrowserRouter>
    )
}

export default Routes;