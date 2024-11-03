<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {loadMarkdownFile} from "../../../component/markdown";
import { getAbout } from "../../../api/recent";

const aboutMd = ref < HTMLDivElement | null > (null);
onMounted(async () => {
  const about = (await getAbout()).data;
  if (about.length > 0) {
    loadMarkdownFile(about[0].url, aboutMd);
  }
});
</script>

<template>
  <div class="page">
    <div class="container">
      <div class="about">
        <div id="markdown-content" ref="aboutMd"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  height: auto;
  font-size: 80px;
  font-weight: bold;
  color: white;
  background: #383a3c;
}

.container {
  width: 92%;
  height: 100%;
  background: #2b2828;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: scroll;
  padding-bottom: 100px;
}

.about {
  margin-top: 100px;
  width: 70%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  background: inherit;
  position: relative;
  text-align: left;
  font-size: 15px;
  border-left: solid 1px #f0f0f0;
  border-right: solid 1px #f0f0f0;

  #markdown-content {
    width: 80%;
  }

  span {
    width: 90%;
    z-index: 5;
  }

  pre {
    width: 90%;
    text-align: left;
    font-family: "Bradley Hand ITC";
    font-size: 25px;
    z-index: 5;
  }
}

#markdown-content {
  width: 100%;
  height: 100%;
  font-family: fangsong;
}
</style>