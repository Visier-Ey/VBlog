<template>
<!--  <DynamicBg-->
<!--      :bg="bg"-->
<!--  />-->
  <div class="container">
    Dont touch me
  </div>
</template>

<script setup>
import DynamicBg from "../../components/Bg/DynamicBg.vue";
import {reactive} from "vue";

const bg = reactive({
  poster: '',
  webm: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/579720/7e5716f03eadbbd7587fb18a6c05fc131fdd59d9.webm',
  mp4: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/579720/8144c4de0312c256889580d7e7de5bc4ccf84fda.mp4',
  playbackRate: 0.6
})
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 80px;
  font-weight: bold;
  color: white;
}
</style>