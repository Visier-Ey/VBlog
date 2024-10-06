<template>
  <div class="chip">
    <div class="chipHeader">
      <span class="chipTitle">{{ props.chip.title }}</span>
      <span class="date">{{ props.chip.date }}</span>
      <!--      <span class="divider"></span>-->
    </div>
    <!--  the body part  -->
    <div class="chipBody">
      <span class="chipContent">{{ props.chip.content }}</span>

    </div>
    <!--  footer ,maybe like something else  -->
    <div class="chipFooter">

    </div>
  </div>
</template>

<script lang="ts" setup>

// define the interface of properties
import {onMounted} from "vue";

interface Chip {
  title?: string;
  content?: string;
  url?: string;
  date?: string;
  pos?: number;
}
interface Props {
  chip: Chip;
}
// define the properties
const props = defineProps<Props>();

onMounted(() => {
  if (props.chip.pos) {
    if (props.chip.pos % 2 === 0) {
      document.querySelector('.chip').classList.add('right');
    }
  }
});
</script>

<style scoped>

.chip.right{
  width: 400px;
}
.chip {
  width: 700px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 20px;
  margin:20px 5px ;
  background: linear-gradient(45deg, rgba(232, 0, 248, 0.6), rgba(0, 216, 255, 0.6));
  .chipHeader{
    padding: 0 20px;
    position: relative;
    top: 20px;
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 2px grey;
    .chipTitle{
      font-size: 30px;
      font-weight: bold;
      font-family: "Century Schoolbook";
    }
    .date{
      font-size: 12px;
      color: grey;
    }
  }
  .chipBody{
    text-align: left;
    width: 80%;
    padding: 20px;
    font-size: 20px;
    font-family: "Century Schoolbook";
    .content{
      line-height: 1.5;
    }
  }

}
</style>