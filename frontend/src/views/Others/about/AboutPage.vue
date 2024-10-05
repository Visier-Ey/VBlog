<script setup>
import {onMounted} from "vue";
import {loadMarkdownFile} from "../../../component/markdown/index.js";

onMounted(() => {
  loadMarkdownFile('about.md', 'markdown-content');
});
</script>

<template>
  <div class="page">
    <div class="container">
      <div class="about">
        <div id="markdown-content"></div>
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
  height: 100vw;
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
  align-items: center;
  overflow-y: scroll;
}

.about {
  width: 70%;
  height: 90%;
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
  #markdown-content{
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