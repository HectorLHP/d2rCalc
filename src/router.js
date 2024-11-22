// router.js
import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from './components/LandingPage.vue';
import RingSection from './components/RingSection.vue';
//import AmuletSection from './components/AmuletSection.vue';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/rings', component: RingSection },
  //{ path: '/amulets', component: AmuletSection },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
