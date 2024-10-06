<template>
  <div class="chipP">
    <div class="ChipLabel">Photo</div>
    <img class="ChipPhoto" :src="props.chipPhoto.url" alt="">
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

const chipBar = {
  headset: false,
  comment: true,
  share: true
}
// define the interface of properties
interface ChipPhoto{
  url?: string;
  content?: string;
  pos?: number;
}
interface Props {
  chipPhoto: ChipPhoto;
}
const props = defineProps<Props>();
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
}

.ChipPhoto {
  width: 100%;
  height: 70%;
  z-index: 20;
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
