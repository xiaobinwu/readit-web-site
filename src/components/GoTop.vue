<template>
    <div class="go-top" @click="goTop">
        <i class="iconfont iconjiantou-shang"></i>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'GoTop',
  methods: {
      goTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
      }
  }
})
</script>

<style scoped>
    .go-top {
        cursor: pointer;
        position: fixed;
        bottom: 40px;
        right: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border: 1px solid #dcdcdc;
        border: 1px solid var(--goTopBorder);
    }
    .go-top:hover {
        background-color: hsla(0, 0%, 71%, .1);
        background-color: var(--goTopBg);
    }
    .go-top i {
        font-size: 20px;
        color: #333;
        color: var(--goTopIcon);
    }
</style>
