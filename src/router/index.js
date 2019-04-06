import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/admin',
      name: 'home-admin',
      component: () => import('@/pages/HomeAdmin.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/user',
      name: 'home-user',
      component: () => import('@/pages/HomeUser.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/signin',
      name: 'login',
      component: () => import('@/pages/Login.vue'),
      meta: {
        requiresAuth: false,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log('to', to);
  const idToken = localStorage.idToken;
  const authRole = localStorage.authRole ? localStorage.authRole : '';
  console.log('authuser', authRole);
  console.log('idToken', idToken);
  if (to.path === '/' && authRole && authRole === 'admin') {
    router.push({ name: 'home-admin' });
  } else if (to.path === '/' && authRole && authRole === 'nonAdmin') {
    router.push({ name: 'home-user' });
  } else if (to.path === '/' && !authRole) {
    router.push({ name: 'login' });
  }
  if (to.meta.requiresAuth) {
    if (idToken) next();
    else next({ name: 'login' });
  }
  next();
});

export default router;
