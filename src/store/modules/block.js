import * as types from '../mutation-types'
import { blocksList, blocksHDetail, blocksIDetail } from '../../service'
import { Message } from 'element-ui'

const state = {
  page: 1,
  total: 0,
  blocksList: [],
  blocksInfo: {}
}

// getters
// 获取这个模块下面传出去的属性
const getters = {
  blocksList: state => state.blocksList,
  blocksInfo: state => state.blocksInfo
}

// actions
// 动作函数，逻辑处理
const actions = {
  getBlocksList ({ commit, state }, data) {
    // console.log(data)
    blocksList(data)
      .then(doc => {
        // console.log(doc)
        if (doc.success) {
          if (doc.Blocks != null) {
            let dataList = doc
            commit(types.BLOCK_LIST, dataList)
          }else {
            Message.error('该用户不具有该权限')
          }
        }
      })
  },
  getBlocksHDetail ({ commit, state }, params) {
    blocksHDetail(params)
      .then(doc => {
        if (doc.success) {
          let info = doc
          commit(types.BLOCK_DETAIL, info)
        }
      })
  },
  getBlocksIDetail ({ commit, state }, params) {
    blocksIDetail(params)
      .then(doc => {
        if (doc.success) {
          let info = doc
          commit(types.BLOCK_DETAIL, info)
        }
      })
  }
}

// mutations
// state值修改
const mutations = {
  [types.BLOCK_LIST] (state, dataList) {
    state.page = dataList.PageIndex
    state.total = dataList.TotalNum
    state.blocksList = dataList.Blocks
  },
  [types.BLOCK_DETAIL] (state, info) {
    state.blocksInfo = info
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
