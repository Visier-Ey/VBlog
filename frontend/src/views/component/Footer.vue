<script setup>

</script>

<template>
  <div class="footer">
    <span class="left">
      2024 visier | made by Visier
    </span>
    <span class="right">
      ICP : <a class="ICP" href="https://beian.miit.gov.cn/">豫ICP备2024093066号</a>
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
  background: rgba(0, 0, 0, 0.5);
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
.ICP{
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover{
    color: #0bbd87;
  }
}
</style>