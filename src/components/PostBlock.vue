<template>
  <div class="post-block flex items-center relative">
    <!-- <div class="absolute pin mt-8">
      <h1 class="text-xl text-purple text-center">{{ post.user }}</h1>
    </div> -->
    <div class="post-detail__media w-3/5 h-full">
      <d-player v-if="hasVideo"
          :options="DPlayerOptions"
          lang="en"
          @play="play"
          ref="player" style="width: 100%">
      </d-player>
      <div v-if="!hasVideo" class="w-full h-full">
        <img v-if="hasMedia" class="block w-full" :src="media" alt="">
        <div v-if="!hasMedia" class="w-full h-60vw" :style="style"></div>
      </div>
    </div>
    <div class="post-text w-2/5 h-full">
      <div class="post-detail__header mt-24 px-12">
          <span class="font-normal text-lg tracking-wide uppercase">{{ time }}</span>
      </div>
      <div class="post-detail__body mt-12 px-12">
          <h3 v-if="post.title != ''" class="font-light uppercase">{{ post.title }}</h3>
          <p v-if="post.type == 'instagram' || post.type == 'twitter'" class="text-3xl leading-tight font-normal">{{ post.text }}</p>
          <p v-else class="text-2xl">{{ post.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import VueDPlayer from 'vue-dplayer'
import 'vue-dplayer/dist/vue-dplayer.css'
import store from '../store.js'

export default {
  name: 'PostBlock',
  components: {
    'd-player': VueDPlayer
  },
  props: ['index'],
  data: function () {
    return {
      isActive: false,
      hasMedia: false,
      hasVideo: false,
      post: {
        title: '',
        time: '',
        text: '',
        type: '',
        media: ''
      },
      DPlayerOptions: {
        volume: '0.5',
        video: {
          url: '',
          pic: ''
        },
        loop: true,
        contextmenu: [
          {
            text: 'Get the buzz',
            link: ''
          }
        ]
      }
    }
  },
  computed: {
    time: function () {
      if (this.post.time === 'Now') {
        return 'Now'
      } else {
        return this.post.date + ' ' + this.post.time
      }
    },
    style: function () {
      let media = 'background-size: contain; background-image: url('
      if (this.post.media !== '') {
        media += this.post.media
      } else {
        let rndm = Math.floor(Math.random() * 8) + 1
        media += 'https://ddw.buzz/static/img/pattern0' + parseInt(rndm) + '.png'
      }
      return media + ')'
    },
    media: function () {
      let rndm = Math.floor(Math.random() * 8) + 1
      let media =
        'https://ddw.buzz/static/img/pattern0' + parseInt(rndm) + '.png'
      if (this.post.media !== '') {
        return this.post.media
      } else {
        return media
      }
    }
  },
  methods: {
    play: function () {
      // console.log('play callback')
    },
    reset: function () {
      // console.log('resetting: ' + this.index)
      this.post = store.getters.getPost(parseInt(this.index))
    },
    activate: function () {
      this.isActive = true

      setTimeout(() => {
        console.log(this.isActive + ':' + this.hasVideo)
        if (this.hasVideo) {
          this.$refs.player.dp.play()
        }
      }, 500)
    },
    deactivate: function () {
      this.isActive = false

      if (this.hasVideo) {
        // console.log('pausing...')
        this.$refs.player.dp.pause()
      }
    }
  },
  watch: {
    post: {
      handler: function (val, oldVal) {
        if (val.video !== '' && val.video !== null) {
          // console.log(val)
          this.DPlayerOptions.video.url = val.video
          this.DPlayerOptions.video.pic = val.media

          this.hasVideo = true

          if (this.isActive) {
            // console.log('playing...')
            this.$refs.player.dp.play()
          }
        } else {
          this.hasVideo = false
        }

        if (this.post.media !== '') {
          this.hasMedia = true
        } else {
          this.hasMedia = false
        }
      },
      deep: true
    }
  }
}
</script>

<style>
.post-block {
  height: calc(100vh - 4rem);
  max-height: calc(1800px - 4rem);
}

.h-60vw {
  height: 60vw;
}
</style>
