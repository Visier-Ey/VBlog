<template>
  <main>
    <div class="basic">
      <SwitchBoll :scale="isScaled"></SwitchBoll>
      <router-view/>
    </div>
    <div class="basicFooter" ref="footer">
      <Footer />
    </div>
  </main>

</template>

<style scoped>

</style>


<script lang="ts" setup>
import Footer from "../component/Footer.vue";
import SwitchBoll from "../component/SwitchBoll.vue";
import {computed, ref} from "vue";
import { useRouter } from 'vue-router'

const isScaled = ref(false)
const router = useRouter()


// emitter.on('unMounted',handleUnMounted)
// emitter.on('Mounted',handleMounted)
//
function handleUnMounted() {
  isScaled.value = true
}

function handleMounted() {
  isScaled.value = false
}

router.beforeEach((to, from, next) => {

  handleUnMounted()
  setTimeout(()=>{
    next()
    setTimeout(()=>{
      handleMounted()
    },600)
  },600)

})

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