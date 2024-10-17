<template>
  <div class="page blur">
    <DynamicBg
        :bg="bg"
    />
    <CollapseSidebar class="collapseSidebar"/>
    <div class="container">
      <div class="header">
        <!--        set blogger name-->
        <div class="user">
          {{ zeroWidthEncrypt(profile.nick.toUpperCase(), 'zyl') }}
        </div>
        <div class="nav">
          <!--          you know, the nav options-->
          <div class="menu">
            <div class="link" data-custom-id="home">{{ zeroWidthEncrypt('HOME', 'visier') }}</div>
            <div class="link" data-custom-id="recent" data-custom-amount="3" @click="pageJump">
              {{ zeroWidthEncrypt('RECENT', 'visier') }}
            </div>
            <!--            <div class="link list" data-custom-id="arts" data-custom-amount="2">{{ encrypt('ARTS', 'visier') }}-->
            <!--              <div class="group">-->
            <!--                <div class="link" data-custom-id="blogs" @click="pageJump($event)">{{ encrypt('BLOGS', 'visier') }}-->
            <!--                </div>-->
            <!--                <div class="link" data-custom-id="poetry" @click="pageJump($event)">{{ encrypt('POETRY', 'visier') }}-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--    Work List        -->
            <div class="link list" data-custom-id="Works" data-custom-amount="3">{{
                zeroWidthEncrypt('WORKS', 'visier')
              }}
              <div class="group">
                <div class="link" data-custom-id="JS" @click="pageJump">{{ zeroWidthEncrypt('JS', 'visier') }}</div>
                <div class="link" data-custom-id="C-C++" @click="pageJump">{{
                    zeroWidthEncrypt('C/C++', 'visier')
                  }}
                </div>
                <div class="link" data-custom-id="DBMS" @click="pageJump">{{
                    zeroWidthEncrypt('DBMS', 'visier')
                  }}
                </div>
              </div>
            </div>
            <!--      Other List        -->
            <div class="link list" data-custom-id="others" data-custom-amount="3">{{
                zeroWidthEncrypt('OTHERS', 'visier')
              }}
              <div class="group">
                <div class="link" data-custom-id="TimeTravel" @click="pageJump">
                  {{ zeroWidthEncrypt('T-TRAVEL', 'visier') }}
                </div>
                <div class="link" data-custom-id="contact" @click="pageJump">
                  {{ zeroWidthEncrypt('CONTACT', 'visier') }}
                </div>
                <div class="link" data-custom-id="about" @click="pageJump">{{ zeroWidthEncrypt('ABOUT', 'visier') }}
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
        <Profile
            :profile="profile"
        ></Profile>
      </div>
      <!--      your brief blog here-->
      <div class="content">
        <div class="LifeChips left">
          <LifeChips
              v-for="item in lifeChipsLeft"
              :chip="item"
              :key="item.id"
          />
        </div>
        <div class="LifeChips right">
          <LifeChips
              v-for="item in lifeChipsRight"
              :chip="item"
              :key="item.id"
          />
        </div>
      </div>
    </div>
    <div class="scrollToTop" @click="scrollToTop"><span class="ArrowLeftTop">⟨⟨</span>Top</div>
  </div>
  <SwitchBoll :scale="isScaled"></SwitchBoll>
</template>

<script lang="ts" setup>
//   here set the blogger name
import router from "../../router/index.js";
import {computed, onBeforeMount, onMounted, reactive, ref} from "vue";
import SwitchBoll from "../component/SwitchBoll.vue";
import Profile from "./components/Profiles/Profile.vue";
import DynamicBg from "../component/DynamicBg.vue";
import {zeroWidthEncrypt} from "../../component/encryp";
import LifeChips from "./components/LifeChips/LifeChips.vue";
import {getLifeChips} from '../../api/lifeChips';
import {getUser} from '../../api/users';
import CollapseSidebar from "../component/CollapseSidebar/CollapseSidebar.vue";
//  import the briefs of the blog
const lifeChips = ref([]);


const profile = ref({
  name: '',
  nick: '',
  brief: '',
  work: '',
  school: '',
  age: 0,
  lover: '',
  like: '',
  frameUrl: '',
  avatarUrl: ''
});
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
  console.log(e.target.dataset.customId);
  setTimeout(() => {
    router.push({name: e.target.dataset.customId});
  }, 500);
}
// set the scroll to top function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
onBeforeMount(() => {
  getUser().then(res => {
    profile.value = res.data[0];
  });
})
onMounted(() => {
  // set the EnterScale effect
  setTimeout(() => {
    document.querySelector('.page.blur').classList.remove('blur');
  }, 500);
  // get the lifeChips
  getLifeChips().then(res => {
    res.data.forEach((item, index) => {
      item.date = new Date(item.date).toLocaleDateString();
    });
    lifeChips.value = res.data;
  });
});
// set the blogChips
const chip = {
  title: "",
  content: "In this paper, we propose a strategy to solve the load imbalance problem at MapReduce stage that caused from using the default partition algorithm of Hadoop platform. Through using multiple partitioning technique, this proposed strategy can refine the tasks and balance the inputs of reduce stage in the map phase. Furthermore, this proposed strategy can fully employ idle nodes to balance the high load nodes, in order to achieve the optimized job scheduling during the execution process of reduce stage.",
  date: "2021-10-10",
}
const lifeChipsLeft = ref(computed(() => {
  return lifeChips.value.filter((item, index) => index % 2 === 0);
}));
const lifeChipsRight = ref(computed(() => {
  return lifeChips.value.filter((item, index) => index % 2 !== 0);
}));
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
    margin-top: 30px;
    width: 1300px;
    display: flex;
    flex: 1;
    flex-direction: column;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.8);
    transition: all 0.6s ease;
  }

  .collapseSidebar:hover + .container {
    transform: skewY(-5deg) translateY(20%) translateX(30%) rotateY(20deg);

    .header.user {
      transform: skewX(-30deg);
    }

    & + .scrollToTop {
      transform: translateX(800px) translateY(800px);
    }
  }
}

@keyframes flowed {
  0% {
    transform: translateY(0) rotateY(0) skewY(-0.4deg);
  }
  50% {
    transform: translateY(4px) rotateY(2deg) skewY(0.2deg);
  }
  100% {
    transform: translateY(0) rotateY(0) skewY(-0.4deg);
  }
}


.header {
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.6);
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
    transform: skewX(-20deg);
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

        .link:hover {
          cursor: pointer;
        }
      }
    }

    .link {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 120px;
      color: white;
      margin: 0;
      padding: 0 10px;
      transition: all 0.3s ease;
      font-family: "Berlin Sans FB Demi";
      font-size: 25px;
      background: inherit;

      &:hover {
        background-color: rgba(69, 69, 69, 0.5);
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
  position: relative;
  background: rgba(27, 250, 255, 0.7);
  padding: 20px;
  display: flex;
  height: 100%;
  justify-content: center;
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

.scrollToTop {
  width: 30px;
  height: 100px;
  position: fixed;
  bottom: 20px;
  right: calc(50% - 740px);
  background-color: rgba(0, 226, 255, 0.7);
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.7s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  &:hover {
    background-color: rgba(0, 255, 255, 0.8);
  }

  .ArrowLeftTop {
    margin: 0;
    transform: rotate(90deg);
    overflow: visible;
    height: 100%;
    font-size: 50px;
    position: relative;
    top: 0;
    left: 5px;
  }
}
</style>
