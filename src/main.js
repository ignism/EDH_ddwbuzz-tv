import './assets/fonts/Patron/Patron.css'
import './assets/png/pattern01.png'
import './assets/png/pattern02.png'
import './assets/png/pattern03.png'
import './assets/png/pattern04.png'
import './assets/png/pattern05.png'
import './assets/png/pattern06.png'
import './assets/png/pattern07.png'
import './assets/png/pattern08.png'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Siema from 'vue2-siema'
import store from './store'

Vue.config.productionTip = false

Vue.use(Siema)

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  components: { App },
  template: '<App/>'
})
