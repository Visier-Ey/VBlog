<template>
  <DynamicBg
      :bg="bg"
  />
  <div class="container">
    <div class="envelope">
      <Manuscript v-for="poetry in poetryList"
          :poetry="poetry"
      />
    </div>
    <div class="space"></div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive} from "vue";
import DynamicBg from "../../component/DynamicBg.vue";
import Manuscript from "./component/Manuscript.vue";
import {getPoetry} from "../../../api/arts";

const bg = reactive({
  poster: '',
  webm: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/296870/9125f49bf595d6ec4d3115cd2d1d13c653451a5d.webm',
  mp4: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/296870/75fec9af0d2d37e014b3b531e3e52af30fbf0090.mp4'
})
// fetch the poetry list
const poetryList = reactive([])
onMounted(() => {
  const res = getPoetry();
  res.then((data) => {
    poetryList.push(...data.data)
  })
})

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 100vw;
  font-size: 80px;
  font-weight: bold;
  color: white;
  position: relative;
}

.envelope {
  position: relative;
  width: 950px;
  height: auto;
  background: rgba(0, 0, 0);
  box-shadow: 5px 2px 10px 1px rgba(255, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 65px;
}

.space {
  height: 20px;
  width: 100%;
  bottom: 0;
}
</style>