import Home from '../page/Home.vue'
import ArticleDetail from '../page/ArticleDetail.vue'
import NotFound from '../page/NotFound.vue'
import AppDownload from '../page/AppDownload.vue'
import SendArticle from '../page/SendArticle.vue'



const routes = [
	{ path: '/', name: 'Home', component: Home },
	{ path: '/article/:id', name: 'ArticleDetail', component: ArticleDetail, props: true },
	{ path: '/appdownload', name: 'AppDownload', component: AppDownload },
	{ path: '/sendarticle', name: 'SendArticle', component: SendArticle },
	{ path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

export default routes;
