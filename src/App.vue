<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
          link
        >
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>TEJ Tunes</v-toolbar-title>
      <v-icon class="pl-2">mdi-music-note-eighth</v-icon>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

    <v-footer app>
      <v-spacer></v-spacer>
      <span class="font-weight-thin">Jan-Robert Yeaton, Timur Guler, Eleanor Haman</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      links: [
        { text: 'Home', icon: 'mdi-home', route: '/' },
        { text: 'Listen', icon: 'mdi-play-circle', route: '/listen' },
        { text: 'Add Song', icon: 'mdi-music-note-plus', route: '/addsong' },
        { text: 'Edit Song', icon: 'mdi-file-edit', route: '/editsong' },
      ],
    }),
    watch: {
      $route: {
        immediate: true,
        // eslint-disable-next-line no-unused-vars
        handler(to, from) {
          document.title = to.meta.title || 'TEJ Tunes';
        }
      },
    },
    created () {
      this.$vuetify.theme.dark = true
    },
  }
</script>

<style>
body::-webkit-scrollbar {
  width: 15px;
}
body::-webkit-scrollbar-track {
  background: #202020;
  border-left: 1px solid #2c2c2c;
}
body::-webkit-scrollbar-thumb {
  background: #3e3e3e;
  border: solid 3px #202020;
  border-radius: 7px;
}
body::-webkit-scrollbar-thumb:hover {
  background: white;
}
</style>