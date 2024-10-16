<template>
  <div class="chipT">
    <div class="ChipLabel">TXT</div>
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
import LifeChipBar from "./LifeChipBar.vue";
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

onMounted(() => {
  loadMarkdownFile(props.chipTXT.url, lifeChipTXT);
});
</script>

<style scoped>
.chipT {
  width: 100%;
  height: auto;
  display: flex;
  background-color: rgb(255, 255, 255);
  flex-direction: column;
  position: relative;
  margin-bottom: 20px;
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
:deep(pre){
  white-space: pre-wrap;
  font-size: 16px;
  font-family: "Cambria Math";
  font-weight: bold;
}
</style>