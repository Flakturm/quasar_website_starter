const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('src/services/user-password-auth/pages/Login')
      },
      {
        path: '/register',
        name: 'register',
        component: () =>
          import('src/services/user-password-auth/pages/Register')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404')
  }
]

export default routes
