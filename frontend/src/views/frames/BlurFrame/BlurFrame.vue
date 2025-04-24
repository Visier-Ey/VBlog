<script lang="ts" setup>
import {onMounted, ref, watch} from "vue";

const props = defineProps({
  blur:Boolean,
})

const blurFrame = ref<HTMLElement | null>(null)

watch(() => props.blur, (newVal) => {
  if (props.blur) {
    blurFrame.value?.classList.add("blur")
  }else blurFrame.value?.classList.remove("blur")
})

onMounted(async () => {
  if (props.blur) {
    setTimeout(() => {
      blurFrame.value?.classList.add("blur")
    }, )
  }else {
    setTimeout(() => {
      blurFrame.value?.classList.remove("blur")
    }, 600)
  }
})

</script>

<template>
<main class="blurFrame blur" ref="blurFrame">
  <div class="blurUnder">
    <slot>
      Nothing Here
    </slot>
  </div>
  <div class="blurWrapper">

  </div>
</main>
</template>

<style scoped>
.blurFrame {
  width: 100%;
  height: 100%;
  position: relative;
}
.blurFrame.blur .blurWrapper{
  backdrop-filter: blur(10px);
  z-index: 100;
}

.blurWrapper{
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: -1;
  backdrop-filter: blur(0px);
  transition: all 0.8s ease;
}
.blurUnder{
  position: absolute;
  z-index: 10;
}
</style>