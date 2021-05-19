<template>
  <div class="container">
    <div class="article-container">
      <div class="row">
        <div class="main">
          <div
            class="thumb"
            :style="`background-image: url(${article.thumb})`"
          ></div>
          <h1 :title="article.title" class="article-title">{{ article.title }}</h1>
          <div class="article-meta">
            <span>{{ article.update_at }}</span>
            <span>阅读: <strong>{{ article.meta?.views }}</strong></span>
            <span>喜欢: <strong>{{ article.meta?.likes }}</strong></span>
            <span>评论: <strong>{{ article.meta?.comments }}</strong></span>
          </div>
          <RichContent :sanitize="false" :content="article.content" />
        </div>
        <div class="aside">
          <AppDownLoadNav class="article-download-nav" :vertical="true" />
        </div>
      </div>
    </div>
    <LeftAside />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import request from "@app/services/request";
import { TIHttpArticleResultOrdinary } from "@app/types/http";
import { IArticle } from "@app/types/business";
import RichContent from "@app/components/RichContent.vue";
import AppDownLoadNav from "@app/components/AppDownLoadNav.vue";
import LeftAside from "@app/components/LeftAside.vue";
import { onBeforeRouteLeave } from "vue-router";

export default defineComponent({
  name: "ArticleDetail",
  components: {
    RichContent,
    AppDownLoadNav,
    LeftAside,
  },
  props: {
    id: String,
  },
  setup(props) {
    const article = ref({});
    const isLoading = ref(false);

    onBeforeRouteLeave((to, from) => {
      removeScrollEvent();
    });

    const initScrollEvent = () => {
      // @ts-ignore
      window.echo.init();
    };

    const removeScrollEvent = () => {
      // @ts-ignore
      window.echo.detach();
    };

    const updateLoadingState = (loading: boolean) => {
      isLoading.value = loading;
    };

    const updateAndCorrectArticle = (info: IArticle | null) => {
      // 是否为markdown
      if (info && info.isMarkDown && info.content) {
        const { content } = info;
        const isBrStart = content.startsWith("\n");
        // 文本内容首位不为\n
        if (isBrStart) {
          info.content = info.content.replace("\n", "");
        }
      }
      article.value = info;
    };

    const updateResultData = (result: TIHttpArticleResultOrdinary) => {
      const { entry, ...resetReuslt } = result;
      updateLoadingState(false);
      if (entry) {
        // console.log('请求获得', entry);
        updateAndCorrectArticle(entry);
      }
    };

    const fetchArticleDatail = async (): Promise<any> => {
      const { id: articleId } = props;
      if (!articleId) {
        return Promise.reject();
      }
      updateLoadingState(true);
      const data = await request.fetchArticleDetail<TIHttpArticleResultOrdinary>(
        { _id: articleId }
      );
      if (data) {
        const { code, message, ...reset } = data;
        if (code === 0) {
          updateResultData(reset);
          updateLoadingState(false);
          return data;
        }
        updateLoadingState(false);
      }
    };

    const init = async () => {
      await fetchArticleDatail();
      initScrollEvent();
    };

    onMounted(init);

    onUnmounted(removeScrollEvent);

    return {
      article,
      isLoading,
    };
  },
});
</script>

<style scoped>
.container {
  background-color: #f9f9f9;
  background-color: var(--detailBg);
}
.article-container {
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
  width: 960px;
  position: relative;
}
.thumb {
  width: 100%;
  height: 300px;
  background-color: #eee;
  background-color: var(--mardownTextMuted);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.list-container {
  padding-top: 10px;
}
.row:after,
.row:before {
  content: " ";
  display: table;
}
.row:after {
  clear: both;
}
.main {
  position: relative;
  padding: 20px;
  margin-top: 20px;
  min-height: 1px;
  padding-left: 15px;
  width: 75%;
  float: left;
  background-color: #fff;
  background-color: var(--detailConBg);
}
.article-list {
  margin: 0;
  padding: 0;
}
.article-meta {
  font-size: 14px;
  color: #b4b4b4;
  color: var(--textDefault);
}
.article-meta span {
  margin-right: 15px;
}
.aside {
  margin-left: 2%;
  position: relative;
  min-height: 1px;
  width: 22%;
  float: left;
}
:deep(.aside .article-download-nav) {
  border: 1px solid transparent;
  background-color: var(--detailConBg);
}
.article-title {
  font-size: 30px;
  color: #2f2f2f;
  color: var(--textTitle);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
