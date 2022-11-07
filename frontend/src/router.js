import {createRouter, createWebHistory} from 'vue-router';

import Timeline from './pages/timeline/Timeline.vue';
import People from './pages/people/People.vue';
import Login from './pages/auth/Login.vue';
import Register from './pages/auth/Register.vue';
import Profile from './pages/profile/Profile.vue';
import NotFound from './pages/NotFound.vue'
import store from './store/index'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', redirect: '/timeline', meta: {requiresAuth: true}},
    {path: '/timeline', component: Timeline, meta: {requiresAuth: true}},
    {path: '/profile/:userId', props: true, component: Profile, meta: {requiresAuth: true}},
    {path: '/people', component: People, meta: {requiresAuth: true}},
    {path: '/login', component: Login, meta: {requiresUnAuth: true}},
    {path: '/register', component: Register, meta: {requiresUnAuth: true}},
    {path: '/:notFound(.*)', component: NotFound },
  ]
})

router.beforeEach(function (to, _, next){
  // console.log(store.state.auth.token);
  if (to.meta.requiresAuth && !!!store.state.auth.token) {
    next('/login');
  // } else if (to.meta.requiresUnAuth){
  //   next('/timeline');
  } else {
    next();
  }
});

export default router;