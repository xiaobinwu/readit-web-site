<template>
  <div class="container">
    <div class="row">
      <div class="main">
        <ClassifiedNav @query="fetchArticles" />
        <div class="list-container">
          <div class="article-list">
            <template v-if="articles.length > 0">
              <ArticleItem
                v-for="article in articles"
                :key="article._id"
                :article="article"
              />
            </template>
          </div>
          <ArticlePlaceholder v-show="loading || articles.length === 0" />
        </div>
        <Footer />
      </div>
      <div class="aside">
        <Calendar @click-callback="handleCalenderClick" />
        <AppDownLoadNav />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  onUnmounted,
  watch,
  nextTick,
} from "vue";
import request from "@app/services/request";
import { IHttpResultPaginate } from "@app/types/http";
import { IArticle } from "@app/types/business";
import AppLink from "@app/components/AppLink.vue";
import Calendar from "@app/components/Calendar.vue";
import ArticlePlaceholder from "@app/components/ArticlePlaceholder.vue";
import AppDownLoadNav from "@app/components/AppDownLoadNav.vue";
import ClassifiedNav from "@app/components/ClassifiedNav.vue";
import Footer from "@app/components/Footer.vue";
import ArticleItem from "./ArticleItem.vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";

type THttpResultPaginateArticles = IHttpResultPaginate<IArticle[]>;

export default defineComponent({
  name: "Article",
  components: {
    AppLink,
    ArticleItem,
    ArticlePlaceholder,
    Calendar,
    AppDownLoadNav,
    ClassifiedNav,
    Footer
  },
  setup(props) {
    const route = useRoute();
    const articles = ref([]);
    const loading = ref(false);
    let pagination = ref({
      total: 0, // 总页数
      page: 0, // 当前页
      pages: 0, // 总页数
      size: 0, // 每页显示数据数
    });

    onBeforeRouteLeave((to, from) => {
      removeScrollEvent();
    });

    // hack
    watch(
      () => route.name,
      async (newName) => {
        if (newName === "Home") {
          initScrollEvent();
        }
      }
    );

    // 更新列表
    const updateResultData = async (result: THttpResultPaginateArticles) => {
      const { entry, ...resetReuslt } = result;
      const { list = [] } = entry;
      loading.value = false;
      pagination.value = { ...resetReuslt };
      if (resetReuslt.page > 1) {
        articles.value.push(...list);
      } else {
        articles.value = list;
      }
      await nextTick();
      // @ts-ignore
      window.echo.render();
    };

    // 请求数据
    const fetchArticles = async (
      pageNo: number = 1,
      otherParams = {}
    ): Promise<any> => {
      loading.value = true;
      const data = await request.fetchArticles<THttpResultPaginateArticles>({
        pageNo,
        ...otherParams,
      });
      const { code, message, ...reset } = data;
      if (code === 0) {
        console.log(reset);
        updateResultData(reset);
        loading.value = false;
        return data;
      }
      loading.value = false;
    };

    // 滚动处理
    const scrollHander = () => {
      // 距离底部200px时加载一次
      let bottomOfWindow =
        document.documentElement.offsetHeight -
          document.documentElement.scrollTop -
          window.innerHeight <=
        200;
      if (
        bottomOfWindow &&
        !loading.value &&
        pagination.value.page < pagination.value.pages &&
        pagination.value.pages !== 0
      ) {
        let page = pagination.value.page;
        page += 1;
        fetchArticles(page);
      }
    };
    const initScrollEvent = () => {
      window.addEventListener("scroll", scrollHander);
      // @ts-ignore
      window.echo.init();
    };
    const removeScrollEvent = () => {
      window.removeEventListener("scroll", scrollHander);
      // @ts-ignore
      window.echo.detach();
    };

    // 日历点击回调
    const handleCalenderClick = (cell: any, dateData: any) => {
      console.log(cell, "cell");
      console.log(dateData, "dateData");
    };

    // 初始化
    const init = async () => {
      await fetchArticles();
      initScrollEvent();
    };

    onMounted(init);

    onUnmounted(removeScrollEvent);

    return {
      articles,
      loading,
      pagination,
      fetchArticles,
      handleCalenderClick,
    };
  },
});
</script>

<style scoped>
.container {
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
  width: 960px;
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
  padding-top: 30px;
  padding-right: 0;
  min-height: 1px;
  padding-left: 15px;
  width: 67%;
  float: left;
}
.article-list {
  margin: 0;
  padding: 0;
}
.aside {
  padding: 30px 0 0;
  margin-left: 4%;
  position: relative;
  min-height: 1px;
  width: 29%;
  float: left;
}
</style>