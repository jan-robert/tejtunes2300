<template>
  <v-container fluid>
    <v-text-field
      v-model="searchQuery"
      class="mx-auto"
      style="width: 1000px;"
      outlined
      dense
    >
      <template slot="label">
        <v-icon small>mdi-magnify</v-icon>
        <span> Search Song</span>
      </template>
    </v-text-field>
    <v-simple-table fixed-header dark height="300px" class="mx-auto">
      <template v-slot:default>
        <thead>
          <tr>
            <th>
              <div class="btnheader px-16" />
            </th>
            <th class="overline" v-for="key in keys" :key="key.name">{{ key.name }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in resultQuery" :key="item.name">
            <td>
              <v-btn
                class="mx-auto" fab dark x-small outlined color="white"
                @click="playSong(item)"
              >
                <v-icon dark>mdi-play</v-icon>
              </v-btn>
            </td>
            <td class="text-truncate">{{ item.title }}</td>
            <td class="text-truncate">{{ item.artist }}</td>
            <td class="text-truncate">{{ item.genre }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import { db } from '../firebase'
// import dummyData from '../dummy.json'

export default {
  data () {
    return {
      loaded: false,
      keys: [
        { name: 'Title' },
        { name: 'Artist' },
        { name: 'Genre' }
      ],
      searchQuery: null,
      items: null
    }
  },
  async mounted () {
    try {
      await db.collection('songs').get().then(querySnapshot => {
        this.items = querySnapshot.docs.map(doc => doc.data())
      })
      this.loaded = true
      this.playSong(this.items[Math.floor(Math.random()*this.items.length)])
    } catch (err) {
      console.log(err.message)
    }
  },
  computed: {
    resultQuery () {
      if (this.searchQuery) {
        return this.items.filter((item)=>{
          return this.searchQuery.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
        })
      } else {
        return this.items;
      }
    }
  },
  methods: {
    playSong (song) {
      let convertedID = song.file.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
      let message = {
        "id": convertedID[1],
        "title": song.title
      }
      this.$emit('playSong', message)
    }
  },
}

</script>

<style scoped>
.btnheader {
  height: 47px;
  width: 40px;
}
</style>