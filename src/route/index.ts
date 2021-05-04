import { createRouter, createWebHistory } from 'vue-router'
import routes from './route-table'
import scrollWaiter from './scroll-waiter'

export const routerHistory = createWebHistory();

export const router = createRouter({
    history: routerHistory,
    routes,
    async scrollBehavior(to, from, savedPosition) {
        await scrollWaiter.wait()
        if (savedPosition) {
          return savedPosition
        } else {
          // TODO: check if parent in common that works with alias
          if (to.matched.every((record, i) => from.matched[i] !== record))
            return { left: 0, top: 0 }
        }
        // leave scroll as it is by not returning anything
        // https://github.com/Microsoft/TypeScript/issues/18319
        return false
      },
});