<template>
  <div class="RecentCellBg">
    <div class="box">
      <div class="col" v-for="(id) in colAmount" :style="setCol(id)">
        <div class="slider" :style="{animationDelay:id*0.2*random()+'s'}"></div>
      </div>
      <div class="row" v-for="(id) in rowAmount" :style="setRow(id)">
        <div class="slider" :style="{animationDelay:id*0.2*random()+'s'}"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const height = window.outerHeight;
const width = window.outerWidth;
const colAmount = 10;
const CellSize = width / colAmount;
const rowAmount = Math.ceil(height / CellSize);


const random = () => {
  return Math.floor(Math.random() * (1.7) + 0.3);
};
const setCol = (id: number) => {
  return {
    left: `${CellSize * (id - 1) + 10}px`,
    top: `0px`,
  };
};
const setRow = (id: number) => {
  return {
    left: `0px`,
    top: `${CellSize * (id - 1) + 20}px`,
  };
};
</script>

<style scoped>
.RecentCellBg {
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: -1;

  .box {
    width: 100%;
    height: 100%;
    background: white;
    position: relative;
  }
}

.col {
  position: absolute;
  width: 10px;
  height: 100%;
  overflow: hidden;
  background: black;

  .slider {
    width: 100%;
    height: 200px;
    background: #ef0000;
    animation: colLightWave 2s infinite linear;
  }
}

.row {
  position: absolute;
  width: 100%;
  height: 10px;
  background: #000;
  overflow: hidden;

  .slider {
    width: 200px;
    height: 100%;
    background: #ef0000;
    animation: rowLightWave 3s infinite linear;
  }
}

@keyframes colLightWave {
  0% {
    transform: translateY(-200px);
  }
  100% {
    transform: translateY(100vh);
  }
}

@keyframes rowLightWave {
  0% {
    transform: translateX(-200px);
  }
  100% {
    transform: translateX(100vw);
  }
}
</style>