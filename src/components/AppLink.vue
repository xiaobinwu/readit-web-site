<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
    <slot />
  </a>
  <router-link
    v-else
    v-bind="$props"
    custom
    v-slot="{ isActive, href, navigate }"
  >
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="isActive ? activeClass : inactiveClass"
    >
      <slot />
    </a>
  </router-link>
</template>

<script lang="ts">
import { RouterLink } from "vue-router";
import { defineComponent } from "vue";
export default defineComponent({
  name: "AppLink",
  props: {
    // @ts-ignore
    ...RouterLink.props,
    inactiveClass: String,
  },
  computed: {
    isExternalLink(): boolean {
      return typeof this.to === "string" && this.to.startsWith("http");
    },
  },
});
</script>

