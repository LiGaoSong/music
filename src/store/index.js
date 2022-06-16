import { createStore } from 'vuex'
import home from './home'
import singer from './singer'

export default createStore({
  modules: {
    home,
    singer
  }
})
