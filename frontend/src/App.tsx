import * as React from 'react';

import { Switch, Route, Link } from 'react-router-dom';

import Header from './components/Header';
import SearchPage from './pages/SearchPage';

export default function App(): JSX.Element {
  return (
    <>
      <Link to="/">
        <Header />
      </Link>
      <Switch>
        <Route exact path="/" component={SearchPage} />
      </Switch>
    </>
  );
}
