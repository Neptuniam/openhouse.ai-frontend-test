import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

// Register all Vue components here for global access and cleaner code.
// Usually this is it's own file but I don't have many components and this is simpler.
Vue.component('MainDisplay', require('./components/MainDisplay.vue').default);


new Vue({
  render: h => h(App),
}).$mount('#app')
