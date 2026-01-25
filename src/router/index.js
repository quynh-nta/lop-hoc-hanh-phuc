import { createRouter, createWebHistory } from 'vue-router'
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

const routes = [
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
    path: '/admin',
    name: 'Admin',
    component: AdminPage
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

export default router
