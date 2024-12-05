<script setup>
import {httpBaseUrl} from "../../../../custom.config.js";

const tech1 = httpBaseUrl + '/tech/tech1.rar';
const tech2 = httpBaseUrl + '/tech/tech2.rar';
const tech2html = httpBaseUrl + '/tech/EDC.html';
const sas = httpBaseUrl + '/tech/sas.html';
</script>

<template>
  <div class="techPage">
    <div class="techPageContainer">
      <div class="techPageHeader">
        <div class="techPageTitle">Tech</div>
        <div class="techPageSubTitle">May Miss at any time</div>
      </div>
      <div class="techPageContent">
        <div class="resourceLine">
          <a class="techContent" :href="sas">READ BEFORE LEARN</a>
<!--          <label class="date">2024 12 3</label>-->
        </div>
        <div class="resourceLine">
          <a class="techContent" :href="tech1">C/C++Feature</a>
          <label class="date">2024 12 3</label>
        </div>
        <div class="resourceLine">
          <a class="techContent" :href="tech2">EDC && TerminalUI</a>
          <label class="date">2024 12 10</label>
          <a class="display" :href="tech2html">OLShow</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.techPage {
  color: black;
  background: white;
  width: 100vw;
  height: 120vh;
}

.techPageContainer {
  position: relative;
  margin: auto;
  width: 75%;
  height: 100%;
}

.techPageHeader {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.techPageTitle {
  position: absolute;
  left: -20px;
  top: 0;
  font-size: 120px;
  font-weight: bold;
  display: block;
  font-family: "Californian FB";
}

.techPageSubTitle {
  font-size: 20px;
  font-weight: bold;
  display: block;
  font-family: "Californian FB";
}

.techPageContent {
  position: relative;
  top: 50px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 3px solid black;
  border-top: none;
  border-bottom: none;
  & .resourceLine {
    display: flex;
    margin: 40px 0;
    width: 100%;
    height: 120px;
    background: aqua;
    transform: skewX(-60deg) translateX(30%);
    transition: all 0.3s ease;
    //box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
    &:hover{
      transform:skewX(-60deg) translateX(35%) scale(0.9);
      background: rgba(5, 255, 229, 0.91);
    }
    & .display {
      position: relative;
      left: 60px;
      top: 50px;
      font-size: 40px;
      font-weight: bold;
      transform: skewX(50deg) translateX(-30%);
      &:hover {
        color: red;
        text-decoration-line: underline;
      }
    }
    & .date {
      left: 10px;
      top: 50px;
      position: relative;
      right: 20px;
      font-size: 20px;
      font-weight: bold;
      transform: skewX(50deg) translateX(-30%);
    }
    & .techContent {
      margin-left: 200px;
      display: block;
      height: 100%;
      text-align: center;
      line-height: 120px;
      font-size: 50px;
      transform: skewX(50deg) translateX(-30%);
      color: black;


      &:hover {
        color: red;
        text-decoration-line: underline;
      }
    }
  }
}
</style>