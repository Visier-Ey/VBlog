<template>
  <div class="LifeChipBar">
    <el-icon><Headset/></el-icon>
    <el-icon><Comment /></el-icon>
    <el-icon><Share /></el-icon>
  </div>
</template>

<script setup>
import {Comment,Share,Headset} from '@element-plus/icons-vue'

</script>

<style scoped>
.LifeChipBar {
  bottom: 0;
  margin: 5px 0;
  position: absolute;
  width: 97%;
  height: 10%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .el-icon{
    margin: 0 1%;
    transition: transform 0.2s ease;
    font-size: 40px;
    color: black;
    &:hover {
      cursor: pointer;
      transform:scale(1.1);
    }
  }
}
</style>