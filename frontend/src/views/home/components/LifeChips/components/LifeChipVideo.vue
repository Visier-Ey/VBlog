<template>
  <div class="chipV">
    <LifeChiplabel :chipLabel="'Video'"></LifeChiplabel>
    <div class="ChipVideoWrapper">
      <video class="ChipVideo" ref="video">
        <source :src="props.chipVideo.url?props.chipVideo.url:''" type="video/mp4"/>
      </video>
      <div class="playBg" ref="videoBg">
        <el-icon v-if="!isPlay">
          <VideoPlay/>
        </el-icon>
        <el-icon v-if="isPlay">
          <VideoPause/>
        </el-icon>
      </div>
    </div>
    <LifeChipContent
        :chipContent="chipVideo"
    />
  </div>
</template>

<script lang="ts" setup>
import LifeChipBar from "./smallComponents/LifeChipBar.vue";
import {onMounted, ref} from "vue";
import {VideoPause, VideoPlay} from '@element-plus/icons-vue'
import {Chip} from "../interfaces";
import LifeChipContent from "./smallComponents/LifeChipContent.vue";
import LifeChiplabel from "./smallComponents/LifeChiplabel.vue";
const isPlay = ref<boolean>(false);
const videoBg = ref<HTMLDivElement | null>(null);
const video = ref<HTMLVideoElement | null>(null);
// define the video play function
const videoPlay = () => {
  if (video.value.paused) {
    video.value.play();
    videoBg.value.style.background = 'rgba(0, 0, 0, 0)';
    isPlay.value = true;
  } else {
    video.value.pause();
    videoBg.value.style.background = 'rgba(0, 0, 0, 0.3)';
    isPlay.value = false;
  }
}
const chipBar = {
  headset: true,
  comment: true,
  share: true,
  headsetFunc: videoPlay,
}

// define the interface of properties

interface Props {
  chipVideo: Chip;
}

const props = defineProps<Props>();

onMounted(() => {
  videoBg.value.addEventListener('click', async () => {
    videoPlay();
  });
  video.value.addEventListener('ended',async () => {
    videoBg.value.style.display = 'flex';
  });
})
</script>

<style scoped>
.chipV {
  width: 100%;
  height: auto;
  display: flex;
  background-color: rgb(255, 255, 255);
  position: relative;
  justify-content: flex-start;
  margin: 0;
}

.ChipVideoWrapper {
  position: relative;
  width: 100%;
  height: auto;
  z-index: 50;
  display: flex;
}

.ChipVideo {
  position: relative;
  width: 100%;
  height: auto;
  z-index: 50;
}

.playBg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 60;
  transition: all 0.2s ease;

  &:hover {
    cursor: pointer;

    .el-icon {
      transform: scale(1.1);
      opacity: 0.8;
      color: #0078ff;
    }

    background: rgba(0, 0, 0, 0);
  }

  .el-icon {
    transition: all 0.2s ease;
    position: absolute;
    z-index: 100;
    font-size: 100px;
    color: rgb(0, 0, 0, 0.5);
  }
}



</style>
