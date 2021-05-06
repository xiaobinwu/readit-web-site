<template>
    <div class="app-download-aside">
        <img class="qrcode" src="../assets/erCode.png" alt="APP Download" />
        <div class="info">
            <div class="title">
                下载ReadIT APP
                <i class="iconfont iconjiantou21"></i>
            </div>
            <div class="description">
                高质量文章推荐与轻便阅读
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppDownLoadNav'
})
</script>

<style scoped>
    .app-download-aside {
        padding: 7px 10px;
        margin: 20px 0;
        width: 100%;
        border: 1px solid #f0f0f0;
        background-color: #fff;
    }
    .qrcode {
        width: 50px;
        height: 50px;
        opacity: .85;
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
    }
    .description {
        margin-top: 4px;
        font-size: 13px;
        color: #999;
    }
</style>
