import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/block/index'
import blockInfo from '@/components/block/block-info'
import transactionInfo from '@/components/block/transaction-info'
import contract from '@/components/contract/index'
import contractInfo from '@/components/contract/contract-info'
import log from '@/components/contract/log'
import deploy from '@/components/deploy/index'
import monitoring from '@/components/monitoring/index'
import manage from '@/components/manage/index'
import alarm from '@/components/alarm/index'
import logs from '@/components/log'
import login from '@/components/login'
import chainlsit from '@/components/chainlist'
import chaininfo from '@/components/chainlist/chain-info'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/chainlist',
      name: 'chainlist',
      component: chainlsit
    },
    {
      path: '/chain/info',
      name: 'chaininfo',
      component: chaininfo
    },
    {
      path: '/block/info',
      name: 'blockInfo',
      component: blockInfo
    },
    {
      path: '/transaction/info',
      name: 'transactionInfo',
      component: transactionInfo
    },
    {
      path: '/contract',
      name: 'contract',
      component: contract
    },
    {
      path: '/contract/info',
      name: 'contractInfo',
      component: contractInfo
    },
    {
      path: '/log',
      name: 'log',
      component: log
    },
    {
      path: '/deploy',
      name: 'deploy',
      component: deploy
    },
    {
      path: '/monitoring',
      name: 'monitoring',
      component: monitoring
    },
    {
      path: '/manage',
      name: 'manage',
      component: manage
    },
    {
      path: '/alarm',
      name: 'alarm',
      component: alarm
    },
    {
      path: '/logs',
      name: 'logs',
      component: logs
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   let isLogin = sessionStorage.getItem('publicKey')
//   if(isLogin) {
//     next()
//   }else if (to.path =='/') {
//     next()
//   }else {
//     next('/')
//   }
// })

export default router