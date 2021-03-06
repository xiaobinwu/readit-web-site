<template>
  <nav class="navbar">
    <div class="width-limit">
      <AppLink class="logo" to="/">
        <img src="../assets/logo.png" alt="Nav logo" />
      </AppLink>
      <AppLink class="send-article" to="/sendArticle"> 投稿 </AppLink>
      <div class="container">
        <div class="flex-container">
          <AppLink
            class="nav-link"
            active-class="nav-active"
            inactive-class="nav-inactive"
            to="/"
          >
            <i class="iconfont iconbuildings_small-home"></i>
            首页
          </AppLink>
          <AppLink
            class="nav-link"
            active-class="nav-active"
            inactive-class="nav-inactive"
            to="/appdownload"
          >
            <i class="iconfont iconAPP"></i>
            下载App
          </AppLink>
          <div class="flex-right">
            <Switch
              class="navbar-switch"
              v-model="darkTheme"
              theme="bulma"
              color="default"
              :type-bold="true"
            >
              <template #label>
                <span class="navbar-switch-label">
                  <i class="iconfont iconmoonbyueliang"></i>
                  <span>夜间模式</span>
                </span>
              </template>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import Switch from "@app/components/Switch.vue";
import AppLink from "@app/components/AppLink.vue";
import storage from "@app/services/storage";
import { STORAGE } from "@app/constants/storage";

const LOCALSTORGE = "local";
const DARK = "dark";
const THEME_DOM_ATTR = "theme";

export default defineComponent({
  name: "Header",
  components: {
    AppLink,
    Switch,
  },
  setup(props) {
    const darkTheme = ref(false);

    watch(darkTheme, (bool) => {
      if (!bool) {
        storage.remove(STORAGE.LOCAL_DARK_THEME, LOCALSTORGE);
        document.documentElement.removeAttribute(THEME_DOM_ATTR);
      } else {
        storage.set(STORAGE.LOCAL_DARK_THEME, true, LOCALSTORGE);
        document.documentElement.setAttribute(THEME_DOM_ATTR, DARK);
      }
    });

    const init = () => {
      console.log(
        storage.get<string>(STORAGE.LOCAL_DARK_THEME, undefined, LOCALSTORGE)
      );
      if (
        storage.get<string>(STORAGE.LOCAL_DARK_THEME, undefined, LOCALSTORGE)
      ) {
        darkTheme.value = true;
      }
    };

    onMounted(init);

    return {
      darkTheme,
    };
  },
});
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  border-width: 0 0 1px;
  z-index: 1030;
  height: 56px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  background-color: #fff;
  border-color: #f0f0f0;
  background-color: var(--background);
  border-color: var(--border);
}
.navbar:after,
.navbar:before {
  content: " ";
  display: table;
}
.navbar:after {
  clear: both;
}
.width-limit {
  min-width: 768px;
  max-width: 1440px;
  margin: 0 auto;
}
.flex-right {
  flex: 1;
  height: 56px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.navbar-switch {
  display: flex;
  margin-right: 5px;
}
:deep(.navbar-switch.vue-switcher--bold div) {
  top: 15px;
}
.navbar-switch-label {
  font-size: 15px;
  line-height: 56px;
  margin-bottom: 0;
  margin-right: 8px;
  color: #969696;
  color: var(--textLink);
}
.navbar-switch-label i {
  margin-right: 5px;
}
.container {
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
  min-width: 750px;
  max-width: 960px;
}
.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
:deep(.nav-link) {
  height: 56px;
  line-height: 56px;
  padding: 0 15px;
  font-size: 17px;
  margin-right: 10px;
  color: #333;
  color: var(--navLink);
}
:deep(.nav-link .iconfont) {
  font-size: 20px;
}
:deep(.nav-active) {
  color: #7cb305;
  color: var(--primary);
  background: none;
}
:deep(.nav-inactive:hover) {
  background-color: #f5f5f5;
  background-color: var(--navLinkHoverBg);
}
:deep(.logo) {
  cursor: pointer;
  float: left;
  height: 56px;
  padding: 0;
}
:deep(.logo img) {
  height: 100%;
}
:deep(.send-article) {
  float: right;
  text-align: center;
  width: 100px;
  height: 40px;
  line-height: 40px;
  margin: 8px 12px 0;
  border-radius: 20px;
  font-size: 15px;
  color: #fff;
  background-color: #7cb305;
  color: var(--background);
  background-color: var(--primary);
}
</style>
