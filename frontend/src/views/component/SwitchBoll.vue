<template>
  <div class="boll scale">

  </div>
</template>

<script setup>
import {onMounted, watch} from "vue";

const props = defineProps({
  scale: Boolean
});
watch(() => props.scale, (newVal) => {
  if (!props.scale) {
    document.querySelector(".boll").classList.add("scale")

  }
})
onMounted(() => {
  if (props.scale) {
    setTimeout(() => {
      document.querySelector(".boll.scale").classList.remove("scale")
    }, 500)
  }
})
</script>

<style scoped>
.boll {
  z-index: 10000;
  left: 90vw;
  top: 120vh;
  position: fixed;
  transform: scale(1);
  width: 1px;
  height: 1px;
  border-radius: 50%;
  background: linear-gradient(90deg, #0000ff,10%, #4b0082,60%, #8f00ff);
  transition: all 0.5s ease;
}

.boll.scale {
  transform: scale(6000);
}

</style>