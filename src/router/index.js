import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Quiz from '../views/Quiz.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/src-egzamin',
    name: 'SRCEgzamin',
    component: Quiz,
    props: { quizType: 'src-egzamin' }
  },
  {
    path: '/zaglarz-jachtowy',
    name: 'ZaglarzJachtowy',
    component: Quiz,
    props: { quizType: 'zaglarz-jachtowy' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
