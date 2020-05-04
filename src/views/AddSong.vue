<template>
  <v-container class="fill-height" fluid>
    <v-snackbar
      v-model="showSnackbar"
    >
      {{ snackbarText }}
      <v-spacer></v-spacer>
      <v-icon>{{ snackbarIcon }}</v-icon>
    </v-snackbar>
    <v-card
      class="mx-auto pa-10"
      style="width: 1000px"
    >
      <h1 class="font-weight-thin mb-10">
        <v-icon class="mr-4" large>mdi-music-note-plus</v-icon>Add A Song
      </h1>

      <v-form
        dark
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="title"
          :rules="titleRules"
          label="Title"
          required
        ></v-text-field>

        <v-text-field
          v-model="artist"
          :rules="artistRules"
          label="Artist"
          required
        ></v-text-field>

        <v-text-field
          v-model="ytlink"
          :rules="ytlinkRules"
          label="YouTube Link"
          required
        ></v-text-field>

        <v-select
          v-model="select"
          :items="genreOptions"
          :rules="[v => !!v || 'Genre is required']"
          label="Genre"
          required
        ></v-select>

        <v-text-field
          class="mb-12"
          v-model="password"
          :rules="passwordRules"
          label="Password"
          required
        ></v-text-field>

        <v-row class="d-flex flex-row-reverse">
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="addSong"
          >
            Add Song
          </v-btn>
          <v-btn
            color="error"
            class="mr-4"
            @click="reset"
          >
            Reset Form
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { db } from '../firebase'

export default {
  data: () => ({
    valid: false,
    title: '',
    titleRules: [
      v => !!v || 'Title is required'
    ],
    artist: '',
    artistRules: [
      v => !!v || 'Artist is required'
    ],
    ytlink: '',
    ytlinkRules: [
      v => !!v || 'YouTube Link is required',
      // eslint-disable-next-line no-useless-escape
      v => (/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/).test(v) || 'Must be a YouTube link.'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      // eslint-disable-next-line no-useless-escape
      v => v === 'CS2300' || 'Password is incorrect.'
    ],
    select: null,
    genreOptions: [
      'Alternative',
      'Classical',
      'Country',
      'Electronic',
      'Hip Hop',
      'Jazz',
      'Pop',
      'Rock'
    ],
    showSnackbar: false,
    snackbarText: '',
    snackbarIcon: ''
  }),

  methods: {
    async addSong () {
      this.$refs.form.validate()
      if (this.title !== '' && this.ytlink !== '' && this.select !== '' && this.title !== '') {
        try {
          await db.collection('songs').add({
            artist: this.artist,
            file: this.ytlink,
            genre: this.select,
            title: this.title
          })
          this.snackbarText = 'Song was added successfully.'
          this.snackbarIcon = 'mdi-check'
          this.$refs.form.reset()
        } catch (err) {
          this.snackbarText = err.message
          this.snackbarIcon = 'mdi-close'
        }
        this.showSnackbar = true
        setTimeout(function(){
          this.showSnackbar = false
        }, 3000)
      }
    },
    reset () {
      this.$refs.form.reset()
    }
  },
}

</script>