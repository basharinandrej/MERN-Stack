import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import AuthPade from "./pages/AuthPade";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import LinksPage from "./pages/LinksPage";

const routes = ( isAuthentication ) => {
    if (isAuthentication) {
       return (
           <Switch>
               <Route path="/" exact render={() => <AuthPade/> }/>
               <Route path="/create" render={() => <CreatePage/>}/>
               <Route path="/links" render={() => <LinksPage/>}/>
               <Route path="/details:id" render={() => <DetailPage/>}/>
               <Redirect to="/create" />
           </Switch>
       )
    }

    return (
        <Switch>
            <Route path="/" render={() => <AuthPade/>}/>
            <Redirect to="/" />
        </Switch>
    )
}

export default routes