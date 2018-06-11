
import Vue from 'vue'
import Vuex from 'vuex'
import test from './modules/test'
import createLogger from '../helper/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = () => new Vuex.Store({
  modules: {
    test
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default store;