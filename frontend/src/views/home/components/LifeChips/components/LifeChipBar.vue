<template>
  <div class="ChipBg"></div>
  <div class="LifeChipBar">
    <div ref="headsetEle"><el-icon v-if="props.chipBar.headset" ><Headset/></el-icon></div>
    <div ref="commentEle"><el-icon v-if="props.chipBar.comment"><Comment /></el-icon></div>
    <div ref="shareEle"><el-icon v-if="props.chipBar.share"><Share /></el-icon></div>
  </div>
</template>

<script lang="ts" setup>
import {Comment,Share,Headset} from '@element-plus/icons-vue'
import {onMounted, ref} from "vue";
interface ChipBar {
  headset?: boolean;
  comment?: boolean;
  share?: boolean;
  headsetFunc?: () => void;
}
interface Props {
  chipBar: ChipBar;
}
// define the properties
const headsetEle = ref<HTMLDivElement | null>(null);
const commentEle = ref<HTMLDivElement | null>(null);
const shareEle = ref<HTMLDivElement | null>(null);

const props = defineProps<Props>();
onMounted(() => {
  if (props.chipBar.headset) {
    headsetEle.value.addEventListener('click', props.chipBar.headsetFunc);
  }
});
</script>

<style scoped>
.LifeChipBar {
  bottom: 0;
  margin-top: 5px;
  position: relative;
  width: 97%;
  height: 10%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  div{
    margin: 0 1%;
  }
  .el-icon{
    transition: transform 0.1s ease;
    font-size: 40px;
    color: black;
    &:hover {
      cursor: pointer;
      transform:scale(1.1);
    }
  }
}

.ChipBg {
  position: absolute;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.6), rgba(0, 216, 255, 0.6));
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>