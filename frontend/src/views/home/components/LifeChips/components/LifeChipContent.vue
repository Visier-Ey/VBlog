
<template>
  <div class="ChipContent">
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
import {Chip} from "../interfaces";
interface Props {
  chipContent: Chip;
}
const props = defineProps<Props>();
</script>

<style scoped>
.ChipContent {
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  text-align: left;
  flex-direction: column;
  .ChipTitle {
    font-size: 20px;
    font-weight: bold;
    width: 90%;
    margin-top: 20px;
  }
  p {
    width: 90%;
    margin: 5px 0;
  }
  .description{
    width: 90%;
    display: flex;
    font-size: 14px;
    p{
      width: auto;
      margin-right: 10px;
    }
  }
}
</style>