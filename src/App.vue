<template>
  <Header />
  <Suspense>
    <template #default>
      <router-view v-slot="{ Component, route }">
        <transition
          :name="route.meta.transition || 'fade'"
          mode="out-in"
          @before-enter="flushWaiter"
          @before-leave="setupWaiter"
        >
          <keep-alive>
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </transition>
      </router-view>
    </template>
    <template #fallback> Loading... </template>
  </Suspense>
  <GoTop />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@app/components/Header.vue";
import GoTop from "@app/components/GoTop.vue";
import scrollWaiter from "@app/route/scroll-waiter";

export default defineComponent({
  name: "App",
  components: {
    Header,
    GoTop,
  },
  setup() {
    function flushWaiter() {
      scrollWaiter.flush();
    }
    function setupWaiter() {
      scrollWaiter.add();
    }
    return {
      flushWaiter,
      setupWaiter,
    };
  },
});
</script>

<style>
@import url("./variable.css");
body {
  background-color: #fff;
  background-color: var(--background);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 56px;
}
</style>
