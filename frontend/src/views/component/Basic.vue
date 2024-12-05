<template>
  <div class="basic">
    <router-view/>
  </div>
  <div class="basicFooter" ref="footer">
    <Footer />
  </div>
</template>
<script lang="ts" setup>
import Footer from "./Footer.vue";
import {ref} from "vue";
const footer = ref<HTMLElement | null>(null);
window.addEventListener('scroll', function() {
  if ((window.innerHeight + window.scrollY +1) >= document.body.offsetHeight) {
    footer.value?.classList.add('show');
  }else {
    footer.value?.classList.remove('show');
  }
});
</script>
<style scoped>
.basic {
  height: auto;
  width: 100vw;
  display: flex;
  position: relative;
  overflow: hidden;
  min-width: 1500px;
  min-height: 1000px;
}
.basicFooter {
  z-index: 1000;
  position: fixed;
  opacity: 0;
  transition: all 0.3s ease;
  height: 40px;
  bottom: -40px;
}
.basicFooter.show {
  opacity: 1;
  bottom: 0;
}
</style>