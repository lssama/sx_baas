<template>
  <div class="page-wrap">
    <Header></Header>
    <div class="page-content-wrap wrap">
      <div class=" wrap">
        <div class="page-title-wrap">
          <div>
            <span class="page-title">{{$t('navs.runingInstanceInfo')}}</span>
          </div>
          <div class="page-nav-wrap fr">
            <ul class="link-wrap">
              <li>
                <router-link :to="{path: '/contract'}">
                  {{$t('navs.conManagement')}}
                </router-link>
              </li>
              <li>
                <i class="el-icon-arrow-right"></i>
              </li>
              <!-- <li>
                  <router-link :to="{path: '/contract/info', query: { contractName: contractInfo.Name }}">
                    {{$t('navs.contractInfo')}}
                  </router-link>
                </li> -->
              <li class="current"><a href="#" @click="goBack">{{$t('navs.contractInfo')}}</a></li>
              <li>
                <i class="el-icon-arrow-right"></i>
              </li>
              <li>{{$t('navs.runingInstanceInfo')}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="page-content">
        <div class="table-wrap">
          <div class="table-title table-title-top">{{$t('title.diary')}}</div>
          <div v-if="logInfo.LogDetails">
            <el-table :data="logInfo.LogDetails" :empty-text="$t('message.noData')" style="width: 100%">
              <el-table-column prop="LogTime" :label="$t('listHeader.time')" width="180px">
                <template slot-scope="scope">
                  <span>{{scope.row.logTime | LogTimeValue}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="description" :label="$t('listHeader.description')">
              </el-table-column>
            </el-table>
          </div>
          <div v-else class="times">
            <div><span>时间</span><span>描述</span></div>
            <div><span>{{logInfo.BeginTime | LogTimeValue}}</span><span>begin to invoke smart contract</span></div>
            <div><span>{{logInfo.EndTime | LogTimeValue}}</span><span>end to invoke smart contract</span></div>
          </div>
        </div>
        <div class="abstract-wrap">
          <div class="abstract-title">{{$t('title.returnResult')}}</div>
          <ul class="abstract-content">
            <li>
              <div class="li-content">{{logInfo.result}}</div>
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
import { mapActions } from "vuex";
import moment from "moment";
import Header from "../header";
import Footer from "../footer";
export default {
  data() {
    return {};
  },
  components: {
    Header,
    Footer
  },
  mounted() {
    this.getData();
  },
  computed: {
    logInfo: {
      get() {
        return this.$store.state.contract.logInfo;
      }
    }
    // contractInfo: {
    //   get () {
    //     return JSON.parse(sessionStorage.getItem('CONTRACT_DETAIL'))
    //   }
    // }
  },
  methods: {
    ...mapActions(["getLogInfoFun"]),
    getData() {
      let data = JSON.stringify({
        cmd: "contractlogdetail",
        logID: this.$route.query.info.ID
      });
      this.getLogInfoFun(data);
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  filters: {
    LogTimeValue(value) {
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>
<style lang="less">
@import "../../assets/css/page.less";
.times {
  div {
    border-bottom: 1px solid #eee;
    height: 48px;
    line-height: 48px;
    font-size: 14px;
    color: #606266;
    span:first-child {
      display: inline-block;
      width: 180px;
      margin-left: 10px;
    }
  }
  div:first-child {
    border-bottom: 1px solid #ccc;
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
