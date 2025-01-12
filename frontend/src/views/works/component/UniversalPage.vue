<template>
  <div class="universalPage" ref="universalPage">
    <SpecialBack class="SpecialBack" @click="specialBack"/>
    <div class="universalCardLeft" v-if="true">
<!--      <div class="toolLine"><input type="text">-->
<!--&lt;!&ndash;        <el-icon>&ndash;&gt;-->
<!--&lt;!&ndash;          <Search/>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-icon>&ndash;&gt;-->
<!--      </div>-->
      <UniversalBlogBrief/>
    </div>
    <div class="universalCardRight" v-if="true">

    </div>

    <span class="NoWorks" v-for="(items) in wordList" :style="randomStyle()">{{ items }}</span>
    <!--  ----------------------------No Works!-----------------------------  -->
    <SwitchBoll :scale="isScaled"/>
  </div>
</template>

<script lang="ts" setup>
import UniversalBlogBrief from "./UniversalBlogBrief.vue";
import SpecialBack from "./SpecialBack.vue";
import {onMounted, ref} from "vue";
import SwitchBoll from "../../component/SwitchBoll.vue";
import {Search} from "@element-plus/icons-vue";
import {ElIcon} from "element-plus";
import router from "../../../router";

const universalPage = ref<HTMLDivElement | null>(null);
const isScaled = ref(true);
const items = ['NO WORKS!', 'NO', 'DAMN!']
const rate = [0.3, 0.4, 0.3]
const Amount = 100;
const wordList = ref([]);
const generalWords = () => {
  for (let i = 0; i < rate.length; i++) {
    for (let j = 0; j < Amount * rate[i]; j++) {
      wordList.value.push(items[i]);
    }
  }
  wordList.value.sort(() => Math.random() - 0.5);
};
generalWords();
const randomStyle = () => {
  const random = Math.floor(Math.random() * 3);
  return {
    position: 'absolute',
    fontSize: `${Math.floor(Math.random() * 80 + 20)}px`,
    color: `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`,
    transform: `rotate(${Math.floor(Math.random() * 90 - 45)}deg)`,
    top: `${Math.floor(Math.random() * 100 - 5)}%`,
    left: `${Math.floor(Math.random() * 100) - 5}%`,
    opacity: Math.random() * 0.5 + 0.5,
    zIndex: random,
  };
};
const specialBack = async () => {
  if (universalPage.value) {
    isScaled.value = false;
    universalPage.value.classList.remove('enter');
    setTimeout(() => {
      router.push({name: 'home'});
    }, 600);
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
  height: 100%;
  width: 100vw;
  background: white;
  color: black;
  min-height: 100vh;
  overflow: hidden;

  .SpecialBack {
    transition: transform 0.6s ease;
    transform: translateX(-200px);
    z-index: 1000;
  }
}

.universalCardLeft {
  z-index: 1000;
  position: absolute;
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
  z-index: 1000;
  position: absolute;
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