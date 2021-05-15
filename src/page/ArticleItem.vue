<template>
  <div class="article-item">
    <div
      class="article-img-container"
      :data-echo-background="article.thumb"
      :style="`background-image: url('/thumb-carrousel.gif')`"
    >
      <AppLink class="article-link" :to="`/article/${article._id}`" />
    </div>
    <div class="article-content">
      <AppLink class="article-title" :to="`/article/${article._id}`">
        {{ article.title }}
      </AppLink>
      <p class="article-abstract">
        {{ content }}
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
import { computed, defineComponent, toRefs } from "vue";
import AppLink from "@app/components/AppLink.vue";

export default defineComponent({
  name: "ArticleItem",
  components: {
    AppLink,
  },
  props: {
    article: Object,
  },
  setup(props) {
    const { article } = toRefs(props);
    const content = computed(() => {
      if (article && article.value) {
        const reg = /[\u4e00-\u9fa5，。]/g;
        const contents = article.value?.content.match(reg);
        const matchContent = contents.join("");
        return `${matchContent.slice(0, 80)}...`;
      }
      return "";
    });
    return {
      article,
      content,
    };
  },
});
</script>

<style scoped>
.article-item {
  min-height: 140px;
  position: relative;
  width: 100%;
  margin: 0 0 15px;
  padding: 15px 2px 20px 0;
  border-bottom: 1px solid #f0f0f0;
  border-bottom: 1px solid var(--border);
}
.article-img-container {
  position: absolute;
  top: 50%;
  margin-top: -60px;
  right: 0;
  width: 150px;
  height: 100px;
  border-radius: 4px;
  /* background-color: RGB(241, 243, 244); */
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
  color: var(--textEffectLink);
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
  margin: 0 0 8px;
  font-size: 13px;
  line-height: 24px;
  color: #999;
  color: var(--textDefault);
}
.article-content {
  box-sizing: border-box;
  padding-right: 165px;
}
.article-meta {
  padding-right: 0;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
}
.article-meta span {
  margin-right: 10px;
  color: #b4b4b4;
  color: var(--textMeta);
}
.article-meta i {
  font-size: 15px;
}
</style>
