<template>
  <div class="blur-bg blur">
    <div class="header">
      <div class="back-option" @click="backHome">
        <el-icon :size="30">
          <ArrowLeft/>
        </el-icon>
        Back
      </div>
      <span class="slices-char">|</span>
      <span> {{route.meta.title}} </span>
    </div>
    <router-view/>
  </div>
  <Footer />
  <SwitchBoll :scale="isScaled"></SwitchBoll>
</template>

<script lang="ts" setup>
import {ArrowLeft} from '@element-plus/icons-vue'
import router from "../../router";
// set the title of the page in different Routes
import {useRoute} from "vue-router";
import {onBeforeMount, onMounted, ref} from "vue";
import SwitchBoll from "./SwitchBoll.vue";
import Footer from "./Footer.vue";
const route = useRoute();
const isScaled = ref(true);
// back to the home page
function backHome() {
  // set the LeaveScale effect
  isScaled.value = false;
  // set the blur effect
  document.querySelector('.blur-bg').classList.add('blur');
  setTimeout(() => {
    router.push({name: 'home'});
  }, 500);
}
onMounted(() => {
  // set the EnterScale effect
  setTimeout(() => {
    document.querySelector('.blur-bg.blur').classList.remove('blur');
  }, 500);
});
</script>

<style scoped>
.blur-bg{
  transition: all 0.5s ease;
}
.blur-bg.blur{
  filter: blur(100px);
}
.header {
  width: 100vw;
  display: flex;
  position: fixed;
  z-index: 1000;
  justify-content: flex-start;
  align-items: center;
  background-color: rgb(0, 0, 0,0.8);
  height: 60px;
  padding-left: 50px;
  .back-option{
    display: flex;
    align-items: center;
    color: white;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover{
      transform: scale(1.1);
      color: #0bbd87;
      cursor: pointer;
      .ArrowLeft{
        color: #0bbd87;
      }
    }
  }
  .slices-char{
    color: white;
    font-size: 20px;
    margin: 0 10px;
  }
  span{
    color: white;
    font-size: 20px;
  }
}
</style>