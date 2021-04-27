import Vue from 'vue'
import App from './App.vue'
import store from './store'
//Amplify
import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue';
import aws_exports from './aws-exports';
import router from './router'
import vuetify from './plugins/vuetify'

Amplify.configure(aws_exports);

// register global components
require('./utilities/globalComponentLoader')

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
