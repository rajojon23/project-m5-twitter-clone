import React, {useContext} from "react";

import Profile from "./Profile";

import Sidebar from './Sidebar';
import Homefeed from "./Homefeed";
import Notifications from "./Notifications";
import Bookmarks from "./Bookmarks";
import TweetDetails from "./TweetDetails";
import MeowProfile from "./MeowProfile";

import {COLORS} from "./constants";
import GlobalStyles, { themeVars } from "./GlobalStyles";
import styled from "styled-components";
import {  BrowserRouter, Switch, Route } from "react-router-dom";
import {CurrentUserContext} from "./CurrentUserContext";

const App = () => {
  
  const {
    currentUser,
    status
  } = useContext(CurrentUserContext);


  return (
    
    <BrowserRouter>
      <Display>
        <Sidebar></Sidebar>
        <Switch>
          <Route exact path="/">
            <Homefeed />
          </Route>
          <Route exact path="/notifications">
            <Notifications />
          </Route>
          <Route exact path="/bookmarks">
            <Bookmarks />
          </Route>
          <Route exact path="/tweet/:tweetId">
            <TweetDetails />
          </Route>
          <Route exact path="/treasurymog/profile">
            <Profile />
          </Route>
          <Route exact path="/:handle/profile">
            <MeowProfile />
          </Route>
        </Switch>
      </Display>
    </BrowserRouter>
    
  );
};

const Display = styled.div `
  display: flex;
  flex-direction: row;

`;






export default App;
