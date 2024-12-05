<template>
  <div class="wrapper">
    <div class="blur-bg blur" ref="blurBg">
      <div class="header show" ref="header">
        <div class="back-option" @click="backHome">
          <el-icon :size="30">
            <ArrowLeft/>
          </el-icon>
          Back
        </div>
        <span class="slices-char">|</span>
        <span> {{ route.meta.title }} </span>
      </div>
      <router-view/>
    </div>
    <SwitchBoll :scale="isScaled"></SwitchBoll>
  </div>
</template>

<script lang="ts" setup>
import {ArrowLeft} from '@element-plus/icons-vue'
import router from "../../router";
// set the title of the page in different Routes
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import SwitchBoll from "./SwitchBoll.vue";

const header = ref<HTMLDivElement | null>(null);
const route = useRoute();
const isScaled = ref(true);
const blurBg = ref<HTMLDivElement | null>(null);
// back to the home page
const backHome = async () => {
  // set the LeaveScale effect
  isScaled.value = false;
  // set the blur effect
  blurBg.value.classList?.add('blur');
  setTimeout(() => {
    router.push({name: 'home'});
  }, 600);
}
onMounted(async () => {
  // set the EnterScale effect
  setTimeout(() => {
    blurBg.value?.classList.remove('blur');
  }, 600);
  let lastScrollTop = 0;
  window.addEventListener('scroll', function () {
    let scrollTop = document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      header.value?.classList.remove('show');
    } else if (scrollTop < lastScrollTop) {
      header.value?.classList.add('show');
    }
    lastScrollTop = scrollTop;
  });
});
</script>

<style scoped>
.blur-bg {
  transition: all 0.5s ease;
  height: auto;
  width: 100vw;
  z-index: 5001;
  left: 0;
  top: 0;
}

.blur-bg.blur {
  filter: blur(100px);
}

.header.show {
  transform: translateY(0);
  opacity: 1;
}

.header {
  top: 0;
  width: 100vw;
  display: flex;
  position: fixed;
  z-index: 1000;
  justify-content: flex-start;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.5);
  height: 60px;
  transform: translateY(-60px);
  padding-left: 50px;
  opacity: 0;
  transition: all 0.5s ease;

  .back-option {
    display: flex;
    align-items: center;
    color: white;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
      color: #0bbd87;
      cursor: pointer;

      .ArrowLeft {
        color: #0bbd87;
      }
    }
  }

  .slices-char {
    color: white;
    font-size: 20px;
    margin: 0 10px;
  }

  span {
    color: white;
    font-size: 20px;
  }
}
</style>