import request from '../untils/request'
import config from '../untils/config'

const { API } = config
const { bHeightUrl, bIdUrl } = API

async function blocksList (data) {
  // console.log(data)
  return request({
    url: bIdUrl,
    method: 'GET',
    data
  })
}
async function blocksHDetail (data) {
  return request({
    // url: `${bHeightUrl}/?chainID=${data.chainID}&height=${data.height}`,
    url: bHeightUrl,
    method: 'GET',
    data
  })
}
async function blocksIDetail (data) {
  return request({
    url: `${bIdUrl}/${data}`,
    method: 'GET'
  })
}

export {
  blocksList,
  blocksHDetail,
  blocksIDetail
}
