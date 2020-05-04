import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Listen from '../views/Listen.vue'
import AddSong from '../views/AddSong.vue'
import EditSong from '../views/EditSong.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/listen',
    name: 'Listen',
    component: Listen
  },
  {
    path: '/addsong',
    name: 'AddSong',
    component: AddSong
  },
  {
    path: '/editsong',
    name: 'EditSong',
    component: EditSong
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
