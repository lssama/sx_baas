import Vue from 'vue'
import vuex from 'vuex'
import block from './modules/block'
import tx from './modules/tx'
import contract from './modules/contract'
import chain from './modules/chain'
import login from './modules/login'

// 修改日志
import createLogger from 'vuex/dist/logger'

Vue.use(vuex)
// 开发环境中为true，否则为false
const debug = process.env.NODE_ENV !== 'production'

export default new vuex.Store({
  modules: {
    block,
    tx,
    contract,
    chain,
    login
  },
  // 开发环境下显示vuex的状态修改
  plugins: debug ? [createLogger()] : []
})
