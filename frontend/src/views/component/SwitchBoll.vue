<template>
<!-- scale timing in the logical control part Nav -->
  <div class="boll scale" ref="boll">

  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from "vue";
const boll = ref<HTMLElement | null>(null)
const props = defineProps({
  scale: Boolean
});
watch(() => props.scale, (newVal) => {
  if (!props.scale) {
    boll.value?.classList.add("scale")

  }
})
onMounted(async () => {
  if (props.scale) {
    setTimeout(() => {
      boll.value?.classList.remove("scale")
    }, 600)
  }
})
</script>

<style scoped>
.boll {
  z-index: 2000;
  left: 90vw;
  top: 120vh;
  position: fixed;
  transform: scale(1);
  width: 1px;
  height: 1px;
  border-radius: 50%;
  background: linear-gradient(90deg, #0000ff,10%, #4b0082,60%, #8f00ff);
  transition: all 0.8s ease;
}

.boll.scale {
  transform: scale(6000);
  filter:blur(500px);
}

</style>