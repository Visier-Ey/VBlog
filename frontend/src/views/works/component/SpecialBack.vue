<template>
  <div class="specialBack">
    <div class="specialBackBody">
      Here!
    </div>
    <div class="specialBackLackTriangle">
    </div>
  </div>

</template>

<script setup>

</script>

<style scoped>
* {
  box-sizing: border-box;
}

.specialBack {
  width: 200px;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  font-size: 40px;
  position: fixed;
  bottom: 100px;
  left: 0;
  cursor: pointer;

  .specialBackBody {
    position: relative;
    padding-left: 20px;
    background: rgba(0, 234, 255, 0.7);
    color: blanchedalmond;
  }

  .specialBackLackTriangle {
    position: relative;
    width: 0;
    height: 0;
    border-left: 30px solid rgba(0, 234, 255, 0.7);
    border-right: 30px solid transparent;
    border-top: 30px solid rgba(0, 234, 255, 0.7);
    border-bottom: 30px solid rgba(0, 234, 255, 0.7);
  }
}

</style>