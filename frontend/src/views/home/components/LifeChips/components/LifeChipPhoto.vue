<template>
  <div class="chipP">
    <LifeChiplabel :chipLabel="'Photo'"></LifeChiplabel>
    <img class="ChipPhoto" :src="props.chipPhoto.url?props.chipPhoto.url:''" alt="" @click="clickPhoto">
    <LifeChipContent
    :chipContent="chipPhoto"
    />
  </div>
</template>

<script lang="ts" setup>
import LifeChipBar from "./smallComponents/LifeChipBar.vue";
import {Chip} from "../interfaces";
import LifeChipContent from "./smallComponents/LifeChipContent.vue";
import LifeChiplabel from "./smallComponents/LifeChiplabel.vue";

const chipBar = {
  headset: false,
  comment: true,
  share: true
}
// define the interface of properties

interface Props {
  chipPhoto: Chip;
}
const props = defineProps<Props>();

// define the function to handle the click event
const clickPhoto = () => {
  document.querySelector('.ChipPhoto')?.classList.toggle('clickPhoto');
}
</script>

<style scoped>
.chipP {
  width: 100%;
  height: auto;
  display: flex;
  background-color: rgb(255, 255, 255);
  position: relative;
  justify-content: flex-start;
  margin: 0;
}

.ChipPhoto {
  width: 45%;
  height: auto;
  z-index: 20;
  transition: all 0.5s ease ;
  &:hover {
    cursor: pointer;
  }
}


</style>
