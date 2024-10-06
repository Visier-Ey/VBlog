<template>
  <div class="page blur">
    <!--    set the background decorate-->
    <DynamicBg
        :bg="bg"
    />
    <div class="container">
      <div class="header">
        <!--        set blogger name-->
        <div class="user">
          {{ encrypt(user, 'wxx_lyt') }}
        </div>
        <div class="nav">
          <!--          you know, the nav options-->
          <div class="menu">
            <div class="link" data-custom-id="home">{{ encrypt('HOME', 'visier') }}</div>
            <div class="link list" data-custom-id="blogs" data-custom-amount="2">{{ encrypt('ARTS', 'visier') }}
              <div class="group">
                <div class="link" data-custom-id="blogs" @click="pageJump($event)">{{ encrypt('BLOGS', 'visier') }}
                </div>
                <div class="link" data-custom-id="poetry" @click="pageJump($event)">{{ encrypt('POETRY', 'visier') }}
                </div>
              </div>
            </div>
            <!--    Work List        -->
            <div class="link list" data-custom-id="List" data-custom-amount="3">{{ encrypt('WORKS', 'visier') }}
              <div class="group">
                <div class="link" data-custom-id="JS">{{ encrypt('JS', 'visier') }}</div>
                <div class="link" data-custom-id="SQL">{{ encrypt('SQL', 'visier') }}</div>
                <div class="link" data-custom-id="C++">{{ encrypt('C++', 'visier') }}</div>
              </div>
            </div>
            <!--      Other List        -->
            <div class="link list" data-custom-id="list" data-custom-amount="3">{{ encrypt('OTHERS', 'visier') }}
              <div class="group">
                <div class="link" data-custom-id="TimeTravel" @click="pageJump($event)">
                  {{ encrypt('T-TRAVEL', 'visier') }}
                </div>
                <div class="link" data-custom-id="contact" @click="pageJump($event)">
                  {{ encrypt('CONTACT', 'visier') }}
                </div>
                <div class="link" data-custom-id="about" @click="pageJump($event)">{{ encrypt('ABOUT', 'visier') }}
                </div>
              </div>
            </div>
          </div>
          <!--          setting,searching...-->
          <div class="tool"></div>
          <!--    nav end        -->
        </div>
      </div>
      <!--      page profileCard part-->
      <div class="profileCard">
        <!--    the skeleton screen    -->
        <!--        <div class="skeleton">-->
        <!--          <el-skeleton style="&#45;&#45;el-skeleton-color:grey"/>-->
        <!--          <br/>-->
        <!--          <el-skeleton style="&#45;&#45;el-skeleton-circle-size: 100px;&#45;&#45;el-skeleton-color:grey">-->
        <!--            <template #template>-->
        <!--              <el-skeleton-item variant="circle"/>-->
        <!--            </template>-->
        <!--          </el-skeleton>-->
        <!--        </div>-->
        <Profile></Profile>
      </div>
      <!--      your brief blog here-->
      <div class="content">
        <div class="LifeChips left">
          <LifeChips
              :chip="{...chip, type: 'video'}"
          />
          <LifeChips
              :chip="{...chip, type: 'video'}"
          />
        </div>
        <div class="LifeChips right">
          <LifeChips
              :chip="{...chip, type: 'photo',url:'https://pic2.zhimg.com/v2-b6399145c80f909e020874d3c670ae44_r.jpg?source=1940ef5c'}"
          />
          <LifeChips
              :chip="{...chip, type: 'photo',url:'https://pic2.zhimg.com/v2-b6399145c80f909e020874d3c670ae44_r.jpg?source=1940ef5c'}"
          />
        </div>
      </div>
    </div>
  </div>
  <SwitchBoll :scale="isScaled"></SwitchBoll>
</template>

<script lang="ts" setup>
//   here set the blogger name
import router from "../../router/index.js";
import {onMounted, reactive, ref} from "vue";
import SwitchBoll from "../component/SwitchBoll.vue";
import Profile from "./components/Profiles/Profile.vue";
import DynamicBg from "../component/DynamicBg.vue";
import {encrypt} from "../../component/encryp";
import LifeChips from "./components/LifeChips/LifeChips.vue";

//  import the briefs of the blog
const user = ref('');
if (localStorage.getItem('user') === null) {
  console.log('LocalStorage no user');
} else user.value = localStorage.getItem('user').toUpperCase();
const isScaled = ref(true);
// set background video
const bg = reactive({
  poster: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/874400/14e1a261b94ebe19eac8234a9c7e4abaae1084bb.jpg',
  webm: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/874400/c6ec1e32708cb1e403a4c79db03b0128e080e1e8.webm',
  mp4: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/874400/2fda5d3781c6d198d70775f53809db245151928d.mp4'
})
// universal page jump function
const pageJump = (e) => {
  // set the LeaveScale effect
  isScaled.value = false;
  // set the blur effect
  document.querySelector('.page').classList.add('blur');
  setTimeout(() => {
    router.push({name: e.target.dataset.customId});
  }, 500);
}
onMounted(() => {
  // set the EnterScale effect
  setTimeout(() => {
    document.querySelector('.page.blur').classList.remove('blur');
  }, 500);
});
// set the blogChips
const chip = {
  title: "",
  content: "In this paper, we propose a strategy to solve the load imbalance problem at MapReduce stage that caused from using the default partition algorithm of Hadoop platform. Through using multiple partitioning technique, this proposed strategy can refine the tasks and balance the inputs of reduce stage in the map phase. Furthermore, this proposed strategy can fully employ idle nodes to balance the high load nodes, in order to achieve the optimized job scheduling during the execution process of reduce stage.",
  date: "2021-10-10",
}
</script>


<style scoped>
* {
  box-sizing: content-box;
  margin: 20px 20px;
  padding: 0;
}

.page.blur {
  filter: blur(100px);
}

.page {
  transition: all 0.5s ease;
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  .container {
    margin-top: 50px;
    width: 1300px;
    display: flex;
    flex: 1;
    flex-direction: column;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.8);
  }
}


.header {
  background-color: rgba(99, 98, 98, 0.1);
  color: white;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  position: relative;

  .user {
    font-family: "Baskerville Old Face";
    position: absolute;
    left: 5%;
    padding: 0 10px;
    font-weight: 70;
    font-size: 70px;
    top: -25px;
  }

  .nav {
    right: 0;
    width: 60%;
    margin: 0;
    height: 100%;
  }

  .menu {
    height: 100%;
    flex: 2;
    margin: 0;
    display: flex;

    .list {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow-y: hidden;

      &:hover[data-custom-amount="3"] .group {
        height: 150px;
      }

      &:hover[data-custom-amount="2"] .group {
        height: 100px;
      }

      &[data-custom-amount="3"] .link {
        height: 33%;
      }

      &[data-custom-amount="2"] .link {
        height: 50%;
      }

      .group {
        transition: all 0.3s ease;
        position: absolute;
        top: 58px;
        overflow-y: hidden;
        height: 0;

        .link {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100px;
          color: white;
          margin: 0;
          padding: 0 10px;
          transition: all 0.3s ease;
          font-family: "Berlin Sans FB Demi";
          font-size: 20px;

          &:hover {
            background-color: #000000;
            cursor: pointer;
          }
        }
      }
    }

    .link {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      color: white;
      margin: 0;
      padding: 0 10px;
      transition: all 0.3s ease;
      font-family: "Berlin Sans FB Demi";
      font-size: 20px;

      &:hover {
        background-color: #000000;
        cursor: pointer;
      }
    }

  }

  button {
    margin: 0;

  }
}

.tool {
  margin: 0;
  flex: 1;
}


.profileCard {
  background: linear-gradient(45deg, rgba(232, 0, 248, 0.6), rgba(0, 216, 255, 0.6));
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;

  .skeleton {
    display: block;
    width: 90%;

    :deep(.el-skeleton__item) {
      display: block;
    }
  }
}

.content {
  background: rgba(27, 250, 255, 0.7);
  padding: 20px;
  display: flex;
  height: 100%;
  justify-content: center
}

.LifeChips {
  margin: 20px 5px;

  &.left {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &.right {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
