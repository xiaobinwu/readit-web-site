<template>
<div class="left-aside-container">
    <div class="left-aside-item">
        <div class="left-aside-icon">
            <i class="iconfont iconfenxiang"></i>
        </div>
        <div class="left-aside-text">
            分享
        </div>
    </div>
    <div class="left-aside-item">
        <div class="left-aside-icon">
            <i class="iconfont iconai-code"></i>
        </div>
        <div class="left-aside-text">
            更多好文
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";
export default defineComponent({
  name: "LeftAside",
  setup(props) {
  },
});
</script>

<style scoped>
.left-aside-container {
    position: fixed;
    z-index: 1010;
    top: 216px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    left: calc((100vw - 930px)/2 - 78px);
}
.left-aside-item {
        display: flex;
    align-items: center;
        position: relative;
    flex-direction: column;
    margin-bottom: 16px;
    cursor: pointer;
    color: #969696;
    color: var(--textLink);
}
.left-aside-icon {
        display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    font-size: 18px;
    border-radius: 50%;
    box-shadow: 0 2px 10px rgb(0 0 0 / 5%);
    background-color: #fff;
    background-color: var(--detailConBg);
}
.left-aside-icon i {
        display: inline-block;
    color: inherit;
    font-style: normal;
    line-height: 0;
    text-align: center;
    text-transform: none;
    vertical-align: -.125em;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.left-aside-text {
        margin-top: 6px;
    font-size: 14px;
    text-align: center;
    color: #969696;
    color: var(--textLink);
    overflow: hidden;
    height: 19px;
}
</style>
