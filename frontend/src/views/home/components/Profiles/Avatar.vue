<template>
  <div class="playerAvatarAutoSizeInner">
    <div class="profile_avatar_frame">
      <img class="frame-image" alt="Failed"  :src="props.url.frameUrl"/>
      <img class="avatar-image" alt="Failed" :src="props.url.avatarUrl" onerror="this.src='/avatar.jpg'"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";

// set the profile data
interface profile {
  url: {
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
  .frame-image {
    width: 120%;
    height: 120%;
    object-fit: cover;
    position: absolute;
    top: -10%;
    left: -10%;
    z-index: 1;
  }
  .avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
}

</style>