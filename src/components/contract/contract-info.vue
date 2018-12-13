<template>
  <div class="page-wrap">
    <Header></Header>
    <div class="page-content-wrap wrap">
      <div class=" wrap">
        <div class="page-title-wrap">
          <div>
            <span class="page-title">{{$t('navs.contractInfo')}}</span>
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
              <li class="current">{{$t('navs.contractInfo')}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="page-content">
        <div class="abstract-wrap">
          <div class="abstract-title">{{$t('title.abstract')}}
            <button class="execute-btn" @click="exeCute">执行</button>
          </div>
          <ul class="abstract-content">
            <li>
              <div class="li-title">{{$t('listHeader.conName')}}</div>
              <div>{{contractInfo.Name}}</div>
            </li>
            <li>
              <div class="li-title">{{$t('listHeader.creator')}}</div>
              <div>{{contractInfo.Creator}}</div>
            </li>
            <li>
              <div class="li-title">{{$t('listHeader.cTime')}}</div>
              <div>{{contractInfo.CreateTime | createTimeValue}}</div>
            </li>
            <li>
              <div class="li-title">{{$t('listHeader.conDescribe')}}</div>
              <div>{{contractInfo.Description}}</div>
            </li>
          </ul>
        </div>
        <div class="table-wrap">
          <div class="table-title table-title-top">{{$t('title.runingInstance')}}</div>
          <el-table :data="logList" :empty-text="$t('message.noData')" style="width: 100%">
            <el-table-column prop="BeginTime" :label="$t('listHeader.openingTime')">
              <template slot-scope="scope">
                <span>{{scope.row.BeginTime | BeginTimeValue}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="EndTime" :label="$t('listHeader.endTime')">
              <template slot-scope="scope">
                <span>{{scope.row.EndTime | EndTimeValue}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="IsSuccess" :label="$t('listHeader.execute')">
              <template slot-scope="scope">
                <span>{{scope.row.IsSuccess?'是':'否'}}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('listHeader.action')" width="150">
              <template slot-scope="scope">
                <span class="table-link-color" @click="getInfo(scope.row)">{{$t("button.detail")}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="el-pagination-wrap fr" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-size="pageSize" layout="prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="footer-page-wrap">
      <Footer></Footer>
    </div>
    <div class="exe-wrap" v-bind:style="{'display':show ? 'block':'none'}">
      <div class="execute-page">
        <div>执行合约</div>
        <div>
          <span>合约名称</span>
          <span>{{contractInfo.Name}}</span>
        </div>
        <div class="param-ipt">
          <span>运行参数</span>
          <div>
            <textarea placeholder="  请输入json格式的参数" v-model="message"></textarea>
          </div>
        </div>
        <div class="creat-btns">
          <button @click="exeCon">执行</button>
          <!-- <button @click="exeCute">取消执行</button> -->
        </div>
        <div class="close-btn" @click="exeCute">x</div>
      </div>
    </div>
    <div class="mask" v-bind:style="{'display':show ? 'block':'none'}"></div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import moment from "moment";

import Header from "../header";
import Footer from "../footer";
export default {
  data() {
    return {
      pageSize: 10,
      show: false,
      message: ""
    };
  },
  components: {
    Header,
    Footer
  },
  mounted() {
    this.getDetail(this.$route.query, 1);
    // console.log(this.contractInfo)
    // console.log(this.logList)
    // console.log(this.total)
    // console.log(this.$route.query.contractId);
    this.getLog(1);
  },
  computed: {
    contractInfo: {
      get() {
        // return JSON.parse(sessionStorage.getItem("CONTRACT_DETAIL")) || {};
        return this.$store.state.contract.contractDetails;
      }
    },
    logList: {
      get() {
        return this.$store.state.contract.logList;
      }
    },
    page: {
      get() {
        return this.$store.state.contract.page;
      }
    },
    total: {
      get() {
        return this.$store.state.contract.totalCount;
      }
    }
  },
  methods: {
    ...mapActions(["getLogList"]),
    ...mapActions(["getLogDetail"]),
    ...mapActions(["getDetails"]),
    ...mapActions(["exeConFun"]),

    exeCon() {
      let data = JSON.stringify({
        publicKey:sessionStorage.getItem('publicKey'),
        cmd: "execute",
        contractID: this.$route.query.contractId,
        message: this.message
      });
      this.exeConFun(data);
      this.exeCute();
      setTimeout(() => {
        history.go(0)
      }, 2000);
    },

    getDetail(params, page) {
      // let contractName = params.contractName ? params.contractName : "";
      let contractId = params.contractId;

      let data = JSON.stringify({
        contractID: params.contractId,
        cmd: "contractinfo",
        publicKey:sessionStorage.getItem('publicKey')
      });

      this.getDetails(data);

      // let pageObj = {
      //     page:1,
      //     ID: params.contractId,
      //   };
      // this.getLogList(pageObj);
    },
    getLog(page) {
      let data = JSON.stringify({
        cmd: "contractloglist",
        contractID: this.$route.query.contractId,
        pageIndex: page,
        pageSize: 10,
        publicKey:sessionStorage.getItem('publicKey')
      });
      this.getLogList(data);
    },

    getInfo(params) {
      // console.log(params);
      this.getLogDetail(params);
    },
    handleSizeChange(val) {
      // this.getLogList(this.$route.query, val);
      this.getLog(val);
      
    },
    handleCurrentChange(val) {
      this.getLog(val);
      // this.getLogList(this.$route.query, val);      
    },
    exeCute() {
      this.show = !this.show;
    }
  },
  filters: {
    createTimeValue(value) {
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    },
    BeginTimeValue(value) {
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    },
    EndTimeValue(value) {
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>
<style lang="less">
@import "../../assets/css/page.less";
.abstract-title {
  position: relative;
}
.execute-btn {
  position: absolute;
  right: 100px;
  background-color: #4599f8;
  color: #fff;
  border: 1px solid #4599f8;
  font-size: 12px;
  border-radius: 3px;
  height: 30px;
  width: 80px;
}
.exe-wrap {
  width: 760px;
  padding: 0 20px;
  .execute-page {
    & > div:nth-child(-n + 2) {
      height: 55px;
      line-height: 55px;
    }
    & > div:first-child {
      font-weight: 600;
    }
    & > div:nth-child(-n + 3) {
      padding-left: 50px;
      span {
        font-size: 14px;
      }
      span:nth-child(2) {
        margin-left: 50px;
      }
      textarea {
        width: 650px;
        height: 120px;
        resize: none;
        border: 1px solid #797979;
      }
    }
  }
  .param-ipt {
    margin-top: 20px;
    div {
      margin: 40px 0 20px;
    }
  }
}
</style>
