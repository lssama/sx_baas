import request from '../untils/request'
import config from '../untils/config'

// const { API } = config
// const { chainListUrl } = API

async function logIn (data) {
  return request({
    url: 'http://113.200.212.29:8088/unified/a/unified/unifiedInterface/loginSourceUser',
    method: 'post',
    data
  })
}
export {
  logIn
}
