import { createRouter, createWebHistory } from 'vue-router'
import AllInOneView from '../views/AllInOneView.vue'
import DepartmentView from '../views/DepartmentView.vue'
import DepartmentDetailView from '../views/DepartmentDetailView.vue'
import JoinView from '../views/JoinView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'all-in-one',
      component: AllInOneView,
      meta: { title: '自强Studio' },
    },
    { path: '/about', redirect: { path: '/', hash: '#about' }, meta: { title: '自强Studio' } },
    { path: '/product', redirect: { path: '/', hash: '#product' }, meta: { title: '自强Studio' } },
    { path: '/department', redirect: { path: '/', hash: '#department' }, meta: { title: '自强Studio' } },
    { path: '/join', redirect: { path: '/', hash: '#join' }, meta: { title: '自强Studio' } },
    // keep deep detail route for department details page if navigated directly
    {
      path: '/department/:centerName/:departmentName',
      name: 'department-detail',
      component: DepartmentDetailView,
      meta: { title: '自强Studio' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 0,
      }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  },
})

router.afterEach((to) => {
  const baseTitle = '自强Studio'
  const routeTitle = (to.meta && (to.meta as any).title) as string | undefined
  if (routeTitle) {
    document.title = routeTitle
  } else {
    document.title = baseTitle
  }
})

export default router
