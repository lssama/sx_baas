import request from '../untils/request'
import config from '../untils/config'

const { API } = config
const { txUrl } = API

async function txList (data) {
  return request({
    url: txUrl,
    method: 'GET',
    data
  })
}
async function txDetail (data) {
  return request({
    url: `${txUrl}/${data.transactionid }`,
    method: 'GET',
    data
  })
}

export {
  txList,
  txDetail
}
