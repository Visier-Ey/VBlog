<template>
  <DynamicBg :bg="bg" />

  <div class="w-full h-screen flex flex-col justify-center items-center text-white">
    <div class="text-6xl font-bold mb-10">Welcome to exchange ideas</div>

    <!-- Contact section -->
    <div class="flex flex-col space-y-6 text-2xl">
      <a
        href="https://github.com/YourGitHubName"
        target="_blank"
        class="flex items-center space-x-3 hover:text-blue-300 transition"
      >
        <span class="text-3xl">🐙</span>
        <span>GitHub: https://github.com/Visier-Ey</span>
      </a>

      <div class="flex items-center space-x-3">
        <span class="text-3xl">💬</span>
        <span>QQ: 3146088404@qq.com</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import DynamicBg from "../../components/Bg/DynamicBg.vue";
import { reactive } from "vue";

const bg = reactive({
  poster: "",
  webm: "https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/579720/7e5716f03eadbbd7587fb18a6c05fc131fdd59d9.webm",
  mp4: "https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/579720/8144c4de0312c256889580d7e7de5bc4ccf84fda.mp4",
  playbackRate: 0.6,
});
</script>

<style scoped>
</style>