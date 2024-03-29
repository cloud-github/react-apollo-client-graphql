import 'isomorphic-fetch';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import Helmet from 'react-helmet';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {
  ApolloProvider,
  getDataFromTree,
} from 'react-apollo';
import HtmlContent from './src/htmlContent';
import {END_POINT_URL} from './src/constants'
import App from './src/App';
import assets from './src/assets';

const app = express();

app.use(express.static(path.resolve(__dirname, '../build'), { index: false }));

app.use(async (req, res) => {
  const client = new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: END_POINT_URL,
    }),
    cache: new InMemoryCache(),
  });
  const app = (
    <ApolloProvider client={client}>
      <Router location={req.url} context={{}}>
        <App />
      </Router>
    </ApolloProvider>
  );
  await getDataFromTree(app);
  const state = client.extract();
  const content = ReactDOMServer.renderToStaticMarkup(app);
  const helmet = Helmet.renderStatic();
  const html = ReactDOMServer.renderToStaticMarkup(
    <HtmlContent content={content} helmet={helmet} assets={assets} state={state} />,
  );
  res.status(200);
  res.send(`<!doctype html>${html}`);
  res.end();
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on ${port} port`);
});
