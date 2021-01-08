import './public-path';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import routes from './router';
import store from './store';

let router = null;
let instance = null;

function render(props = {}) {
  const { container } = props;
  router = createRouter({
    history: createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/pms/v' : '/'),
    routes,
  });

  instance = createApp(App);
  instance.use(router);
  instance.use(store);
  instance.mount(container ? container.querySelector('#pmsv') : '#pmsv');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap(props) {
  console.log(`%c[子应用${props.name}生命周期bootstrap]`, 'color: green;font-weight:bold;', props);
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

export async function mount(props) {
  console.log(`%c[子应用${props.name}生命周期mount]`, 'color: green;font-weight:bold;', props);
  storeTest(props);
  render(props);
  instance.config.globalProperties.$onGlobalStateChange = props.onGlobalStateChange;
  instance.config.globalProperties.$setGlobalState = props.setGlobalState;
}

export async function unmount(props) {
  console.log(`%c[子应用${props.name}生命周期unmount]`, 'color: green;font-weight:bold;', props);
  instance.unmount();
  instance._container.innerHTML = '';
  instance = null;
  router = null;
}
