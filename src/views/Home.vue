<template>
  <v-container
      class="fill-height"
      fluid
  >
    <v-card
      class="mx-auto px-4 py-8"
      style="width: 1000px"
    >
      <v-row class="mb-8">
        <h1 class="mx-auto font-weight-thin">Welcome to TEJ Tunes!</h1>
      </v-row>
      <v-row class="mb-12">
        <h4 style="width: 600px; text-indent: 30px" class="mx-auto font-weight-thin">
          TEJ Tunes is a manageable music library application where the user can utilize all the usual functions of a music streaming application 
          (play, pause, etc.) as well as add songs themselves. It acts as a huge playlist of songs where you can listen to songs 
          (provided by YouTube). A database is crucial for this application as each song will have many attributes, as well as storing 
          the songs themselves.
        </h4>
      </v-row>
      <v-row>
        <h1 class="mx-auto overline">POWERED BY</h1>
      </v-row>
      <v-row>
        <div class="mx-auto">
          <v-chip
            class="ma-3"
            color="red"
            text-color="white"
          >
            <v-avatar left>
              <v-icon>mdi-youtube</v-icon>
            </v-avatar>
            YouTube
          </v-chip>

          <v-chip
            class="ma-2"
            color="green accent-3"
            text-color="white"
          >
            <v-avatar left>
              <v-icon>mdi-vuejs</v-icon>
            </v-avatar>
            Vue.js
          </v-chip>

          <v-chip
            class="ma-2"
            color="light-blue lighten-1"
            text-color="white"
          >
            <v-avatar left>
              <v-icon>mdi-vuetify</v-icon>
            </v-avatar>
            Vuetify
          </v-chip>
        </div>
      </v-row>
      <v-row>
        <h1 class="mx-auto mt-8 mb-2 overline">MADE WITH <v-icon small>mdi-heart</v-icon> BY</h1>
      </v-row>
      <v-row>
        <p class="mx-auto caption font-weight-thin">Jan-Robert Yeaton, Timur Guler, and Eleanor Haman</p>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  components: {
  }
}
</script>
