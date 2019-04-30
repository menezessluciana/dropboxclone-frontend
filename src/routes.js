import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


//BrowserRouter = default
//Switch = Cada endereço chame apenas uma rota

import Main from './pages/Main';
import Box from './pages/Box';
const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Main}></Route>
            <Route path="/box/:id" component={Box}></Route>
        </Switch>
    </BrowserRouter>
);

export default Routes;