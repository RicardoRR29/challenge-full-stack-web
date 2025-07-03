import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/components/DefaultLayout.vue'
import StudentListView from '@/views/StudentListView.vue'
import StudentFormView from '@/views/StudentFormView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const routes = [
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        redirect: () => {
          const isLoggedIn = !!localStorage.getItem('token')
          return isLoggedIn ? '/students' : '/login'
        },
      },
      { path: 'students', component: StudentListView },
      { path: 'students/create', component: StudentFormView },
      { path: 'students/:id/edit', component: StudentFormView },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const isLoggedIn = !!localStorage.getItem('token')
  const userRole = localStorage.getItem('role')

  if (authRequired && !isLoggedIn) {
    return { path: '/login' }
  }

  if ((to.path === '/login' || to.path === '/register' || to.path === '/') && isLoggedIn) {
    return { path: '/students' }
  }

  const isAdminOnly = to.path.includes('/create') || to.path.includes('/edit')
  if (isAdminOnly && userRole !== 'admin') {
    return { path: '/students' }
  }
})

export default router
