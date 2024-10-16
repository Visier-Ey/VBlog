<template>
<div class="recent">
  <h1>Recent</h1>
  <p>作者最近准备去打ctf，网站这两个月估计就不维护了</p>
  <p>反正检验学习成果的目的差不多已经实现了</p>
  <p>而且甚至后台管理系还没写</p>
  <Comment class="comment" v-for="comment in comments" :key="comment.id" :comment="comment" />
</div>
</template>

<script setup>
import Comment from "./Comment.vue";
import { getComments } from "../../api/recent.js";
import {ref} from "vue";
const comments = ref();
getComments().then((res) => {
  comments.value = res.data;
});

</script>

<style scoped>
.recent{
  position: relative;
  top: 40px;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  .comment{
    background: white;
    color: black;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
}
</style>