import Vue from 'vue';
import Firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();
const PROJECT_NAME = 'job-portal-appl';

const configOptions = {
  apiKey: 'AIzaSyC4qibCX5r_-9D302dJdNKVJ94Cf6WwPlI',
  authDomain: `${PROJECT_NAME}.firebaseapp.com`,
  databaseURL: `https://${PROJECT_NAME}.firebaseio.com`,
  projectId: `${PROJECT_NAME}`,
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

Firebase.initializeApp(configOptions);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
