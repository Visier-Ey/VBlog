
<template>
  <div class="ChipContent">
    <div class="ChipBg"></div>
      <span class="ChipTitle">
        {{ props.chipContent.title }}
      </span>
    <div class="description">
      <p class="date">{{props.chipContent.date}}</p>
      <p class="addition">{{props.chipContent.description}}</p>
    </div>
    <p>
      {{ props.chipContent.content }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import {Chip} from "../../interfaces";
interface Props {
  chipContent: Chip;
}
const props = defineProps<Props>();
</script>

<style scoped>
.ChipContent {
  .ChipBg {
    position: absolute;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.6), rgba(0, 216, 255, 0.6));
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 20;
  text-align: left;
  flex-direction: column;
  .ChipTitle {
    font-size: 30px;
    font-weight: bold;
    width: 90%;
    margin-top: 20px;
  }
  p {
    font-size: 20px;
    width: 90%;
    margin: 5px 0;
  }
  .description{
    width: 90%;
    display: flex;
    p{
      width: auto;
      margin-right: 10px;
      font-size: 14px;
    }
  }
}
</style>