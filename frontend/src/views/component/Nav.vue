<template>
  <div class="blur-bg blur" ref="blurBg">
    <div class="header">
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
</template>

<script lang="ts" setup>
import {ArrowLeft} from '@element-plus/icons-vue'
import router from "../../router";
// set the title of the page in different Routes
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import SwitchBoll from "./SwitchBoll.vue";

const route = useRoute();
const isScaled = ref(true);
const blurBg = ref<HTMLDivElement | null>(null);
// back to the home page
const backHome = async () => {
  // set the LeaveScale effect
  isScaled.value = false;
  // set the blur effect
  blurBg.value.classList.add('blur');
  setTimeout(() => {
    router.push({name: 'home'});
  }, 500);
}
onMounted(async () => {
  // set the EnterScale effect
  setTimeout(() => {
    blurBg.value.classList.remove('blur');
  }, 500);
});
</script>

<style scoped>
.blur-bg {
  transition: all 0.5s ease;
  height: auto;
  width: 100vw;
}

.blur-bg.blur {
  filter: blur(100px);
}

.header {
  top: 0;
  width: 100vw;
  display: flex;
  position: fixed;
  z-index: 1000;
  justify-content: flex-start;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.8);
  height: 60px;
  padding-left: 50px;

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