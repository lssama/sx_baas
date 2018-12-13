<template>
    <div class="page-wrap">
      <Header></Header>
      <div class="page-content-wrap wrap">
        <div class=" wrap">
          <div class="page-title-wrap">
            <div>
              <span class="page-title">{{$t('navs.transactionInfo')}}</span>
            </div>
            <div class="page-nav-wrap fr">
              <ul class="link-wrap">
                <li>
                  <router-link :to="{path: '/chainlist'}">
                    {{$t('navs.chain')}}
                  </router-link>
                </li>
                <li><i class="el-icon-arrow-right"></i></li>
                <li @click="goBlock">
                  <!-- <router-link :to="{path: '/index'}"> -->
                    <a href="#">{{$t('navs.block')}}</a>
                  <!-- </router-link> -->
                </li>
                <li><i class="el-icon-arrow-right"></i></li>
                <li><a href="#" @click="goBack">{{$t('navs.blockInfo')}}</a></li>
                <li><i class="el-icon-arrow-right"></i></li>
                <li>{{$t('navs.transactionInfo')}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="page-content">
          <div class="abstract-wrap">
            <div class="abstract-title">{{$t('title.abstract')}}</div>
            <ul class="abstract-content">
              <li>
                <div class="li-title">{{$t('listHeader.txTime')}}</div>
                <div>{{txInfo && txInfo.body && txInfo.body.unixTime ? txInfo.body.unixTime : '' | unixTimeValue}}</div>
              </li>
              <li>
                <div class="li-title">{{$t('listHeader.txSender')}}</div>
                <div>{{txInfo && txInfo.body && txInfo.body.contractId ? txInfo.body.contractId : ''}}</div>
                <div></div>
              </li>
              <!-- <li>
                <div class="li-title">{{$t('listHeader.txAcceptor')}}</div>
                <div>{{txInfo && txInfo.body && txInfo.body.unixTime ? txInfo.body.unixTime : ''}}</div>
                <div></div>
              </li> -->
              <li>
                <div class="li-title">{{$t('listHeader.txAssetTypes')}}</div>
                <div>{{txInfo && txInfo.body && txInfo.body.asset ? txInfo.body.asset : ''}}</div>
              </li>
              <!-- <li>
                <div class="li-title">{{$t('listHeader.txNumber')}}</div>
                <div>
                  <router-link :to="{path: '/transaction/info'}">
                    <span class="li-link-color">{{txInfo && txInfo.body && txInfo.body.unixTime ? txInfo.body.unixTime : ''}}</span>
                  </router-link>
                </div>
              </li> -->
              <li>
                <div class="li-title">{{$t('listHeader.txMetadata')}}</div>
                <div>{{txInfo && txInfo.body && txInfo.body.payload ? txInfo.body.payload : ''}}</div>
              </li>
            </ul>
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
    this.getIDetail(this.$route.query)
    // console.log(this.$route.query)
  },
  computed: {
    txInfo: {
      get () {
        return this.$store.state.tx.txInfo
      }
    }
  },
  methods: {
    ...mapActions(['getTxDetail']),

    getIDetail (params) {
      let data = {
        publicKey:sessionStorage.getItem('publicKey'),
        signature:'abcd',
        chainID:params.chainID,
        transactionid:params.id
      }
      this.getTxDetail(data)
      // console.log(data)
    },
    goBack() {
      this.$router.go(-1)
    },
    goBlock() {
      this.$router.push({path:'/index',query:{chainID:sessionStorage.getItem("chainid")}})
    }
  },
  filters: {
    unixTimeValue (value) {
      return moment(value * 1000).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
<style lang="less">
  @import '../../assets/css/page.less';
  li {
    word-break: break-all;
    word-wrap: break-word;
  }
</style>
