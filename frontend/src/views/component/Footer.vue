<script setup>

</script>

<template>
  <div class="footer">
    <span>
      2024 visier | 浮生百态 |
      ICP : <a class="ICP" href="https://beian.miit.gov.cn/">豫ICP备2024093066号</a>
    </span>
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