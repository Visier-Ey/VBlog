<template>
  <DynamicBg
      :bg="bg"
  />
  <div class="background">
    <!--   Set the First letter of blogger-->
    <div class="name">
      {{ encrypt(user, 'wxx_lyt') }}
    </div>
  </div>
  <!-- the formal part -->
  <div class="page">
    <div class="container">
      <div class="header">
        <!--        <button class="switch" @click="onSwitch">switch</button>-->
      </div>
      <div class="main">
        <div class="card left">
          <div class="blogs">
            <div id="blog">

            </div>
          </div>
        </div>
        <div class="card right">
          <div class="profile">

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import DynamicBg from "../../component/DynamicBg.vue";
import {encrypt} from "../../../component/encryp";
import {loadMarkdownFile} from "../../../component/markdown";
import {onMounted} from "vue";
// set user
const user = localStorage.getItem('user').toUpperCase();
//  set the background
const bg = {
  poster: '',
  webm: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/284160/aabb0b693d4e99ae6d39106a7a735add27b95b6b.webm',
  mp4: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/284160/d024930635d4638d8ff5da958a7b1732be1892c3.mp4',
  playbackRate: 1
}
// test the blogBriefs
const test = {
  title: "The Research of MapReduce Load Balancing Based on Multiple Partition Algorithm",
  author: "Wang, SZ and Zhou, HW",
  publisher: "9th IEEE/ACM International Conference on Utility and Cloud Computing (UCC)\n" +
      "2016\n" +
      "2016 IEEE/ACM 9TH INTERNATIONAL CONFERENCE ON UTILITY AND CLOUD COMPUTING (UCC)\n" +
      " , pp.339-342",
  abstract: "In this paper, we propose a strategy to solve the load imbalance problem at MapReduce stage that caused from using the default partition algorithm of Hadoop platform. Through using multiple partitioning technique, this proposed strategy can refine the tasks and balance the inputs of reduce stage in the map phase. Furthermore, this proposed strategy can fully employ idle nodes to balance the high load nodes, in order to achieve the optimized job scheduling during the execution process of reduce stage.",
  like: 0,
  great: 0,
}
// test the blogBriefs
onMounted(() => {
  loadMarkdownFile('blog.md', 'blog')
  setTimeout(() => {
    document.querySelector('.main').classList.add('move')
  }, 700)
})
</script>

<style scoped>
:root {
  --primary-color: white;
  --secondary-color: black;
}

.background {
  .name {
    color: white;
    font-size: 1200px;
    font-weight: 70;
    top: -450px;
    left: 0;
    position: fixed;
    z-index: -5;
    filter: blur(5px);
  }
}

.page {
  color: black;
  width: 100vw;
  height: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background: rgba(255, 255, 255, 0);

  .container {
    overflow: hidden;
    position: relative;
    width: 90%;
    height: calc(100% - 70px);
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.8);
  }
}

.main {
  width: 98%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.main.move {
  .card {
    &.left {
      left: 0;
    }
    &.right {
      right: 0;
    }

  }
}

.card {
  height: 100%;
  border: solid 1px white;
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
}

.card.left {
  width: 66%;
  left: 34%;
  overflow-y: scroll;
  z-index: 50;
  transition: all 1s ease;

  &::-webkit-scrollbar {
    display: block;
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(11, 10, 10, 0.5);
  }

  &::-webkit-scrollbar-track {
    background: inherit;
  }
}

.card.right {
  width: 34%;
  right: 66%;
  box-shadow: none;
  border-left: none;
  z-index: 20;
  transition: all 0.6s ease;
}

.blogs {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid 1px white;
  margin: 10px;
  padding: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.8);
}


</style>