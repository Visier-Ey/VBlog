<template>
  <div class="playerAvatarAutoSizeInner">
    <div class="profile_avatar_frame">
      <el-image class="frame-image" img-id="frame" :src="props.url.frameUrl" />
      <el-image class="avatar-image" img-id="avatar" :src="props.url.avatarUrl" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {getProfiles} from '../../../../api/users.js';
import {onMounted, ref} from "vue";
// set the profile data
interface profile {
  url:{
    frameUrl: string;
    avatarUrl: string;
  }
}

onMounted(() => {
  // get the profile data

});
// expose the props
const props = defineProps<profile>()
</script>

<style scoped>
.playerAvatarAutoSizeInner {
  width: 100%;
  height: 100%;
  position: relative;
}

.profile_avatar_frame {
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

:deep(.frame-image img,
.avatar-image img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
:deep(.frame-image) {
  width: 114%;
  height: 114%;
  left: -9%;
  top: -9%;
  z-index: 20;
}
:deep(.avatar-image) {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}

</style>