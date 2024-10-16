<template>
  <div class="universalPage" ref="universalPage">
    <SpecialBack class="SpecialBack" @click="specialBack"/>
    <div class="universalCardLeft">
      <div class="toolLine"><input type="text">
        <el-icon>
          <Search/>
        </el-icon>
      </div>
      <UniversalBlogBrief/>
    </div>
    <div class="universalCardRight">

    </div>
  </div>
  <SwitchBoll :scale="isScaled"/>
</template>

<script lang="ts" setup>
import UniversalBlogBrief from "./UniversalBlogBrief.vue";
import SpecialBack from "./SpecialBack.vue";
import {onMounted, ref} from "vue";
import SwitchBoll from "../../component/SwitchBoll.vue";
import {Search} from "@element-plus/icons-vue";
import router from "../../../router";
const universalPage = ref<HTMLDivElement | null>(null);
const isScaled = ref(true);

const specialBack = () => {
  if (universalPage.value) {
    isScaled.value = false;
    universalPage.value.classList.remove('enter');
    setTimeout(() => {
      router.push({name: 'home'});
    }, 500);
  }
};

onMounted(() => {
  setTimeout(() => {
    if (universalPage.value) {
      universalPage.value.classList.add('enter');
    }
  }, 700);
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.universalPage {
  top: 0;
  display: flex;
  justify-content: center;
  height: 100vw;
  width: 100vw;
  position: fixed;
  background: white;
  color: black;

  .SpecialBack {
    transition: transform 0.6s ease;
    transform: translateX(-200px);
    z-index: 1000;
  }
}

.universalCardLeft {
  position: fixed;
  padding: 20px;
  top: 50px;
  left: 70px;
  width: 60%;
  height: 100%;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.75);
  border-radius: 10px;
  transition: all 0.6s ease;
  transform: translateY(100%);
}

.universalCardRight {
  position: fixed;
  right: 40px;
  width: 30%;
  height: 100%;
  border-radius: 10px;
  top: -50px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.75);
  transition: all 0.6s ease;
  transform: translateY(-100%);
}

.universalPage.enter .universalCardRight {
  margin-bottom: 20px;
  transform: translateY(0);
}

.universalPage.enter .universalCardLeft {
  margin-bottom: 20px;
  transform: translateY(0);
}
.universalPage.enter .SpecialBack {
  transform: translateX(0);
  &:hover {
    transform: translateX(-20px) scale(0.95);
  }
}

.universalCardLeft {
  .toolLine {
    width: 100%;
    height: 50px;
    border-left: 2px solid black;
    border-right: 2px solid black;
    margin-bottom: 20px;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.03);
    display: flex;
    align-items: center;
    justify-content: flex-end;

    input {
      outline: none;
      padding: 2px 10px;
      font-size: 20px;
      border-radius: 5px;
    }

    .el-icon {
      font-size: 35px;
      margin-right: 10px;
      cursor: pointer;

      &:hover {
        scale: 1.1;
        transition: scale 0.3s ease;
      }
    }
  }
}
</style>