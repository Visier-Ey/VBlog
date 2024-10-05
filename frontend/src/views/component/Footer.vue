<script setup>

</script>

<template>
  <div class="footer">
    <span class="left">
      2024 visier | made by Visier
    </span>
    <span class="right">
      ICP : null
    </span>
  </div>
</template>

<style scoped>
.footer {
  z-index: 1000;
  height: 30px;
  width: 100vw;
  position: fixed;
  bottom: 0;
  background: rgba(0, 0, 0, 1);
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  span{
    color: white;
    margin: 0 20px;
    display: flex;
    align-items: center;
  }
}
</style>