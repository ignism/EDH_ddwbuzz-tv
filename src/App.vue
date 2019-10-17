<template>
  <div id="app" class="mx-auto font-sans">
    <header class="header flex justify-start items-center h-16">
      <div class="w-1/4 flex justify-center">
        <img class="block h-12 pt-2" src="./assets/svg/getthebuzz_logo.svg" alt="">
      </div>
      <div class="w-1/2 flex justify-center">
        <h1 class="text-xl text-purple">{{ currentUser }}</h1>
      </div>
    </header>
    <section class="post-block-wrapper">
      <siema ref="slider" class="siema" @update:current="onChange($event)" :options="options" :class="{active: isLoaded}">
        <!-- <post-block v-for="(post, index) in posts" ref="postBlock" :index="index" :key="key" /> -->
        <post-block ref="postBlock0" index="0" />
        <post-block ref="postBlock1" index="1" />
        <post-block ref="postBlock2" index="2" />
        <post-block ref="postBlock3" index="3" />
        <post-block ref="postBlock4" index="4" />
        <post-block ref="postBlock5" index="5" />
        <post-block ref="postBlock6" index="6" />
        <post-block ref="postBlock7" index="7" />
        <post-block ref="postBlock8" index="8" />
        <post-block ref="postBlock9" index="9" />
        <post-block ref="postBlock10" index="10" />
        <post-block ref="postBlock11" index="11" />
      </siema>
    </section>
  </div>
</template>

<script>
import store from './store'
import PostBlock from './components/PostBlock'

export default {
  name: 'App',
  components: {
    'post-block': PostBlock
  },
  data: function () {
    return {
      options: {
        draggable: true,
        loop: true
      },
      currentUser: '',
      currentIndex: 0,
      isLoaded: false
    }
  },
  computed: {
    firstPost: function () {
      return store.state.text
    },
    posts: function () {
      return store.state.posts
    },
    meta: function () {
      return store.state.meta
    },
    isBusy: function () {
      return store.state.isBusy
    }
  },
  methods: {
    getData: function () {
      store.dispatch('getData')
    },
    onChange: function (val, oldVal) {
      this.currentIndex = val
      this.currentUser = this.meta.channel_users[this.posts[this.currentIndex].user]

      for (let i = 0; i < 12; i++) {
        if (this.$refs.postBlock0) {
          this.$refs['postBlock' + i].deactivate()
        }
      }

      console.log(this.currentIndex)
    }
  },
  created: function () {
    store.dispatch('getData').then((result) => {
      for (let i = 0; i < 12; i++) {
        if (this.$refs.postBlock0) {
          this.$refs['postBlock' + i].reset()
        } else {
          console.log('error')
          console.log(this.$refs)
        }
      }

      this.currentUser = this.meta.channel_users[this.posts[this.currentIndex].user]
      this.isLoaded = true
    })

    setInterval(() => {
      store.dispatch('getData').then((result) => {
        for (let i = 0; i < 12; i++) {
          if (this.$refs.postBlock0) {
            this.$refs['postBlock' + i].reset()
          } else {
            console.log('error')
            console.log(this.$refs)
          }
        }
      })
    }, 180000)

    setInterval(() => {
      this.$refs.slider.next()
      this.$refs['postBlock' + this.currentIndex].activate()
    }, 10000)
  },
  watch: {
    isBusy: function (val) {
    }
  }
}
</script>

<style>
@tailwind preflight;

@tailwind components;

@tailwind utilities;

#app {
  max-width: 1800px;
  font-size: 1rem;
}

.post-block-wrapper {
  width: 100vw;
  max-width: 1800px;
  height: calc(100vh - 4rem);
  max-height: calc(1800px - 4rem);
}

.siema {
  opacity: 0;
}

.siema.active {
  opacity: 1;
}
</style>
