import Vue from 'vue'
import App from './App.vue'
import store from './store'
//Amplify
import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);


Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
