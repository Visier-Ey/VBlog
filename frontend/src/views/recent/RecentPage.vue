<template>
  <div class="recent" ref="recent">
    <RecentCellBg></RecentCellBg>
    <div class="Top"><span>Welcome!</span></div>
    <div class="main">
      <div class="left">
        <div class="notice card">
          Notice
        </div>
        <div class="other card">
          {{  notices.content }}
        </div>
      </div>
      <div class="right card">
        <div class="content">
          <div id="markdown-content" ref="aboutMd"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { httpBaseUrl } from "../../../custom.config.js";
import {getEvents, getNotices} from "../../api/recent.js";
import {onBeforeMount, onMounted, ref} from "vue";
import {loadMarkdownFile} from "../../component/markdown";
import RecentCellBg from "../components/Bg/RecentCellBg.vue";

const notices = ref({content: ''});

const aboutMd = ref<HTMLDivElement | null>(null);

const recent = ref<HTMLDivElement | null>(null);
onMounted(async () => {
  const events = (await getEvents()).data;
  if (events.length > 0) {
    loadMarkdownFile(events[0].url, aboutMd);
  }
  notices.value = (await getNotices()).data[0];
  setTimeout(() => {
    recent.value?.classList.add('enter');
  }, 400);
});
</script>

<style scoped>
.recent {
  position: relative;
  height: auto;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  font-family: "Bradley Hand ITC";
  background: rgba(0, 0, 0, 0.1);

  .Top {
    height: 300px;
    width: 0;
    background: rgba(255, 255, 255, 0);
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    font-size: 150px;
    overflow: hidden;
    transition: all 0.8s cubic-bezier(0.2,0.3,0.2,-0.1) 0.3s;

    span {
      position: relative;
      background: inherit;
      color: var(--main-color);
      width: 200px;
      display: flex;
      justify-content: center;
    }
  }

  .main {
    width: 70%;
    min-height: 300px;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    color: black;
    font-family: "Potra";
    padding-bottom: 40px;
  }

  --main-color: rgb(0, 255, 231);
  --glass-color: rgba(255, 255, 255, 0.49);
}

.card {
  border-radius: 20px;
  border-top: var(--main-color) solid 2px;
  border-bottom: var(--main-color) solid 2px;
  background: var(--glass-color);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.8);
  margin-bottom: 20px;
  padding: 20px;
}

.enter {
  .Top {
    width: 100%;
  }

  .left {
    .notice {
      height: 100px;
      opacity: 1;
    }

    .other {
      height: 300px;
      opacity: 1;
    }
  }

  .right {
    transform: translateX(0);
    opacity: 1;
  }
}

.left {
  height: 100%;
  width: 40%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-direction: column;
  margin-right: 20px;

  .notice {
    font-size: 40px;
    height: 0;
    max-height: 200px;
    width: 100%;
    transition: all 0.7s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    opacity: 0;
  }

  .other {
    height: 0;
    max-height: 500px;
    width: 100%;
    transition: all 0.7s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    opacity: 0;
    font-size: 30px;
    text-align: left;
  }
}

.right {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  transform: translateX(-200px);
  opacity: 0;
  transition: all 1s cubic-bezier(0.68, -0.55, 0.27, 1.55);

  #markdown-content {
    text-align: left;
  }
}
</style>