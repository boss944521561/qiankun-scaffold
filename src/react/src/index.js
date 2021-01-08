import './public-path';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

function render(props) {
  const { container } = props;
  ReactDOM.render(<App />, container ? container.querySelector('#pmsr') : document.querySelector('#pmsr'));
}

function storeTest(props) {
  props.onGlobalStateChange((value, prev) => {
    console.log(`%c[子应用${props.name}接收状态]`, 'color: red;font-weight:bold;', value, prev);
  }, true);
  props.setGlobalState({
    user: {
      name: props.name,
    },
  });
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap(props) {
  console.log(`%c[子应用${props.name}生命周期bootstrap]`, 'color: green;font-weight:bold;', props);
}

export async function mount(props) {
  console.log(`%c[子应用${props.name}生命周期mount]`, 'color: green;font-weight:bold;', props);
  storeTest(props);
  render(props);
}

export async function unmount(props) {
  console.log(`%c[子应用${props.name}生命周期unmount]`, 'color: green;font-weight:bold;', props);
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#pmsr') : document.querySelector('#pmsr'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
