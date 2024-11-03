<script lang="ts" setup>
interface Props {
  chipLabel: string;
}
const props = defineProps<Props>();
</script>

<template>
  <div class="ChipLabel">{{props.chipLabel}}</div>
</template>

<style scoped>
.ChipLabel {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 100;
  color: rgb(255, 255, 255);
  transform: rotate(30deg);
  padding: 5px 20px;
  font-size: 40px;
  font-weight: bold;
}

</style>