<template>
  <div class="page-wrap">
    <Header></Header>
    <div class="page-content-wrap wrap">
      <div class=" wrap">
        <div class="page-title-wrap">
          <div class="page-title">{{$t('navs.overview')}}</div>
          <button @click="showFun" class="add-chain-btn">新增</button>
        </div>
      </div>
      <div class="page-content">
        <div class="table-wrap">
          <div class="table-height">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="ID" label="链ID" width="120">
                <template slot-scope="scope">
                  <router-link :to="{path: '/index', query: { chainID: scope.row.ID }}">
                    <span @click="getChainInfo(scope.row)">{{scope.row.ID}}</span>
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="链名" width="120">
              </el-table-column>
              <el-table-column prop="Height" label="链当前高度" width="120">
              </el-table-column>
              <el-table-column prop="GenesisBlockID" label="链创始块哈希">
              </el-table-column>
              <el-table-column prop="CurrentBlockID" label="链当前区块ID">
              </el-table-column>
              <el-table-column prop="CreateTime" label="链创建时间" width="160">
                <template slot-scope="scope">
                  <span>{{scope.row.CreateTime | createTimeValue}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="UpdateTime" label="链修改时间" width="160">
                <template slot-scope="scope">
                  <span>{{scope.row.UpdateTime | UpTimeValue}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div>
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :total="total">
        </el-pagination>
      </div>
    </div>

    <div class="footer-page-wrap">
      <Footer></Footer>
    </div>

    <div class="exe-wrap" v-bind:style="{'display':show ? 'block':'none'}">
      <div class="creat-chain">
        <div>创建区块链</div>
        <div>
          <span>链名</span>
          <span><input type="text" v-model="Name"></span>
        </div>

        <div class="creat-btns">
          <button @click="createFun">创建</button>
          <button @click="showFun">取消</button>
        </div>
      </div>
    </div>
    <div class="mask" v-bind:style="{'display':show ? 'block':'none'}"></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Header from "../header";
import Footer from "../footer";
import moment from "moment";
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      show: false,
      Name: "",
      pageIndex: 1
    };
  },
  computed: {
    tableData() {
      return this.$store.state.chain.chainList;
    },
    total() {
      return this.$store.state.chain.total;
    },
    allChain() {
      return this.$store.state.chain.allChain;
    }
  },
  methods: {
    ...mapActions(["getChainList", "createChain", "getAllchain"]),

    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getData();
    },

    getChainInfo(data) {
      // console.log(data);
      sessionStorage.setItem("chainid",data.ID)
    },

    getData() {
      let data = {
        pageIndex: this.pageIndex,
        pageSize: 10,
        publicKey: sessionStorage.getItem('publicKey'),
        signature: 'abcd'
      };
      this.getChainList(data);
    },

    getAlldata() {
      let data = {
        pageIndex: 1,
        pageSize: 10000,
        publicKey: sessionStorage.getItem('publicKey'),
        signature: 'abcd'
      };
      // console.log(data)
      this.getAllchain(data);
    },

    showFun() {
      this.show = !this.show;
    },

    createFun() {
      let data = JSON.stringify({ 
        Auth:{
          PublicKey:sessionStorage.getItem('publicKey'),
          Signature:'abcd'
        },
        Name: this.Name,
      });
      // console.log(data)
      this.createChain(data);
      this.showFun();
      setTimeout(() => {
        history.go(0)
      }, 2000);
    }
  },
  mounted() {
    this.getData();
    // console.log(this.tableData)
    // console.log(this.total)
    this.getAlldata();
    // console.log(this.allChain);
  },
  destroyed() {
    sessionStorage.setItem("allchains", JSON.stringify(this.allChain));
  },
  filters: {
    createTimeValue(value) {
      return moment(value * 1).format("YYYY-MM-DD HH:mm:ss");
    },
    UpTimeValue(value) {
      return moment(value * 1).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>

<style lang="less">
@import "../../assets/css/page.less";
.table-height {
  tbody {
    tr {
      td:first-child a{
        color: #45a0fe;
      }
    }
  }
}
.creat-chain {
  width: 550px;
  padding: 0px 50px;
  & > div:first-child {
    font-size: 16px;
    font-weight: 600;
    margin: 20px 0;
  }
  div:nth-child(n + 2) {
    text-align: center;
    span:first-child {
      font-size: 14px;
    }
    input {
      border: 1px solid #ccc;
      width: 300px;
      height: 30px;
      margin-left: 30px;
      padding-left: 10px;
    }
  }
}
.add-chain-btn {
  height: 30px;
  width: 80px;
  position: relative;
  left: 800px;
  background-color: #45a0fe;
  border: 1px solid #45a0fe;
  color: #fff;
  cursor: pointer;
}
</style>