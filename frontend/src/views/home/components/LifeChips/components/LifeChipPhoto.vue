<template>
  <div class="chipP">
    <div class="ChipBg"></div>
    <div class="ChipLabel">Photo</div>
    <div class="ChipPhoto"></div>
    <div class="ChipPContent">
      <p>
        nihao
      </p>
    </div>
    <LifeChipBar />
  </div>
</template>

<style scoped>
.chipP {
  width: 100%;
  min-height: 400px;
  display: flex;
  background-color: rgb(255, 255, 255);
  flex-direction: column;
  position: relative;
  margin: 10px 0;
}

.ChipPhoto {
  width: 100%;
  height: 70%;
  background-image: url("https://pic2.zhimg.com/v2-b6399145c80f909e020874d3c670ae44_r.jpg?source=1940ef5c");
  background-size: cover;
  background-position: center;
  z-index: 50;
}

.ChipPContent {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    width: 90%;
  }
}

.ChipLabel {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 100;
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 5px 20px;
  font-size: 20px;
  font-weight: bold;
}

.ChipBg {
  position: absolute;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.6), rgba(0, 216, 255, 0.6));
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>

<script setup>

import LifeChipBar from "./LifeChipBar.vue";
</script>
