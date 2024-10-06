<template>
  <div class="background">
    <video playsinline autoplay muted loop
           id="video_"
           :poster="poster"
    >
      <source
          :src="webm"
          type="video/webm">
      >
      <source
          :src="mp4"
          type="video/mp4"></source>
    </video>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeMount, onMounted, ref} from "vue";

const poster = ref("")
const webm = ref("")
const mp4 = ref("")

interface Background {
  poster?: string;
  webm?: string;
  mp4?: string;
  playbackRate?: number;
}

interface props {
  bg: Background;
}

const props = defineProps<props>();
onBeforeMount(() => {
  poster.value = props.bg.poster
  webm.value = props.bg.webm
  mp4.value = props.bg.mp4
})
onMounted(() => {
  const video = document.getElementById('video_') as HTMLVideoElement
  if (video !== null)
    video.playbackRate = props.bg.playbackRate || 1
})
</script>


<style scoped>


.background {
  top: 0;
  width: 100vw;
  height: 100vw;
  position: fixed;
  z-index: -10;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  video {
    margin: 0;
  }
}
</style>