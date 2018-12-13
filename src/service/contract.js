import request from '../untils/request'
import config from '../untils/config'

const { API } = config
const { contractListUrl, createContractUrl } = API

async function contractList (data) {
  return request({
    url: contractListUrl,
    method: 'post',
    data
  })
}

async function addContract (data) {
  // console.log(111)
  // console.log(data)
  return request({
    url: createContractUrl,
    method: 'post',
    data
  })
}

async function exeConNow(data){
  return request({
    url: contractListUrl,
    method: 'post',
    data
  })
}

async function LogMsg(data){
  // console.log(data)
  return request({
    url: contractListUrl,
    method: 'post',
    data
  })
}
export {
  contractList,
  addContract,
  exeConNow,
  LogMsg,
}
