// const URL1 = 'http://106.75.171.117:19984/v1'
const URL1 = 'http://106.75.10.236:19984/v1'
// const URL = 'http://106.75.171.117:8088/v1'
const URL = 'http://106.75.10.236:8088/v1'
module.exports = {
  name: 'name',
  CORS: ['http://106.75.10.236:8088'],
  // CORS: ['http://106.75.171.117:8088'],
  YQL: [''],
  API: {
    bListUrl: `${URL1}/blocks/PagingGetBlocks`,
    bHeightUrl: `${URL1}/blocks/height`,
    bIdUrl: `${URL1}/blocks`,
    txUrl: `${URL1}/transactions`,

    contractListUrl: `${URL}/contract/operate`,
     
    createContractUrl:`${URL}/contract/create`,
    
    chainListUrl:`${URL1}/chains`,
   
  }
}
