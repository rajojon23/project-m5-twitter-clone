import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {CurrentUserProvider} from "./CurrentUserContext";
import { TweetProvider } from "./TweetContext";

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <TweetProvider>
        <App />
      </TweetProvider>
    </CurrentUserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


