<template>
  <div class="CycleImage">
    <div class="cycleImage">
      <div class="cycleImageItem">
        <LifeChips
            v-for="chip in props.chip"
            :key="chip.id"
            :chip="chip"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {onMounted, ref} from "vue";
import LifeChips from "./LifeChips/LifeChips.vue";

interface Props {
  chip: any
}

const props = defineProps<Props>()

onMounted(() => {

})
const defaultChip = {
  title: 'string',
  content: 'string',
  url: 'string',
  date: 'string',
  type: 'photo',
  description: 'string'
}
const cycleImageItemChip = ref(defaultChip)
onMounted(() => {
  cycleImageItemChip.value = props.chip[0]
})


</script>

<style scoped>
.CycleImage {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  margin: 0 20px;

  .cycleImage {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    width: 100%;
    border: #05ffe5 3px solid;
  }
}

.cycleImageItem {
  position: relative;
  height: auto;
  background: rgba(0, 0, 0, 0.3);
  transform-origin: center;
  transition: all 0.5s ease;
  opacity: 1;
}

</style>