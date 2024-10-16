<template>
  <div class="chipP">
    <div class="ChipLabel">Photo</div>
    <img class="ChipPhoto" :src="props.chipPhoto.url" alt="" @click="clickPhoto">
    <LifeChipContent
    :chipContent="chipPhoto"
    />
    <LifeChipBar
        :chipBar="chipBar"
    />
  </div>
</template>

<script lang="ts" setup>
import LifeChipBar from "./LifeChipBar.vue";
import {Chip} from "../interfaces";
import LifeChipContent from "./LifeChipContent.vue";

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
  flex-direction: column;
  position: relative;
  margin-bottom: 20px;
  justify-content: space-between;
}

.ChipPhoto {
  width: 100%;
  height: 70%;
  z-index: 20;
  transition: all 0.5s ease ;;
  &:hover {
    cursor: pointer;
    transform: scale(1.01);
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
