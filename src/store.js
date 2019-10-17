import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from './config'

Vue.use(Vuex)
Vue.use(axios)

export default new Vuex.Store({
  state: {
    text: '',
    posts: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    meta: [],
    errors: [],
    isBusy: true
  },
  mutations: {
    setPosts (state, posts) {
      for (let i = 0; i < 20; i++) {
        state.posts[i] = posts[i]
      }
      state.text = posts[0].text
    },
    setMeta (state, meta) {
      state.meta = meta
    },
    isBusy (state, isBusy) {
      state.isBusy = isBusy
    },
    pushErrors (state, error) {
      state.errors.push(error)
    },
    sortData (state) {
      let tmp = state.posts[0]
      state.posts[0] = state.posts[19]
      state.posts[19] = tmp
      state.text = state.posts[0].text
    }
  },
  getters: {
    getPost: (state) => (index) => {
      return state.posts[index]
    }
  },
  actions: {
    getData (context) {
      return new Promise((resolve, reject) => {
        let url = config.apiUrl + '/all'
        console.log(url)
        axios
          .get(url)
          .then(response => {
            context.commit('setPosts', response.data['feeds'])
            context.commit('setMeta', response.data['meta'])
            context.commit('isBusy', false)
            resolve('done')
          })
          .catch(e => {
            context.commit('pushErrors', e)
            context.commit('isBusy', false)
            console.log('error')
            reject(e)
          })
      })
    }
  }
})
