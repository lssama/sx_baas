import * as types from '../mutation-types'
import { chainList, addChain, chainInfo } from '../../service'  
import router from '../../router'
import { Message } from 'element-ui'

const state = {
  // page: 1,
  chainList: [],
  chaininfo:[],
  // logList: [],
  total: 0,
  allChain:[]
  // pageIndex:1
  // pageSize:10
}

// getters
// 获取这个模块下面传出去的属性
const getters = {
  // page: state => state.page,
  chainList: state => state.chainList,
  // logList: state => state.logList,
  total: state => state.total,
  chaininfo: state => state.chaininfo,
  allChain: state => state.allChain
  // pageIndex: state => state.pageIndex
  // pageSize: state => state.chaininfo
}

// actions
// 动作函数，逻辑处理
const actions = {
  getChainList({ commit, state }, params) {
    chainList(params)
      .then(doc => {
        if (doc.success) {
          let dataList = doc
          // console.log(dataList)
          commit(types.CHAIN_LIST, dataList)
        }
      })
  },

  getAllchain({ commit, state }, params) {
    chainList(params)
      .then(doc => {
        if (doc.success) {
          let dataList = doc
          commit(types.ALL_CHAIN, dataList)
        }
      })
  },

  createChain({ commit, state }, params) {
    // console.log(params)
    addChain(params)
      .then(doc => {
        if (doc.success) {
          // console.log(doc.Data)
          if(doc.ErrCode === 0) {
            Message("创建成功")
          } else {
            Message.error("创建失败")
          }
        }else {
          Message.error("网络错误")
        }
      })
  },

  getChaininfo ({ commit, state }, params) {
    chainInfo(params)
      .then(doc => {
        if (doc.success) {
          let info = doc
          // console.log(doc)
          commit(types.CHAIN_INFO, info)
        }
      })
  },
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
