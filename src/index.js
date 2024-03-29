import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import './index.css';
import App from './App';
import {END_POINT_URL} from './constants'

const client = new ApolloClient({
    ssrForceFetchDelay: 100,
    link: new HttpLink({uri:END_POINT_URL}),
    cache:new InMemoryCache().restore(window.__APOLLO_STATE__),
});

const render = module.hot ? ReactDOM.render : ReactDOM.hydrate;

render(
    <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
