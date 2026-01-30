import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import HomePage from '../views/HomePage.vue'
import AboutPage from '../views/AboutPage.vue'
import ActivitiesPage from '../views/ActivitiesPage.vue'
import SharingPage from '../views/SharingPage.vue'
import ParentsPage from '../views/ParentsPage.vue'
import MediaClubPage from '../views/MediaClubPage.vue'
import EvaluationPage from '../views/EvaluationPage.vue'
import SafetyPage from '../views/SafetyPage.vue'
import ContactPage from '../views/ContactPage.vue'
import AdminPage from '../views/AdminPage.vue'
import StudentsPage from '../views/StudentsPage.vue'
import NotifyPage from '../views/NotifyPage.vue'
import LoginPage from '../views/LoginPage.vue'
import VinhDanhPage from '../views/VinhDanhPage.vue'

const routes = [
  {
    path: '/dang-nhap',
    name: 'Login',
    component: LoginPage,
    meta: { public: true }
  },
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/thong-bao',
    name: 'Notify',
    component: NotifyPage
  },
  {
    path: '/vinh-danh',
    name: 'VinhDanh',
    component: VinhDanhPage
  },
  {
    path: '/gioi-thieu',
    name: 'Intro',
    component: AboutPage
  },
  {
    path: '/hoat-dong',
    name: 'Activities',
    component: ActivitiesPage
  },
  {
    path: '/chia-se',
    name: 'Sharing',
    component: SharingPage
  },
  {
    path: '/phu-huynh',
    name: 'Parents',
    component: ParentsPage
  },
  {
    path: '/truyen-thong',
    name: 'MediaClub',
    component: MediaClubPage
  },
  {
    path: '/danh-gia',
    name: 'Evaluation',
    component: EvaluationPage
  },
  {
    path: '/an-toan-so',
    name: 'Safety',
    component: SafetyPage
  },
  {
    path: '/lien-he',
    name: 'Contact',
    component: ContactPage
  },
  {
    path: '/danh-sach',
    name: 'Students',
    component: StudentsPage
  },
  {
    path: '/quan-tri',
    name: 'Admin',
    component: AdminPage,
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Allow public routes
  if (to.meta.public) {
    next()
    return
  }

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/dang-nhap')
    return
  }

  // Check if route requires admin role
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next('/')
    return
  }

  next()
})


export default router
