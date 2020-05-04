<template>
  <v-container
      class="fill-height"
      fluid
  >
    <v-row>
      <v-card
        class="mx-auto pa-4 d-flex flex-column align-center justify-center"
        style="width: 1000px"
      >
        <span class="font-weight-thin">Now Playing:</span>
        <span class="mt-2 mb-4 font-weight-bold">{{ songTitle }}</span>

        <youtube
          :video-id="videoId"
          :player-vars="playerVars"
          :fit-parent="true"
          ref="youtube"
          >
        </youtube>

        <SongTable class="mt-4" @playSong="changeVid" />
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import SongTable from '../components/SongTable.vue'

export default {
  name: 'Listen',
  components: {
    SongTable
  },
  data () {
    return {
      songTitle: '',
      videoId: '',
      newVideoId: '',
      playerVars: {
        autoplay: 1,
        controls: 1,
        showinfo: 0,
        modestbranding: 1,
      },
    }
  },
  methods: {
    async changeVid(song) {
      if (song === 'button') {
        this.videoId = this.newVideoId
        let videoInfo = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${this.videoId}&key=AIzaSyCrZMGNPi8UxOkGwdYYXmBnilyEvXujdUs`)
        this.songTitle = videoInfo.data.items[0].snippet.title
      } else {
        this.videoId = song.id
        this.songTitle = song.title
      }
      this.$refs.youtube.player.loadVideoById(this.videoId)
      this.$refs.youtube.player.setVolume(10)
    }
  }
}
</script>
