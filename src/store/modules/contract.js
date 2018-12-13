import * as types from '../mutation-types'
import { contractList, addContract, exeConNow, LogMsg } from '../../service'
import router from '../../router'
import { Message } from 'element-ui'
const state = {
  page: 1,
  contractList: [],
  logList: [],
  totalCount: 0,
  contractDetails: {},
  logInfo:[]
}

// getters
// 获取这个模块下面传出去的属性
const getters = {
  page: state => state.page,
  contractList: state => state.contractList,
  logList: state => state.logList,
  totalCount: state => state.totalCount,
  logInfo: state => state.logInfo,
}

// actions
// 动作函数，逻辑处理
const actions = {
  getContractList({ commit, state }, params) {
    let data = JSON.stringify({
      cmd: 'contractlist',
      publicKey:sessionStorage.getItem('publicKey') 
    })
    contractList(data)
      .then(doc => {
        if (doc.success) {
          let dataList = doc.data
          commit(types.CONTRACT_LIST, dataList)
        }
      })
  },
  getContractDetail({ commit, state }, info) {
    // console.log(info)
    // sessionStorage.setItem('CONTRACT_DETAIL', JSON.stringify(info))
    // 命名的路由
    router.push({ path: '/contract/info', query: { contractId: info.ID } })
  },
  getDetails({ commit, state }, params) {
    // console.log(params)
    contractList(params)
      .then(doc => {
        // console.log(doc)
        if (doc.success) {
          if(doc.status === 0) {
            let contractDetails = doc.data
            // sessionStorage.setItem('CONTRACT_DETAIL', JSON.stringify(doc.data))
            commit(types.CONTRACT_DETAIL, contractDetails)
          }else if(doc.status === 201004) {
            let contractDetails = doc.data
            // sessionStorage.setItem('CONTRACT_DETAIL', JSON.stringify(doc.data))
            commit(types.CONTRACT_DETAIL, contractDetails)
            Message.error('该用户不具有该权限')
          }
        }
      })
  },
  // getLogList ({ commit, state }, params) {
  //   console.log(params)
  //   let page = params.page
  //   commit(types.CONTRACT_PAGE, page)
  //   let data = JSON.stringify({
  //     cmd: 'contractloglist',
  //     contractID: params.ID,
  //     pageIndex: page,
  //     pageSize: 10
  //   })
  //   contractList(data)
  //     .then(doc => {
  //       console.log(doc)
  //       // if (doc.success) {
  //       //   let dataList = doc.data
  //       //   // commit(types.LOG_LIST, dataList)
  //       // }
  //     })
  // },

  getLogList({ commit, state }, params) {
    // console.log(params)
    contractList(params)
      .then(doc => {
        // console.log(doc)
        if (doc.success) {
          let dataList = doc.data
          commit(types.LOG_LIST, dataList)
        }
      })
  },
  getLogDetail({ commit, state }, info) {
    // console.log(info)
    // sessionStorage.setItem('LOG_DETAIL', JSON.stringify(info))
    // 命名的路由
    // router.push({ path: '/log' })
    router.push({path:'/log',query:{info}})
  },
  createConFun({ commit, state }, params) {
    // console.log(444)
    // console.log(params)
    addContract(params)
      .then(doc => {
        if (doc.success) {
          let dataList = doc.Infos
          // console.log(doc)
          // commit(types.CHAIN_LIST, dataList)
        }
      })
  },
  exeConFun({ commit, state }, params) {
    // console.log(444)
    // console.log(params)
    exeConNow(params)
      .then(doc => {
        // console.log(doc)
        let data = JSON.parse(doc.data)
        if(doc.succeed) {
          // Message("执行成功")
          if(data.isSuccess) {
            Message("执行成功")
          }else {
            Message.error("执行失败")
          }
        }else {
          Message.error("执行失败")
        }
      })
  },

  getLogInfoFun ({ commit, state }, params) {
    (params)
    LogMsg(params)
      .then(doc => {
        // console.log(doc)
        if (doc.success) {
          let info = doc.data
          // console.log(info)
          // sessionStorage.setItem('LOG_DETAIL', JSON.stringify(info))
          commit(types.LOG_DETAIL, info)
        }
      })
  },
}

// mutations
// state值修改
const mutations = {
  [types.CONTRACT_LIST](state, dataList) {
    state.contractList = dataList
  },
  [types.CONTRACT_DETAIL](state, info) {
    state.contractDetails = info
  },
  [types.LOG_LIST](state, dataList) {
    state.logList = dataList.Logs
    state.totalCount = dataList.TotalNum
    // console.log(dataList.TotalNum)
  },
  [types.CONTRACT_PAGE](state, page) {
    state.page = page
  },
  [types.LOG_DETAIL](state, info) {
    state.logInfo = info
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
