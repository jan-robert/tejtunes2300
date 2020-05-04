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
    component: Home,
    meta: {
      title: 'Home | TEJ Tunes'
    }
  },
  {
    path: '/listen',
    name: 'Listen',
    component: Listen,
    meta: {
      title: 'Listen | TEJ Tunes'
    }
  },
  {
    path: '/addsong',
    name: 'AddSong',
    component: AddSong,
    meta: {
      title: 'Add Song | TEJ Tunes'
    }
  },
  {
    path: '/editsong',
    name: 'EditSong',
    component: EditSong,
    meta: {
      title: 'Edit Song | TEJ Tunes'
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
