import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', alias: '/signIn', component: () => import('../views/SignIn.vue') },
    { path: '/about', component: () => import('../views/About.vue') },
    { path: '/home',
    component: () => import('../views/Home.vue'),
    meta: {
      requiresAuth: true,
    } },
    { path: '/newTemplate', component: () => import('../views/newTemplate.vue') },
    { path: '/profile',
      component: () => import('../views/Profile.vue'),
      meta: {
        requiresAuth: true,
      } },
    { path: '/register', component: () => import('../views/Register.vue') },
    { path: '/reportATemplate', component: () => import('../views/ReportATemplate.vue') },
    { path: '/roleView', component: () => import('../views/RoleView.vue') },
    { path: '/taskView', component: () => import('../views/TaskView.vue') },
    { path: '/templateMaker', component: () => import('../views/TemplateMaker.vue') },
    { path: '/templatesDB', component: () => import('../views/TemplatesDB.vue') },
    { path: '/templateView', component: () => import('../views/TemplateView.vue') },
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("you gotta sign in first!");
      next("/");
    } 
  } else {
    next();
  }
});

export default router;