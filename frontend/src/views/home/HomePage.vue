<template>
  <div class="page">
    <!-- <DynamicBg
        :bg="bg"
    /> -->
    <NoisyRiver />
       <!-- <CollapseSidebar class="collapseSidebar"/> -->
    <!-- <AsideBar></AsideBar> -->
    <div class="containers">
      <div class="header">
        <Nav
            :nick="profile.nick"
        />
      </div>
      <!--            page profileCard part-->
      <div class="profileCard">
        <Profile
            :profile="profile"
        ></Profile>
      </div>

     <!-- <div class="Cycle-Image">-->
<!--        <div class="LifeLabel">BEST WISH!</div>-->
<!--        <CycleImage-->
<!--            v-if="lifeChips.length > 0"-->
<!--            :chip="lifeChips"-->
<!--        ></CycleImage>-->
<!--      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
//   here set the blogger name
import {onBeforeMount, onMounted, reactive, ref} from "vue";
import Profile from "./components/Profiles/Profile.vue";
import DynamicBg from "../components/Bg/DynamicBg.vue";
// import {getLifeChips} from '../../api/lifeChips';
import {getUser} from '../../api/users';
import Nav from "../components/Nav/components/HomeNav.vue";
import AsideBar from "../components/AsideBar.vue";
import CycleImage from "./components/CycleImage.vue";
import NoisyRiver from "../components/Bg/NoisyRiver.vue";
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
// set background video
const bg = reactive({
  poster: '/BGposter.jpg',
  webm: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/874400/c6ec1e32708cb1e403a4c79db03b0128e080e1e8.webm',
  mp4: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/874400/2fda5d3781c6d198d70775f53809db245151928d.mp4'
})

onBeforeMount(async () => {
  getUser().then(res => {
    profile.value = res.data.user;
  });
  // const res = await getLifeChips();
  // // get the lifeChips
  // res.data.forEach((item, index) => {
  //   item.date = new Date(item.date).toLocaleDateString();
  // });
  // lifeChips.value = res.data;
})
onMounted(async () => {
  // set the EnterScale effect
  window.scrollTo({
    top: 1,
    behavior: 'smooth'
  });
});
// set the blogChips

</script>


<style scoped>
* {
  box-sizing: content-box;
  padding: 0;
}

.page{
  transition: all 0.5s ease;
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: auto;
  min-width: 1500px;
  min-height: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .containers {
    position: relative;
    width: 100vw;
    display: flex;
    height: 100vh;
    flex-direction: column;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.8);
    transition: all 0.6s ease;
  }
}

.header {
  background-color: rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(0, 255, 255, 0.6);

  height: auto;
  position: relative;
  margin-bottom: 0;
}

.profileCard {
  background: linear-gradient(45deg, rgba(232, 0, 248, 0.1), rgba(0, 216, 255, 0.1));
  overflow: hidden;
  z-index: 2000;
}

.Cycle-Image {
  height: auto;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  padding: 40px;
  .LifeLabel{
    position: absolute;
    top: -500px;
    left: -20px;
    z-index: 100;
    color: rgb(255, 255, 255);
    padding: 5px 20px;
    font-size: 100px;
    font-family: "Baskerville Old Face";
    transform: rotate(-30deg) skewX(-10deg);
  }
}


</style>
