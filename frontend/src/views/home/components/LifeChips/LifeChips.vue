<template>
  <LifeChipPhoto v-if="props.chip.type==='photo'"
  :chipPhoto="{
    url: props.chip.url,
    content: props.chip.content,
    pos: props.chip.pos
  }"
  ></LifeChipPhoto>
  <!--<LifeChipTXT></LifeChipTXT>-->
  <LifeChipVideo v-if="props.chip.type==='video'"></LifeChipVideo>
</template>

<script lang="ts" setup>

import LifeChipPhoto from "./components/LifeChipPhoto.vue";
import LifeChipVideo from "./components/LifeChipVideo.vue";

interface Chip {
  title?: string;
  content?: string;
  url?: string;
  date?: string;
  pos?: number;
  type: string;
}

interface Props {
  chip: Chip;
}

// define the properties
const props = defineProps<Props>();
</script>

<style scoped>

</style>