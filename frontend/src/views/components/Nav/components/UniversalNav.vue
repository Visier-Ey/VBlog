<template>
  <div class="wrapper">
    <div class="blur-bg">
      <div class="header show" ref="header">
        <div class="back-option" @click="backHome">
          <!-- <el-icon :size="30">
            <ArrowLeft/>
          </el-icon> -->
          Back
        </div>
        <span class="slices-char">|</span>
        <span> {{ route.meta.title }} </span>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from "../../../../router";
// set the title of the page in different Routes
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";

const header = ref<HTMLDivElement | null>(null);
const route = useRoute();
// back to the home page
const backHome = async () => {
  // set the LeaveScale effect
  // set the blur effect
  router.push({name: 'home'});

}
onMounted(async () => {
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