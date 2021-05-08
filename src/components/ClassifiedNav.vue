<template>
    <nav class="classified-nav">
        <div class="cat-container">
            <span @click="currentCategorty = ''" :class="{ isActive: currentCategorty === '' }">所有</span>
            <span
                v-for="cItem in categories"
                :key="cItem._id"
                :class="{ isActive: currentCategorty === cItem._id }"
                @click="currentCategorty = cItem._id">
                {{cItem.name }}
            </span>
        </div>
        <div class="search-container">
            <select v-model="searchType">
                <option :value="ESearchTypeState.TAG">标签</option>
                <option :value="ESearchTypeState.KEYWORD">关键词</option>
            </select>
            <select v-model="currentTag" v-show="searchType === ESearchTypeState.TAG">
                <option value="">请选择</option>
                <option v-for="option in tags" :key="option._id" :value="option._id">
                    {{ option.name }}
                </option>
            </select>
            <input v-show="searchType === ESearchTypeState.KEYWORD" v-focus="searchType === ESearchTypeState.KEYWORD" v-model="currentTitle" />
            <button class="query-button" @click="fetchArticles">
                Go!
            </button>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import AppLink from '@app/components/AppLink.vue'
import request from '@app/services/request'
import { IHttpResultPaginate } from '@app/types/http'
import { ITag, ICategory  } from '@app/types/business'
import { ESearchTypeState  } from '@app/types/state'

// 标签 Type
type THttpResultPaginateTags = IHttpResultPaginate<ITag[]>;

// 类型 Type
type THttpResultPaginateCategory = IHttpResultPaginate<ICategory[]>;

export default defineComponent({
  name: 'ClassifiedNav',
  emits: ['query'],
  components: {
    AppLink
  },
  directives: {
      'focus': {
        mounted(el, binding) {
            if (binding.value) {
                el.focus();
            }
        },
        updated(el, binding) {
            if (binding.value) {
                el.focus();
            }
        }
      }
  },
  setup(props, context) {
    const currentCategorty = ref('');
    const currentTag = ref('');
    const currentTitle = ref('');
    const searchType = ref(ESearchTypeState.TAG);
    const categories = ref([]);
    const tags = ref([]);

    watch(
      searchType,
      type => {
        if (type === ESearchTypeState.TAG) {
          currentTitle.value = '';
        }
        if (type === ESearchTypeState.KEYWORD) {
          currentTag.value = '';
        }
      }
    );

    watch(
      currentCategorty,
      () => {
          console.log('请求');
          fetchArticles();
      }
    )

    const fetchArticles = () => {
        const params = {
            ...(currentCategorty.value ? { category: [currentCategorty.value] } : {}),
            ...(currentTag.value ? { tag: [currentTag.value] } : {}),
            ...(currentTitle.value ? { title: currentTitle.value } : {})
        }
        context.emit('query', 1, params);
    }

    const fetchCategories = async (): Promise<any> => {
      const data = await request.fetchCategories<THttpResultPaginateCategory>({ noPage: true, pageNo: 1 });
      const { code, message, ...reset } = data;
      if (code === 0) {
        const { entry, ...resetReuslt } = reset;
        const { list = [] } = entry;
        categories.value = list;
      }
    }
    const fetchTags = async () => {
        const data = await request.fetchTags<THttpResultPaginateTags>({ noPage: true, pageNo: 1 });
        const { code, message, ...reset } = data;
        console.log('Tags', data);
        if (code === 0) {
            const { entry, ...resetReuslt } = reset;
            const { list = [] } = entry;
            tags.value = list;
        }
    }

    const init = async () => {
        await fetchCategories();
        await fetchTags();
    }

    onMounted(init);

    return {
        ESearchTypeState,
        searchType,
        currentTitle,
        currentTag,
        currentCategorty,
        categories,
        tags,
        fetchTags,
        fetchCategories,
        fetchArticles
    }
  }
})
</script>

<style scoped>
    .classified-nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40px;
    }
    .cat-container {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 14px;
    }
    .cat-container span{
        cursor: pointer;
        padding: 12px;
    }
    .cat-container span.isActive {
        background-color: #f2f2f2;
        background-color: var(--calendarColor);
    }
    .cat-container span:hover {
        color: #7cb305;
        color: var(--primary);
    }
    .search-container {
        height: inherit;
    }
    .search-container select {
        font-size: 14px;
        height: inherit;
        vertical-align: bottom;
        background-color: #f2f2f2;
        background-color: var(--calendarColor);
        border-color: transparent;
        padding: 0 10px;
        outline: none;
        text-align: left;
    }
    .search-container input {
        max-width: 117px;
        font-size: 14px;
        height: inherit;
        background-color: #f2f2f2;
        background-color: var(--calendarColor);
        border-color: transparent;
        padding: 0 10px;
        outline: none;
        text-align: left;
    }
    .search-container .query-button {
        cursor: pointer;
        height: inherit;
        padding: 0 15px;
        border-color: transparent;
        background-color: #f2f2f2;
        background-color: var(--calendarColor);
        vertical-align: bottom;
        appearance: none;
        -webkit-appearance: none;
        outline: none;
    }
    .search-container .query-button {
        color: #7cb305;
        color: var(--primary);
    }
</style>
