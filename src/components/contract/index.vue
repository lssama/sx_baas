<template>
  <div class="page-wrap add-box">
    <Header></Header>
    <div class="page-content-wrap wrap">
      <div class=" wrap">
        <div class="page-title-wrap">
          <div class="page-title">{{$t('navs.conManagement')}}
            <button class="add-btn" @click="addCon">新增</button>
          </div>
        </div>
      </div>
      <div class="page-content">
        <div class="table-wrap">
          <el-table :data="contractList" :empty-text="$t('message.noData')" style="width: 100%">
            <el-table-column prop="Name" :label="$t('listHeader.conName')" width="280">
              <template slot-scope="scope">
                <span class="table-link-color" @click="getInfo(scope.row)">{{scope.row.Name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="Creator" :label="$t('listHeader.creator')" width="280">
            </el-table-column>
            <el-table-column prop="CreateTime" :label="$t('listHeader.cTime')">
              <template slot-scope="scope">
                <span>{{scope.row.CreateTime | cTimeValue}}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('listHeader.action')" width="200">
              <template slot-scope="scope">
                <span class="table-link-color" @click="getInfo(scope.row)">{{$t("button.detail")}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- <div>
      <el-pagination
        layout="prev, pager, next"
        :page-size="10"
        >
      </el-pagination>
    </div> -->
    <div class="footer-page-wrap">
      <Footer></Footer>
    </div>
    <div class="add-page" v-bind:style="{'display':is ? 'block':'none'}">
      <div class="close-btn" @click="addCon">x</div>
      <p>创建合约</p>

      <form>
        <div>
          <label for="">合约名称：</label><input id="conName" type="text" v-model="Name" :disabled="isName" placeholder="限制15个汉字 45个字符"/>
        </div>
        <div>
          <label for="dec" class="desc">描述：</label>
          <textarea id="dec" type="text" v-model="Description" :disabled="isDesc" placeholder="限制100个汉字 300个字符"/>
        </div>
        <div>
          <label for="">链Id:</label>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in allchain" :key="item.ID" :label="item.Name" :value="item.ID">
            </el-option>
          </el-select>
        </div>
        <div>
          <label for="" class="file">执行文件：</label><input id="zxFlie" class="zx-file" type="file" multiple>
          <span class="choose-btn">请选择</span>
        </div>
        <div>
          <button @click="submitFun">提交</button>
          <!-- <button @click="addCon">取消</button> -->
        </div>
      </form>

    </div>
    <div class="mask" v-bind:style="{'display':is ? 'block':'none'}"></div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import moment from "moment";
import { Message } from 'element-ui'
import config from '../../untils/config.js'

const { API } = config
const { createContractUrl } = API

import Header from "../header";
import Footer from "../footer";
export default {
  data() {
    return {
      is: false,
      allchain: [],
      value: "",
      Name: "",
      // Creater: "",
      Description: "",
      Type: "cmd",
      isDesc:false,
      isName:false
    };
  },
  components: {
    Header,
    Footer
  },
  mounted() {
    this.getList();
    // console.log(this.contractList)
    // this.total = this.contractList.length
    let allchain = JSON.parse(sessionStorage.getItem("allchains"));
    this.allchain = allchain;
    // console.log(this.allchain)
    // console.log(createContractUrl)
  },
  computed: {
    contractList: {
      get() {
        return this.$store.state.contract.contractList;
      }
    }
  },
  methods: {
    ...mapActions(["getContractList"]),
    ...mapActions(["getContractDetail"]),
    ...mapActions(["createConFun"]),

    submitFun() {
      let fd = new FormData();
      fd.append("contractName", this.Name);
      fd.append("Creator", sessionStorage.getItem('user'));
      fd.append("Description", this.Description);
      fd.append("Type", this.Type);
      fd.append("chainID", this.value);
      fd.append("publicKey",sessionStorage.getItem('publicKey'))
      fd.append("fileName", document.getElementById("zxFlie").files[0]);

      let xhr = new XMLHttpRequest();
      xhr.open("post", createContractUrl);

      xhr.send(fd);

      xhr.onload = function() {
        var res;
        if (this.status == 200 || readyState == 4) {
          res = JSON.parse(this.response)
          // console.log(res);
          if (res.succeed === false) {
            Message.error(`创建失败:${res.data}`)
          }else if(res.succeed) {
            Message("创建成功")
          }
        }
      };
      this.addCon();
      setTimeout(() => {
        history.go(0)
      }, 2000);
    },

    clearInfo() {
      this.Name = "";
      this.Description = "";
      this.value = "";
    },

    getList() {
      this.getContractList();
    },
    getInfo(info) {
      this.getContractDetail(info);
    },
    addCon() {
      this.is = !this.is;
      this.clearInfo();
    }
  },
  filters: {
    cTimeValue(value) {
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  watch:{
    Description:function(newinfo,oldinfo) {
      // console.log(newinfo)
      let len = newinfo.replace(/[\u4E00-\u6FA5]/g,"***").length
      if(len > 300) {
        this.isDesc = true
      }else if(len < 300) {
        this.isDesc = false
      }
    },
    Name:function(newinfo,oldinfo) {
      // console.log(newinfo)
      let len = newinfo.replace(/[\u4E00-\u6FA5]/g,"***").length
      if(len > 45) {
        this.isName = true
      }else if(len < 45) {
        this.isName = false
      }
    }
  }
};
</script>
<style lang="less">
@import "../../assets/css/page.less";
.user-show {
  margin-left: 160px;
}
.choose-id {
  margin-left: 145px;
}
.choose {
  font-size: 12px;
  color: #e6e6e6;
}
.add-page {
  width: 640px;
  padding: 0 80px;
  form {
    margin: 0 0 30px 40px;
    div {
      margin-bottom: 20px;
      label {
        width: 160px;
        display: inline-block;
      }
      button {
        width: 70px;
        height: 30px;
        border: 1px solid #0099e1;
        background-color: #0099e1;
        color: #fff;
        border-radius: 5px;
      }
      .file {
        position: relative;
        top: -12px;
      }
      textarea,
      input {
        resize: none;
        overflow: hidden;
        border: 1px solid #ccc;
        width: 400px;
        height: 30px;
        padding-left: 10px;
      }
      textarea {
        margin-left: -4px;
      }
      input.zx-file {
        width: 70px;
        opacity: 0;
      }
      span.choose-btn {
        border: 1px solid #ccc;
        padding: 6px 15px;
        color: #ccc;
        position: relative;
        top: -10px;
        left: -84px;
        z-index: -6;
      }
      .desc {
        position: relative;
        top: -10px;
      }
    }
    .el-select {
      margin-bottom: -10px;
    }
    & > div:last-child {
      text-align: center;
      button {
        margin-left: 50px;
      }
    }
  }
  p {
    font-weight: 600;
    margin: 20px 0;
  }
  .creat-user {
    margin-bottom: 20px;
    color: #606266;
    span:last-child {
      margin-left: 27px;
    }
  }
  padding: 0 80px;
  .el-textarea__inner {
    resize: none;
  }
  .creat-btn {
    text-align: center;
  }
}
</style>
