import './index.less';
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../src/pages/home';
const Tabs = lazy(() => import('../src/pages/tabs'));

// 注册主应用
const Main = () => {
  return (
    <Router basename='/'>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/pms" exact component={Tabs} />
          <Route path="/pms/*" exact component={Tabs} />
        </Switch>
      </Suspense>
    </Router>
  );
};
ReactDOM.render(<Main />, document.getElementById('main'));
