<template>
  <div id="cal">
    <div id="top">
      <div class="select">
        <select id="year-select"></select
        >&nbsp;年
        <select id="month-select"></select
        >&nbsp;月
      </div>
      <div class="step">
        <i class="iconfont iconjiantou2" id="prev"></i>
        <i class="iconfont iconjiantou21" id="next"></i>
      </div>
    </div>
    <div id="wk">
      <span>一</span>
      <span>二</span>
      <span>三</span>
      <span>四</span>
      <span>五</span>
      <span><b>六</b></span>
      <span><b>日</b></span>
    </div>
    <div id="cm"></div>
    <div id="bm">
      <div class="heavenly-branch">
        <span id="heavenly"></span>年 &nbsp; ［<span id="branch"></span>］
      </div>
      <a href="javascript:;;" id="now-date">回到今天</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Calendar",
  mounted() {
    const _this = this;
    // @ts-ignore
    window.calendar.init({
      // @ts-ignore
      calendarWidth: document.querySelector("#wk").offsetWidth,
      cellClickCallback: function (cell: any, datedata: any) {
        //emit click-callback事件
        _this.$emit("click-callback", cell, datedata);
      },
    });
  },
});
</script>

<style>
#cal {
  width: 100%;
  font-size: 12px;
  position: relative;
}

#cal #top {
  height: 40px;
  line-height: 40px;
  background: #f2f2f2;
  border: 1px solid #f2f2f2;
  color: #7cb305;
  background: var(--calendarColor);
  border: 1px solid var(--calendarColor);
  color: var(--primary);
  padding: 0 10px;
  clear: both;
}

#cal #top select {
  font-size: 12px;
}

#cal #top input {
  padding: 0;
}

#cal #wk {
  margin: 0;
  padding: 0;
  height: 35px;
  color: #999;
  font-size: 12px;
  border-left: 1px solid #f2f2f2;
  border-right: 1px solid #f2f2f2;
  display: flex;
  width: 100%;
  color: var(--textDefault);
  border-left: 1px solid var(--calendarColor);
  border-right: 1px solid var(--calendarColor);
}

#cal #wk span {
  float: left;
  width: 14.285714285714286%;
  text-align: center;
  line-height: 35px;
}

#cal #wk span b {
  font-weight: normal;
}

#cal #cm {
  clear: left;
  position: relative;
  border-left: 1px solid #f2f2f2;
  border-right: 1px solid #f2f2f2;
  border-left: 1px solid var(--calendarColor);
  border-right: 1px solid var(--calendarColor);
}

#cal #cm .cell {
  color: #999;
  color: var(--textDefault);
  position: absolute;
  width: 14.285714285714286%;
  height: 36px;
  text-align: center;
  cursor: pointer;
}
#cal #cm .cell.cell-today {
  color: #7cb305;
  color: var(--primary);
  font-weight: bolder;
}

#cal #cm .cell .so {
  font: 12px arial;
}
#cal #cm .cell .so div {
  font-size: 10px;
}

#cal #bm {
  text-align: right;
  height: 30px;
  line-height: 30px;
  padding: 0 13px 0 0;
  border: 1px solid #f2f2f2;
  border-top: 1px dashed #f0f0f0;
  border: 1px solid var(--calendarColor);
  border-top: 1px dashed var(--border);
  clear: both;
  padding: 0 10px;
  font-size: 14px;
}

#cal #bm .heavenly-branch {
  color: #7cb305;
  color: var(--primary);
  float: left;
}
#cal #fd {
  display: none;
  position: absolute;
  border: 1px solid #f0f0f0;
  background: #f0f0f0;
  color: #999;
  border: 1px solid var(--border);
  background: var(--border);
  color: var(--textDefault);
  padding: 10px;
  line-height: 21px;
  width: 150px;
  border-radius: 10px;
}
#cal #fd:before {
  content: "";
  position: absolute;
  left: -8px;
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-right: 8px solid #f0f0f0;
  border-right: 8px solid var(--border);
  border-bottom: 8px solid transparent;
}
#cal #fd:after {
  content: "";
  position: absolute;
  left: -6px;
  top: 10px;
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-right: 8px solid #f0f0f0;
  border-right: 8px solid var(--border);
  border-bottom: 8px solid transparent;
}
#cal #fd b {
  font-weight: normal;
  color: #7cb305;
  color: var(--primary);
}
#cal .step {
  float: right;
  font-size: 16px;
}
#cal .step i {
  cursor: pointer;
}
#cal .step #prev {
  margin-right: 10px;
}
#cal .select {
  float: left;
}
#cal .select select {
  -webkit-appearance: none;
  padding: 5px 20px;
  outline: none;
  color: #333;
  background-color: #fff;
  color: var(--calendarSelectColor);
  background-color: var(--calendarSelectBg);
}
#cal #now-date {
  float: right;
  padding: 0px 10px;
  background-color: #7cb305;
  color: #fff;
  background-color: var(--primary);
  color: var(--white);
  font-size: 12px;
  height: 20px;
  line-height: 20px;
  margin-top: 6px;
  text-decoration: none;
}
</style>
