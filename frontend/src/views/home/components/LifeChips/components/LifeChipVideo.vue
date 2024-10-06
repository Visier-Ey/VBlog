<template>
  <div class="chipV">
    <div class="ChipLabel">Video</div>
    <video class="ChipVideo" ref="video" >
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/>
    </video>
    <div class="ChipPContent">
      <p>
        nihao
      </p>
    </div>
    <LifeChipBar
    :chipBar="chipBar"
    />
  </div>
</template>

<script lang="ts" setup>
import LifeChipBar from "./LifeChipBar.vue";
import {onMounted, ref} from "vue";
const video = ref<HTMLVideoElement | null>(null);
const chipBar = {
  headset: true,
  comment: true,
  share: true,
  headsetFunc: () => {
    video.value.play();
  },
}
onMounted(() => {

})

</script>

<style scoped>
.chipV {
  width: 100%;
  height: auto;
  display: flex;
  background-color: rgb(255, 255, 255);
  flex-direction: column;
  position: relative;
  margin-bottom: 20px;
}

.ChipVideo {
  width: 100%;
  height: auto;
  z-index: 50;
}

.ChipPContent {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  p {
    width: 90%;
  }
}

.ChipLabel {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 100;
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 5px 20px;
  font-size: 20px;
  font-weight: bold;
}

</style>
