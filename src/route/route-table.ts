import Home from '../page/Home.vue'
import Article from '../page/Article.vue'
import NotFound from '../page/NotFound.vue'


const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/article/:id', name: 'Article', component: Article  },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

export default routes;
