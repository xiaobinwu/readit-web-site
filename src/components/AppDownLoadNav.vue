<template>
  <div
    class="app-download-aside"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <div class="qrcode-container" v-show="hover && !vertical">
      <div class="arrow"></div>
      <img class="qrcode" src="../assets/erCode.png" alt="APP Download" />
    </div>
    <AppLink to="/appdownload">
      <div :class="`${vertical ? 'vertical' : ''}`">
        <img class="qrcode" src="../assets/erCode.png" alt="APP Download" />
        <div class="info">
          <div class="title">
            下载ReadIT APP
            <i class="iconfont iconjiantou21"></i>
          </div>
          <div class="description">高质量文章推荐与轻便阅读</div>
        </div>
      </div>
    </AppLink>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";
import AppLink from "@app/components/AppLink.vue";
export default defineComponent({
  name: "AppDownLoadNav",
  props: {
    vertical: {
      type: Boolean,
      default: false
    }
  },
  components: {
    AppLink,
  },
  setup(props) {
    const { vertical, } = toRefs(props);
    const hover = ref(false);
    return {
      hover,
      vertical,
    };
  },
});
</script>

<style scoped>
.app-download-aside {
  position: relative;
  padding: 7px 10px;
  margin: 20px 0;
  width: 100%;
  border: 1px solid #f0f0f0;
  background-color: #fff;
  border: 1px solid var(--border);
  background-color: var(--background);
}
.qrcode-container {
  position: absolute;
  z-index: 1040;
  top: 80px;
  left: 46px;
  padding: 5px;
  width: 184px;
  height: 184px;
  background-color: #fff;
  border: 1px #f0f0f0 solid;
  border: 1px solid var(--border);
  background-color: var(--background);
  border-radius: 6px;
  box-shadow: 0 5px 10px rgb(0 0 0 / 20%);
}
.qrcode-container img {
  width: 100%;
  height: auto;
}
.qrcode-container .arrow,
.qrcode-container .arrow:after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
.qrcode-container .arrow {
  left: 50%;
  margin-left: -11px;
  z-index: 1050;
  border-bottom-width: 0;
  border-top-color: #f0f0f0;
  border-top-color: var(--border);
  bottom: -21px;
  border-width: 11px;
}
.qrcode-container .arrow:after {
  z-index: 1060;
  content: " ";
  border-width: 10px;
  bottom: 2px;
  margin-left: -10px;
  border-bottom-width: 0;
  border-top-color: #fff;
  border-top-color: var(--background);
}
.qrcode {
  width: 50px;
  height: 50px;
  opacity: 0.85;
}
.info {
  display: inline-block;
  vertical-align: top;
  margin-left: 10px;
  margin-top: 6px;
}
.title {
  font-size: 15px;
  color: #2f2f2f;
  color: var(--textEffectLink);
}
.description {
  margin-top: 4px;
  font-size: 13px;
  color: #999;
  color: var(--textDefault);
}
.vertical .qrcode {
  width: 100%;
  height: auto;
  opacity: 1;
}
.vertical .info {
  display: block;
}
.vertical .title, .vertical .description {
  text-align: center;
}
</style>
