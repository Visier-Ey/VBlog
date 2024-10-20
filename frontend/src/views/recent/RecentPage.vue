<template>
<div class="recent">
  <h1>Recent</h1>
  <p>作者最近准备去打ctf，网站这两个月估计就不维护了</p>
  <p>反正检验学习成果的目的差不多已经实现了</p>
  <p>这个项目甚至有很多硬编码的地方</p>
  <p>而且甚至后台管理系还没写</p>
  <p>访客系统也只写了一半（登录注册），由于设计是要后台审核</p>
  <p>虽然审核也就走个流程，但是我不管我就喜欢审核</p>
  <p>之后补上访客系统也不会很完善，毕竟这是一个以展示为主的网站</p>
  <p>这里提供一个内置的account:visitor和password:visitor</p>
<!--  <Comment class="comment" v-for="comment in comments" :key="comment.id" :comment="comment" />-->
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