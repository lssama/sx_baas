/**
 * @namespace service请求合并
 * @description service整合
 * @name service
 * @export service
 */

import { blocksList, blocksHDetail, blocksIDetail } from './block'
import { txList, txDetail } from './tx'
import { contractList, contractDetail ,addContract,exeConNow,LogMsg } from './contract'

import { chainList, addChain, chainInfo } from './chain'

import { logIn } from './logIn'


export {
  blocksList,
  blocksHDetail,
  blocksIDetail,

  txList,
  txDetail,

  contractList,
  contractDetail,
  addContract,
  exeConNow,
  LogMsg,

  chainList,
  addChain,
  chainInfo,

  logIn
}
