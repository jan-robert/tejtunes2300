<template>
  <v-container class="fill-height" fluid>
    <v-snackbar
      v-model="showSnackbar"
    >
      {{ snackbarText }}
      <v-spacer></v-spacer>
      <v-icon>{{ snackbarIcon }}</v-icon>
    </v-snackbar>

    <v-stepper class="mx-auto" style="width: 1000px" dark v-model="e6" vertical>
      <h1 class="font-weight-thin ml-5 my-8">
        <v-icon class="mr-4" large>mdi-file-edit</v-icon>Edit/Delete A Song
      </h1>

      <v-stepper-step :complete="e6 > 1" step="1">
        Enter password
        <small>Making sure you're allowed to edit/delete.</small>
      </v-stepper-step>
      <v-stepper-content step="1">
        <v-form ref="form">
          <v-text-field
            class="mb-4"
            style="width: 300px"
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required
          ></v-text-field>
        </v-form>
        <v-btn class="mr-2" color="primary" @click="enterPassword()">Continue</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 2" step="2">
        Enter Song ID
        <small>Choose to either edit or delete the selected song.</small>
      </v-stepper-step>
      <v-stepper-content step="2">
        <v-text-field
          class="mb-4"
          style="width: 300px"
          v-model="songID"
          label="Song ID"
          required
        ></v-text-field>
        <v-btn class="mr-2" color="warning" @click="userAction = 'edit'; firstStep()">Edit</v-btn>
        <v-btn class="mr-2" color="error" @click="userAction = 'delete'; firstStep()">Delete</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 3" step="3">
        Edit Song
        <small>Either edit the song's info by form, or confirm deletion.</small>
      </v-stepper-step>
      <v-stepper-content step="3">
        <v-form
          v-if="userAction === 'edit'"
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
            class="mb-12"
            v-model="select"
            :items="genreOptions"
            :rules="[v => !!v || 'Genre is required']"
            label="Genre"
            required
          ></v-select>

          <v-row class="d-flex flex-row-reverse">
            <v-btn
              :disabled="!valid"
              color="warning"
              class="mx-4"
              @click="editSong"
            >
              Edit Song
            </v-btn>
            <v-btn text @click="e6 = 2">
              Go Back
            </v-btn>
          </v-row>
        </v-form>
        <div v-else-if="userAction === 'delete'">
          <h1 class="font-weight-thin mb-2">
            Are you sure you'd like to delete this song:
          </h1>
          <v-card class="mb-4">
            <v-card-title>{{ songInfo.title }}</v-card-title>
            <v-card-subtitle>By: {{ songInfo.artist }}</v-card-subtitle>
            <v-card-text>
              {{ songInfo.genre }}
              <br>
              {{ songInfo.file }}
            </v-card-text>
          </v-card>
          <v-row class="d-flex flex-row-reverse">
            <v-btn
              color="error"
              class="mx-4"
              @click="deleteSong"
            >
              Delete Song
            </v-btn>
            <v-btn text @click="e6 = 2">
              Go Back
            </v-btn>
          </v-row>
        </div>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>

<script>
import { db } from '../firebase'

export default {
  data () {
    return {
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
      snackbarIcon: '',
      songID: '',
      songInfo: null,
      userAction: '',
      e6: 1,
    }
  },
  methods: {
    enterPassword() {
      this.$refs.form.validate()
      if (this.password === 'CS2300') {
        this.e6 = 2
      }
    },
    async firstStep() {
      try {
        let song = await db.collection('songs').doc(this.songID).get()
        if (song.exists !== false) {
          await db.collection('songs')
            .doc(this.songID)
            .get()
            .then(snapshot => {
              this.songInfo = snapshot.data()
            })
          this.title = this.songInfo.title
          this.artist = this.songInfo.artist
          this.ytlink = this.songInfo.file
          this.select = this.songInfo.genre
          this.e6 = 3
        } else {
          this.userAction = ''
          this.snackbarText = 'Song does not exist, try again.'
          this.snackbarIcon = 'mdi-credit-card-off-outline'
          this.showSnackbar = true
          setTimeout(function(){
            this.showSnackbar = false
          }, 3000)
        }
      } catch (err) {
        this.snackbarText = err.message
        this.snackbarIcon = 'mdi-close'
        this.showSnackbar = true
        setTimeout(function(){
          this.showSnackbar = false
        }, 3000)
      }
    },
    async editSong() {
      try {
        await db.collection('songs')
          .doc(this.songID)
          .set({ 
            artist: this.artist,
            file: this.ytlink,
            genre: this.select,
            title: this.title
          })
        this.snackbarText = 'Song was edited successfully.'
        this.snackbarIcon = 'mdi-check'
      } catch (err) {
        this.snackbarText = err.message
        this.snackbarIcon = 'mdi-close'
      }
      this.showSnackbar = true
      setTimeout(function(){
        this.showSnackbar = false
      }, 3000)
    },
    async deleteSong() {
      try {
        await db.collection('songs')
          .doc(this.songID)
          .delete()
        this.e6 = 2
        this.snackbarText = 'Song was deleted successfully.'
        this.snackbarIcon = 'mdi-check'
        this.songID = ''
      } catch (err) {
        this.snackbarText = err.message
        this.snackbarIcon = 'mdi-close'
      }
      this.showSnackbar = true
      setTimeout(function(){
        this.showSnackbar = false
      }, 3000)
    }
  }
}

</script>