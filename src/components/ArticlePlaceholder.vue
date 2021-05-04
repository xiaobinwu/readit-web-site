<template>
    <div class="article-placeholder">
        <div class="img"></div>
        <div class="content">
            <div class="title"></div>
            <div class="text"></div>
            <div class="text animation-delay"></div>
            <div class="meta">
                <div class="read"></div><i class="iconfont iconpinglun1"></i>
                <div class="small"></div><i class="iconfont iconshoucang"></i>
                <div class="small"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
    name: 'ArticlePlaceholder'
    })
</script>

<style scoped>
    .article-placeholder {
        position: relative;
        padding: 15px 2px 0 0;
        margin-bottom: 50px;
    }
    .article-placeholder .img {
        width: 150px;
    }
    .article-placeholder .img {
        position: absolute;
        bottom: 2px;
        right: 0;
        width: 150px;
        height: 100px;
        border-radius: 4px;
        background-color: #eaeaea;
    }
    .article-placeholder .content {
        padding-right: 165px;
    }
    .article-placeholder .title {
        float: none!important;
        width: 50%;
        height: 20px;
        margin: 0 0 15px!important;
        background-color: #eaeaea;
    }
    .article-placeholder .title:before {
        content: ""!important;
    }
    .article-placeholder .text {
        width: 100%;
        height: 16px;
        margin: 0 0 10px;
        background-color: #eaeaea;
        animation: loading 1s ease-in-out infinite;
    }
    .article-placeholder .text {
        width: 100%;
        height: 16px;
        margin: 0 0 10px;
        background-color: #eaeaea;
        animation: loading 1s ease-in-out infinite;
    }
    .article-placeholder .animation-delay {
        animation: loading 1s ease-in-out -.5s infinite;
    }
    .article-placeholder .meta {
        text-align: left;
        margin: 0;
        color: #eaeaea;
        font-size: 12px;
    }
    .article-placeholder .meta .read {
        height: 16px;
        width: 50px;
    }
    .article-placeholder .meta div {
        display: inline-block;
        vertical-align: middle;
        background-color: #eaeaea;
    }
    .article-placeholder .meta i {
        margin: 0 5px;
        vertical-align: middle;
    }
    .article-placeholder .meta .small {
        height: 16px;
        width: 30px;
    }
    .small, small {
        font-size: 85%;
    }
    @keyframes loading {
        0% {
            width: 60%
        }

        50% {
            width: 100%
        }

        to {
            width: 60%
        }
    }
</style>
