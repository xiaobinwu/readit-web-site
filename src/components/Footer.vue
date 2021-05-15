<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-left">
        Copyright © 2021
        <AppLink to="https://beian.miit.gov.cn">粤ICP备19017775号-1</AppLink>
      </div>
      <div class="footer-right">
        <nav>
          <AppLink to="/">首页</AppLink>
          <em> · </em>
          <AppLink to="/appdownload">下载App</AppLink>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppLink from "@app/components/AppLink.vue";
export default defineComponent({
  name: "Footer",
  components: {
    AppLink,
  },
});
</script>

<style scoped>
.footer {
  margin: 20px auto;
  min-width: 750px;
  max-width: 960px;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 13px;
}
.footer:after,
.footer:before {
  content: " ";
  display: table;
}
.footer:after {
  clear: both;
}
.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  width: 67%;
  padding-left: 15px;
  float: left;
  color: #969696;
  color: var(--textLink);
}
:deep(.footer-content a) {
  color: #969696;
  color: var(--textLink);
}
:deep(.footer-content a:hover) {
  color: #2f2f2f;
  color: var(--textEffectLink);
}
.footer-left {
  align-self: flex-start;
  margin-right: 20px;
}
.footer-right {
  align-self: flex-end;
}
</style>
