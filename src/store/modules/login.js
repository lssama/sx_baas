import * as types from '../mutation-types'
import { logIn } from '../../service'  
import router from '../../router'
import { Message } from 'element-ui'

const state = {
  
}

// getters
// 获取这个模块下面传出去的属性
const getters = {
  // pageSize: state => state.chaininfo
}

// actions
// 动作函数，逻辑处理
const actions = {
  getPublickey({commit,state},params) {
    // console.log(params)
      logIn(params)
      .then(doc => {
          // console.log(doc)
          // console.log(doc.returnData.public_key)
          if(doc.returnTag === '0') {
            sessionStorage.setItem('publicKey',doc.returnData.public_key)
            sessionStorage.setItem('user',params.user_name)
            router.replace({path:'/chainList'})
          }else {
            Message.error('登录失败')
          }
      })
  }
}

// mutations
// state值修改
const mutations = {
  [types.CHAIN_LIST](state, dataList) {
    // console.log(dataList)
    state.chainList = dataList.Infos
    state.total = dataList.TotalNum
  },
  [types.CHAIN_INFO](state, info) {
    state.chaininfo = info
  },
  [types.ALL_CHAIN](state,dataList) {
    state.allChain=dataList.Infos
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
