<template>
  <div class="chipT">
    <LifeChiplabel :chipLabel="'TXT'"></LifeChiplabel>
    <div class="lifeChipTXT" ref="lifeChipTXT"></div>
    <LifeChipBar
        :chipBar="chipBar"
    />
  </div>
</template>

<script lang="ts" setup>

// define the interface of properties
import {onMounted, ref} from "vue";
import {Chip} from "../interfaces";
import {loadMarkdownFile} from "../../../../../component/markdown";
import LifeChipBar from "./smallComponents/LifeChipBar.vue";
import LifeChiplabel from "./smallComponents/LifeChiplabel.vue";
const chipBar = {
  headset: false,
  comment: true,
  share: true
}
// define the props
interface Props {
  chipTXT: Chip;
}
const props = defineProps<Props>();

const lifeChipTXT = ref<HTMLDivElement | null>(null);

onMounted(async () => {
  loadMarkdownFile(props.chipTXT.url, lifeChipTXT);
});
</script>

<style scoped>
.chipT {
  margin: 0;
  width: 100%;
  height: auto;
  display: flex;
  background-color: rgb(255, 255, 255);
  flex-direction: column;
  position: relative;
  justify-content: space-between;
}

.lifeChipTXT {
  width: 100%;
  height: 70%;
  z-index: 20;
  text-align: left;
  box-sizing: border-box;
  padding: 20px 20px 20px 50px
}

:deep(pre){
  white-space: pre-wrap;
  font-size: 16px;
  font-family: "Cambria Math";
  font-weight: bold;
}
</style>