<script setup>
import {httpBaseUrl} from "../../../../../custom.config.js";


const domain = httpBaseUrl.split("//")[0]+"//"+ httpBaseUrl.split('//')[1].split(':')[0];
</script>

<template>
  <div class="footer">
    <pre>
      2024 visier | <a :href="domain">{{ ' 浮生百态 ' }}</a> | ICP : <a class="ICP" href="https://beian.miit.gov.cn/">豫ICP备2024093066号</a>
    </pre>
  </div>
</template>

<style scoped>
.footer {
  position: relative;
  width: 100vw;
  background: rgba(0, 0, 0, 0.1);
  bottom: 0;
  text-transform: uppercase;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  pre{
    color: white;
    margin: 0 20px;
    display: flex;
    align-items: center;
    font-size: 20px;
  }
}
a{
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover{
    color: #0bbd87;
  }
}
</style>