<template>
    <div class="page-wrap">
      <Header></Header>
      <div class="page-content-wrap wrap">
        <div class=" wrap">
          <div class="page-title-wrap">
            <div>
              <span class="page-title">{{$t('navs.blockInfo')}}</span>
            </div>
            <div class="page-nav-wrap fr">
              <ul class="link-wrap">
                <li> <router-link :to="{path: '/chainlist'}">
                    {{$t('navs.chain')}}
                  </router-link></li>
                <li><i class="el-icon-arrow-right"></i></li>
                <li>
                  <a href="#" @click="goBack">{{$t('navs.block')}}</a>
                </li>
                <li><i class="el-icon-arrow-right"></i></li>
                <li class="current">{{$t('navs.blockInfo')}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="page-content">
          <div class="abstract-wrap">
            <div class="abstract-title">{{$t('title.abstract')}}</div>
            <ul class="abstract-content">
              <li>
                <div class="li-title">{{$t('listHeader.bHeight')}}</div>
                <div>{{blocksInfo.height}}</div>
              </li>
              <li>
                <div class="li-title">{{$t('listHeader.bHash')}}</div>
                <div>{{blocksInfo.id}}</div>
              </li>
              <li>
                <div class="li-title">{{$t('listHeader.bVersions')}}</div>
                <div>1.0</div>
              </li>
              <li>
                <div class="li-title">{{$t('listHeader.bTime')}}</div>
                <div>{{blocksInfo&&blocksInfo.blockBody && blocksInfo.blockBody.timestamp ? blocksInfo.blockBody.timestamp : '' | timestampValue}}</div>
              </li>
              <li>
                <div class="li-title">{{$t('listHeader.txNumber')}}</div>
                <div class="li-link-color">{{blocksInfo&&blocksInfo.blockBody && blocksInfo.blockBody.txs ? blocksInfo.blockBody.txs.length : 0}}</div>
              </li>
              <li>
                <div class="li-title">{{$t('listHeader.preHash')}}</div>
                <div>
                    <span class="li-link-color">{{blocksInfo&&blocksInfo.blockBody && blocksInfo.blockBody.preHash ? blocksInfo.blockBody.preHash : ''}}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="table-wrap">
            <div class="table-title table-title-top">{{$t('title.transaction')}}</div>
            <el-table
              :data="blocksInfo&&blocksInfo.blockBody && blocksInfo.blockBody.txs ? blocksInfo.blockBody.txs : []"
              :empty-text="$t('message.noData')"
              style="width: 100%">
              <el-table-column
                prop="id"
                :label="$t('listHeader.txHash')">
                <template slot-scope="scope">
                  <!-- <router-link :to="{path: '/transaction/info', query: { transactionid : scope.row.id }}"> -->
                    <span @click="toTxInfo(scope)" class="table-link-color">{{scope.row.id}}</span>
                  <!-- </router-link> -->
                </template>
              </el-table-column>
              <el-table-column
                prop="body.unixTime"
                :label="$t('listHeader.txTime')"
                width="180">
                <template slot-scope="scope">
                  <span>{{scope.row.body.unixTime | unixTimeValue}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="footer-page-wrap">
        <Footer></Footer>
      </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import moment from 'moment'

import Header from '../header'
import Footer from '../footer'
export default {
  data () {
    return {
    }
  },
  components: {
    Header,
    Footer
  },
  mounted () {
    // if (this.$route.query.height) {
    //   this.getHDetail(this.$route.query.height)
    // } else if (this.$route.query.blockid) {
    //   this.getIDetail(this.$route.query.blockid)
    // }
    this.getHDetail(this.$route.query)
    // console.log(this.$route.query)
  },
  computed: {
    blocksInfo: {
      get () {
        return this.$store.state.block.blocksInfo
      }
    },
    txList: {
      get () {
        return this.$store.state.tx.txList
      }
    }
  },
  methods: {
    ...mapActions(['getBlocksHDetail']),
    ...mapActions(['getBlocksIDetail']),

    toTxInfo(data){
      let id = data.row.id
      // console.log(id)
      this.$router.push({path:'/transaction/info',query:{chainID:this.$route.query.chainID,id}})
    },
    
    goBack() {
      this.$router.go(-1)
    },

    getHDetail (params) {
      let data = {
        publicKey:sessionStorage.getItem('publicKey'),
        signature:'abcd',
        chainID:params.chainID,
        height:params.height
      }
      this.getBlocksHDetail(data)
    },
    getIDetail (params) {
      this.getBlocksIDetail(params)
    }
  },
  filters: {
    timestampValue (value) {
      return moment(value * 1000).format('YYYY-MM-DD HH:mm:ss')
    },
    unixTimeValue (value) {
      return moment(value * 1000).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  watch: {
    '$route' (to, from) {
      if (this.$route.query.height) {
        this.getHDetail(this.$route.query.height)
      } else if (this.$route.query.blockid) {
        this.getIDetail(this.$route.query.blockid)
      }
    }
  }
}
</script>
<style lang="less">
  @import '../../assets/css/page.less';
</style>
