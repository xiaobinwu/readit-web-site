import Home from '../page/Home.vue'
import Article from '../page/Article.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/article/:id', component: Article  }
];

export default routes;
