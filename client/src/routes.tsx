import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import AuthPade from "./pages/AuthPage/AuthPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import LinksPage from "./pages/LinksPage";

const routes = ( isAuthenticated: boolean ) => {
    if (isAuthenticated) {
       return (
           <Switch>
               <Route path="/create" exact render={() => <CreatePage/>}/>
               <Route path="/links" exact render={() => <LinksPage/>}/>
               <Route path="/details/:id" render={() => <DetailPage/>}/>
               <Redirect to="/create" />
           </Switch>
       )
    }

    return (
        <Switch>
            <Route path="/" exact render={() => <AuthPade/>}/>
            <Redirect to="/" />
        </Switch>
    )
}

export default routes
