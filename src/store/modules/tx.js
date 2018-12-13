import * as types from '../mutation-types'
import { txList, txDetail } from '../../service'

const state = {
  page: 1,
  total: 0,
  txList: [],
  txInfo: {}
}

// getters
// 获取这个模块下面传出去的属性
const getters = {
  txList: state => state.txList,
  txInfo: state => state.txInfo
}

// actions
// 动作函数，逻辑处理
const actions = {
  getTxsList ({ commit, state }, params) {
    let data = {
      pageIndex: params,
      pageSize: 1
    }
    txList(data)
      .then(doc => {
        if (doc.success) {
          let dataList = doc
          commit(types.TX_LIST, dataList)
        }
      })
  },
  getTxDetail ({ commit, state }, params) {
    let data = params
    txDetail(data)
      .then(doc => {
        if (doc.success) {
          let info = doc
          commit(types.TX_DETAIL, info)
        }
      })
  }
}

// mutations
// state值修改
const mutations = {
  [types.TX_LIST] (state, dataList) {
    state.page = dataList.PageIndex
    state.total = dataList.TotalNum
    state.txList = dataList.tx
  },
  [types.TX_DETAIL] (state, info) {
    state.txInfo = info
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
