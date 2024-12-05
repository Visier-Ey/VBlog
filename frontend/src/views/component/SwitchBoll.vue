<template>
  <!-- scale timing in the logical control part Nav -->
  <div class="SwitchBollWrapper scale" ref="Wrapper">
    <div class="SwitchBoll " ref="boll">

    </div>
  </div>

</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from "vue";

const boll = ref<HTMLElement | null>(null)
const Wrapper = ref<HTMLElement | null>(null)

const props = defineProps({
  scale: Boolean
});
watch(() => props.scale, (newVal) => {
  if (!props.scale) {
    Wrapper.value?.classList.add("scale")
  }
})
onMounted(async () => {
  if (props.scale) {
    setTimeout(() => {
      Wrapper.value?.classList.remove("scale")
    }, 600)
  }
})
</script>

<style scoped>
.SwitchBollWrapper{
  background: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200vw;
  height: 200vh;
  position: fixed;
  top: -50vh;
  left: -50vw;
  filter: blur(100px);
  transition: z-index 0s ease 0.8s;
  z-index: -1000;
}
.SwitchBoll {
  position: relative;
  transform: translateX(100%);
  width: 75%;
  height: 75%;
  background: linear-gradient(135deg, #0000ff, 20%, #4b0082, 60%, #8f00ff);
  transition: filter 0s ease 0s, transform 0.6s ease 0s, opacity 0.6s ease 0s;
  opacity: 1;
  z-index: 10001;
  border-radius: 10%;
}


.SwitchBollWrapper.scale {
  z-index: 10000;
  transition: z-index 0s ease 0s;
  .SwitchBoll {
    transform: translateX(0);
    opacity: 1;
    border-radius: 30%;
  }
}
</style>