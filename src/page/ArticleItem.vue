<template>
    <div class="article-item">
        <div class="article-img-container" :style="`background-image: url(${article.thumb})`"> 
          <AppLink class="article-link"  :to="`/article/${article._id}`" />
        </div>
        <div class="article-content">
          <AppLink class="article-title" :to="`/article/${article._id}`">
              {{ article.title }}
          </AppLink>
          <p class="article-abstract">
              基本说来，作为炙手可热的明星，一旦有什么风吹草动，外界都会很快察觉，然而赵丽颖和冯绍峰，两人结婚的消息来得猝不及防，离婚的消息也是。 赵丽颖和冯...
          </p>
          <div class="article-meta">
              <span class="article-view">
                <i class="iconfont iconchakan1"></i>
                {{ article.meta.views }}
              </span>
              <span class="article-comment">
                <i class="iconfont iconpinglun"></i>
                {{ article.meta.comments }}
              </span>
              <span class="article-like">
                <i class="iconfont iconshoucang"></i>
                {{ article.meta.likes }}
              </span>
          </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import AppLink from '@app/components/AppLink.vue'

export default defineComponent({
  name: 'ArticleItem',
  components: {
    AppLink
  },
  props: {
    article: Object
  },
  setup(props) {
    const { article } = toRefs(props);
    return {
      article
    };
  }
})
</script>

<style scoped>
  .article-item {
    min-height: 140px;
    position: relative;
    width: 100%;
    margin: 0 0 15px;
    padding: 15px 2px 20px 0;
    border-bottom: 1px solid #f0f0f0;
  }
  .article-img-container {
    position: absolute;
    top: 50%;
    margin-top: -60px;
    right: 0;
    width: 150px;
    height: 100px;
    border-radius: 4px;
    background-color: RGB(241, 243, 244);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  :deep(.article-link) {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  :deep(.article-title) {
    color: #2f2f2f;
    text-align: left;
    margin: -7px 0 4px;
    display: inherit;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
  }
  :deep(.article-title:hover) {
    text-decoration: underline;
  }
  .article-abstract {
    text-align: left;
    margin: 0 0 8px;
    font-size: 13px;
    line-height: 24px;
    color: #999;
  }
  .article-content {
    box-sizing: border-box;
    padding-right: 165px;
  }
  .article-meta {
    text-align: left;
    padding-right: 0;
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
  }
  .article-meta span {
    margin-right: 10px;
    color: #b4b4b4;
  }
  .article-meta i {
    font-size: 15px;
  }
</style>
