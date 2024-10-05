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
        <div class="card">
          <div class="search">
            Header
          </div>
        </div>
        <!--        <button class="switch" @click="onSwitch">switch</button>-->
      </div>
      <div class="main">
        <!--    set the different type ,copy from WoS    -->
        <el-tabs>
          <!--    blog pages      -->
          <el-tab-pane label="Blogs">
            <div class="card left">
              <div class="top">
                <span>Filter</span>
                <el-icon @click="onCollapse">
                  <ArrowLeft/>
                </el-icon>
              </div>
              <div class="card-body">
                ...
                ...
                ...
              </div>
            </div>
            <!--      right part of card      -->
            <div class="card right">
              <div class="top">
                <el-pagination layout="prev, pager, next" :total="1000"/>
              </div>
              <div class="briefs-body">
                <BlogBriefs
                    :object="test"
                />
                <BlogBriefs
                    :object="test"
                />
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Config">Config</el-tab-pane>

        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ArrowLeft} from '@element-plus/icons-vue'
import BlogBriefs from "./components/BlogBriefs.vue";
import DynamicBg from "../../component/DynamicBg.vue";
import {encrypt} from "../../../component/encryp";
// set user
const user = localStorage.getItem('user').toUpperCase();
//  set the background
const bg = {
  poster: '',
  webm: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/284160/aabb0b693d4e99ae6d39106a7a735add27b95b6b.webm',
  mp4: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/284160/d024930635d4638d8ff5da958a7b1732be1892c3.mp4',
  playbackRate: 0.6
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
//  collapse the left card
const onCollapse = () => {
  document.querySelector('.left').classList.toggle('collapsed');
}
</script>

<style scoped>
:root {
  --primary-color: white;
  --secondary-color: black;
}

.background {
  .name {
    color: white;
    font-size: 1300px;
    font-weight: 70;
    top: -500px;
    left: 0;
    position: fixed;
    z-index: -5;
    filter: blur(5px);
  }
}

.page {
  color: black;
  width: 100vw;
  height: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .container {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    top: 20px;
    width: 95%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.8);
  }

  .header {
    color: black;
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: inherit;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.8);

    .card {
      width: 90%;
      height: 80%;
      color: black;
      text-align: left;
      font-size: 40px;
      border-radius: 20px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.8);

      .search {
        width: 95%;
        height: 100%;
        color: black;
        text-align: left;
        font-size: 40px;
      }
    }
  }

  .main {
    background: inherit;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 40px;

    .el-tabs {
      width: 90%;
    }

    :deep(.el-tabs__item) {
      font-size: 20px;
    }

    :deep(.el-tab-pane) {
      display: flex;
      width: 100%;
      height: 90%;
    }

    .card {
      transition: all 0.3s ease;
      width: 45%;
      height: 100%;
      background: inherit;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.8);
      margin: 10px;
      border-radius: 10px;

      &.left.collapsed + .right {
        width: 95%;
      }

      &.left.collapsed {
        width: 5%;

        span {
          display: none;
        }

        .el-icon {
          transform: scaleX(-1);
        }

        .card-body {
          opacity: 0;
        }
      }

      &.left {
        overflow-x: hidden;
        width: 27%;
        display: flex;
        align-items: center;
        flex-direction: column;

        .top {
          width: 90%;
          height: 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: solid 2px grey;

          .el-icon {
            transition: transform 0.8s ease;
            font-size: 40px;
            color: black;

            &:hover {
              cursor: pointer;
            }
          }

          .card-body {
            transition: all 0.3s ease;
            opacity: 1;
          }
        }
      }

      &.right {
        width: 70%;
        display: flex;
        align-items: center;
        flex-direction: column;

        .top {
          width: 90%;
          height: 70px;
          display: flex;
          justify-content: flex-end;
          align-items: center;

          :deep(.el-pager li) {
            background: inherit;
            font-size: 20px;
          }

          :deep(button[type="button"]) {
            background: inherit;
            transform: scale(1.5);
          }
        }

        .briefs-body {
          padding: 0 15px;
          width: 90%;
          display: flex;
          flex-direction: column;
          background: white;
          border-radius: 15px;
          overflow: hidden;
        }

      }
    }
  }
}
</style>