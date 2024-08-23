import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AdminView from '../views/AdminView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'admin',
    component: AdminView,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '/',
        name: 'dashbord',
        component: () => import('../views/DashboardView.vue'),
        meta: { title: 'Tableau de bord', requireAuth: true }
      },
      {
        path: '/naissances',
        name: 'naissances',
        component: () => import('../views/ActeNaissanceView.vue'),
        meta: { title: 'Actes de naissance', requireAuth: true  }

      },
      {
        path: '/mariages',
        name: 'mariages',
        component: () => import('../views/ActeMariageView.vue'),
        meta: { title: 'Actes de mariage', requireAuth: true  }

      },
      {
        path: '/deces',
        name: 'deces',
        component: () => import('../views/ActeDecesView.vue'),
        meta: { title: 'Actes de décès', requireAuth: true  }
      },
      {
        path: '/utilisateurs',
        name: 'utilisateurs',
        component: () => import('../views/UtilisateurView.vue'),
        meta: { title: 'Utilisateurs', requireAuth: true  }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { title: 'Login' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: ()=> import('@/views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // Mettre à jour le titre de la page
  if (typeof to.meta.title === 'string') {
    document.title = to.meta.title;
  } else {
    document.title = 'Test KAMGOKO'; // Titre par défaut si aucun titre n'est défini
  }

  // Vérifier si l'authentification est requise et si l'utilisateur est authentifié
  if (to.meta.requireAuth && !localStorage.getItem("user")) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router
