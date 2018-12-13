import request from '../untils/request'
import config from '../untils/config'

const { API } = config
const { chainListUrl } = API

async function chainList (data) {
  // console.log(data)
  return request({
    url: chainListUrl,
    method: 'get',
    data
  })
}

async function addChain (data) {
  return request({
    url: chainListUrl,
    method: 'post',
    data
  })
}

async function chainInfo (data) {
  return request({
    url: `${chainListUrl}/${data.chainid}`,
    method: 'get',
    data
  })
}
export {
  chainList,
  addChain,
  chainInfo
}
