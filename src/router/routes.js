
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Poker.vue') },
      { path: '/about', component: () => import('pages/About.vue') },
      { path: '/invite', component: () => import('pages/Invite.vue') },
      { path: '/join/:id', component: () => import('pages/Join.vue'), props: route => ({ id: route.params.id }) }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
